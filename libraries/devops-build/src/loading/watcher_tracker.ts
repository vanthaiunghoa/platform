import { WatcherProcess } from './watcher_process';
import { OverridingTracker } from '../tracking/overriding_tracker';

export interface WatcherConfig {
    cwd?: string;
    patterns: string[];

    /** Idle time required between changes to trigger a progress event. */
    idleTime?: number;
}

/**
 * A process that starts, progresses, and the completes.
 * Completion can be due to success, failure, or cancellation.
 */
export class WatcherTracker extends OverridingTracker<WatcherProcess, WatcherConfig, WatcherConfig | undefined, string[]> {
    configure(config: WatcherConfig) {
        this.runProcess(config);
    }

    private config: WatcherConfig;

    protected createProcess(state?: WatcherConfig): WatcherProcess | undefined {
        return new WatcherProcess(
            state && state.patterns || this.config.patterns,
            state && state.cwd || this.config.cwd,
            state && state.idleTime || this.config.idleTime);
    }
}
import { LoadSource } from '../loading/load_source';

export class WrappedLoadSource<TOriginal, TData> implements LoadSource<TData> {
    constructor(public wrapped: LoadSource<TOriginal>, private converter?: (original: TOriginal) => TData) {
    }

    convert(original: TOriginal): TData {
        if (!this.converter)
            throw new Error('Not implemented');
        return this.converter(original);
    }

    async readAsync(onData: () => any): Promise<TData> {
        this.data = this.convert(await this.wrapped.readAsync(onData));
        return this.data;
    }

    data: TData;

    dispose(): void {
        return this.wrapped.dispose();
    }
}
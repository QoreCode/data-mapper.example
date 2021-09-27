export abstract class Collection<Interface, Model> {
    protected entities: Model[] = [];

    public setEntity(entity: Interface): void {
        this.entities.push(this.createModel(entity));
    }

    public setEntities(entities: Interface[]): void {
        this.entities = entities.map((entity: Interface) => this.createModel(entity));
    }

    public isEmpty(): boolean {
        return this.entities.length === 0;
    }

    public getEntities(): Model[] {
        return this.entities;
    }

    protected abstract createModel(data: Interface): Model;
}

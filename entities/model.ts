export abstract class Model {
    public abstract getId(): number | null;

    public abstract isNew(): boolean;

    public abstract toJson(): object;
}

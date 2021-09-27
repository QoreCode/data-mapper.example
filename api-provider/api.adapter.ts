import { Model } from '../entities/model';

export enum ApiEntities {
    message = 'message',
}

export class ApiAdapter<Interface, CModel extends Model> {
    private readonly entity: string;

    public constructor(entity: string) {
        this.entity = entity;
    }

    public getAll(criteria?: RequestCriteria): Promise<Interface[]> {
        return new Promise((resolve, reject) => {
            const props = criteria ? criteria.getProps() : {};
            const transaction = new Transaction({
                body: props,
                url: this.entity,
                method: REQUEST_METHOD.GET_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }

    public async create(model: CModel): Promise<Interface> {
        return new Promise((resolve, reject) => {
            const transaction = new Transaction({
                body: model.toJson(),
                url: this.entity,
                method: REQUEST_METHOD.POST_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }

    public async update(model: CModel): Promise<Interface> {
        return new Promise((resolve, reject) => {
            if (model.isNew()) {
                reject(`Can't update new model`);
            }

            const transaction = new Transaction({
                body: model.toJson(),
                url: `${this.entity}/${model.getId()}`,
                method: REQUEST_METHOD.PUT_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }

    public async deleteById(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = new Transaction({
                body: null,
                url: `${this.entity}/${id}`,
                method: REQUEST_METHOD.DELETE_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }

    public async deleteByAttributes(criteria: RequestCriteria): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = new Transaction({
                body: criteria.getProps(),
                url: this.entity,
                method: REQUEST_METHOD.DELETE_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }

    public async findById(id: number): Promise<Interface> {
        return new Promise((resolve, reject) => {
            const transaction = new Transaction({
                body: null,
                url: `${this.entity}/${id}`,
                method: REQUEST_METHOD.GET_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }

    public async findByAttributes(criteria: RequestCriteria): Promise<Interface[]> {
        return new Promise((resolve, reject) => {
            const transaction = new Transaction({
                body: criteria.getProps(),
                url: `${this.entity}`,
                method: REQUEST_METHOD.GET_METHOD,
                onError: (error: Error) => {
                    reject(error);
                },
                onSuccess: (response) => {
                    resolve(response);
                }
            });

            TransactionQueueProcessor.getInstance().execute(transaction);
        });
    }
}

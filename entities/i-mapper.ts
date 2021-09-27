import { Collection } from './collection';
import { Model } from './model';

export interface IMapper<Interface, CModel extends Model> {
    getAll(criteria?: RequestCriteria): Promise<Collection<Interface, CModel>>;

    create(model: CModel): Promise<CModel>;

    update(model: CModel): Promise<CModel>;

    deleteById(id: number): Promise<void>;

    deleteByAttributes(criteria: RequestCriteria): Promise<void>;

    findById(id: number): Promise<CModel>;

    findByAttributes(criteria: RequestCriteria): Promise<Collection<Interface, CModel>>;
}

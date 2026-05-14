import type { ParsedDataset } from '@/core/types/dataset';
import type { StatResult } from '@/core/types/stat-result';

export type ParamFieldType = 'text' | 'number';

export interface ParamField {
  name: string;
  type: ParamFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
}

export interface ParamsSchema {
  fields: ParamField[];
}

export interface StatModule<TParams = void> {
  id: string;
  label: string;
  description?: string;
  needsParams: boolean;
  paramsSchema?: ParamsSchema;
  compute(dataset: ParsedDataset, params: TParams): StatResult;
}

export type AnyStatModule = StatModule<any>;

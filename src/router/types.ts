import { RouteRecordRaw } from 'vue-router';
import { defineComponent } from 'vue';

export enum RoleEnum {
  ADMIN = 'admin',
  ROOT = 'root',
  COMMON = 'common',
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteMeta {
  title: string;
  // 自定义属性
  ignoreAuth?: boolean;
  roles?: RoleEnum[];
  ignoreKeepAlive?: boolean;
  affix?: boolean;
  icon?: string;
  single?: boolean;
  currentActiveMenu?: string;
  hideTab?: boolean;
  hideMenu?: boolean;
  isLink?: boolean;
}
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  fullPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;

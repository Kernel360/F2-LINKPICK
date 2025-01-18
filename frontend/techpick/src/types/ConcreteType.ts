export type ConcreteType<Type> = {
  [Property in keyof Type]-?: Type[Property];
};


/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Assessment
 * 
 */
export type Assessment = $Result.DefaultSelection<Prisma.$AssessmentPayload>
/**
 * Model AssessmentImage
 * 
 */
export type AssessmentImage = $Result.DefaultSelection<Prisma.$AssessmentImagePayload>
/**
 * Model VehicleMake
 * 
 */
export type VehicleMake = $Result.DefaultSelection<Prisma.$VehicleMakePayload>
/**
 * Model VehicleModel
 * 
 */
export type VehicleModel = $Result.DefaultSelection<Prisma.$VehicleModelPayload>
/**
 * Model VehicleVariant
 * 
 */
export type VehicleVariant = $Result.DefaultSelection<Prisma.$VehicleVariantPayload>
/**
 * Model VehiclePart
 * 
 */
export type VehiclePart = $Result.DefaultSelection<Prisma.$VehiclePartPayload>
/**
 * Model AssessmentDamagedPart
 * 
 */
export type AssessmentDamagedPart = $Result.DefaultSelection<Prisma.$AssessmentDamagedPartPayload>
/**
 * Model AssessmentReplacementPart
 * 
 */
export type AssessmentReplacementPart = $Result.DefaultSelection<Prisma.$AssessmentReplacementPartPayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model SupplierPartPrice
 * 
 */
export type SupplierPartPrice = $Result.DefaultSelection<Prisma.$SupplierPartPricePayload>
/**
 * Model PartPrice
 * 
 */
export type PartPrice = $Result.DefaultSelection<Prisma.$PartPricePayload>
/**
 * Model InspectionItem
 * 
 */
export type InspectionItem = $Result.DefaultSelection<Prisma.$InspectionItemPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessment`: Exposes CRUD operations for the **Assessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessments
    * const assessments = await prisma.assessment.findMany()
    * ```
    */
  get assessment(): Prisma.AssessmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentImage`: Exposes CRUD operations for the **AssessmentImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentImages
    * const assessmentImages = await prisma.assessmentImage.findMany()
    * ```
    */
  get assessmentImage(): Prisma.AssessmentImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleMake`: Exposes CRUD operations for the **VehicleMake** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleMakes
    * const vehicleMakes = await prisma.vehicleMake.findMany()
    * ```
    */
  get vehicleMake(): Prisma.VehicleMakeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleModel`: Exposes CRUD operations for the **VehicleModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleModels
    * const vehicleModels = await prisma.vehicleModel.findMany()
    * ```
    */
  get vehicleModel(): Prisma.VehicleModelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleVariant`: Exposes CRUD operations for the **VehicleVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleVariants
    * const vehicleVariants = await prisma.vehicleVariant.findMany()
    * ```
    */
  get vehicleVariant(): Prisma.VehicleVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehiclePart`: Exposes CRUD operations for the **VehiclePart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleParts
    * const vehicleParts = await prisma.vehiclePart.findMany()
    * ```
    */
  get vehiclePart(): Prisma.VehiclePartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentDamagedPart`: Exposes CRUD operations for the **AssessmentDamagedPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentDamagedParts
    * const assessmentDamagedParts = await prisma.assessmentDamagedPart.findMany()
    * ```
    */
  get assessmentDamagedPart(): Prisma.AssessmentDamagedPartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentReplacementPart`: Exposes CRUD operations for the **AssessmentReplacementPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentReplacementParts
    * const assessmentReplacementParts = await prisma.assessmentReplacementPart.findMany()
    * ```
    */
  get assessmentReplacementPart(): Prisma.AssessmentReplacementPartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplierPartPrice`: Exposes CRUD operations for the **SupplierPartPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupplierPartPrices
    * const supplierPartPrices = await prisma.supplierPartPrice.findMany()
    * ```
    */
  get supplierPartPrice(): Prisma.SupplierPartPriceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partPrice`: Exposes CRUD operations for the **PartPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PartPrices
    * const partPrices = await prisma.partPrice.findMany()
    * ```
    */
  get partPrice(): Prisma.PartPriceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inspectionItem`: Exposes CRUD operations for the **InspectionItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InspectionItems
    * const inspectionItems = await prisma.inspectionItem.findMany()
    * ```
    */
  get inspectionItem(): Prisma.InspectionItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Assessment: 'Assessment',
    AssessmentImage: 'AssessmentImage',
    VehicleMake: 'VehicleMake',
    VehicleModel: 'VehicleModel',
    VehicleVariant: 'VehicleVariant',
    VehiclePart: 'VehiclePart',
    AssessmentDamagedPart: 'AssessmentDamagedPart',
    AssessmentReplacementPart: 'AssessmentReplacementPart',
    Supplier: 'Supplier',
    SupplierPartPrice: 'SupplierPartPrice',
    PartPrice: 'PartPrice',
    InspectionItem: 'InspectionItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "assessment" | "assessmentImage" | "vehicleMake" | "vehicleModel" | "vehicleVariant" | "vehiclePart" | "assessmentDamagedPart" | "assessmentReplacementPart" | "supplier" | "supplierPartPrice" | "partPrice" | "inspectionItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Assessment: {
        payload: Prisma.$AssessmentPayload<ExtArgs>
        fields: Prisma.AssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findMany: {
            args: Prisma.AssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          create: {
            args: Prisma.AssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          createMany: {
            args: Prisma.AssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          update: {
            args: Prisma.AssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessment>
          }
          groupBy: {
            args: Prisma.AssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentCountAggregateOutputType> | number
          }
        }
      }
      AssessmentImage: {
        payload: Prisma.$AssessmentImagePayload<ExtArgs>
        fields: Prisma.AssessmentImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>
          }
          findFirst: {
            args: Prisma.AssessmentImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>
          }
          findMany: {
            args: Prisma.AssessmentImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>[]
          }
          create: {
            args: Prisma.AssessmentImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>
          }
          createMany: {
            args: Prisma.AssessmentImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssessmentImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>
          }
          update: {
            args: Prisma.AssessmentImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>
          }
          deleteMany: {
            args: Prisma.AssessmentImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentImagePayload>
          }
          aggregate: {
            args: Prisma.AssessmentImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentImage>
          }
          groupBy: {
            args: Prisma.AssessmentImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentImageCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentImageCountAggregateOutputType> | number
          }
        }
      }
      VehicleMake: {
        payload: Prisma.$VehicleMakePayload<ExtArgs>
        fields: Prisma.VehicleMakeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleMakeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleMakeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>
          }
          findFirst: {
            args: Prisma.VehicleMakeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleMakeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>
          }
          findMany: {
            args: Prisma.VehicleMakeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>[]
          }
          create: {
            args: Prisma.VehicleMakeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>
          }
          createMany: {
            args: Prisma.VehicleMakeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VehicleMakeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>
          }
          update: {
            args: Prisma.VehicleMakeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>
          }
          deleteMany: {
            args: Prisma.VehicleMakeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleMakeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleMakeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleMakePayload>
          }
          aggregate: {
            args: Prisma.VehicleMakeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleMake>
          }
          groupBy: {
            args: Prisma.VehicleMakeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleMakeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleMakeCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleMakeCountAggregateOutputType> | number
          }
        }
      }
      VehicleModel: {
        payload: Prisma.$VehicleModelPayload<ExtArgs>
        fields: Prisma.VehicleModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>
          }
          findFirst: {
            args: Prisma.VehicleModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>
          }
          findMany: {
            args: Prisma.VehicleModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>[]
          }
          create: {
            args: Prisma.VehicleModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>
          }
          createMany: {
            args: Prisma.VehicleModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VehicleModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>
          }
          update: {
            args: Prisma.VehicleModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>
          }
          deleteMany: {
            args: Prisma.VehicleModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleModelPayload>
          }
          aggregate: {
            args: Prisma.VehicleModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleModel>
          }
          groupBy: {
            args: Prisma.VehicleModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleModelCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleModelCountAggregateOutputType> | number
          }
        }
      }
      VehicleVariant: {
        payload: Prisma.$VehicleVariantPayload<ExtArgs>
        fields: Prisma.VehicleVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>
          }
          findFirst: {
            args: Prisma.VehicleVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>
          }
          findMany: {
            args: Prisma.VehicleVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>[]
          }
          create: {
            args: Prisma.VehicleVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>
          }
          createMany: {
            args: Prisma.VehicleVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VehicleVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>
          }
          update: {
            args: Prisma.VehicleVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>
          }
          deleteMany: {
            args: Prisma.VehicleVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleVariantPayload>
          }
          aggregate: {
            args: Prisma.VehicleVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleVariant>
          }
          groupBy: {
            args: Prisma.VehicleVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleVariantCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleVariantCountAggregateOutputType> | number
          }
        }
      }
      VehiclePart: {
        payload: Prisma.$VehiclePartPayload<ExtArgs>
        fields: Prisma.VehiclePartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehiclePartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehiclePartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>
          }
          findFirst: {
            args: Prisma.VehiclePartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehiclePartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>
          }
          findMany: {
            args: Prisma.VehiclePartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>[]
          }
          create: {
            args: Prisma.VehiclePartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>
          }
          createMany: {
            args: Prisma.VehiclePartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VehiclePartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>
          }
          update: {
            args: Prisma.VehiclePartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>
          }
          deleteMany: {
            args: Prisma.VehiclePartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehiclePartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehiclePartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePartPayload>
          }
          aggregate: {
            args: Prisma.VehiclePartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehiclePart>
          }
          groupBy: {
            args: Prisma.VehiclePartGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehiclePartGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehiclePartCountArgs<ExtArgs>
            result: $Utils.Optional<VehiclePartCountAggregateOutputType> | number
          }
        }
      }
      AssessmentDamagedPart: {
        payload: Prisma.$AssessmentDamagedPartPayload<ExtArgs>
        fields: Prisma.AssessmentDamagedPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentDamagedPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentDamagedPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>
          }
          findFirst: {
            args: Prisma.AssessmentDamagedPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentDamagedPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>
          }
          findMany: {
            args: Prisma.AssessmentDamagedPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>[]
          }
          create: {
            args: Prisma.AssessmentDamagedPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>
          }
          createMany: {
            args: Prisma.AssessmentDamagedPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssessmentDamagedPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>
          }
          update: {
            args: Prisma.AssessmentDamagedPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDamagedPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentDamagedPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentDamagedPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentDamagedPartPayload>
          }
          aggregate: {
            args: Prisma.AssessmentDamagedPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentDamagedPart>
          }
          groupBy: {
            args: Prisma.AssessmentDamagedPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentDamagedPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentDamagedPartCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentDamagedPartCountAggregateOutputType> | number
          }
        }
      }
      AssessmentReplacementPart: {
        payload: Prisma.$AssessmentReplacementPartPayload<ExtArgs>
        fields: Prisma.AssessmentReplacementPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentReplacementPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentReplacementPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>
          }
          findFirst: {
            args: Prisma.AssessmentReplacementPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentReplacementPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>
          }
          findMany: {
            args: Prisma.AssessmentReplacementPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>[]
          }
          create: {
            args: Prisma.AssessmentReplacementPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>
          }
          createMany: {
            args: Prisma.AssessmentReplacementPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssessmentReplacementPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>
          }
          update: {
            args: Prisma.AssessmentReplacementPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentReplacementPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentReplacementPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentReplacementPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentReplacementPartPayload>
          }
          aggregate: {
            args: Prisma.AssessmentReplacementPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentReplacementPart>
          }
          groupBy: {
            args: Prisma.AssessmentReplacementPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentReplacementPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentReplacementPartCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentReplacementPartCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      SupplierPartPrice: {
        payload: Prisma.$SupplierPartPricePayload<ExtArgs>
        fields: Prisma.SupplierPartPriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierPartPriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierPartPriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>
          }
          findFirst: {
            args: Prisma.SupplierPartPriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierPartPriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>
          }
          findMany: {
            args: Prisma.SupplierPartPriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>[]
          }
          create: {
            args: Prisma.SupplierPartPriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>
          }
          createMany: {
            args: Prisma.SupplierPartPriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupplierPartPriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>
          }
          update: {
            args: Prisma.SupplierPartPriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>
          }
          deleteMany: {
            args: Prisma.SupplierPartPriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierPartPriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierPartPriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPartPricePayload>
          }
          aggregate: {
            args: Prisma.SupplierPartPriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplierPartPrice>
          }
          groupBy: {
            args: Prisma.SupplierPartPriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierPartPriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierPartPriceCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierPartPriceCountAggregateOutputType> | number
          }
        }
      }
      PartPrice: {
        payload: Prisma.$PartPricePayload<ExtArgs>
        fields: Prisma.PartPriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartPriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartPriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>
          }
          findFirst: {
            args: Prisma.PartPriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartPriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>
          }
          findMany: {
            args: Prisma.PartPriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>[]
          }
          create: {
            args: Prisma.PartPriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>
          }
          createMany: {
            args: Prisma.PartPriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PartPriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>
          }
          update: {
            args: Prisma.PartPriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>
          }
          deleteMany: {
            args: Prisma.PartPriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartPriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartPriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPricePayload>
          }
          aggregate: {
            args: Prisma.PartPriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartPrice>
          }
          groupBy: {
            args: Prisma.PartPriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartPriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartPriceCountArgs<ExtArgs>
            result: $Utils.Optional<PartPriceCountAggregateOutputType> | number
          }
        }
      }
      InspectionItem: {
        payload: Prisma.$InspectionItemPayload<ExtArgs>
        fields: Prisma.InspectionItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InspectionItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InspectionItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>
          }
          findFirst: {
            args: Prisma.InspectionItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InspectionItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>
          }
          findMany: {
            args: Prisma.InspectionItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>[]
          }
          create: {
            args: Prisma.InspectionItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>
          }
          createMany: {
            args: Prisma.InspectionItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InspectionItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>
          }
          update: {
            args: Prisma.InspectionItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>
          }
          deleteMany: {
            args: Prisma.InspectionItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InspectionItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InspectionItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspectionItemPayload>
          }
          aggregate: {
            args: Prisma.InspectionItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInspectionItem>
          }
          groupBy: {
            args: Prisma.InspectionItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<InspectionItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.InspectionItemCountArgs<ExtArgs>
            result: $Utils.Optional<InspectionItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    assessment?: AssessmentOmit
    assessmentImage?: AssessmentImageOmit
    vehicleMake?: VehicleMakeOmit
    vehicleModel?: VehicleModelOmit
    vehicleVariant?: VehicleVariantOmit
    vehiclePart?: VehiclePartOmit
    assessmentDamagedPart?: AssessmentDamagedPartOmit
    assessmentReplacementPart?: AssessmentReplacementPartOmit
    supplier?: SupplierOmit
    supplierPartPrice?: SupplierPartPriceOmit
    partPrice?: PartPriceOmit
    inspectionItem?: InspectionItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    assessments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessments?: boolean | UserCountOutputTypeCountAssessmentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
  }


  /**
   * Count Type AssessmentCountOutputType
   */

  export type AssessmentCountOutputType = {
    images: number
    damagedParts: number
    replacementParts: number
    inspectionItems: number
  }

  export type AssessmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | AssessmentCountOutputTypeCountImagesArgs
    damagedParts?: boolean | AssessmentCountOutputTypeCountDamagedPartsArgs
    replacementParts?: boolean | AssessmentCountOutputTypeCountReplacementPartsArgs
    inspectionItems?: boolean | AssessmentCountOutputTypeCountInspectionItemsArgs
  }

  // Custom InputTypes
  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentCountOutputType
     */
    select?: AssessmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentImageWhereInput
  }

  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeCountDamagedPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentDamagedPartWhereInput
  }

  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeCountReplacementPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentReplacementPartWhereInput
  }

  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeCountInspectionItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InspectionItemWhereInput
  }


  /**
   * Count Type VehicleMakeCountOutputType
   */

  export type VehicleMakeCountOutputType = {
    models: number
  }

  export type VehicleMakeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | VehicleMakeCountOutputTypeCountModelsArgs
  }

  // Custom InputTypes
  /**
   * VehicleMakeCountOutputType without action
   */
  export type VehicleMakeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMakeCountOutputType
     */
    select?: VehicleMakeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleMakeCountOutputType without action
   */
  export type VehicleMakeCountOutputTypeCountModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleModelWhereInput
  }


  /**
   * Count Type VehicleModelCountOutputType
   */

  export type VehicleModelCountOutputType = {
    variants: number
  }

  export type VehicleModelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | VehicleModelCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * VehicleModelCountOutputType without action
   */
  export type VehicleModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModelCountOutputType
     */
    select?: VehicleModelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleModelCountOutputType without action
   */
  export type VehicleModelCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleVariantWhereInput
  }


  /**
   * Count Type VehicleVariantCountOutputType
   */

  export type VehicleVariantCountOutputType = {
    parts: number
  }

  export type VehicleVariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | VehicleVariantCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * VehicleVariantCountOutputType without action
   */
  export type VehicleVariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariantCountOutputType
     */
    select?: VehicleVariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleVariantCountOutputType without action
   */
  export type VehicleVariantCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehiclePartWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    prices: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prices?: boolean | SupplierCountOutputTypeCountPricesArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierPartPriceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessments?: boolean | User$assessmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessments?: boolean | User$assessmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      assessments: Prisma.$AssessmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessments<T extends User$assessmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$assessmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.assessments
   */
  export type User$assessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    cursor?: AssessmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Assessment
   */

  export type AggregateAssessment = {
    _count: AssessmentCountAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  export type AssessmentMinAggregateOutputType = {
    id: string | null
    assessmentNumber: string | null
    status: string | null
    customerName: string | null
    customerPhone: string | null
    customerEmail: string | null
    insuranceCompany: string | null
    claimNumber: string | null
    registrationNumber: string | null
    vin: string | null
    odometer: string | null
    vehicleNotes: string | null
    aiRawResponse: string | null
    verifiedVehicleJson: string | null
    verifiedDamageJson: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentMaxAggregateOutputType = {
    id: string | null
    assessmentNumber: string | null
    status: string | null
    customerName: string | null
    customerPhone: string | null
    customerEmail: string | null
    insuranceCompany: string | null
    claimNumber: string | null
    registrationNumber: string | null
    vin: string | null
    odometer: string | null
    vehicleNotes: string | null
    aiRawResponse: string | null
    verifiedVehicleJson: string | null
    verifiedDamageJson: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentCountAggregateOutputType = {
    id: number
    assessmentNumber: number
    status: number
    customerName: number
    customerPhone: number
    customerEmail: number
    insuranceCompany: number
    claimNumber: number
    registrationNumber: number
    vin: number
    odometer: number
    vehicleNotes: number
    aiRawResponse: number
    verifiedVehicleJson: number
    verifiedDamageJson: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentMinAggregateInputType = {
    id?: true
    assessmentNumber?: true
    status?: true
    customerName?: true
    customerPhone?: true
    customerEmail?: true
    insuranceCompany?: true
    claimNumber?: true
    registrationNumber?: true
    vin?: true
    odometer?: true
    vehicleNotes?: true
    aiRawResponse?: true
    verifiedVehicleJson?: true
    verifiedDamageJson?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentMaxAggregateInputType = {
    id?: true
    assessmentNumber?: true
    status?: true
    customerName?: true
    customerPhone?: true
    customerEmail?: true
    insuranceCompany?: true
    claimNumber?: true
    registrationNumber?: true
    vin?: true
    odometer?: true
    vehicleNotes?: true
    aiRawResponse?: true
    verifiedVehicleJson?: true
    verifiedDamageJson?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentCountAggregateInputType = {
    id?: true
    assessmentNumber?: true
    status?: true
    customerName?: true
    customerPhone?: true
    customerEmail?: true
    insuranceCompany?: true
    claimNumber?: true
    registrationNumber?: true
    vin?: true
    odometer?: true
    vehicleNotes?: true
    aiRawResponse?: true
    verifiedVehicleJson?: true
    verifiedDamageJson?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessment to aggregate.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessments
    **/
    _count?: true | AssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentMaxAggregateInputType
  }

  export type GetAssessmentAggregateType<T extends AssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessment[P]>
      : GetScalarType<T[P], AggregateAssessment[P]>
  }




  export type AssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithAggregationInput | AssessmentOrderByWithAggregationInput[]
    by: AssessmentScalarFieldEnum[] | AssessmentScalarFieldEnum
    having?: AssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentCountAggregateInputType | true
    _min?: AssessmentMinAggregateInputType
    _max?: AssessmentMaxAggregateInputType
  }

  export type AssessmentGroupByOutputType = {
    id: string
    assessmentNumber: string
    status: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber: string | null
    vin: string | null
    odometer: string | null
    vehicleNotes: string | null
    aiRawResponse: string | null
    verifiedVehicleJson: string | null
    verifiedDamageJson: string | null
    userId: string | null
    createdAt: Date
    updatedAt: Date
    _count: AssessmentCountAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  type GetAssessmentGroupByPayload<T extends AssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentNumber?: boolean
    status?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerEmail?: boolean
    insuranceCompany?: boolean
    claimNumber?: boolean
    registrationNumber?: boolean
    vin?: boolean
    odometer?: boolean
    vehicleNotes?: boolean
    aiRawResponse?: boolean
    verifiedVehicleJson?: boolean
    verifiedDamageJson?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Assessment$userArgs<ExtArgs>
    images?: boolean | Assessment$imagesArgs<ExtArgs>
    damagedParts?: boolean | Assessment$damagedPartsArgs<ExtArgs>
    replacementParts?: boolean | Assessment$replacementPartsArgs<ExtArgs>
    inspectionItems?: boolean | Assessment$inspectionItemsArgs<ExtArgs>
    _count?: boolean | AssessmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>



  export type AssessmentSelectScalar = {
    id?: boolean
    assessmentNumber?: boolean
    status?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerEmail?: boolean
    insuranceCompany?: boolean
    claimNumber?: boolean
    registrationNumber?: boolean
    vin?: boolean
    odometer?: boolean
    vehicleNotes?: boolean
    aiRawResponse?: boolean
    verifiedVehicleJson?: boolean
    verifiedDamageJson?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assessmentNumber" | "status" | "customerName" | "customerPhone" | "customerEmail" | "insuranceCompany" | "claimNumber" | "registrationNumber" | "vin" | "odometer" | "vehicleNotes" | "aiRawResponse" | "verifiedVehicleJson" | "verifiedDamageJson" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["assessment"]>
  export type AssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Assessment$userArgs<ExtArgs>
    images?: boolean | Assessment$imagesArgs<ExtArgs>
    damagedParts?: boolean | Assessment$damagedPartsArgs<ExtArgs>
    replacementParts?: boolean | Assessment$replacementPartsArgs<ExtArgs>
    inspectionItems?: boolean | Assessment$inspectionItemsArgs<ExtArgs>
    _count?: boolean | AssessmentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      images: Prisma.$AssessmentImagePayload<ExtArgs>[]
      damagedParts: Prisma.$AssessmentDamagedPartPayload<ExtArgs>[]
      replacementParts: Prisma.$AssessmentReplacementPartPayload<ExtArgs>[]
      inspectionItems: Prisma.$InspectionItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assessmentNumber: string
      status: string
      customerName: string
      customerPhone: string
      customerEmail: string
      insuranceCompany: string
      claimNumber: string
      registrationNumber: string | null
      vin: string | null
      odometer: string | null
      vehicleNotes: string | null
      aiRawResponse: string | null
      verifiedVehicleJson: string | null
      verifiedDamageJson: string | null
      userId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessment"]>
    composites: {}
  }

  type AssessmentGetPayload<S extends boolean | null | undefined | AssessmentDefaultArgs> = $Result.GetResult<Prisma.$AssessmentPayload, S>

  type AssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentCountAggregateInputType | true
    }

  export interface AssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessment'], meta: { name: 'Assessment' } }
    /**
     * Find zero or one Assessment that matches the filter.
     * @param {AssessmentFindUniqueArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFindUniqueArgs>(args: SelectSubset<T, AssessmentFindUniqueArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFindUniqueOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFindFirstArgs>(args?: SelectSubset<T, AssessmentFindFirstArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessments
     * const assessments = await prisma.assessment.findMany()
     * 
     * // Get first 10 Assessments
     * const assessments = await prisma.assessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentWithIdOnly = await prisma.assessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFindManyArgs>(args?: SelectSubset<T, AssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assessment.
     * @param {AssessmentCreateArgs} args - Arguments to create a Assessment.
     * @example
     * // Create one Assessment
     * const Assessment = await prisma.assessment.create({
     *   data: {
     *     // ... data to create a Assessment
     *   }
     * })
     * 
     */
    create<T extends AssessmentCreateArgs>(args: SelectSubset<T, AssessmentCreateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assessments.
     * @param {AssessmentCreateManyArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentCreateManyArgs>(args?: SelectSubset<T, AssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Assessment.
     * @param {AssessmentDeleteArgs} args - Arguments to delete one Assessment.
     * @example
     * // Delete one Assessment
     * const Assessment = await prisma.assessment.delete({
     *   where: {
     *     // ... filter to delete one Assessment
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDeleteArgs>(args: SelectSubset<T, AssessmentDeleteArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assessment.
     * @param {AssessmentUpdateArgs} args - Arguments to update one Assessment.
     * @example
     * // Update one Assessment
     * const assessment = await prisma.assessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentUpdateArgs>(args: SelectSubset<T, AssessmentUpdateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assessments.
     * @param {AssessmentDeleteManyArgs} args - Arguments to filter Assessments to delete.
     * @example
     * // Delete a few Assessments
     * const { count } = await prisma.assessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDeleteManyArgs>(args?: SelectSubset<T, AssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentUpdateManyArgs>(args: SelectSubset<T, AssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assessment.
     * @param {AssessmentUpsertArgs} args - Arguments to update or create a Assessment.
     * @example
     * // Update or create a Assessment
     * const assessment = await prisma.assessment.upsert({
     *   create: {
     *     // ... data to create a Assessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessment we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentUpsertArgs>(args: SelectSubset<T, AssessmentUpsertArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentCountArgs} args - Arguments to filter Assessments to count.
     * @example
     * // Count the number of Assessments
     * const count = await prisma.assessment.count({
     *   where: {
     *     // ... the filter for the Assessments we want to count
     *   }
     * })
    **/
    count<T extends AssessmentCountArgs>(
      args?: Subset<T, AssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentAggregateArgs>(args: Subset<T, AssessmentAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAggregateType<T>>

    /**
     * Group by Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessment model
   */
  readonly fields: AssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Assessment$userArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    images<T extends Assessment$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    damagedParts<T extends Assessment$damagedPartsArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$damagedPartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    replacementParts<T extends Assessment$replacementPartsArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$replacementPartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inspectionItems<T extends Assessment$inspectionItemsArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$inspectionItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assessment model
   */
  interface AssessmentFieldRefs {
    readonly id: FieldRef<"Assessment", 'String'>
    readonly assessmentNumber: FieldRef<"Assessment", 'String'>
    readonly status: FieldRef<"Assessment", 'String'>
    readonly customerName: FieldRef<"Assessment", 'String'>
    readonly customerPhone: FieldRef<"Assessment", 'String'>
    readonly customerEmail: FieldRef<"Assessment", 'String'>
    readonly insuranceCompany: FieldRef<"Assessment", 'String'>
    readonly claimNumber: FieldRef<"Assessment", 'String'>
    readonly registrationNumber: FieldRef<"Assessment", 'String'>
    readonly vin: FieldRef<"Assessment", 'String'>
    readonly odometer: FieldRef<"Assessment", 'String'>
    readonly vehicleNotes: FieldRef<"Assessment", 'String'>
    readonly aiRawResponse: FieldRef<"Assessment", 'String'>
    readonly verifiedVehicleJson: FieldRef<"Assessment", 'String'>
    readonly verifiedDamageJson: FieldRef<"Assessment", 'String'>
    readonly userId: FieldRef<"Assessment", 'String'>
    readonly createdAt: FieldRef<"Assessment", 'DateTime'>
    readonly updatedAt: FieldRef<"Assessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assessment findUnique
   */
  export type AssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findUniqueOrThrow
   */
  export type AssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findFirst
   */
  export type AssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findFirstOrThrow
   */
  export type AssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findMany
   */
  export type AssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessments to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment create
   */
  export type AssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assessment.
     */
    data: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
  }

  /**
   * Assessment createMany
   */
  export type AssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assessment update
   */
  export type AssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assessment.
     */
    data: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
    /**
     * Choose, which Assessment to update.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment updateMany
   */
  export type AssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
  }

  /**
   * Assessment upsert
   */
  export type AssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assessment to update in case it exists.
     */
    where: AssessmentWhereUniqueInput
    /**
     * In case the Assessment found by the `where` argument doesn't exist, create a new Assessment with this data.
     */
    create: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
    /**
     * In case the Assessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
  }

  /**
   * Assessment delete
   */
  export type AssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter which Assessment to delete.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment deleteMany
   */
  export type AssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessments to delete
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to delete.
     */
    limit?: number
  }

  /**
   * Assessment.user
   */
  export type Assessment$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Assessment.images
   */
  export type Assessment$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    where?: AssessmentImageWhereInput
    orderBy?: AssessmentImageOrderByWithRelationInput | AssessmentImageOrderByWithRelationInput[]
    cursor?: AssessmentImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentImageScalarFieldEnum | AssessmentImageScalarFieldEnum[]
  }

  /**
   * Assessment.damagedParts
   */
  export type Assessment$damagedPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    where?: AssessmentDamagedPartWhereInput
    orderBy?: AssessmentDamagedPartOrderByWithRelationInput | AssessmentDamagedPartOrderByWithRelationInput[]
    cursor?: AssessmentDamagedPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentDamagedPartScalarFieldEnum | AssessmentDamagedPartScalarFieldEnum[]
  }

  /**
   * Assessment.replacementParts
   */
  export type Assessment$replacementPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    where?: AssessmentReplacementPartWhereInput
    orderBy?: AssessmentReplacementPartOrderByWithRelationInput | AssessmentReplacementPartOrderByWithRelationInput[]
    cursor?: AssessmentReplacementPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentReplacementPartScalarFieldEnum | AssessmentReplacementPartScalarFieldEnum[]
  }

  /**
   * Assessment.inspectionItems
   */
  export type Assessment$inspectionItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    where?: InspectionItemWhereInput
    orderBy?: InspectionItemOrderByWithRelationInput | InspectionItemOrderByWithRelationInput[]
    cursor?: InspectionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InspectionItemScalarFieldEnum | InspectionItemScalarFieldEnum[]
  }

  /**
   * Assessment without action
   */
  export type AssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentImage
   */

  export type AggregateAssessmentImage = {
    _count: AssessmentImageCountAggregateOutputType | null
    _avg: AssessmentImageAvgAggregateOutputType | null
    _sum: AssessmentImageSumAggregateOutputType | null
    _min: AssessmentImageMinAggregateOutputType | null
    _max: AssessmentImageMaxAggregateOutputType | null
  }

  export type AssessmentImageAvgAggregateOutputType = {
    size: number | null
    sortOrder: number | null
  }

  export type AssessmentImageSumAggregateOutputType = {
    size: number | null
    sortOrder: number | null
  }

  export type AssessmentImageMinAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    path: string | null
    mimeType: string | null
    size: number | null
    sortOrder: number | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type AssessmentImageMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    originalName: string | null
    path: string | null
    mimeType: string | null
    size: number | null
    sortOrder: number | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type AssessmentImageCountAggregateOutputType = {
    id: number
    filename: number
    originalName: number
    path: number
    mimeType: number
    size: number
    sortOrder: number
    assessmentId: number
    createdAt: number
    _all: number
  }


  export type AssessmentImageAvgAggregateInputType = {
    size?: true
    sortOrder?: true
  }

  export type AssessmentImageSumAggregateInputType = {
    size?: true
    sortOrder?: true
  }

  export type AssessmentImageMinAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    path?: true
    mimeType?: true
    size?: true
    sortOrder?: true
    assessmentId?: true
    createdAt?: true
  }

  export type AssessmentImageMaxAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    path?: true
    mimeType?: true
    size?: true
    sortOrder?: true
    assessmentId?: true
    createdAt?: true
  }

  export type AssessmentImageCountAggregateInputType = {
    id?: true
    filename?: true
    originalName?: true
    path?: true
    mimeType?: true
    size?: true
    sortOrder?: true
    assessmentId?: true
    createdAt?: true
    _all?: true
  }

  export type AssessmentImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentImage to aggregate.
     */
    where?: AssessmentImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentImages to fetch.
     */
    orderBy?: AssessmentImageOrderByWithRelationInput | AssessmentImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentImages
    **/
    _count?: true | AssessmentImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentImageMaxAggregateInputType
  }

  export type GetAssessmentImageAggregateType<T extends AssessmentImageAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentImage[P]>
      : GetScalarType<T[P], AggregateAssessmentImage[P]>
  }




  export type AssessmentImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentImageWhereInput
    orderBy?: AssessmentImageOrderByWithAggregationInput | AssessmentImageOrderByWithAggregationInput[]
    by: AssessmentImageScalarFieldEnum[] | AssessmentImageScalarFieldEnum
    having?: AssessmentImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentImageCountAggregateInputType | true
    _avg?: AssessmentImageAvgAggregateInputType
    _sum?: AssessmentImageSumAggregateInputType
    _min?: AssessmentImageMinAggregateInputType
    _max?: AssessmentImageMaxAggregateInputType
  }

  export type AssessmentImageGroupByOutputType = {
    id: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder: number
    assessmentId: string
    createdAt: Date
    _count: AssessmentImageCountAggregateOutputType | null
    _avg: AssessmentImageAvgAggregateOutputType | null
    _sum: AssessmentImageSumAggregateOutputType | null
    _min: AssessmentImageMinAggregateOutputType | null
    _max: AssessmentImageMaxAggregateOutputType | null
  }

  type GetAssessmentImageGroupByPayload<T extends AssessmentImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentImageGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentImageGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    originalName?: boolean
    path?: boolean
    mimeType?: boolean
    size?: boolean
    sortOrder?: boolean
    assessmentId?: boolean
    createdAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentImage"]>



  export type AssessmentImageSelectScalar = {
    id?: boolean
    filename?: boolean
    originalName?: boolean
    path?: boolean
    mimeType?: boolean
    size?: boolean
    sortOrder?: boolean
    assessmentId?: boolean
    createdAt?: boolean
  }

  export type AssessmentImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "originalName" | "path" | "mimeType" | "size" | "sortOrder" | "assessmentId" | "createdAt", ExtArgs["result"]["assessmentImage"]>
  export type AssessmentImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentImage"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      originalName: string
      path: string
      mimeType: string
      size: number
      sortOrder: number
      assessmentId: string
      createdAt: Date
    }, ExtArgs["result"]["assessmentImage"]>
    composites: {}
  }

  type AssessmentImageGetPayload<S extends boolean | null | undefined | AssessmentImageDefaultArgs> = $Result.GetResult<Prisma.$AssessmentImagePayload, S>

  type AssessmentImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentImageCountAggregateInputType | true
    }

  export interface AssessmentImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentImage'], meta: { name: 'AssessmentImage' } }
    /**
     * Find zero or one AssessmentImage that matches the filter.
     * @param {AssessmentImageFindUniqueArgs} args - Arguments to find a AssessmentImage
     * @example
     * // Get one AssessmentImage
     * const assessmentImage = await prisma.assessmentImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentImageFindUniqueArgs>(args: SelectSubset<T, AssessmentImageFindUniqueArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentImageFindUniqueOrThrowArgs} args - Arguments to find a AssessmentImage
     * @example
     * // Get one AssessmentImage
     * const assessmentImage = await prisma.assessmentImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentImageFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageFindFirstArgs} args - Arguments to find a AssessmentImage
     * @example
     * // Get one AssessmentImage
     * const assessmentImage = await prisma.assessmentImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentImageFindFirstArgs>(args?: SelectSubset<T, AssessmentImageFindFirstArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageFindFirstOrThrowArgs} args - Arguments to find a AssessmentImage
     * @example
     * // Get one AssessmentImage
     * const assessmentImage = await prisma.assessmentImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentImageFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentImages
     * const assessmentImages = await prisma.assessmentImage.findMany()
     * 
     * // Get first 10 AssessmentImages
     * const assessmentImages = await prisma.assessmentImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentImageWithIdOnly = await prisma.assessmentImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentImageFindManyArgs>(args?: SelectSubset<T, AssessmentImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentImage.
     * @param {AssessmentImageCreateArgs} args - Arguments to create a AssessmentImage.
     * @example
     * // Create one AssessmentImage
     * const AssessmentImage = await prisma.assessmentImage.create({
     *   data: {
     *     // ... data to create a AssessmentImage
     *   }
     * })
     * 
     */
    create<T extends AssessmentImageCreateArgs>(args: SelectSubset<T, AssessmentImageCreateArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentImages.
     * @param {AssessmentImageCreateManyArgs} args - Arguments to create many AssessmentImages.
     * @example
     * // Create many AssessmentImages
     * const assessmentImage = await prisma.assessmentImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentImageCreateManyArgs>(args?: SelectSubset<T, AssessmentImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AssessmentImage.
     * @param {AssessmentImageDeleteArgs} args - Arguments to delete one AssessmentImage.
     * @example
     * // Delete one AssessmentImage
     * const AssessmentImage = await prisma.assessmentImage.delete({
     *   where: {
     *     // ... filter to delete one AssessmentImage
     *   }
     * })
     * 
     */
    delete<T extends AssessmentImageDeleteArgs>(args: SelectSubset<T, AssessmentImageDeleteArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentImage.
     * @param {AssessmentImageUpdateArgs} args - Arguments to update one AssessmentImage.
     * @example
     * // Update one AssessmentImage
     * const assessmentImage = await prisma.assessmentImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentImageUpdateArgs>(args: SelectSubset<T, AssessmentImageUpdateArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentImages.
     * @param {AssessmentImageDeleteManyArgs} args - Arguments to filter AssessmentImages to delete.
     * @example
     * // Delete a few AssessmentImages
     * const { count } = await prisma.assessmentImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentImageDeleteManyArgs>(args?: SelectSubset<T, AssessmentImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentImages
     * const assessmentImage = await prisma.assessmentImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentImageUpdateManyArgs>(args: SelectSubset<T, AssessmentImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssessmentImage.
     * @param {AssessmentImageUpsertArgs} args - Arguments to update or create a AssessmentImage.
     * @example
     * // Update or create a AssessmentImage
     * const assessmentImage = await prisma.assessmentImage.upsert({
     *   create: {
     *     // ... data to create a AssessmentImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentImage we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentImageUpsertArgs>(args: SelectSubset<T, AssessmentImageUpsertArgs<ExtArgs>>): Prisma__AssessmentImageClient<$Result.GetResult<Prisma.$AssessmentImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageCountArgs} args - Arguments to filter AssessmentImages to count.
     * @example
     * // Count the number of AssessmentImages
     * const count = await prisma.assessmentImage.count({
     *   where: {
     *     // ... the filter for the AssessmentImages we want to count
     *   }
     * })
    **/
    count<T extends AssessmentImageCountArgs>(
      args?: Subset<T, AssessmentImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentImageAggregateArgs>(args: Subset<T, AssessmentImageAggregateArgs>): Prisma.PrismaPromise<GetAssessmentImageAggregateType<T>>

    /**
     * Group by AssessmentImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentImageGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentImage model
   */
  readonly fields: AssessmentImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentImage model
   */
  interface AssessmentImageFieldRefs {
    readonly id: FieldRef<"AssessmentImage", 'String'>
    readonly filename: FieldRef<"AssessmentImage", 'String'>
    readonly originalName: FieldRef<"AssessmentImage", 'String'>
    readonly path: FieldRef<"AssessmentImage", 'String'>
    readonly mimeType: FieldRef<"AssessmentImage", 'String'>
    readonly size: FieldRef<"AssessmentImage", 'Int'>
    readonly sortOrder: FieldRef<"AssessmentImage", 'Int'>
    readonly assessmentId: FieldRef<"AssessmentImage", 'String'>
    readonly createdAt: FieldRef<"AssessmentImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentImage findUnique
   */
  export type AssessmentImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentImage to fetch.
     */
    where: AssessmentImageWhereUniqueInput
  }

  /**
   * AssessmentImage findUniqueOrThrow
   */
  export type AssessmentImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentImage to fetch.
     */
    where: AssessmentImageWhereUniqueInput
  }

  /**
   * AssessmentImage findFirst
   */
  export type AssessmentImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentImage to fetch.
     */
    where?: AssessmentImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentImages to fetch.
     */
    orderBy?: AssessmentImageOrderByWithRelationInput | AssessmentImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentImages.
     */
    cursor?: AssessmentImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentImages.
     */
    distinct?: AssessmentImageScalarFieldEnum | AssessmentImageScalarFieldEnum[]
  }

  /**
   * AssessmentImage findFirstOrThrow
   */
  export type AssessmentImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentImage to fetch.
     */
    where?: AssessmentImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentImages to fetch.
     */
    orderBy?: AssessmentImageOrderByWithRelationInput | AssessmentImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentImages.
     */
    cursor?: AssessmentImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentImages.
     */
    distinct?: AssessmentImageScalarFieldEnum | AssessmentImageScalarFieldEnum[]
  }

  /**
   * AssessmentImage findMany
   */
  export type AssessmentImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentImages to fetch.
     */
    where?: AssessmentImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentImages to fetch.
     */
    orderBy?: AssessmentImageOrderByWithRelationInput | AssessmentImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentImages.
     */
    cursor?: AssessmentImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentImages.
     */
    distinct?: AssessmentImageScalarFieldEnum | AssessmentImageScalarFieldEnum[]
  }

  /**
   * AssessmentImage create
   */
  export type AssessmentImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentImage.
     */
    data: XOR<AssessmentImageCreateInput, AssessmentImageUncheckedCreateInput>
  }

  /**
   * AssessmentImage createMany
   */
  export type AssessmentImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentImages.
     */
    data: AssessmentImageCreateManyInput | AssessmentImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentImage update
   */
  export type AssessmentImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentImage.
     */
    data: XOR<AssessmentImageUpdateInput, AssessmentImageUncheckedUpdateInput>
    /**
     * Choose, which AssessmentImage to update.
     */
    where: AssessmentImageWhereUniqueInput
  }

  /**
   * AssessmentImage updateMany
   */
  export type AssessmentImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentImages.
     */
    data: XOR<AssessmentImageUpdateManyMutationInput, AssessmentImageUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentImages to update
     */
    where?: AssessmentImageWhereInput
    /**
     * Limit how many AssessmentImages to update.
     */
    limit?: number
  }

  /**
   * AssessmentImage upsert
   */
  export type AssessmentImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentImage to update in case it exists.
     */
    where: AssessmentImageWhereUniqueInput
    /**
     * In case the AssessmentImage found by the `where` argument doesn't exist, create a new AssessmentImage with this data.
     */
    create: XOR<AssessmentImageCreateInput, AssessmentImageUncheckedCreateInput>
    /**
     * In case the AssessmentImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentImageUpdateInput, AssessmentImageUncheckedUpdateInput>
  }

  /**
   * AssessmentImage delete
   */
  export type AssessmentImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
    /**
     * Filter which AssessmentImage to delete.
     */
    where: AssessmentImageWhereUniqueInput
  }

  /**
   * AssessmentImage deleteMany
   */
  export type AssessmentImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentImages to delete
     */
    where?: AssessmentImageWhereInput
    /**
     * Limit how many AssessmentImages to delete.
     */
    limit?: number
  }

  /**
   * AssessmentImage without action
   */
  export type AssessmentImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentImage
     */
    select?: AssessmentImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentImage
     */
    omit?: AssessmentImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentImageInclude<ExtArgs> | null
  }


  /**
   * Model VehicleMake
   */

  export type AggregateVehicleMake = {
    _count: VehicleMakeCountAggregateOutputType | null
    _min: VehicleMakeMinAggregateOutputType | null
    _max: VehicleMakeMaxAggregateOutputType | null
  }

  export type VehicleMakeMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type VehicleMakeMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type VehicleMakeCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type VehicleMakeMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type VehicleMakeMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type VehicleMakeCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type VehicleMakeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleMake to aggregate.
     */
    where?: VehicleMakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleMakes to fetch.
     */
    orderBy?: VehicleMakeOrderByWithRelationInput | VehicleMakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleMakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleMakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleMakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleMakes
    **/
    _count?: true | VehicleMakeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMakeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMakeMaxAggregateInputType
  }

  export type GetVehicleMakeAggregateType<T extends VehicleMakeAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleMake]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleMake[P]>
      : GetScalarType<T[P], AggregateVehicleMake[P]>
  }




  export type VehicleMakeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleMakeWhereInput
    orderBy?: VehicleMakeOrderByWithAggregationInput | VehicleMakeOrderByWithAggregationInput[]
    by: VehicleMakeScalarFieldEnum[] | VehicleMakeScalarFieldEnum
    having?: VehicleMakeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleMakeCountAggregateInputType | true
    _min?: VehicleMakeMinAggregateInputType
    _max?: VehicleMakeMaxAggregateInputType
  }

  export type VehicleMakeGroupByOutputType = {
    id: string
    name: string
    _count: VehicleMakeCountAggregateOutputType | null
    _min: VehicleMakeMinAggregateOutputType | null
    _max: VehicleMakeMaxAggregateOutputType | null
  }

  type GetVehicleMakeGroupByPayload<T extends VehicleMakeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleMakeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleMakeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleMakeGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleMakeGroupByOutputType[P]>
        }
      >
    >


  export type VehicleMakeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    models?: boolean | VehicleMake$modelsArgs<ExtArgs>
    _count?: boolean | VehicleMakeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleMake"]>



  export type VehicleMakeSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type VehicleMakeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["vehicleMake"]>
  export type VehicleMakeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | VehicleMake$modelsArgs<ExtArgs>
    _count?: boolean | VehicleMakeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VehicleMakePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleMake"
    objects: {
      models: Prisma.$VehicleModelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["vehicleMake"]>
    composites: {}
  }

  type VehicleMakeGetPayload<S extends boolean | null | undefined | VehicleMakeDefaultArgs> = $Result.GetResult<Prisma.$VehicleMakePayload, S>

  type VehicleMakeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleMakeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleMakeCountAggregateInputType | true
    }

  export interface VehicleMakeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleMake'], meta: { name: 'VehicleMake' } }
    /**
     * Find zero or one VehicleMake that matches the filter.
     * @param {VehicleMakeFindUniqueArgs} args - Arguments to find a VehicleMake
     * @example
     * // Get one VehicleMake
     * const vehicleMake = await prisma.vehicleMake.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleMakeFindUniqueArgs>(args: SelectSubset<T, VehicleMakeFindUniqueArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleMake that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleMakeFindUniqueOrThrowArgs} args - Arguments to find a VehicleMake
     * @example
     * // Get one VehicleMake
     * const vehicleMake = await prisma.vehicleMake.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleMakeFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleMakeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleMake that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeFindFirstArgs} args - Arguments to find a VehicleMake
     * @example
     * // Get one VehicleMake
     * const vehicleMake = await prisma.vehicleMake.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleMakeFindFirstArgs>(args?: SelectSubset<T, VehicleMakeFindFirstArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleMake that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeFindFirstOrThrowArgs} args - Arguments to find a VehicleMake
     * @example
     * // Get one VehicleMake
     * const vehicleMake = await prisma.vehicleMake.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleMakeFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleMakeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleMakes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleMakes
     * const vehicleMakes = await prisma.vehicleMake.findMany()
     * 
     * // Get first 10 VehicleMakes
     * const vehicleMakes = await prisma.vehicleMake.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleMakeWithIdOnly = await prisma.vehicleMake.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleMakeFindManyArgs>(args?: SelectSubset<T, VehicleMakeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleMake.
     * @param {VehicleMakeCreateArgs} args - Arguments to create a VehicleMake.
     * @example
     * // Create one VehicleMake
     * const VehicleMake = await prisma.vehicleMake.create({
     *   data: {
     *     // ... data to create a VehicleMake
     *   }
     * })
     * 
     */
    create<T extends VehicleMakeCreateArgs>(args: SelectSubset<T, VehicleMakeCreateArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleMakes.
     * @param {VehicleMakeCreateManyArgs} args - Arguments to create many VehicleMakes.
     * @example
     * // Create many VehicleMakes
     * const vehicleMake = await prisma.vehicleMake.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleMakeCreateManyArgs>(args?: SelectSubset<T, VehicleMakeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VehicleMake.
     * @param {VehicleMakeDeleteArgs} args - Arguments to delete one VehicleMake.
     * @example
     * // Delete one VehicleMake
     * const VehicleMake = await prisma.vehicleMake.delete({
     *   where: {
     *     // ... filter to delete one VehicleMake
     *   }
     * })
     * 
     */
    delete<T extends VehicleMakeDeleteArgs>(args: SelectSubset<T, VehicleMakeDeleteArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleMake.
     * @param {VehicleMakeUpdateArgs} args - Arguments to update one VehicleMake.
     * @example
     * // Update one VehicleMake
     * const vehicleMake = await prisma.vehicleMake.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleMakeUpdateArgs>(args: SelectSubset<T, VehicleMakeUpdateArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleMakes.
     * @param {VehicleMakeDeleteManyArgs} args - Arguments to filter VehicleMakes to delete.
     * @example
     * // Delete a few VehicleMakes
     * const { count } = await prisma.vehicleMake.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleMakeDeleteManyArgs>(args?: SelectSubset<T, VehicleMakeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleMakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleMakes
     * const vehicleMake = await prisma.vehicleMake.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleMakeUpdateManyArgs>(args: SelectSubset<T, VehicleMakeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VehicleMake.
     * @param {VehicleMakeUpsertArgs} args - Arguments to update or create a VehicleMake.
     * @example
     * // Update or create a VehicleMake
     * const vehicleMake = await prisma.vehicleMake.upsert({
     *   create: {
     *     // ... data to create a VehicleMake
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleMake we want to update
     *   }
     * })
     */
    upsert<T extends VehicleMakeUpsertArgs>(args: SelectSubset<T, VehicleMakeUpsertArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleMakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeCountArgs} args - Arguments to filter VehicleMakes to count.
     * @example
     * // Count the number of VehicleMakes
     * const count = await prisma.vehicleMake.count({
     *   where: {
     *     // ... the filter for the VehicleMakes we want to count
     *   }
     * })
    **/
    count<T extends VehicleMakeCountArgs>(
      args?: Subset<T, VehicleMakeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleMakeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleMake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleMakeAggregateArgs>(args: Subset<T, VehicleMakeAggregateArgs>): Prisma.PrismaPromise<GetVehicleMakeAggregateType<T>>

    /**
     * Group by VehicleMake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleMakeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleMakeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleMakeGroupByArgs['orderBy'] }
        : { orderBy?: VehicleMakeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleMakeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleMakeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleMake model
   */
  readonly fields: VehicleMakeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleMake.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleMakeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    models<T extends VehicleMake$modelsArgs<ExtArgs> = {}>(args?: Subset<T, VehicleMake$modelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleMake model
   */
  interface VehicleMakeFieldRefs {
    readonly id: FieldRef<"VehicleMake", 'String'>
    readonly name: FieldRef<"VehicleMake", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VehicleMake findUnique
   */
  export type VehicleMakeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * Filter, which VehicleMake to fetch.
     */
    where: VehicleMakeWhereUniqueInput
  }

  /**
   * VehicleMake findUniqueOrThrow
   */
  export type VehicleMakeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * Filter, which VehicleMake to fetch.
     */
    where: VehicleMakeWhereUniqueInput
  }

  /**
   * VehicleMake findFirst
   */
  export type VehicleMakeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * Filter, which VehicleMake to fetch.
     */
    where?: VehicleMakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleMakes to fetch.
     */
    orderBy?: VehicleMakeOrderByWithRelationInput | VehicleMakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleMakes.
     */
    cursor?: VehicleMakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleMakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleMakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleMakes.
     */
    distinct?: VehicleMakeScalarFieldEnum | VehicleMakeScalarFieldEnum[]
  }

  /**
   * VehicleMake findFirstOrThrow
   */
  export type VehicleMakeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * Filter, which VehicleMake to fetch.
     */
    where?: VehicleMakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleMakes to fetch.
     */
    orderBy?: VehicleMakeOrderByWithRelationInput | VehicleMakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleMakes.
     */
    cursor?: VehicleMakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleMakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleMakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleMakes.
     */
    distinct?: VehicleMakeScalarFieldEnum | VehicleMakeScalarFieldEnum[]
  }

  /**
   * VehicleMake findMany
   */
  export type VehicleMakeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * Filter, which VehicleMakes to fetch.
     */
    where?: VehicleMakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleMakes to fetch.
     */
    orderBy?: VehicleMakeOrderByWithRelationInput | VehicleMakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleMakes.
     */
    cursor?: VehicleMakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleMakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleMakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleMakes.
     */
    distinct?: VehicleMakeScalarFieldEnum | VehicleMakeScalarFieldEnum[]
  }

  /**
   * VehicleMake create
   */
  export type VehicleMakeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleMake.
     */
    data: XOR<VehicleMakeCreateInput, VehicleMakeUncheckedCreateInput>
  }

  /**
   * VehicleMake createMany
   */
  export type VehicleMakeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleMakes.
     */
    data: VehicleMakeCreateManyInput | VehicleMakeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleMake update
   */
  export type VehicleMakeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleMake.
     */
    data: XOR<VehicleMakeUpdateInput, VehicleMakeUncheckedUpdateInput>
    /**
     * Choose, which VehicleMake to update.
     */
    where: VehicleMakeWhereUniqueInput
  }

  /**
   * VehicleMake updateMany
   */
  export type VehicleMakeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleMakes.
     */
    data: XOR<VehicleMakeUpdateManyMutationInput, VehicleMakeUncheckedUpdateManyInput>
    /**
     * Filter which VehicleMakes to update
     */
    where?: VehicleMakeWhereInput
    /**
     * Limit how many VehicleMakes to update.
     */
    limit?: number
  }

  /**
   * VehicleMake upsert
   */
  export type VehicleMakeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleMake to update in case it exists.
     */
    where: VehicleMakeWhereUniqueInput
    /**
     * In case the VehicleMake found by the `where` argument doesn't exist, create a new VehicleMake with this data.
     */
    create: XOR<VehicleMakeCreateInput, VehicleMakeUncheckedCreateInput>
    /**
     * In case the VehicleMake was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleMakeUpdateInput, VehicleMakeUncheckedUpdateInput>
  }

  /**
   * VehicleMake delete
   */
  export type VehicleMakeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
    /**
     * Filter which VehicleMake to delete.
     */
    where: VehicleMakeWhereUniqueInput
  }

  /**
   * VehicleMake deleteMany
   */
  export type VehicleMakeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleMakes to delete
     */
    where?: VehicleMakeWhereInput
    /**
     * Limit how many VehicleMakes to delete.
     */
    limit?: number
  }

  /**
   * VehicleMake.models
   */
  export type VehicleMake$modelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    where?: VehicleModelWhereInput
    orderBy?: VehicleModelOrderByWithRelationInput | VehicleModelOrderByWithRelationInput[]
    cursor?: VehicleModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleModelScalarFieldEnum | VehicleModelScalarFieldEnum[]
  }

  /**
   * VehicleMake without action
   */
  export type VehicleMakeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleMake
     */
    select?: VehicleMakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleMake
     */
    omit?: VehicleMakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleMakeInclude<ExtArgs> | null
  }


  /**
   * Model VehicleModel
   */

  export type AggregateVehicleModel = {
    _count: VehicleModelCountAggregateOutputType | null
    _min: VehicleModelMinAggregateOutputType | null
    _max: VehicleModelMaxAggregateOutputType | null
  }

  export type VehicleModelMinAggregateOutputType = {
    id: string | null
    name: string | null
    makeId: string | null
  }

  export type VehicleModelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    makeId: string | null
  }

  export type VehicleModelCountAggregateOutputType = {
    id: number
    name: number
    makeId: number
    _all: number
  }


  export type VehicleModelMinAggregateInputType = {
    id?: true
    name?: true
    makeId?: true
  }

  export type VehicleModelMaxAggregateInputType = {
    id?: true
    name?: true
    makeId?: true
  }

  export type VehicleModelCountAggregateInputType = {
    id?: true
    name?: true
    makeId?: true
    _all?: true
  }

  export type VehicleModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleModel to aggregate.
     */
    where?: VehicleModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleModels to fetch.
     */
    orderBy?: VehicleModelOrderByWithRelationInput | VehicleModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleModels
    **/
    _count?: true | VehicleModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleModelMaxAggregateInputType
  }

  export type GetVehicleModelAggregateType<T extends VehicleModelAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleModel[P]>
      : GetScalarType<T[P], AggregateVehicleModel[P]>
  }




  export type VehicleModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleModelWhereInput
    orderBy?: VehicleModelOrderByWithAggregationInput | VehicleModelOrderByWithAggregationInput[]
    by: VehicleModelScalarFieldEnum[] | VehicleModelScalarFieldEnum
    having?: VehicleModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleModelCountAggregateInputType | true
    _min?: VehicleModelMinAggregateInputType
    _max?: VehicleModelMaxAggregateInputType
  }

  export type VehicleModelGroupByOutputType = {
    id: string
    name: string
    makeId: string
    _count: VehicleModelCountAggregateOutputType | null
    _min: VehicleModelMinAggregateOutputType | null
    _max: VehicleModelMaxAggregateOutputType | null
  }

  type GetVehicleModelGroupByPayload<T extends VehicleModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleModelGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleModelGroupByOutputType[P]>
        }
      >
    >


  export type VehicleModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    makeId?: boolean
    make?: boolean | VehicleMakeDefaultArgs<ExtArgs>
    variants?: boolean | VehicleModel$variantsArgs<ExtArgs>
    _count?: boolean | VehicleModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleModel"]>



  export type VehicleModelSelectScalar = {
    id?: boolean
    name?: boolean
    makeId?: boolean
  }

  export type VehicleModelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "makeId", ExtArgs["result"]["vehicleModel"]>
  export type VehicleModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    make?: boolean | VehicleMakeDefaultArgs<ExtArgs>
    variants?: boolean | VehicleModel$variantsArgs<ExtArgs>
    _count?: boolean | VehicleModelCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VehicleModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleModel"
    objects: {
      make: Prisma.$VehicleMakePayload<ExtArgs>
      variants: Prisma.$VehicleVariantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      makeId: string
    }, ExtArgs["result"]["vehicleModel"]>
    composites: {}
  }

  type VehicleModelGetPayload<S extends boolean | null | undefined | VehicleModelDefaultArgs> = $Result.GetResult<Prisma.$VehicleModelPayload, S>

  type VehicleModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleModelCountAggregateInputType | true
    }

  export interface VehicleModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleModel'], meta: { name: 'VehicleModel' } }
    /**
     * Find zero or one VehicleModel that matches the filter.
     * @param {VehicleModelFindUniqueArgs} args - Arguments to find a VehicleModel
     * @example
     * // Get one VehicleModel
     * const vehicleModel = await prisma.vehicleModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleModelFindUniqueArgs>(args: SelectSubset<T, VehicleModelFindUniqueArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleModel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleModelFindUniqueOrThrowArgs} args - Arguments to find a VehicleModel
     * @example
     * // Get one VehicleModel
     * const vehicleModel = await prisma.vehicleModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleModelFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelFindFirstArgs} args - Arguments to find a VehicleModel
     * @example
     * // Get one VehicleModel
     * const vehicleModel = await prisma.vehicleModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleModelFindFirstArgs>(args?: SelectSubset<T, VehicleModelFindFirstArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelFindFirstOrThrowArgs} args - Arguments to find a VehicleModel
     * @example
     * // Get one VehicleModel
     * const vehicleModel = await prisma.vehicleModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleModelFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleModels
     * const vehicleModels = await prisma.vehicleModel.findMany()
     * 
     * // Get first 10 VehicleModels
     * const vehicleModels = await prisma.vehicleModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleModelWithIdOnly = await prisma.vehicleModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleModelFindManyArgs>(args?: SelectSubset<T, VehicleModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleModel.
     * @param {VehicleModelCreateArgs} args - Arguments to create a VehicleModel.
     * @example
     * // Create one VehicleModel
     * const VehicleModel = await prisma.vehicleModel.create({
     *   data: {
     *     // ... data to create a VehicleModel
     *   }
     * })
     * 
     */
    create<T extends VehicleModelCreateArgs>(args: SelectSubset<T, VehicleModelCreateArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleModels.
     * @param {VehicleModelCreateManyArgs} args - Arguments to create many VehicleModels.
     * @example
     * // Create many VehicleModels
     * const vehicleModel = await prisma.vehicleModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleModelCreateManyArgs>(args?: SelectSubset<T, VehicleModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VehicleModel.
     * @param {VehicleModelDeleteArgs} args - Arguments to delete one VehicleModel.
     * @example
     * // Delete one VehicleModel
     * const VehicleModel = await prisma.vehicleModel.delete({
     *   where: {
     *     // ... filter to delete one VehicleModel
     *   }
     * })
     * 
     */
    delete<T extends VehicleModelDeleteArgs>(args: SelectSubset<T, VehicleModelDeleteArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleModel.
     * @param {VehicleModelUpdateArgs} args - Arguments to update one VehicleModel.
     * @example
     * // Update one VehicleModel
     * const vehicleModel = await prisma.vehicleModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleModelUpdateArgs>(args: SelectSubset<T, VehicleModelUpdateArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleModels.
     * @param {VehicleModelDeleteManyArgs} args - Arguments to filter VehicleModels to delete.
     * @example
     * // Delete a few VehicleModels
     * const { count } = await prisma.vehicleModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleModelDeleteManyArgs>(args?: SelectSubset<T, VehicleModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleModels
     * const vehicleModel = await prisma.vehicleModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleModelUpdateManyArgs>(args: SelectSubset<T, VehicleModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VehicleModel.
     * @param {VehicleModelUpsertArgs} args - Arguments to update or create a VehicleModel.
     * @example
     * // Update or create a VehicleModel
     * const vehicleModel = await prisma.vehicleModel.upsert({
     *   create: {
     *     // ... data to create a VehicleModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleModel we want to update
     *   }
     * })
     */
    upsert<T extends VehicleModelUpsertArgs>(args: SelectSubset<T, VehicleModelUpsertArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelCountArgs} args - Arguments to filter VehicleModels to count.
     * @example
     * // Count the number of VehicleModels
     * const count = await prisma.vehicleModel.count({
     *   where: {
     *     // ... the filter for the VehicleModels we want to count
     *   }
     * })
    **/
    count<T extends VehicleModelCountArgs>(
      args?: Subset<T, VehicleModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleModelAggregateArgs>(args: Subset<T, VehicleModelAggregateArgs>): Prisma.PrismaPromise<GetVehicleModelAggregateType<T>>

    /**
     * Group by VehicleModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleModelGroupByArgs['orderBy'] }
        : { orderBy?: VehicleModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleModel model
   */
  readonly fields: VehicleModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    make<T extends VehicleMakeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleMakeDefaultArgs<ExtArgs>>): Prisma__VehicleMakeClient<$Result.GetResult<Prisma.$VehicleMakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variants<T extends VehicleModel$variantsArgs<ExtArgs> = {}>(args?: Subset<T, VehicleModel$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleModel model
   */
  interface VehicleModelFieldRefs {
    readonly id: FieldRef<"VehicleModel", 'String'>
    readonly name: FieldRef<"VehicleModel", 'String'>
    readonly makeId: FieldRef<"VehicleModel", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VehicleModel findUnique
   */
  export type VehicleModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * Filter, which VehicleModel to fetch.
     */
    where: VehicleModelWhereUniqueInput
  }

  /**
   * VehicleModel findUniqueOrThrow
   */
  export type VehicleModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * Filter, which VehicleModel to fetch.
     */
    where: VehicleModelWhereUniqueInput
  }

  /**
   * VehicleModel findFirst
   */
  export type VehicleModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * Filter, which VehicleModel to fetch.
     */
    where?: VehicleModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleModels to fetch.
     */
    orderBy?: VehicleModelOrderByWithRelationInput | VehicleModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleModels.
     */
    cursor?: VehicleModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleModels.
     */
    distinct?: VehicleModelScalarFieldEnum | VehicleModelScalarFieldEnum[]
  }

  /**
   * VehicleModel findFirstOrThrow
   */
  export type VehicleModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * Filter, which VehicleModel to fetch.
     */
    where?: VehicleModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleModels to fetch.
     */
    orderBy?: VehicleModelOrderByWithRelationInput | VehicleModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleModels.
     */
    cursor?: VehicleModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleModels.
     */
    distinct?: VehicleModelScalarFieldEnum | VehicleModelScalarFieldEnum[]
  }

  /**
   * VehicleModel findMany
   */
  export type VehicleModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * Filter, which VehicleModels to fetch.
     */
    where?: VehicleModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleModels to fetch.
     */
    orderBy?: VehicleModelOrderByWithRelationInput | VehicleModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleModels.
     */
    cursor?: VehicleModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleModels.
     */
    distinct?: VehicleModelScalarFieldEnum | VehicleModelScalarFieldEnum[]
  }

  /**
   * VehicleModel create
   */
  export type VehicleModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleModel.
     */
    data: XOR<VehicleModelCreateInput, VehicleModelUncheckedCreateInput>
  }

  /**
   * VehicleModel createMany
   */
  export type VehicleModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleModels.
     */
    data: VehicleModelCreateManyInput | VehicleModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleModel update
   */
  export type VehicleModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleModel.
     */
    data: XOR<VehicleModelUpdateInput, VehicleModelUncheckedUpdateInput>
    /**
     * Choose, which VehicleModel to update.
     */
    where: VehicleModelWhereUniqueInput
  }

  /**
   * VehicleModel updateMany
   */
  export type VehicleModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleModels.
     */
    data: XOR<VehicleModelUpdateManyMutationInput, VehicleModelUncheckedUpdateManyInput>
    /**
     * Filter which VehicleModels to update
     */
    where?: VehicleModelWhereInput
    /**
     * Limit how many VehicleModels to update.
     */
    limit?: number
  }

  /**
   * VehicleModel upsert
   */
  export type VehicleModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleModel to update in case it exists.
     */
    where: VehicleModelWhereUniqueInput
    /**
     * In case the VehicleModel found by the `where` argument doesn't exist, create a new VehicleModel with this data.
     */
    create: XOR<VehicleModelCreateInput, VehicleModelUncheckedCreateInput>
    /**
     * In case the VehicleModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleModelUpdateInput, VehicleModelUncheckedUpdateInput>
  }

  /**
   * VehicleModel delete
   */
  export type VehicleModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
    /**
     * Filter which VehicleModel to delete.
     */
    where: VehicleModelWhereUniqueInput
  }

  /**
   * VehicleModel deleteMany
   */
  export type VehicleModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleModels to delete
     */
    where?: VehicleModelWhereInput
    /**
     * Limit how many VehicleModels to delete.
     */
    limit?: number
  }

  /**
   * VehicleModel.variants
   */
  export type VehicleModel$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    where?: VehicleVariantWhereInput
    orderBy?: VehicleVariantOrderByWithRelationInput | VehicleVariantOrderByWithRelationInput[]
    cursor?: VehicleVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleVariantScalarFieldEnum | VehicleVariantScalarFieldEnum[]
  }

  /**
   * VehicleModel without action
   */
  export type VehicleModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleModel
     */
    select?: VehicleModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleModel
     */
    omit?: VehicleModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleModelInclude<ExtArgs> | null
  }


  /**
   * Model VehicleVariant
   */

  export type AggregateVehicleVariant = {
    _count: VehicleVariantCountAggregateOutputType | null
    _min: VehicleVariantMinAggregateOutputType | null
    _max: VehicleVariantMaxAggregateOutputType | null
  }

  export type VehicleVariantMinAggregateOutputType = {
    id: string | null
    name: string | null
    modelId: string | null
  }

  export type VehicleVariantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    modelId: string | null
  }

  export type VehicleVariantCountAggregateOutputType = {
    id: number
    name: number
    modelId: number
    _all: number
  }


  export type VehicleVariantMinAggregateInputType = {
    id?: true
    name?: true
    modelId?: true
  }

  export type VehicleVariantMaxAggregateInputType = {
    id?: true
    name?: true
    modelId?: true
  }

  export type VehicleVariantCountAggregateInputType = {
    id?: true
    name?: true
    modelId?: true
    _all?: true
  }

  export type VehicleVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleVariant to aggregate.
     */
    where?: VehicleVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleVariants to fetch.
     */
    orderBy?: VehicleVariantOrderByWithRelationInput | VehicleVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleVariants
    **/
    _count?: true | VehicleVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleVariantMaxAggregateInputType
  }

  export type GetVehicleVariantAggregateType<T extends VehicleVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleVariant[P]>
      : GetScalarType<T[P], AggregateVehicleVariant[P]>
  }




  export type VehicleVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleVariantWhereInput
    orderBy?: VehicleVariantOrderByWithAggregationInput | VehicleVariantOrderByWithAggregationInput[]
    by: VehicleVariantScalarFieldEnum[] | VehicleVariantScalarFieldEnum
    having?: VehicleVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleVariantCountAggregateInputType | true
    _min?: VehicleVariantMinAggregateInputType
    _max?: VehicleVariantMaxAggregateInputType
  }

  export type VehicleVariantGroupByOutputType = {
    id: string
    name: string
    modelId: string
    _count: VehicleVariantCountAggregateOutputType | null
    _min: VehicleVariantMinAggregateOutputType | null
    _max: VehicleVariantMaxAggregateOutputType | null
  }

  type GetVehicleVariantGroupByPayload<T extends VehicleVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleVariantGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleVariantGroupByOutputType[P]>
        }
      >
    >


  export type VehicleVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    modelId?: boolean
    model?: boolean | VehicleModelDefaultArgs<ExtArgs>
    parts?: boolean | VehicleVariant$partsArgs<ExtArgs>
    _count?: boolean | VehicleVariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleVariant"]>



  export type VehicleVariantSelectScalar = {
    id?: boolean
    name?: boolean
    modelId?: boolean
  }

  export type VehicleVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "modelId", ExtArgs["result"]["vehicleVariant"]>
  export type VehicleVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | VehicleModelDefaultArgs<ExtArgs>
    parts?: boolean | VehicleVariant$partsArgs<ExtArgs>
    _count?: boolean | VehicleVariantCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VehicleVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleVariant"
    objects: {
      model: Prisma.$VehicleModelPayload<ExtArgs>
      parts: Prisma.$VehiclePartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      modelId: string
    }, ExtArgs["result"]["vehicleVariant"]>
    composites: {}
  }

  type VehicleVariantGetPayload<S extends boolean | null | undefined | VehicleVariantDefaultArgs> = $Result.GetResult<Prisma.$VehicleVariantPayload, S>

  type VehicleVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleVariantCountAggregateInputType | true
    }

  export interface VehicleVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleVariant'], meta: { name: 'VehicleVariant' } }
    /**
     * Find zero or one VehicleVariant that matches the filter.
     * @param {VehicleVariantFindUniqueArgs} args - Arguments to find a VehicleVariant
     * @example
     * // Get one VehicleVariant
     * const vehicleVariant = await prisma.vehicleVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleVariantFindUniqueArgs>(args: SelectSubset<T, VehicleVariantFindUniqueArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleVariantFindUniqueOrThrowArgs} args - Arguments to find a VehicleVariant
     * @example
     * // Get one VehicleVariant
     * const vehicleVariant = await prisma.vehicleVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantFindFirstArgs} args - Arguments to find a VehicleVariant
     * @example
     * // Get one VehicleVariant
     * const vehicleVariant = await prisma.vehicleVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleVariantFindFirstArgs>(args?: SelectSubset<T, VehicleVariantFindFirstArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantFindFirstOrThrowArgs} args - Arguments to find a VehicleVariant
     * @example
     * // Get one VehicleVariant
     * const vehicleVariant = await prisma.vehicleVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleVariants
     * const vehicleVariants = await prisma.vehicleVariant.findMany()
     * 
     * // Get first 10 VehicleVariants
     * const vehicleVariants = await prisma.vehicleVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleVariantWithIdOnly = await prisma.vehicleVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleVariantFindManyArgs>(args?: SelectSubset<T, VehicleVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleVariant.
     * @param {VehicleVariantCreateArgs} args - Arguments to create a VehicleVariant.
     * @example
     * // Create one VehicleVariant
     * const VehicleVariant = await prisma.vehicleVariant.create({
     *   data: {
     *     // ... data to create a VehicleVariant
     *   }
     * })
     * 
     */
    create<T extends VehicleVariantCreateArgs>(args: SelectSubset<T, VehicleVariantCreateArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleVariants.
     * @param {VehicleVariantCreateManyArgs} args - Arguments to create many VehicleVariants.
     * @example
     * // Create many VehicleVariants
     * const vehicleVariant = await prisma.vehicleVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleVariantCreateManyArgs>(args?: SelectSubset<T, VehicleVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VehicleVariant.
     * @param {VehicleVariantDeleteArgs} args - Arguments to delete one VehicleVariant.
     * @example
     * // Delete one VehicleVariant
     * const VehicleVariant = await prisma.vehicleVariant.delete({
     *   where: {
     *     // ... filter to delete one VehicleVariant
     *   }
     * })
     * 
     */
    delete<T extends VehicleVariantDeleteArgs>(args: SelectSubset<T, VehicleVariantDeleteArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleVariant.
     * @param {VehicleVariantUpdateArgs} args - Arguments to update one VehicleVariant.
     * @example
     * // Update one VehicleVariant
     * const vehicleVariant = await prisma.vehicleVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleVariantUpdateArgs>(args: SelectSubset<T, VehicleVariantUpdateArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleVariants.
     * @param {VehicleVariantDeleteManyArgs} args - Arguments to filter VehicleVariants to delete.
     * @example
     * // Delete a few VehicleVariants
     * const { count } = await prisma.vehicleVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleVariantDeleteManyArgs>(args?: SelectSubset<T, VehicleVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleVariants
     * const vehicleVariant = await prisma.vehicleVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleVariantUpdateManyArgs>(args: SelectSubset<T, VehicleVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VehicleVariant.
     * @param {VehicleVariantUpsertArgs} args - Arguments to update or create a VehicleVariant.
     * @example
     * // Update or create a VehicleVariant
     * const vehicleVariant = await prisma.vehicleVariant.upsert({
     *   create: {
     *     // ... data to create a VehicleVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleVariant we want to update
     *   }
     * })
     */
    upsert<T extends VehicleVariantUpsertArgs>(args: SelectSubset<T, VehicleVariantUpsertArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantCountArgs} args - Arguments to filter VehicleVariants to count.
     * @example
     * // Count the number of VehicleVariants
     * const count = await prisma.vehicleVariant.count({
     *   where: {
     *     // ... the filter for the VehicleVariants we want to count
     *   }
     * })
    **/
    count<T extends VehicleVariantCountArgs>(
      args?: Subset<T, VehicleVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleVariantAggregateArgs>(args: Subset<T, VehicleVariantAggregateArgs>): Prisma.PrismaPromise<GetVehicleVariantAggregateType<T>>

    /**
     * Group by VehicleVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleVariantGroupByArgs['orderBy'] }
        : { orderBy?: VehicleVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleVariant model
   */
  readonly fields: VehicleVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends VehicleModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleModelDefaultArgs<ExtArgs>>): Prisma__VehicleModelClient<$Result.GetResult<Prisma.$VehicleModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parts<T extends VehicleVariant$partsArgs<ExtArgs> = {}>(args?: Subset<T, VehicleVariant$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleVariant model
   */
  interface VehicleVariantFieldRefs {
    readonly id: FieldRef<"VehicleVariant", 'String'>
    readonly name: FieldRef<"VehicleVariant", 'String'>
    readonly modelId: FieldRef<"VehicleVariant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VehicleVariant findUnique
   */
  export type VehicleVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * Filter, which VehicleVariant to fetch.
     */
    where: VehicleVariantWhereUniqueInput
  }

  /**
   * VehicleVariant findUniqueOrThrow
   */
  export type VehicleVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * Filter, which VehicleVariant to fetch.
     */
    where: VehicleVariantWhereUniqueInput
  }

  /**
   * VehicleVariant findFirst
   */
  export type VehicleVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * Filter, which VehicleVariant to fetch.
     */
    where?: VehicleVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleVariants to fetch.
     */
    orderBy?: VehicleVariantOrderByWithRelationInput | VehicleVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleVariants.
     */
    cursor?: VehicleVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleVariants.
     */
    distinct?: VehicleVariantScalarFieldEnum | VehicleVariantScalarFieldEnum[]
  }

  /**
   * VehicleVariant findFirstOrThrow
   */
  export type VehicleVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * Filter, which VehicleVariant to fetch.
     */
    where?: VehicleVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleVariants to fetch.
     */
    orderBy?: VehicleVariantOrderByWithRelationInput | VehicleVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleVariants.
     */
    cursor?: VehicleVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleVariants.
     */
    distinct?: VehicleVariantScalarFieldEnum | VehicleVariantScalarFieldEnum[]
  }

  /**
   * VehicleVariant findMany
   */
  export type VehicleVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * Filter, which VehicleVariants to fetch.
     */
    where?: VehicleVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleVariants to fetch.
     */
    orderBy?: VehicleVariantOrderByWithRelationInput | VehicleVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleVariants.
     */
    cursor?: VehicleVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleVariants.
     */
    distinct?: VehicleVariantScalarFieldEnum | VehicleVariantScalarFieldEnum[]
  }

  /**
   * VehicleVariant create
   */
  export type VehicleVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleVariant.
     */
    data: XOR<VehicleVariantCreateInput, VehicleVariantUncheckedCreateInput>
  }

  /**
   * VehicleVariant createMany
   */
  export type VehicleVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleVariants.
     */
    data: VehicleVariantCreateManyInput | VehicleVariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleVariant update
   */
  export type VehicleVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleVariant.
     */
    data: XOR<VehicleVariantUpdateInput, VehicleVariantUncheckedUpdateInput>
    /**
     * Choose, which VehicleVariant to update.
     */
    where: VehicleVariantWhereUniqueInput
  }

  /**
   * VehicleVariant updateMany
   */
  export type VehicleVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleVariants.
     */
    data: XOR<VehicleVariantUpdateManyMutationInput, VehicleVariantUncheckedUpdateManyInput>
    /**
     * Filter which VehicleVariants to update
     */
    where?: VehicleVariantWhereInput
    /**
     * Limit how many VehicleVariants to update.
     */
    limit?: number
  }

  /**
   * VehicleVariant upsert
   */
  export type VehicleVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleVariant to update in case it exists.
     */
    where: VehicleVariantWhereUniqueInput
    /**
     * In case the VehicleVariant found by the `where` argument doesn't exist, create a new VehicleVariant with this data.
     */
    create: XOR<VehicleVariantCreateInput, VehicleVariantUncheckedCreateInput>
    /**
     * In case the VehicleVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleVariantUpdateInput, VehicleVariantUncheckedUpdateInput>
  }

  /**
   * VehicleVariant delete
   */
  export type VehicleVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    /**
     * Filter which VehicleVariant to delete.
     */
    where: VehicleVariantWhereUniqueInput
  }

  /**
   * VehicleVariant deleteMany
   */
  export type VehicleVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleVariants to delete
     */
    where?: VehicleVariantWhereInput
    /**
     * Limit how many VehicleVariants to delete.
     */
    limit?: number
  }

  /**
   * VehicleVariant.parts
   */
  export type VehicleVariant$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    where?: VehiclePartWhereInput
    orderBy?: VehiclePartOrderByWithRelationInput | VehiclePartOrderByWithRelationInput[]
    cursor?: VehiclePartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehiclePartScalarFieldEnum | VehiclePartScalarFieldEnum[]
  }

  /**
   * VehicleVariant without action
   */
  export type VehicleVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
  }


  /**
   * Model VehiclePart
   */

  export type AggregateVehiclePart = {
    _count: VehiclePartCountAggregateOutputType | null
    _avg: VehiclePartAvgAggregateOutputType | null
    _sum: VehiclePartSumAggregateOutputType | null
    _min: VehiclePartMinAggregateOutputType | null
    _max: VehiclePartMaxAggregateOutputType | null
  }

  export type VehiclePartAvgAggregateOutputType = {
    unitPrice: number | null
    labourCost: number | null
  }

  export type VehiclePartSumAggregateOutputType = {
    unitPrice: number | null
    labourCost: number | null
  }

  export type VehiclePartMinAggregateOutputType = {
    id: string | null
    partNumber: string | null
    name: string | null
    category: string | null
    unitPrice: number | null
    labourCost: number | null
    active: boolean | null
    variantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehiclePartMaxAggregateOutputType = {
    id: string | null
    partNumber: string | null
    name: string | null
    category: string | null
    unitPrice: number | null
    labourCost: number | null
    active: boolean | null
    variantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehiclePartCountAggregateOutputType = {
    id: number
    partNumber: number
    name: number
    category: number
    unitPrice: number
    labourCost: number
    active: number
    variantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehiclePartAvgAggregateInputType = {
    unitPrice?: true
    labourCost?: true
  }

  export type VehiclePartSumAggregateInputType = {
    unitPrice?: true
    labourCost?: true
  }

  export type VehiclePartMinAggregateInputType = {
    id?: true
    partNumber?: true
    name?: true
    category?: true
    unitPrice?: true
    labourCost?: true
    active?: true
    variantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehiclePartMaxAggregateInputType = {
    id?: true
    partNumber?: true
    name?: true
    category?: true
    unitPrice?: true
    labourCost?: true
    active?: true
    variantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehiclePartCountAggregateInputType = {
    id?: true
    partNumber?: true
    name?: true
    category?: true
    unitPrice?: true
    labourCost?: true
    active?: true
    variantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehiclePartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehiclePart to aggregate.
     */
    where?: VehiclePartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleParts to fetch.
     */
    orderBy?: VehiclePartOrderByWithRelationInput | VehiclePartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehiclePartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleParts
    **/
    _count?: true | VehiclePartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehiclePartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehiclePartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehiclePartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehiclePartMaxAggregateInputType
  }

  export type GetVehiclePartAggregateType<T extends VehiclePartAggregateArgs> = {
        [P in keyof T & keyof AggregateVehiclePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehiclePart[P]>
      : GetScalarType<T[P], AggregateVehiclePart[P]>
  }




  export type VehiclePartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehiclePartWhereInput
    orderBy?: VehiclePartOrderByWithAggregationInput | VehiclePartOrderByWithAggregationInput[]
    by: VehiclePartScalarFieldEnum[] | VehiclePartScalarFieldEnum
    having?: VehiclePartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehiclePartCountAggregateInputType | true
    _avg?: VehiclePartAvgAggregateInputType
    _sum?: VehiclePartSumAggregateInputType
    _min?: VehiclePartMinAggregateInputType
    _max?: VehiclePartMaxAggregateInputType
  }

  export type VehiclePartGroupByOutputType = {
    id: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active: boolean
    variantId: string | null
    createdAt: Date
    updatedAt: Date
    _count: VehiclePartCountAggregateOutputType | null
    _avg: VehiclePartAvgAggregateOutputType | null
    _sum: VehiclePartSumAggregateOutputType | null
    _min: VehiclePartMinAggregateOutputType | null
    _max: VehiclePartMaxAggregateOutputType | null
  }

  type GetVehiclePartGroupByPayload<T extends VehiclePartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehiclePartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehiclePartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehiclePartGroupByOutputType[P]>
            : GetScalarType<T[P], VehiclePartGroupByOutputType[P]>
        }
      >
    >


  export type VehiclePartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partNumber?: boolean
    name?: boolean
    category?: boolean
    unitPrice?: boolean
    labourCost?: boolean
    active?: boolean
    variantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    variant?: boolean | VehiclePart$variantArgs<ExtArgs>
  }, ExtArgs["result"]["vehiclePart"]>



  export type VehiclePartSelectScalar = {
    id?: boolean
    partNumber?: boolean
    name?: boolean
    category?: boolean
    unitPrice?: boolean
    labourCost?: boolean
    active?: boolean
    variantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehiclePartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partNumber" | "name" | "category" | "unitPrice" | "labourCost" | "active" | "variantId" | "createdAt" | "updatedAt", ExtArgs["result"]["vehiclePart"]>
  export type VehiclePartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variant?: boolean | VehiclePart$variantArgs<ExtArgs>
  }

  export type $VehiclePartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehiclePart"
    objects: {
      variant: Prisma.$VehicleVariantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      partNumber: string
      name: string
      category: string
      unitPrice: number
      labourCost: number
      active: boolean
      variantId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehiclePart"]>
    composites: {}
  }

  type VehiclePartGetPayload<S extends boolean | null | undefined | VehiclePartDefaultArgs> = $Result.GetResult<Prisma.$VehiclePartPayload, S>

  type VehiclePartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehiclePartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehiclePartCountAggregateInputType | true
    }

  export interface VehiclePartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehiclePart'], meta: { name: 'VehiclePart' } }
    /**
     * Find zero or one VehiclePart that matches the filter.
     * @param {VehiclePartFindUniqueArgs} args - Arguments to find a VehiclePart
     * @example
     * // Get one VehiclePart
     * const vehiclePart = await prisma.vehiclePart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehiclePartFindUniqueArgs>(args: SelectSubset<T, VehiclePartFindUniqueArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehiclePart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehiclePartFindUniqueOrThrowArgs} args - Arguments to find a VehiclePart
     * @example
     * // Get one VehiclePart
     * const vehiclePart = await prisma.vehiclePart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehiclePartFindUniqueOrThrowArgs>(args: SelectSubset<T, VehiclePartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehiclePart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartFindFirstArgs} args - Arguments to find a VehiclePart
     * @example
     * // Get one VehiclePart
     * const vehiclePart = await prisma.vehiclePart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehiclePartFindFirstArgs>(args?: SelectSubset<T, VehiclePartFindFirstArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehiclePart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartFindFirstOrThrowArgs} args - Arguments to find a VehiclePart
     * @example
     * // Get one VehiclePart
     * const vehiclePart = await prisma.vehiclePart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehiclePartFindFirstOrThrowArgs>(args?: SelectSubset<T, VehiclePartFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleParts
     * const vehicleParts = await prisma.vehiclePart.findMany()
     * 
     * // Get first 10 VehicleParts
     * const vehicleParts = await prisma.vehiclePart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehiclePartWithIdOnly = await prisma.vehiclePart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehiclePartFindManyArgs>(args?: SelectSubset<T, VehiclePartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehiclePart.
     * @param {VehiclePartCreateArgs} args - Arguments to create a VehiclePart.
     * @example
     * // Create one VehiclePart
     * const VehiclePart = await prisma.vehiclePart.create({
     *   data: {
     *     // ... data to create a VehiclePart
     *   }
     * })
     * 
     */
    create<T extends VehiclePartCreateArgs>(args: SelectSubset<T, VehiclePartCreateArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleParts.
     * @param {VehiclePartCreateManyArgs} args - Arguments to create many VehicleParts.
     * @example
     * // Create many VehicleParts
     * const vehiclePart = await prisma.vehiclePart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehiclePartCreateManyArgs>(args?: SelectSubset<T, VehiclePartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VehiclePart.
     * @param {VehiclePartDeleteArgs} args - Arguments to delete one VehiclePart.
     * @example
     * // Delete one VehiclePart
     * const VehiclePart = await prisma.vehiclePart.delete({
     *   where: {
     *     // ... filter to delete one VehiclePart
     *   }
     * })
     * 
     */
    delete<T extends VehiclePartDeleteArgs>(args: SelectSubset<T, VehiclePartDeleteArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehiclePart.
     * @param {VehiclePartUpdateArgs} args - Arguments to update one VehiclePart.
     * @example
     * // Update one VehiclePart
     * const vehiclePart = await prisma.vehiclePart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehiclePartUpdateArgs>(args: SelectSubset<T, VehiclePartUpdateArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleParts.
     * @param {VehiclePartDeleteManyArgs} args - Arguments to filter VehicleParts to delete.
     * @example
     * // Delete a few VehicleParts
     * const { count } = await prisma.vehiclePart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehiclePartDeleteManyArgs>(args?: SelectSubset<T, VehiclePartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleParts
     * const vehiclePart = await prisma.vehiclePart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehiclePartUpdateManyArgs>(args: SelectSubset<T, VehiclePartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VehiclePart.
     * @param {VehiclePartUpsertArgs} args - Arguments to update or create a VehiclePart.
     * @example
     * // Update or create a VehiclePart
     * const vehiclePart = await prisma.vehiclePart.upsert({
     *   create: {
     *     // ... data to create a VehiclePart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehiclePart we want to update
     *   }
     * })
     */
    upsert<T extends VehiclePartUpsertArgs>(args: SelectSubset<T, VehiclePartUpsertArgs<ExtArgs>>): Prisma__VehiclePartClient<$Result.GetResult<Prisma.$VehiclePartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartCountArgs} args - Arguments to filter VehicleParts to count.
     * @example
     * // Count the number of VehicleParts
     * const count = await prisma.vehiclePart.count({
     *   where: {
     *     // ... the filter for the VehicleParts we want to count
     *   }
     * })
    **/
    count<T extends VehiclePartCountArgs>(
      args?: Subset<T, VehiclePartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehiclePartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehiclePart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehiclePartAggregateArgs>(args: Subset<T, VehiclePartAggregateArgs>): Prisma.PrismaPromise<GetVehiclePartAggregateType<T>>

    /**
     * Group by VehiclePart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehiclePartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehiclePartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehiclePartGroupByArgs['orderBy'] }
        : { orderBy?: VehiclePartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehiclePartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehiclePartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehiclePart model
   */
  readonly fields: VehiclePartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehiclePart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehiclePartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variant<T extends VehiclePart$variantArgs<ExtArgs> = {}>(args?: Subset<T, VehiclePart$variantArgs<ExtArgs>>): Prisma__VehicleVariantClient<$Result.GetResult<Prisma.$VehicleVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehiclePart model
   */
  interface VehiclePartFieldRefs {
    readonly id: FieldRef<"VehiclePart", 'String'>
    readonly partNumber: FieldRef<"VehiclePart", 'String'>
    readonly name: FieldRef<"VehiclePart", 'String'>
    readonly category: FieldRef<"VehiclePart", 'String'>
    readonly unitPrice: FieldRef<"VehiclePart", 'Float'>
    readonly labourCost: FieldRef<"VehiclePart", 'Float'>
    readonly active: FieldRef<"VehiclePart", 'Boolean'>
    readonly variantId: FieldRef<"VehiclePart", 'String'>
    readonly createdAt: FieldRef<"VehiclePart", 'DateTime'>
    readonly updatedAt: FieldRef<"VehiclePart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VehiclePart findUnique
   */
  export type VehiclePartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * Filter, which VehiclePart to fetch.
     */
    where: VehiclePartWhereUniqueInput
  }

  /**
   * VehiclePart findUniqueOrThrow
   */
  export type VehiclePartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * Filter, which VehiclePart to fetch.
     */
    where: VehiclePartWhereUniqueInput
  }

  /**
   * VehiclePart findFirst
   */
  export type VehiclePartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * Filter, which VehiclePart to fetch.
     */
    where?: VehiclePartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleParts to fetch.
     */
    orderBy?: VehiclePartOrderByWithRelationInput | VehiclePartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleParts.
     */
    cursor?: VehiclePartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleParts.
     */
    distinct?: VehiclePartScalarFieldEnum | VehiclePartScalarFieldEnum[]
  }

  /**
   * VehiclePart findFirstOrThrow
   */
  export type VehiclePartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * Filter, which VehiclePart to fetch.
     */
    where?: VehiclePartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleParts to fetch.
     */
    orderBy?: VehiclePartOrderByWithRelationInput | VehiclePartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleParts.
     */
    cursor?: VehiclePartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleParts.
     */
    distinct?: VehiclePartScalarFieldEnum | VehiclePartScalarFieldEnum[]
  }

  /**
   * VehiclePart findMany
   */
  export type VehiclePartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * Filter, which VehicleParts to fetch.
     */
    where?: VehiclePartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleParts to fetch.
     */
    orderBy?: VehiclePartOrderByWithRelationInput | VehiclePartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleParts.
     */
    cursor?: VehiclePartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleParts.
     */
    distinct?: VehiclePartScalarFieldEnum | VehiclePartScalarFieldEnum[]
  }

  /**
   * VehiclePart create
   */
  export type VehiclePartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * The data needed to create a VehiclePart.
     */
    data: XOR<VehiclePartCreateInput, VehiclePartUncheckedCreateInput>
  }

  /**
   * VehiclePart createMany
   */
  export type VehiclePartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleParts.
     */
    data: VehiclePartCreateManyInput | VehiclePartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehiclePart update
   */
  export type VehiclePartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * The data needed to update a VehiclePart.
     */
    data: XOR<VehiclePartUpdateInput, VehiclePartUncheckedUpdateInput>
    /**
     * Choose, which VehiclePart to update.
     */
    where: VehiclePartWhereUniqueInput
  }

  /**
   * VehiclePart updateMany
   */
  export type VehiclePartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleParts.
     */
    data: XOR<VehiclePartUpdateManyMutationInput, VehiclePartUncheckedUpdateManyInput>
    /**
     * Filter which VehicleParts to update
     */
    where?: VehiclePartWhereInput
    /**
     * Limit how many VehicleParts to update.
     */
    limit?: number
  }

  /**
   * VehiclePart upsert
   */
  export type VehiclePartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * The filter to search for the VehiclePart to update in case it exists.
     */
    where: VehiclePartWhereUniqueInput
    /**
     * In case the VehiclePart found by the `where` argument doesn't exist, create a new VehiclePart with this data.
     */
    create: XOR<VehiclePartCreateInput, VehiclePartUncheckedCreateInput>
    /**
     * In case the VehiclePart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehiclePartUpdateInput, VehiclePartUncheckedUpdateInput>
  }

  /**
   * VehiclePart delete
   */
  export type VehiclePartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
    /**
     * Filter which VehiclePart to delete.
     */
    where: VehiclePartWhereUniqueInput
  }

  /**
   * VehiclePart deleteMany
   */
  export type VehiclePartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleParts to delete
     */
    where?: VehiclePartWhereInput
    /**
     * Limit how many VehicleParts to delete.
     */
    limit?: number
  }

  /**
   * VehiclePart.variant
   */
  export type VehiclePart$variantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleVariant
     */
    select?: VehicleVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleVariant
     */
    omit?: VehicleVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleVariantInclude<ExtArgs> | null
    where?: VehicleVariantWhereInput
  }

  /**
   * VehiclePart without action
   */
  export type VehiclePartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehiclePart
     */
    select?: VehiclePartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehiclePart
     */
    omit?: VehiclePartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehiclePartInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentDamagedPart
   */

  export type AggregateAssessmentDamagedPart = {
    _count: AssessmentDamagedPartCountAggregateOutputType | null
    _min: AssessmentDamagedPartMinAggregateOutputType | null
    _max: AssessmentDamagedPartMaxAggregateOutputType | null
  }

  export type AssessmentDamagedPartMinAggregateOutputType = {
    id: string | null
    name: string | null
    severity: string | null
    confirmed: boolean | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type AssessmentDamagedPartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    severity: string | null
    confirmed: boolean | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type AssessmentDamagedPartCountAggregateOutputType = {
    id: number
    name: number
    severity: number
    confirmed: number
    assessmentId: number
    createdAt: number
    _all: number
  }


  export type AssessmentDamagedPartMinAggregateInputType = {
    id?: true
    name?: true
    severity?: true
    confirmed?: true
    assessmentId?: true
    createdAt?: true
  }

  export type AssessmentDamagedPartMaxAggregateInputType = {
    id?: true
    name?: true
    severity?: true
    confirmed?: true
    assessmentId?: true
    createdAt?: true
  }

  export type AssessmentDamagedPartCountAggregateInputType = {
    id?: true
    name?: true
    severity?: true
    confirmed?: true
    assessmentId?: true
    createdAt?: true
    _all?: true
  }

  export type AssessmentDamagedPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentDamagedPart to aggregate.
     */
    where?: AssessmentDamagedPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentDamagedParts to fetch.
     */
    orderBy?: AssessmentDamagedPartOrderByWithRelationInput | AssessmentDamagedPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentDamagedPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentDamagedParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentDamagedParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentDamagedParts
    **/
    _count?: true | AssessmentDamagedPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentDamagedPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentDamagedPartMaxAggregateInputType
  }

  export type GetAssessmentDamagedPartAggregateType<T extends AssessmentDamagedPartAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentDamagedPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentDamagedPart[P]>
      : GetScalarType<T[P], AggregateAssessmentDamagedPart[P]>
  }




  export type AssessmentDamagedPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentDamagedPartWhereInput
    orderBy?: AssessmentDamagedPartOrderByWithAggregationInput | AssessmentDamagedPartOrderByWithAggregationInput[]
    by: AssessmentDamagedPartScalarFieldEnum[] | AssessmentDamagedPartScalarFieldEnum
    having?: AssessmentDamagedPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentDamagedPartCountAggregateInputType | true
    _min?: AssessmentDamagedPartMinAggregateInputType
    _max?: AssessmentDamagedPartMaxAggregateInputType
  }

  export type AssessmentDamagedPartGroupByOutputType = {
    id: string
    name: string
    severity: string | null
    confirmed: boolean
    assessmentId: string
    createdAt: Date
    _count: AssessmentDamagedPartCountAggregateOutputType | null
    _min: AssessmentDamagedPartMinAggregateOutputType | null
    _max: AssessmentDamagedPartMaxAggregateOutputType | null
  }

  type GetAssessmentDamagedPartGroupByPayload<T extends AssessmentDamagedPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentDamagedPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentDamagedPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentDamagedPartGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentDamagedPartGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentDamagedPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    severity?: boolean
    confirmed?: boolean
    assessmentId?: boolean
    createdAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentDamagedPart"]>



  export type AssessmentDamagedPartSelectScalar = {
    id?: boolean
    name?: boolean
    severity?: boolean
    confirmed?: boolean
    assessmentId?: boolean
    createdAt?: boolean
  }

  export type AssessmentDamagedPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "severity" | "confirmed" | "assessmentId" | "createdAt", ExtArgs["result"]["assessmentDamagedPart"]>
  export type AssessmentDamagedPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentDamagedPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentDamagedPart"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      severity: string | null
      confirmed: boolean
      assessmentId: string
      createdAt: Date
    }, ExtArgs["result"]["assessmentDamagedPart"]>
    composites: {}
  }

  type AssessmentDamagedPartGetPayload<S extends boolean | null | undefined | AssessmentDamagedPartDefaultArgs> = $Result.GetResult<Prisma.$AssessmentDamagedPartPayload, S>

  type AssessmentDamagedPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentDamagedPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentDamagedPartCountAggregateInputType | true
    }

  export interface AssessmentDamagedPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentDamagedPart'], meta: { name: 'AssessmentDamagedPart' } }
    /**
     * Find zero or one AssessmentDamagedPart that matches the filter.
     * @param {AssessmentDamagedPartFindUniqueArgs} args - Arguments to find a AssessmentDamagedPart
     * @example
     * // Get one AssessmentDamagedPart
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentDamagedPartFindUniqueArgs>(args: SelectSubset<T, AssessmentDamagedPartFindUniqueArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentDamagedPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentDamagedPartFindUniqueOrThrowArgs} args - Arguments to find a AssessmentDamagedPart
     * @example
     * // Get one AssessmentDamagedPart
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentDamagedPartFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentDamagedPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentDamagedPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartFindFirstArgs} args - Arguments to find a AssessmentDamagedPart
     * @example
     * // Get one AssessmentDamagedPart
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentDamagedPartFindFirstArgs>(args?: SelectSubset<T, AssessmentDamagedPartFindFirstArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentDamagedPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartFindFirstOrThrowArgs} args - Arguments to find a AssessmentDamagedPart
     * @example
     * // Get one AssessmentDamagedPart
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentDamagedPartFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentDamagedPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentDamagedParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentDamagedParts
     * const assessmentDamagedParts = await prisma.assessmentDamagedPart.findMany()
     * 
     * // Get first 10 AssessmentDamagedParts
     * const assessmentDamagedParts = await prisma.assessmentDamagedPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentDamagedPartWithIdOnly = await prisma.assessmentDamagedPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentDamagedPartFindManyArgs>(args?: SelectSubset<T, AssessmentDamagedPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentDamagedPart.
     * @param {AssessmentDamagedPartCreateArgs} args - Arguments to create a AssessmentDamagedPart.
     * @example
     * // Create one AssessmentDamagedPart
     * const AssessmentDamagedPart = await prisma.assessmentDamagedPart.create({
     *   data: {
     *     // ... data to create a AssessmentDamagedPart
     *   }
     * })
     * 
     */
    create<T extends AssessmentDamagedPartCreateArgs>(args: SelectSubset<T, AssessmentDamagedPartCreateArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentDamagedParts.
     * @param {AssessmentDamagedPartCreateManyArgs} args - Arguments to create many AssessmentDamagedParts.
     * @example
     * // Create many AssessmentDamagedParts
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentDamagedPartCreateManyArgs>(args?: SelectSubset<T, AssessmentDamagedPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AssessmentDamagedPart.
     * @param {AssessmentDamagedPartDeleteArgs} args - Arguments to delete one AssessmentDamagedPart.
     * @example
     * // Delete one AssessmentDamagedPart
     * const AssessmentDamagedPart = await prisma.assessmentDamagedPart.delete({
     *   where: {
     *     // ... filter to delete one AssessmentDamagedPart
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDamagedPartDeleteArgs>(args: SelectSubset<T, AssessmentDamagedPartDeleteArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentDamagedPart.
     * @param {AssessmentDamagedPartUpdateArgs} args - Arguments to update one AssessmentDamagedPart.
     * @example
     * // Update one AssessmentDamagedPart
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentDamagedPartUpdateArgs>(args: SelectSubset<T, AssessmentDamagedPartUpdateArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentDamagedParts.
     * @param {AssessmentDamagedPartDeleteManyArgs} args - Arguments to filter AssessmentDamagedParts to delete.
     * @example
     * // Delete a few AssessmentDamagedParts
     * const { count } = await prisma.assessmentDamagedPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDamagedPartDeleteManyArgs>(args?: SelectSubset<T, AssessmentDamagedPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentDamagedParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentDamagedParts
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentDamagedPartUpdateManyArgs>(args: SelectSubset<T, AssessmentDamagedPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssessmentDamagedPart.
     * @param {AssessmentDamagedPartUpsertArgs} args - Arguments to update or create a AssessmentDamagedPart.
     * @example
     * // Update or create a AssessmentDamagedPart
     * const assessmentDamagedPart = await prisma.assessmentDamagedPart.upsert({
     *   create: {
     *     // ... data to create a AssessmentDamagedPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentDamagedPart we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentDamagedPartUpsertArgs>(args: SelectSubset<T, AssessmentDamagedPartUpsertArgs<ExtArgs>>): Prisma__AssessmentDamagedPartClient<$Result.GetResult<Prisma.$AssessmentDamagedPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentDamagedParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartCountArgs} args - Arguments to filter AssessmentDamagedParts to count.
     * @example
     * // Count the number of AssessmentDamagedParts
     * const count = await prisma.assessmentDamagedPart.count({
     *   where: {
     *     // ... the filter for the AssessmentDamagedParts we want to count
     *   }
     * })
    **/
    count<T extends AssessmentDamagedPartCountArgs>(
      args?: Subset<T, AssessmentDamagedPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentDamagedPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentDamagedPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentDamagedPartAggregateArgs>(args: Subset<T, AssessmentDamagedPartAggregateArgs>): Prisma.PrismaPromise<GetAssessmentDamagedPartAggregateType<T>>

    /**
     * Group by AssessmentDamagedPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentDamagedPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentDamagedPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentDamagedPartGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentDamagedPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentDamagedPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentDamagedPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentDamagedPart model
   */
  readonly fields: AssessmentDamagedPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentDamagedPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentDamagedPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentDamagedPart model
   */
  interface AssessmentDamagedPartFieldRefs {
    readonly id: FieldRef<"AssessmentDamagedPart", 'String'>
    readonly name: FieldRef<"AssessmentDamagedPart", 'String'>
    readonly severity: FieldRef<"AssessmentDamagedPart", 'String'>
    readonly confirmed: FieldRef<"AssessmentDamagedPart", 'Boolean'>
    readonly assessmentId: FieldRef<"AssessmentDamagedPart", 'String'>
    readonly createdAt: FieldRef<"AssessmentDamagedPart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentDamagedPart findUnique
   */
  export type AssessmentDamagedPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentDamagedPart to fetch.
     */
    where: AssessmentDamagedPartWhereUniqueInput
  }

  /**
   * AssessmentDamagedPart findUniqueOrThrow
   */
  export type AssessmentDamagedPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentDamagedPart to fetch.
     */
    where: AssessmentDamagedPartWhereUniqueInput
  }

  /**
   * AssessmentDamagedPart findFirst
   */
  export type AssessmentDamagedPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentDamagedPart to fetch.
     */
    where?: AssessmentDamagedPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentDamagedParts to fetch.
     */
    orderBy?: AssessmentDamagedPartOrderByWithRelationInput | AssessmentDamagedPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentDamagedParts.
     */
    cursor?: AssessmentDamagedPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentDamagedParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentDamagedParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentDamagedParts.
     */
    distinct?: AssessmentDamagedPartScalarFieldEnum | AssessmentDamagedPartScalarFieldEnum[]
  }

  /**
   * AssessmentDamagedPart findFirstOrThrow
   */
  export type AssessmentDamagedPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentDamagedPart to fetch.
     */
    where?: AssessmentDamagedPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentDamagedParts to fetch.
     */
    orderBy?: AssessmentDamagedPartOrderByWithRelationInput | AssessmentDamagedPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentDamagedParts.
     */
    cursor?: AssessmentDamagedPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentDamagedParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentDamagedParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentDamagedParts.
     */
    distinct?: AssessmentDamagedPartScalarFieldEnum | AssessmentDamagedPartScalarFieldEnum[]
  }

  /**
   * AssessmentDamagedPart findMany
   */
  export type AssessmentDamagedPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentDamagedParts to fetch.
     */
    where?: AssessmentDamagedPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentDamagedParts to fetch.
     */
    orderBy?: AssessmentDamagedPartOrderByWithRelationInput | AssessmentDamagedPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentDamagedParts.
     */
    cursor?: AssessmentDamagedPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentDamagedParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentDamagedParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentDamagedParts.
     */
    distinct?: AssessmentDamagedPartScalarFieldEnum | AssessmentDamagedPartScalarFieldEnum[]
  }

  /**
   * AssessmentDamagedPart create
   */
  export type AssessmentDamagedPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentDamagedPart.
     */
    data: XOR<AssessmentDamagedPartCreateInput, AssessmentDamagedPartUncheckedCreateInput>
  }

  /**
   * AssessmentDamagedPart createMany
   */
  export type AssessmentDamagedPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentDamagedParts.
     */
    data: AssessmentDamagedPartCreateManyInput | AssessmentDamagedPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentDamagedPart update
   */
  export type AssessmentDamagedPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentDamagedPart.
     */
    data: XOR<AssessmentDamagedPartUpdateInput, AssessmentDamagedPartUncheckedUpdateInput>
    /**
     * Choose, which AssessmentDamagedPart to update.
     */
    where: AssessmentDamagedPartWhereUniqueInput
  }

  /**
   * AssessmentDamagedPart updateMany
   */
  export type AssessmentDamagedPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentDamagedParts.
     */
    data: XOR<AssessmentDamagedPartUpdateManyMutationInput, AssessmentDamagedPartUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentDamagedParts to update
     */
    where?: AssessmentDamagedPartWhereInput
    /**
     * Limit how many AssessmentDamagedParts to update.
     */
    limit?: number
  }

  /**
   * AssessmentDamagedPart upsert
   */
  export type AssessmentDamagedPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentDamagedPart to update in case it exists.
     */
    where: AssessmentDamagedPartWhereUniqueInput
    /**
     * In case the AssessmentDamagedPart found by the `where` argument doesn't exist, create a new AssessmentDamagedPart with this data.
     */
    create: XOR<AssessmentDamagedPartCreateInput, AssessmentDamagedPartUncheckedCreateInput>
    /**
     * In case the AssessmentDamagedPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentDamagedPartUpdateInput, AssessmentDamagedPartUncheckedUpdateInput>
  }

  /**
   * AssessmentDamagedPart delete
   */
  export type AssessmentDamagedPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
    /**
     * Filter which AssessmentDamagedPart to delete.
     */
    where: AssessmentDamagedPartWhereUniqueInput
  }

  /**
   * AssessmentDamagedPart deleteMany
   */
  export type AssessmentDamagedPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentDamagedParts to delete
     */
    where?: AssessmentDamagedPartWhereInput
    /**
     * Limit how many AssessmentDamagedParts to delete.
     */
    limit?: number
  }

  /**
   * AssessmentDamagedPart without action
   */
  export type AssessmentDamagedPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentDamagedPart
     */
    select?: AssessmentDamagedPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentDamagedPart
     */
    omit?: AssessmentDamagedPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentDamagedPartInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentReplacementPart
   */

  export type AggregateAssessmentReplacementPart = {
    _count: AssessmentReplacementPartCountAggregateOutputType | null
    _avg: AssessmentReplacementPartAvgAggregateOutputType | null
    _sum: AssessmentReplacementPartSumAggregateOutputType | null
    _min: AssessmentReplacementPartMinAggregateOutputType | null
    _max: AssessmentReplacementPartMaxAggregateOutputType | null
  }

  export type AssessmentReplacementPartAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    subtotal: number | null
  }

  export type AssessmentReplacementPartSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    subtotal: number | null
  }

  export type AssessmentReplacementPartMinAggregateOutputType = {
    id: string | null
    partName: string | null
    partNumber: string | null
    quantity: number | null
    unitPrice: number | null
    subtotal: number | null
    confirmed: boolean | null
    vehiclePartId: string | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type AssessmentReplacementPartMaxAggregateOutputType = {
    id: string | null
    partName: string | null
    partNumber: string | null
    quantity: number | null
    unitPrice: number | null
    subtotal: number | null
    confirmed: boolean | null
    vehiclePartId: string | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type AssessmentReplacementPartCountAggregateOutputType = {
    id: number
    partName: number
    partNumber: number
    quantity: number
    unitPrice: number
    subtotal: number
    confirmed: number
    vehiclePartId: number
    assessmentId: number
    createdAt: number
    _all: number
  }


  export type AssessmentReplacementPartAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    subtotal?: true
  }

  export type AssessmentReplacementPartSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    subtotal?: true
  }

  export type AssessmentReplacementPartMinAggregateInputType = {
    id?: true
    partName?: true
    partNumber?: true
    quantity?: true
    unitPrice?: true
    subtotal?: true
    confirmed?: true
    vehiclePartId?: true
    assessmentId?: true
    createdAt?: true
  }

  export type AssessmentReplacementPartMaxAggregateInputType = {
    id?: true
    partName?: true
    partNumber?: true
    quantity?: true
    unitPrice?: true
    subtotal?: true
    confirmed?: true
    vehiclePartId?: true
    assessmentId?: true
    createdAt?: true
  }

  export type AssessmentReplacementPartCountAggregateInputType = {
    id?: true
    partName?: true
    partNumber?: true
    quantity?: true
    unitPrice?: true
    subtotal?: true
    confirmed?: true
    vehiclePartId?: true
    assessmentId?: true
    createdAt?: true
    _all?: true
  }

  export type AssessmentReplacementPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentReplacementPart to aggregate.
     */
    where?: AssessmentReplacementPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentReplacementParts to fetch.
     */
    orderBy?: AssessmentReplacementPartOrderByWithRelationInput | AssessmentReplacementPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentReplacementPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentReplacementParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentReplacementParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentReplacementParts
    **/
    _count?: true | AssessmentReplacementPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentReplacementPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentReplacementPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentReplacementPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentReplacementPartMaxAggregateInputType
  }

  export type GetAssessmentReplacementPartAggregateType<T extends AssessmentReplacementPartAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentReplacementPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentReplacementPart[P]>
      : GetScalarType<T[P], AggregateAssessmentReplacementPart[P]>
  }




  export type AssessmentReplacementPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentReplacementPartWhereInput
    orderBy?: AssessmentReplacementPartOrderByWithAggregationInput | AssessmentReplacementPartOrderByWithAggregationInput[]
    by: AssessmentReplacementPartScalarFieldEnum[] | AssessmentReplacementPartScalarFieldEnum
    having?: AssessmentReplacementPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentReplacementPartCountAggregateInputType | true
    _avg?: AssessmentReplacementPartAvgAggregateInputType
    _sum?: AssessmentReplacementPartSumAggregateInputType
    _min?: AssessmentReplacementPartMinAggregateInputType
    _max?: AssessmentReplacementPartMaxAggregateInputType
  }

  export type AssessmentReplacementPartGroupByOutputType = {
    id: string
    partName: string
    partNumber: string | null
    quantity: number
    unitPrice: number
    subtotal: number
    confirmed: boolean
    vehiclePartId: string | null
    assessmentId: string
    createdAt: Date
    _count: AssessmentReplacementPartCountAggregateOutputType | null
    _avg: AssessmentReplacementPartAvgAggregateOutputType | null
    _sum: AssessmentReplacementPartSumAggregateOutputType | null
    _min: AssessmentReplacementPartMinAggregateOutputType | null
    _max: AssessmentReplacementPartMaxAggregateOutputType | null
  }

  type GetAssessmentReplacementPartGroupByPayload<T extends AssessmentReplacementPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentReplacementPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentReplacementPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentReplacementPartGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentReplacementPartGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentReplacementPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partName?: boolean
    partNumber?: boolean
    quantity?: boolean
    unitPrice?: boolean
    subtotal?: boolean
    confirmed?: boolean
    vehiclePartId?: boolean
    assessmentId?: boolean
    createdAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentReplacementPart"]>



  export type AssessmentReplacementPartSelectScalar = {
    id?: boolean
    partName?: boolean
    partNumber?: boolean
    quantity?: boolean
    unitPrice?: boolean
    subtotal?: boolean
    confirmed?: boolean
    vehiclePartId?: boolean
    assessmentId?: boolean
    createdAt?: boolean
  }

  export type AssessmentReplacementPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partName" | "partNumber" | "quantity" | "unitPrice" | "subtotal" | "confirmed" | "vehiclePartId" | "assessmentId" | "createdAt", ExtArgs["result"]["assessmentReplacementPart"]>
  export type AssessmentReplacementPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentReplacementPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentReplacementPart"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      partName: string
      partNumber: string | null
      quantity: number
      unitPrice: number
      subtotal: number
      confirmed: boolean
      vehiclePartId: string | null
      assessmentId: string
      createdAt: Date
    }, ExtArgs["result"]["assessmentReplacementPart"]>
    composites: {}
  }

  type AssessmentReplacementPartGetPayload<S extends boolean | null | undefined | AssessmentReplacementPartDefaultArgs> = $Result.GetResult<Prisma.$AssessmentReplacementPartPayload, S>

  type AssessmentReplacementPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentReplacementPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentReplacementPartCountAggregateInputType | true
    }

  export interface AssessmentReplacementPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentReplacementPart'], meta: { name: 'AssessmentReplacementPart' } }
    /**
     * Find zero or one AssessmentReplacementPart that matches the filter.
     * @param {AssessmentReplacementPartFindUniqueArgs} args - Arguments to find a AssessmentReplacementPart
     * @example
     * // Get one AssessmentReplacementPart
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentReplacementPartFindUniqueArgs>(args: SelectSubset<T, AssessmentReplacementPartFindUniqueArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentReplacementPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentReplacementPartFindUniqueOrThrowArgs} args - Arguments to find a AssessmentReplacementPart
     * @example
     * // Get one AssessmentReplacementPart
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentReplacementPartFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentReplacementPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentReplacementPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartFindFirstArgs} args - Arguments to find a AssessmentReplacementPart
     * @example
     * // Get one AssessmentReplacementPart
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentReplacementPartFindFirstArgs>(args?: SelectSubset<T, AssessmentReplacementPartFindFirstArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentReplacementPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartFindFirstOrThrowArgs} args - Arguments to find a AssessmentReplacementPart
     * @example
     * // Get one AssessmentReplacementPart
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentReplacementPartFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentReplacementPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentReplacementParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentReplacementParts
     * const assessmentReplacementParts = await prisma.assessmentReplacementPart.findMany()
     * 
     * // Get first 10 AssessmentReplacementParts
     * const assessmentReplacementParts = await prisma.assessmentReplacementPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentReplacementPartWithIdOnly = await prisma.assessmentReplacementPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentReplacementPartFindManyArgs>(args?: SelectSubset<T, AssessmentReplacementPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentReplacementPart.
     * @param {AssessmentReplacementPartCreateArgs} args - Arguments to create a AssessmentReplacementPart.
     * @example
     * // Create one AssessmentReplacementPart
     * const AssessmentReplacementPart = await prisma.assessmentReplacementPart.create({
     *   data: {
     *     // ... data to create a AssessmentReplacementPart
     *   }
     * })
     * 
     */
    create<T extends AssessmentReplacementPartCreateArgs>(args: SelectSubset<T, AssessmentReplacementPartCreateArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentReplacementParts.
     * @param {AssessmentReplacementPartCreateManyArgs} args - Arguments to create many AssessmentReplacementParts.
     * @example
     * // Create many AssessmentReplacementParts
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentReplacementPartCreateManyArgs>(args?: SelectSubset<T, AssessmentReplacementPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AssessmentReplacementPart.
     * @param {AssessmentReplacementPartDeleteArgs} args - Arguments to delete one AssessmentReplacementPart.
     * @example
     * // Delete one AssessmentReplacementPart
     * const AssessmentReplacementPart = await prisma.assessmentReplacementPart.delete({
     *   where: {
     *     // ... filter to delete one AssessmentReplacementPart
     *   }
     * })
     * 
     */
    delete<T extends AssessmentReplacementPartDeleteArgs>(args: SelectSubset<T, AssessmentReplacementPartDeleteArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentReplacementPart.
     * @param {AssessmentReplacementPartUpdateArgs} args - Arguments to update one AssessmentReplacementPart.
     * @example
     * // Update one AssessmentReplacementPart
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentReplacementPartUpdateArgs>(args: SelectSubset<T, AssessmentReplacementPartUpdateArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentReplacementParts.
     * @param {AssessmentReplacementPartDeleteManyArgs} args - Arguments to filter AssessmentReplacementParts to delete.
     * @example
     * // Delete a few AssessmentReplacementParts
     * const { count } = await prisma.assessmentReplacementPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentReplacementPartDeleteManyArgs>(args?: SelectSubset<T, AssessmentReplacementPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentReplacementParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentReplacementParts
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentReplacementPartUpdateManyArgs>(args: SelectSubset<T, AssessmentReplacementPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssessmentReplacementPart.
     * @param {AssessmentReplacementPartUpsertArgs} args - Arguments to update or create a AssessmentReplacementPart.
     * @example
     * // Update or create a AssessmentReplacementPart
     * const assessmentReplacementPart = await prisma.assessmentReplacementPart.upsert({
     *   create: {
     *     // ... data to create a AssessmentReplacementPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentReplacementPart we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentReplacementPartUpsertArgs>(args: SelectSubset<T, AssessmentReplacementPartUpsertArgs<ExtArgs>>): Prisma__AssessmentReplacementPartClient<$Result.GetResult<Prisma.$AssessmentReplacementPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentReplacementParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartCountArgs} args - Arguments to filter AssessmentReplacementParts to count.
     * @example
     * // Count the number of AssessmentReplacementParts
     * const count = await prisma.assessmentReplacementPart.count({
     *   where: {
     *     // ... the filter for the AssessmentReplacementParts we want to count
     *   }
     * })
    **/
    count<T extends AssessmentReplacementPartCountArgs>(
      args?: Subset<T, AssessmentReplacementPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentReplacementPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentReplacementPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentReplacementPartAggregateArgs>(args: Subset<T, AssessmentReplacementPartAggregateArgs>): Prisma.PrismaPromise<GetAssessmentReplacementPartAggregateType<T>>

    /**
     * Group by AssessmentReplacementPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentReplacementPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentReplacementPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentReplacementPartGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentReplacementPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentReplacementPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentReplacementPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentReplacementPart model
   */
  readonly fields: AssessmentReplacementPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentReplacementPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentReplacementPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentReplacementPart model
   */
  interface AssessmentReplacementPartFieldRefs {
    readonly id: FieldRef<"AssessmentReplacementPart", 'String'>
    readonly partName: FieldRef<"AssessmentReplacementPart", 'String'>
    readonly partNumber: FieldRef<"AssessmentReplacementPart", 'String'>
    readonly quantity: FieldRef<"AssessmentReplacementPart", 'Int'>
    readonly unitPrice: FieldRef<"AssessmentReplacementPart", 'Float'>
    readonly subtotal: FieldRef<"AssessmentReplacementPart", 'Float'>
    readonly confirmed: FieldRef<"AssessmentReplacementPart", 'Boolean'>
    readonly vehiclePartId: FieldRef<"AssessmentReplacementPart", 'String'>
    readonly assessmentId: FieldRef<"AssessmentReplacementPart", 'String'>
    readonly createdAt: FieldRef<"AssessmentReplacementPart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentReplacementPart findUnique
   */
  export type AssessmentReplacementPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentReplacementPart to fetch.
     */
    where: AssessmentReplacementPartWhereUniqueInput
  }

  /**
   * AssessmentReplacementPart findUniqueOrThrow
   */
  export type AssessmentReplacementPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentReplacementPart to fetch.
     */
    where: AssessmentReplacementPartWhereUniqueInput
  }

  /**
   * AssessmentReplacementPart findFirst
   */
  export type AssessmentReplacementPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentReplacementPart to fetch.
     */
    where?: AssessmentReplacementPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentReplacementParts to fetch.
     */
    orderBy?: AssessmentReplacementPartOrderByWithRelationInput | AssessmentReplacementPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentReplacementParts.
     */
    cursor?: AssessmentReplacementPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentReplacementParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentReplacementParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentReplacementParts.
     */
    distinct?: AssessmentReplacementPartScalarFieldEnum | AssessmentReplacementPartScalarFieldEnum[]
  }

  /**
   * AssessmentReplacementPart findFirstOrThrow
   */
  export type AssessmentReplacementPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentReplacementPart to fetch.
     */
    where?: AssessmentReplacementPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentReplacementParts to fetch.
     */
    orderBy?: AssessmentReplacementPartOrderByWithRelationInput | AssessmentReplacementPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentReplacementParts.
     */
    cursor?: AssessmentReplacementPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentReplacementParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentReplacementParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentReplacementParts.
     */
    distinct?: AssessmentReplacementPartScalarFieldEnum | AssessmentReplacementPartScalarFieldEnum[]
  }

  /**
   * AssessmentReplacementPart findMany
   */
  export type AssessmentReplacementPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentReplacementParts to fetch.
     */
    where?: AssessmentReplacementPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentReplacementParts to fetch.
     */
    orderBy?: AssessmentReplacementPartOrderByWithRelationInput | AssessmentReplacementPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentReplacementParts.
     */
    cursor?: AssessmentReplacementPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentReplacementParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentReplacementParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentReplacementParts.
     */
    distinct?: AssessmentReplacementPartScalarFieldEnum | AssessmentReplacementPartScalarFieldEnum[]
  }

  /**
   * AssessmentReplacementPart create
   */
  export type AssessmentReplacementPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentReplacementPart.
     */
    data: XOR<AssessmentReplacementPartCreateInput, AssessmentReplacementPartUncheckedCreateInput>
  }

  /**
   * AssessmentReplacementPart createMany
   */
  export type AssessmentReplacementPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentReplacementParts.
     */
    data: AssessmentReplacementPartCreateManyInput | AssessmentReplacementPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentReplacementPart update
   */
  export type AssessmentReplacementPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentReplacementPart.
     */
    data: XOR<AssessmentReplacementPartUpdateInput, AssessmentReplacementPartUncheckedUpdateInput>
    /**
     * Choose, which AssessmentReplacementPart to update.
     */
    where: AssessmentReplacementPartWhereUniqueInput
  }

  /**
   * AssessmentReplacementPart updateMany
   */
  export type AssessmentReplacementPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentReplacementParts.
     */
    data: XOR<AssessmentReplacementPartUpdateManyMutationInput, AssessmentReplacementPartUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentReplacementParts to update
     */
    where?: AssessmentReplacementPartWhereInput
    /**
     * Limit how many AssessmentReplacementParts to update.
     */
    limit?: number
  }

  /**
   * AssessmentReplacementPart upsert
   */
  export type AssessmentReplacementPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentReplacementPart to update in case it exists.
     */
    where: AssessmentReplacementPartWhereUniqueInput
    /**
     * In case the AssessmentReplacementPart found by the `where` argument doesn't exist, create a new AssessmentReplacementPart with this data.
     */
    create: XOR<AssessmentReplacementPartCreateInput, AssessmentReplacementPartUncheckedCreateInput>
    /**
     * In case the AssessmentReplacementPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentReplacementPartUpdateInput, AssessmentReplacementPartUncheckedUpdateInput>
  }

  /**
   * AssessmentReplacementPart delete
   */
  export type AssessmentReplacementPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
    /**
     * Filter which AssessmentReplacementPart to delete.
     */
    where: AssessmentReplacementPartWhereUniqueInput
  }

  /**
   * AssessmentReplacementPart deleteMany
   */
  export type AssessmentReplacementPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentReplacementParts to delete
     */
    where?: AssessmentReplacementPartWhereInput
    /**
     * Limit how many AssessmentReplacementParts to delete.
     */
    limit?: number
  }

  /**
   * AssessmentReplacementPart without action
   */
  export type AssessmentReplacementPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentReplacementPart
     */
    select?: AssessmentReplacementPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentReplacementPart
     */
    omit?: AssessmentReplacementPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentReplacementPartInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    name: string | null
    website: string | null
    createdAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    website: string | null
    createdAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    name: number
    website: number
    createdAt: number
    _all: number
  }


  export type SupplierMinAggregateInputType = {
    id?: true
    name?: true
    website?: true
    createdAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    name?: true
    website?: true
    createdAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    name?: true
    website?: true
    createdAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    name: string
    website: string | null
    createdAt: Date
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    website?: boolean
    createdAt?: boolean
    prices?: boolean | Supplier$pricesArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>



  export type SupplierSelectScalar = {
    id?: boolean
    name?: boolean
    website?: boolean
    createdAt?: boolean
  }

  export type SupplierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "website" | "createdAt", ExtArgs["result"]["supplier"]>
  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prices?: boolean | Supplier$pricesArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      prices: Prisma.$SupplierPartPricePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      website: string | null
      createdAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prices<T extends Supplier$pricesArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$pricesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supplier model
   */
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly website: FieldRef<"Supplier", 'String'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to delete.
     */
    limit?: number
  }

  /**
   * Supplier.prices
   */
  export type Supplier$pricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    where?: SupplierPartPriceWhereInput
    orderBy?: SupplierPartPriceOrderByWithRelationInput | SupplierPartPriceOrderByWithRelationInput[]
    cursor?: SupplierPartPriceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplierPartPriceScalarFieldEnum | SupplierPartPriceScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model SupplierPartPrice
   */

  export type AggregateSupplierPartPrice = {
    _count: SupplierPartPriceCountAggregateOutputType | null
    _avg: SupplierPartPriceAvgAggregateOutputType | null
    _sum: SupplierPartPriceSumAggregateOutputType | null
    _min: SupplierPartPriceMinAggregateOutputType | null
    _max: SupplierPartPriceMaxAggregateOutputType | null
  }

  export type SupplierPartPriceAvgAggregateOutputType = {
    vehicleYear: number | null
    price: number | null
  }

  export type SupplierPartPriceSumAggregateOutputType = {
    vehicleYear: number | null
    price: number | null
  }

  export type SupplierPartPriceMinAggregateOutputType = {
    id: string | null
    supplierId: string | null
    partName: string | null
    vehicleMake: string | null
    vehicleModel: string | null
    vehicleYear: number | null
    partNumber: string | null
    price: number | null
    currency: string | null
    availability: string | null
    brand: string | null
    condition: string | null
    url: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierPartPriceMaxAggregateOutputType = {
    id: string | null
    supplierId: string | null
    partName: string | null
    vehicleMake: string | null
    vehicleModel: string | null
    vehicleYear: number | null
    partNumber: string | null
    price: number | null
    currency: string | null
    availability: string | null
    brand: string | null
    condition: string | null
    url: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierPartPriceCountAggregateOutputType = {
    id: number
    supplierId: number
    partName: number
    vehicleMake: number
    vehicleModel: number
    vehicleYear: number
    partNumber: number
    price: number
    currency: number
    availability: number
    brand: number
    condition: number
    url: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierPartPriceAvgAggregateInputType = {
    vehicleYear?: true
    price?: true
  }

  export type SupplierPartPriceSumAggregateInputType = {
    vehicleYear?: true
    price?: true
  }

  export type SupplierPartPriceMinAggregateInputType = {
    id?: true
    supplierId?: true
    partName?: true
    vehicleMake?: true
    vehicleModel?: true
    vehicleYear?: true
    partNumber?: true
    price?: true
    currency?: true
    availability?: true
    brand?: true
    condition?: true
    url?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierPartPriceMaxAggregateInputType = {
    id?: true
    supplierId?: true
    partName?: true
    vehicleMake?: true
    vehicleModel?: true
    vehicleYear?: true
    partNumber?: true
    price?: true
    currency?: true
    availability?: true
    brand?: true
    condition?: true
    url?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierPartPriceCountAggregateInputType = {
    id?: true
    supplierId?: true
    partName?: true
    vehicleMake?: true
    vehicleModel?: true
    vehicleYear?: true
    partNumber?: true
    price?: true
    currency?: true
    availability?: true
    brand?: true
    condition?: true
    url?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierPartPriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplierPartPrice to aggregate.
     */
    where?: SupplierPartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierPartPrices to fetch.
     */
    orderBy?: SupplierPartPriceOrderByWithRelationInput | SupplierPartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierPartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierPartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierPartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupplierPartPrices
    **/
    _count?: true | SupplierPartPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplierPartPriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplierPartPriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierPartPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierPartPriceMaxAggregateInputType
  }

  export type GetSupplierPartPriceAggregateType<T extends SupplierPartPriceAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplierPartPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplierPartPrice[P]>
      : GetScalarType<T[P], AggregateSupplierPartPrice[P]>
  }




  export type SupplierPartPriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierPartPriceWhereInput
    orderBy?: SupplierPartPriceOrderByWithAggregationInput | SupplierPartPriceOrderByWithAggregationInput[]
    by: SupplierPartPriceScalarFieldEnum[] | SupplierPartPriceScalarFieldEnum
    having?: SupplierPartPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierPartPriceCountAggregateInputType | true
    _avg?: SupplierPartPriceAvgAggregateInputType
    _sum?: SupplierPartPriceSumAggregateInputType
    _min?: SupplierPartPriceMinAggregateInputType
    _max?: SupplierPartPriceMaxAggregateInputType
  }

  export type SupplierPartPriceGroupByOutputType = {
    id: string
    supplierId: string
    partName: string
    vehicleMake: string | null
    vehicleModel: string | null
    vehicleYear: number | null
    partNumber: string | null
    price: number
    currency: string
    availability: string
    brand: string | null
    condition: string
    url: string | null
    source: string
    createdAt: Date
    updatedAt: Date
    _count: SupplierPartPriceCountAggregateOutputType | null
    _avg: SupplierPartPriceAvgAggregateOutputType | null
    _sum: SupplierPartPriceSumAggregateOutputType | null
    _min: SupplierPartPriceMinAggregateOutputType | null
    _max: SupplierPartPriceMaxAggregateOutputType | null
  }

  type GetSupplierPartPriceGroupByPayload<T extends SupplierPartPriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierPartPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierPartPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierPartPriceGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierPartPriceGroupByOutputType[P]>
        }
      >
    >


  export type SupplierPartPriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplierId?: boolean
    partName?: boolean
    vehicleMake?: boolean
    vehicleModel?: boolean
    vehicleYear?: boolean
    partNumber?: boolean
    price?: boolean
    currency?: boolean
    availability?: boolean
    brand?: boolean
    condition?: boolean
    url?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplierPartPrice"]>



  export type SupplierPartPriceSelectScalar = {
    id?: boolean
    supplierId?: boolean
    partName?: boolean
    vehicleMake?: boolean
    vehicleModel?: boolean
    vehicleYear?: boolean
    partNumber?: boolean
    price?: boolean
    currency?: boolean
    availability?: boolean
    brand?: boolean
    condition?: boolean
    url?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierPartPriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "supplierId" | "partName" | "vehicleMake" | "vehicleModel" | "vehicleYear" | "partNumber" | "price" | "currency" | "availability" | "brand" | "condition" | "url" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["supplierPartPrice"]>
  export type SupplierPartPriceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }

  export type $SupplierPartPricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupplierPartPrice"
    objects: {
      supplier: Prisma.$SupplierPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      supplierId: string
      partName: string
      vehicleMake: string | null
      vehicleModel: string | null
      vehicleYear: number | null
      partNumber: string | null
      price: number
      currency: string
      availability: string
      brand: string | null
      condition: string
      url: string | null
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplierPartPrice"]>
    composites: {}
  }

  type SupplierPartPriceGetPayload<S extends boolean | null | undefined | SupplierPartPriceDefaultArgs> = $Result.GetResult<Prisma.$SupplierPartPricePayload, S>

  type SupplierPartPriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierPartPriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierPartPriceCountAggregateInputType | true
    }

  export interface SupplierPartPriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupplierPartPrice'], meta: { name: 'SupplierPartPrice' } }
    /**
     * Find zero or one SupplierPartPrice that matches the filter.
     * @param {SupplierPartPriceFindUniqueArgs} args - Arguments to find a SupplierPartPrice
     * @example
     * // Get one SupplierPartPrice
     * const supplierPartPrice = await prisma.supplierPartPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierPartPriceFindUniqueArgs>(args: SelectSubset<T, SupplierPartPriceFindUniqueArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupplierPartPrice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierPartPriceFindUniqueOrThrowArgs} args - Arguments to find a SupplierPartPrice
     * @example
     * // Get one SupplierPartPrice
     * const supplierPartPrice = await prisma.supplierPartPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierPartPriceFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierPartPriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupplierPartPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceFindFirstArgs} args - Arguments to find a SupplierPartPrice
     * @example
     * // Get one SupplierPartPrice
     * const supplierPartPrice = await prisma.supplierPartPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierPartPriceFindFirstArgs>(args?: SelectSubset<T, SupplierPartPriceFindFirstArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupplierPartPrice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceFindFirstOrThrowArgs} args - Arguments to find a SupplierPartPrice
     * @example
     * // Get one SupplierPartPrice
     * const supplierPartPrice = await prisma.supplierPartPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierPartPriceFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierPartPriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupplierPartPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupplierPartPrices
     * const supplierPartPrices = await prisma.supplierPartPrice.findMany()
     * 
     * // Get first 10 SupplierPartPrices
     * const supplierPartPrices = await prisma.supplierPartPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierPartPriceWithIdOnly = await prisma.supplierPartPrice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierPartPriceFindManyArgs>(args?: SelectSubset<T, SupplierPartPriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupplierPartPrice.
     * @param {SupplierPartPriceCreateArgs} args - Arguments to create a SupplierPartPrice.
     * @example
     * // Create one SupplierPartPrice
     * const SupplierPartPrice = await prisma.supplierPartPrice.create({
     *   data: {
     *     // ... data to create a SupplierPartPrice
     *   }
     * })
     * 
     */
    create<T extends SupplierPartPriceCreateArgs>(args: SelectSubset<T, SupplierPartPriceCreateArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupplierPartPrices.
     * @param {SupplierPartPriceCreateManyArgs} args - Arguments to create many SupplierPartPrices.
     * @example
     * // Create many SupplierPartPrices
     * const supplierPartPrice = await prisma.supplierPartPrice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierPartPriceCreateManyArgs>(args?: SelectSubset<T, SupplierPartPriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SupplierPartPrice.
     * @param {SupplierPartPriceDeleteArgs} args - Arguments to delete one SupplierPartPrice.
     * @example
     * // Delete one SupplierPartPrice
     * const SupplierPartPrice = await prisma.supplierPartPrice.delete({
     *   where: {
     *     // ... filter to delete one SupplierPartPrice
     *   }
     * })
     * 
     */
    delete<T extends SupplierPartPriceDeleteArgs>(args: SelectSubset<T, SupplierPartPriceDeleteArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupplierPartPrice.
     * @param {SupplierPartPriceUpdateArgs} args - Arguments to update one SupplierPartPrice.
     * @example
     * // Update one SupplierPartPrice
     * const supplierPartPrice = await prisma.supplierPartPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierPartPriceUpdateArgs>(args: SelectSubset<T, SupplierPartPriceUpdateArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupplierPartPrices.
     * @param {SupplierPartPriceDeleteManyArgs} args - Arguments to filter SupplierPartPrices to delete.
     * @example
     * // Delete a few SupplierPartPrices
     * const { count } = await prisma.supplierPartPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierPartPriceDeleteManyArgs>(args?: SelectSubset<T, SupplierPartPriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplierPartPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupplierPartPrices
     * const supplierPartPrice = await prisma.supplierPartPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierPartPriceUpdateManyArgs>(args: SelectSubset<T, SupplierPartPriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupplierPartPrice.
     * @param {SupplierPartPriceUpsertArgs} args - Arguments to update or create a SupplierPartPrice.
     * @example
     * // Update or create a SupplierPartPrice
     * const supplierPartPrice = await prisma.supplierPartPrice.upsert({
     *   create: {
     *     // ... data to create a SupplierPartPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupplierPartPrice we want to update
     *   }
     * })
     */
    upsert<T extends SupplierPartPriceUpsertArgs>(args: SelectSubset<T, SupplierPartPriceUpsertArgs<ExtArgs>>): Prisma__SupplierPartPriceClient<$Result.GetResult<Prisma.$SupplierPartPricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupplierPartPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceCountArgs} args - Arguments to filter SupplierPartPrices to count.
     * @example
     * // Count the number of SupplierPartPrices
     * const count = await prisma.supplierPartPrice.count({
     *   where: {
     *     // ... the filter for the SupplierPartPrices we want to count
     *   }
     * })
    **/
    count<T extends SupplierPartPriceCountArgs>(
      args?: Subset<T, SupplierPartPriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierPartPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupplierPartPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierPartPriceAggregateArgs>(args: Subset<T, SupplierPartPriceAggregateArgs>): Prisma.PrismaPromise<GetSupplierPartPriceAggregateType<T>>

    /**
     * Group by SupplierPartPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierPartPriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierPartPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierPartPriceGroupByArgs['orderBy'] }
        : { orderBy?: SupplierPartPriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierPartPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierPartPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupplierPartPrice model
   */
  readonly fields: SupplierPartPriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupplierPartPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierPartPriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplier<T extends SupplierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplierDefaultArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupplierPartPrice model
   */
  interface SupplierPartPriceFieldRefs {
    readonly id: FieldRef<"SupplierPartPrice", 'String'>
    readonly supplierId: FieldRef<"SupplierPartPrice", 'String'>
    readonly partName: FieldRef<"SupplierPartPrice", 'String'>
    readonly vehicleMake: FieldRef<"SupplierPartPrice", 'String'>
    readonly vehicleModel: FieldRef<"SupplierPartPrice", 'String'>
    readonly vehicleYear: FieldRef<"SupplierPartPrice", 'Int'>
    readonly partNumber: FieldRef<"SupplierPartPrice", 'String'>
    readonly price: FieldRef<"SupplierPartPrice", 'Float'>
    readonly currency: FieldRef<"SupplierPartPrice", 'String'>
    readonly availability: FieldRef<"SupplierPartPrice", 'String'>
    readonly brand: FieldRef<"SupplierPartPrice", 'String'>
    readonly condition: FieldRef<"SupplierPartPrice", 'String'>
    readonly url: FieldRef<"SupplierPartPrice", 'String'>
    readonly source: FieldRef<"SupplierPartPrice", 'String'>
    readonly createdAt: FieldRef<"SupplierPartPrice", 'DateTime'>
    readonly updatedAt: FieldRef<"SupplierPartPrice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupplierPartPrice findUnique
   */
  export type SupplierPartPriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierPartPrice to fetch.
     */
    where: SupplierPartPriceWhereUniqueInput
  }

  /**
   * SupplierPartPrice findUniqueOrThrow
   */
  export type SupplierPartPriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierPartPrice to fetch.
     */
    where: SupplierPartPriceWhereUniqueInput
  }

  /**
   * SupplierPartPrice findFirst
   */
  export type SupplierPartPriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierPartPrice to fetch.
     */
    where?: SupplierPartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierPartPrices to fetch.
     */
    orderBy?: SupplierPartPriceOrderByWithRelationInput | SupplierPartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplierPartPrices.
     */
    cursor?: SupplierPartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierPartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierPartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplierPartPrices.
     */
    distinct?: SupplierPartPriceScalarFieldEnum | SupplierPartPriceScalarFieldEnum[]
  }

  /**
   * SupplierPartPrice findFirstOrThrow
   */
  export type SupplierPartPriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierPartPrice to fetch.
     */
    where?: SupplierPartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierPartPrices to fetch.
     */
    orderBy?: SupplierPartPriceOrderByWithRelationInput | SupplierPartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplierPartPrices.
     */
    cursor?: SupplierPartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierPartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierPartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplierPartPrices.
     */
    distinct?: SupplierPartPriceScalarFieldEnum | SupplierPartPriceScalarFieldEnum[]
  }

  /**
   * SupplierPartPrice findMany
   */
  export type SupplierPartPriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * Filter, which SupplierPartPrices to fetch.
     */
    where?: SupplierPartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplierPartPrices to fetch.
     */
    orderBy?: SupplierPartPriceOrderByWithRelationInput | SupplierPartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupplierPartPrices.
     */
    cursor?: SupplierPartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplierPartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplierPartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplierPartPrices.
     */
    distinct?: SupplierPartPriceScalarFieldEnum | SupplierPartPriceScalarFieldEnum[]
  }

  /**
   * SupplierPartPrice create
   */
  export type SupplierPartPriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * The data needed to create a SupplierPartPrice.
     */
    data: XOR<SupplierPartPriceCreateInput, SupplierPartPriceUncheckedCreateInput>
  }

  /**
   * SupplierPartPrice createMany
   */
  export type SupplierPartPriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupplierPartPrices.
     */
    data: SupplierPartPriceCreateManyInput | SupplierPartPriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupplierPartPrice update
   */
  export type SupplierPartPriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * The data needed to update a SupplierPartPrice.
     */
    data: XOR<SupplierPartPriceUpdateInput, SupplierPartPriceUncheckedUpdateInput>
    /**
     * Choose, which SupplierPartPrice to update.
     */
    where: SupplierPartPriceWhereUniqueInput
  }

  /**
   * SupplierPartPrice updateMany
   */
  export type SupplierPartPriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupplierPartPrices.
     */
    data: XOR<SupplierPartPriceUpdateManyMutationInput, SupplierPartPriceUncheckedUpdateManyInput>
    /**
     * Filter which SupplierPartPrices to update
     */
    where?: SupplierPartPriceWhereInput
    /**
     * Limit how many SupplierPartPrices to update.
     */
    limit?: number
  }

  /**
   * SupplierPartPrice upsert
   */
  export type SupplierPartPriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * The filter to search for the SupplierPartPrice to update in case it exists.
     */
    where: SupplierPartPriceWhereUniqueInput
    /**
     * In case the SupplierPartPrice found by the `where` argument doesn't exist, create a new SupplierPartPrice with this data.
     */
    create: XOR<SupplierPartPriceCreateInput, SupplierPartPriceUncheckedCreateInput>
    /**
     * In case the SupplierPartPrice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierPartPriceUpdateInput, SupplierPartPriceUncheckedUpdateInput>
  }

  /**
   * SupplierPartPrice delete
   */
  export type SupplierPartPriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
    /**
     * Filter which SupplierPartPrice to delete.
     */
    where: SupplierPartPriceWhereUniqueInput
  }

  /**
   * SupplierPartPrice deleteMany
   */
  export type SupplierPartPriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplierPartPrices to delete
     */
    where?: SupplierPartPriceWhereInput
    /**
     * Limit how many SupplierPartPrices to delete.
     */
    limit?: number
  }

  /**
   * SupplierPartPrice without action
   */
  export type SupplierPartPriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierPartPrice
     */
    select?: SupplierPartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupplierPartPrice
     */
    omit?: SupplierPartPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierPartPriceInclude<ExtArgs> | null
  }


  /**
   * Model PartPrice
   */

  export type AggregatePartPrice = {
    _count: PartPriceCountAggregateOutputType | null
    _avg: PartPriceAvgAggregateOutputType | null
    _sum: PartPriceSumAggregateOutputType | null
    _min: PartPriceMinAggregateOutputType | null
    _max: PartPriceMaxAggregateOutputType | null
  }

  export type PartPriceAvgAggregateOutputType = {
    year: number | null
    price: number | null
  }

  export type PartPriceSumAggregateOutputType = {
    year: number | null
    price: number | null
  }

  export type PartPriceMinAggregateOutputType = {
    id: string | null
    make: string | null
    model: string | null
    year: number | null
    partName: string | null
    partNumber: string | null
    supplier: string | null
    price: number | null
    currency: string | null
    condition: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartPriceMaxAggregateOutputType = {
    id: string | null
    make: string | null
    model: string | null
    year: number | null
    partName: string | null
    partNumber: string | null
    supplier: string | null
    price: number | null
    currency: string | null
    condition: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartPriceCountAggregateOutputType = {
    id: number
    make: number
    model: number
    year: number
    partName: number
    partNumber: number
    supplier: number
    price: number
    currency: number
    condition: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartPriceAvgAggregateInputType = {
    year?: true
    price?: true
  }

  export type PartPriceSumAggregateInputType = {
    year?: true
    price?: true
  }

  export type PartPriceMinAggregateInputType = {
    id?: true
    make?: true
    model?: true
    year?: true
    partName?: true
    partNumber?: true
    supplier?: true
    price?: true
    currency?: true
    condition?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartPriceMaxAggregateInputType = {
    id?: true
    make?: true
    model?: true
    year?: true
    partName?: true
    partNumber?: true
    supplier?: true
    price?: true
    currency?: true
    condition?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartPriceCountAggregateInputType = {
    id?: true
    make?: true
    model?: true
    year?: true
    partName?: true
    partNumber?: true
    supplier?: true
    price?: true
    currency?: true
    condition?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartPriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartPrice to aggregate.
     */
    where?: PartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartPrices to fetch.
     */
    orderBy?: PartPriceOrderByWithRelationInput | PartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PartPrices
    **/
    _count?: true | PartPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartPriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartPriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartPriceMaxAggregateInputType
  }

  export type GetPartPriceAggregateType<T extends PartPriceAggregateArgs> = {
        [P in keyof T & keyof AggregatePartPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartPrice[P]>
      : GetScalarType<T[P], AggregatePartPrice[P]>
  }




  export type PartPriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartPriceWhereInput
    orderBy?: PartPriceOrderByWithAggregationInput | PartPriceOrderByWithAggregationInput[]
    by: PartPriceScalarFieldEnum[] | PartPriceScalarFieldEnum
    having?: PartPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartPriceCountAggregateInputType | true
    _avg?: PartPriceAvgAggregateInputType
    _sum?: PartPriceSumAggregateInputType
    _min?: PartPriceMinAggregateInputType
    _max?: PartPriceMaxAggregateInputType
  }

  export type PartPriceGroupByOutputType = {
    id: string
    make: string
    model: string
    year: number | null
    partName: string
    partNumber: string | null
    supplier: string
    price: number
    currency: string
    condition: string
    source: string
    createdAt: Date
    updatedAt: Date
    _count: PartPriceCountAggregateOutputType | null
    _avg: PartPriceAvgAggregateOutputType | null
    _sum: PartPriceSumAggregateOutputType | null
    _min: PartPriceMinAggregateOutputType | null
    _max: PartPriceMaxAggregateOutputType | null
  }

  type GetPartPriceGroupByPayload<T extends PartPriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartPriceGroupByOutputType[P]>
            : GetScalarType<T[P], PartPriceGroupByOutputType[P]>
        }
      >
    >


  export type PartPriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    partName?: boolean
    partNumber?: boolean
    supplier?: boolean
    price?: boolean
    currency?: boolean
    condition?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partPrice"]>



  export type PartPriceSelectScalar = {
    id?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    partName?: boolean
    partNumber?: boolean
    supplier?: boolean
    price?: boolean
    currency?: boolean
    condition?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartPriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "make" | "model" | "year" | "partName" | "partNumber" | "supplier" | "price" | "currency" | "condition" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["partPrice"]>

  export type $PartPricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PartPrice"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      make: string
      model: string
      year: number | null
      partName: string
      partNumber: string | null
      supplier: string
      price: number
      currency: string
      condition: string
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partPrice"]>
    composites: {}
  }

  type PartPriceGetPayload<S extends boolean | null | undefined | PartPriceDefaultArgs> = $Result.GetResult<Prisma.$PartPricePayload, S>

  type PartPriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartPriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartPriceCountAggregateInputType | true
    }

  export interface PartPriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PartPrice'], meta: { name: 'PartPrice' } }
    /**
     * Find zero or one PartPrice that matches the filter.
     * @param {PartPriceFindUniqueArgs} args - Arguments to find a PartPrice
     * @example
     * // Get one PartPrice
     * const partPrice = await prisma.partPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartPriceFindUniqueArgs>(args: SelectSubset<T, PartPriceFindUniqueArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PartPrice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartPriceFindUniqueOrThrowArgs} args - Arguments to find a PartPrice
     * @example
     * // Get one PartPrice
     * const partPrice = await prisma.partPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartPriceFindUniqueOrThrowArgs>(args: SelectSubset<T, PartPriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PartPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceFindFirstArgs} args - Arguments to find a PartPrice
     * @example
     * // Get one PartPrice
     * const partPrice = await prisma.partPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartPriceFindFirstArgs>(args?: SelectSubset<T, PartPriceFindFirstArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PartPrice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceFindFirstOrThrowArgs} args - Arguments to find a PartPrice
     * @example
     * // Get one PartPrice
     * const partPrice = await prisma.partPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartPriceFindFirstOrThrowArgs>(args?: SelectSubset<T, PartPriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PartPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PartPrices
     * const partPrices = await prisma.partPrice.findMany()
     * 
     * // Get first 10 PartPrices
     * const partPrices = await prisma.partPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partPriceWithIdOnly = await prisma.partPrice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartPriceFindManyArgs>(args?: SelectSubset<T, PartPriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PartPrice.
     * @param {PartPriceCreateArgs} args - Arguments to create a PartPrice.
     * @example
     * // Create one PartPrice
     * const PartPrice = await prisma.partPrice.create({
     *   data: {
     *     // ... data to create a PartPrice
     *   }
     * })
     * 
     */
    create<T extends PartPriceCreateArgs>(args: SelectSubset<T, PartPriceCreateArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PartPrices.
     * @param {PartPriceCreateManyArgs} args - Arguments to create many PartPrices.
     * @example
     * // Create many PartPrices
     * const partPrice = await prisma.partPrice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartPriceCreateManyArgs>(args?: SelectSubset<T, PartPriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PartPrice.
     * @param {PartPriceDeleteArgs} args - Arguments to delete one PartPrice.
     * @example
     * // Delete one PartPrice
     * const PartPrice = await prisma.partPrice.delete({
     *   where: {
     *     // ... filter to delete one PartPrice
     *   }
     * })
     * 
     */
    delete<T extends PartPriceDeleteArgs>(args: SelectSubset<T, PartPriceDeleteArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PartPrice.
     * @param {PartPriceUpdateArgs} args - Arguments to update one PartPrice.
     * @example
     * // Update one PartPrice
     * const partPrice = await prisma.partPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartPriceUpdateArgs>(args: SelectSubset<T, PartPriceUpdateArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PartPrices.
     * @param {PartPriceDeleteManyArgs} args - Arguments to filter PartPrices to delete.
     * @example
     * // Delete a few PartPrices
     * const { count } = await prisma.partPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartPriceDeleteManyArgs>(args?: SelectSubset<T, PartPriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PartPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PartPrices
     * const partPrice = await prisma.partPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartPriceUpdateManyArgs>(args: SelectSubset<T, PartPriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PartPrice.
     * @param {PartPriceUpsertArgs} args - Arguments to update or create a PartPrice.
     * @example
     * // Update or create a PartPrice
     * const partPrice = await prisma.partPrice.upsert({
     *   create: {
     *     // ... data to create a PartPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PartPrice we want to update
     *   }
     * })
     */
    upsert<T extends PartPriceUpsertArgs>(args: SelectSubset<T, PartPriceUpsertArgs<ExtArgs>>): Prisma__PartPriceClient<$Result.GetResult<Prisma.$PartPricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PartPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceCountArgs} args - Arguments to filter PartPrices to count.
     * @example
     * // Count the number of PartPrices
     * const count = await prisma.partPrice.count({
     *   where: {
     *     // ... the filter for the PartPrices we want to count
     *   }
     * })
    **/
    count<T extends PartPriceCountArgs>(
      args?: Subset<T, PartPriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PartPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartPriceAggregateArgs>(args: Subset<T, PartPriceAggregateArgs>): Prisma.PrismaPromise<GetPartPriceAggregateType<T>>

    /**
     * Group by PartPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartPriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartPriceGroupByArgs['orderBy'] }
        : { orderBy?: PartPriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PartPrice model
   */
  readonly fields: PartPriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PartPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartPriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PartPrice model
   */
  interface PartPriceFieldRefs {
    readonly id: FieldRef<"PartPrice", 'String'>
    readonly make: FieldRef<"PartPrice", 'String'>
    readonly model: FieldRef<"PartPrice", 'String'>
    readonly year: FieldRef<"PartPrice", 'Int'>
    readonly partName: FieldRef<"PartPrice", 'String'>
    readonly partNumber: FieldRef<"PartPrice", 'String'>
    readonly supplier: FieldRef<"PartPrice", 'String'>
    readonly price: FieldRef<"PartPrice", 'Float'>
    readonly currency: FieldRef<"PartPrice", 'String'>
    readonly condition: FieldRef<"PartPrice", 'String'>
    readonly source: FieldRef<"PartPrice", 'String'>
    readonly createdAt: FieldRef<"PartPrice", 'DateTime'>
    readonly updatedAt: FieldRef<"PartPrice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PartPrice findUnique
   */
  export type PartPriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * Filter, which PartPrice to fetch.
     */
    where: PartPriceWhereUniqueInput
  }

  /**
   * PartPrice findUniqueOrThrow
   */
  export type PartPriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * Filter, which PartPrice to fetch.
     */
    where: PartPriceWhereUniqueInput
  }

  /**
   * PartPrice findFirst
   */
  export type PartPriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * Filter, which PartPrice to fetch.
     */
    where?: PartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartPrices to fetch.
     */
    orderBy?: PartPriceOrderByWithRelationInput | PartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartPrices.
     */
    cursor?: PartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartPrices.
     */
    distinct?: PartPriceScalarFieldEnum | PartPriceScalarFieldEnum[]
  }

  /**
   * PartPrice findFirstOrThrow
   */
  export type PartPriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * Filter, which PartPrice to fetch.
     */
    where?: PartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartPrices to fetch.
     */
    orderBy?: PartPriceOrderByWithRelationInput | PartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartPrices.
     */
    cursor?: PartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartPrices.
     */
    distinct?: PartPriceScalarFieldEnum | PartPriceScalarFieldEnum[]
  }

  /**
   * PartPrice findMany
   */
  export type PartPriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * Filter, which PartPrices to fetch.
     */
    where?: PartPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartPrices to fetch.
     */
    orderBy?: PartPriceOrderByWithRelationInput | PartPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PartPrices.
     */
    cursor?: PartPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartPrices.
     */
    distinct?: PartPriceScalarFieldEnum | PartPriceScalarFieldEnum[]
  }

  /**
   * PartPrice create
   */
  export type PartPriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * The data needed to create a PartPrice.
     */
    data: XOR<PartPriceCreateInput, PartPriceUncheckedCreateInput>
  }

  /**
   * PartPrice createMany
   */
  export type PartPriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PartPrices.
     */
    data: PartPriceCreateManyInput | PartPriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartPrice update
   */
  export type PartPriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * The data needed to update a PartPrice.
     */
    data: XOR<PartPriceUpdateInput, PartPriceUncheckedUpdateInput>
    /**
     * Choose, which PartPrice to update.
     */
    where: PartPriceWhereUniqueInput
  }

  /**
   * PartPrice updateMany
   */
  export type PartPriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PartPrices.
     */
    data: XOR<PartPriceUpdateManyMutationInput, PartPriceUncheckedUpdateManyInput>
    /**
     * Filter which PartPrices to update
     */
    where?: PartPriceWhereInput
    /**
     * Limit how many PartPrices to update.
     */
    limit?: number
  }

  /**
   * PartPrice upsert
   */
  export type PartPriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * The filter to search for the PartPrice to update in case it exists.
     */
    where: PartPriceWhereUniqueInput
    /**
     * In case the PartPrice found by the `where` argument doesn't exist, create a new PartPrice with this data.
     */
    create: XOR<PartPriceCreateInput, PartPriceUncheckedCreateInput>
    /**
     * In case the PartPrice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartPriceUpdateInput, PartPriceUncheckedUpdateInput>
  }

  /**
   * PartPrice delete
   */
  export type PartPriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
    /**
     * Filter which PartPrice to delete.
     */
    where: PartPriceWhereUniqueInput
  }

  /**
   * PartPrice deleteMany
   */
  export type PartPriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartPrices to delete
     */
    where?: PartPriceWhereInput
    /**
     * Limit how many PartPrices to delete.
     */
    limit?: number
  }

  /**
   * PartPrice without action
   */
  export type PartPriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartPrice
     */
    select?: PartPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PartPrice
     */
    omit?: PartPriceOmit<ExtArgs> | null
  }


  /**
   * Model InspectionItem
   */

  export type AggregateInspectionItem = {
    _count: InspectionItemCountAggregateOutputType | null
    _min: InspectionItemMinAggregateOutputType | null
    _max: InspectionItemMaxAggregateOutputType | null
  }

  export type InspectionItemMinAggregateOutputType = {
    id: string | null
    item: string | null
    notes: string | null
    completed: boolean | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type InspectionItemMaxAggregateOutputType = {
    id: string | null
    item: string | null
    notes: string | null
    completed: boolean | null
    assessmentId: string | null
    createdAt: Date | null
  }

  export type InspectionItemCountAggregateOutputType = {
    id: number
    item: number
    notes: number
    completed: number
    assessmentId: number
    createdAt: number
    _all: number
  }


  export type InspectionItemMinAggregateInputType = {
    id?: true
    item?: true
    notes?: true
    completed?: true
    assessmentId?: true
    createdAt?: true
  }

  export type InspectionItemMaxAggregateInputType = {
    id?: true
    item?: true
    notes?: true
    completed?: true
    assessmentId?: true
    createdAt?: true
  }

  export type InspectionItemCountAggregateInputType = {
    id?: true
    item?: true
    notes?: true
    completed?: true
    assessmentId?: true
    createdAt?: true
    _all?: true
  }

  export type InspectionItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InspectionItem to aggregate.
     */
    where?: InspectionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspectionItems to fetch.
     */
    orderBy?: InspectionItemOrderByWithRelationInput | InspectionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InspectionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspectionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspectionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InspectionItems
    **/
    _count?: true | InspectionItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InspectionItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InspectionItemMaxAggregateInputType
  }

  export type GetInspectionItemAggregateType<T extends InspectionItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInspectionItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInspectionItem[P]>
      : GetScalarType<T[P], AggregateInspectionItem[P]>
  }




  export type InspectionItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InspectionItemWhereInput
    orderBy?: InspectionItemOrderByWithAggregationInput | InspectionItemOrderByWithAggregationInput[]
    by: InspectionItemScalarFieldEnum[] | InspectionItemScalarFieldEnum
    having?: InspectionItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InspectionItemCountAggregateInputType | true
    _min?: InspectionItemMinAggregateInputType
    _max?: InspectionItemMaxAggregateInputType
  }

  export type InspectionItemGroupByOutputType = {
    id: string
    item: string
    notes: string | null
    completed: boolean
    assessmentId: string
    createdAt: Date
    _count: InspectionItemCountAggregateOutputType | null
    _min: InspectionItemMinAggregateOutputType | null
    _max: InspectionItemMaxAggregateOutputType | null
  }

  type GetInspectionItemGroupByPayload<T extends InspectionItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InspectionItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InspectionItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InspectionItemGroupByOutputType[P]>
            : GetScalarType<T[P], InspectionItemGroupByOutputType[P]>
        }
      >
    >


  export type InspectionItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    item?: boolean
    notes?: boolean
    completed?: boolean
    assessmentId?: boolean
    createdAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inspectionItem"]>



  export type InspectionItemSelectScalar = {
    id?: boolean
    item?: boolean
    notes?: boolean
    completed?: boolean
    assessmentId?: boolean
    createdAt?: boolean
  }

  export type InspectionItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "item" | "notes" | "completed" | "assessmentId" | "createdAt", ExtArgs["result"]["inspectionItem"]>
  export type InspectionItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $InspectionItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InspectionItem"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      item: string
      notes: string | null
      completed: boolean
      assessmentId: string
      createdAt: Date
    }, ExtArgs["result"]["inspectionItem"]>
    composites: {}
  }

  type InspectionItemGetPayload<S extends boolean | null | undefined | InspectionItemDefaultArgs> = $Result.GetResult<Prisma.$InspectionItemPayload, S>

  type InspectionItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InspectionItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InspectionItemCountAggregateInputType | true
    }

  export interface InspectionItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InspectionItem'], meta: { name: 'InspectionItem' } }
    /**
     * Find zero or one InspectionItem that matches the filter.
     * @param {InspectionItemFindUniqueArgs} args - Arguments to find a InspectionItem
     * @example
     * // Get one InspectionItem
     * const inspectionItem = await prisma.inspectionItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InspectionItemFindUniqueArgs>(args: SelectSubset<T, InspectionItemFindUniqueArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InspectionItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InspectionItemFindUniqueOrThrowArgs} args - Arguments to find a InspectionItem
     * @example
     * // Get one InspectionItem
     * const inspectionItem = await prisma.inspectionItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InspectionItemFindUniqueOrThrowArgs>(args: SelectSubset<T, InspectionItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InspectionItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemFindFirstArgs} args - Arguments to find a InspectionItem
     * @example
     * // Get one InspectionItem
     * const inspectionItem = await prisma.inspectionItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InspectionItemFindFirstArgs>(args?: SelectSubset<T, InspectionItemFindFirstArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InspectionItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemFindFirstOrThrowArgs} args - Arguments to find a InspectionItem
     * @example
     * // Get one InspectionItem
     * const inspectionItem = await prisma.inspectionItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InspectionItemFindFirstOrThrowArgs>(args?: SelectSubset<T, InspectionItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InspectionItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InspectionItems
     * const inspectionItems = await prisma.inspectionItem.findMany()
     * 
     * // Get first 10 InspectionItems
     * const inspectionItems = await prisma.inspectionItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inspectionItemWithIdOnly = await prisma.inspectionItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InspectionItemFindManyArgs>(args?: SelectSubset<T, InspectionItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InspectionItem.
     * @param {InspectionItemCreateArgs} args - Arguments to create a InspectionItem.
     * @example
     * // Create one InspectionItem
     * const InspectionItem = await prisma.inspectionItem.create({
     *   data: {
     *     // ... data to create a InspectionItem
     *   }
     * })
     * 
     */
    create<T extends InspectionItemCreateArgs>(args: SelectSubset<T, InspectionItemCreateArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InspectionItems.
     * @param {InspectionItemCreateManyArgs} args - Arguments to create many InspectionItems.
     * @example
     * // Create many InspectionItems
     * const inspectionItem = await prisma.inspectionItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InspectionItemCreateManyArgs>(args?: SelectSubset<T, InspectionItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InspectionItem.
     * @param {InspectionItemDeleteArgs} args - Arguments to delete one InspectionItem.
     * @example
     * // Delete one InspectionItem
     * const InspectionItem = await prisma.inspectionItem.delete({
     *   where: {
     *     // ... filter to delete one InspectionItem
     *   }
     * })
     * 
     */
    delete<T extends InspectionItemDeleteArgs>(args: SelectSubset<T, InspectionItemDeleteArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InspectionItem.
     * @param {InspectionItemUpdateArgs} args - Arguments to update one InspectionItem.
     * @example
     * // Update one InspectionItem
     * const inspectionItem = await prisma.inspectionItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InspectionItemUpdateArgs>(args: SelectSubset<T, InspectionItemUpdateArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InspectionItems.
     * @param {InspectionItemDeleteManyArgs} args - Arguments to filter InspectionItems to delete.
     * @example
     * // Delete a few InspectionItems
     * const { count } = await prisma.inspectionItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InspectionItemDeleteManyArgs>(args?: SelectSubset<T, InspectionItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InspectionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InspectionItems
     * const inspectionItem = await prisma.inspectionItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InspectionItemUpdateManyArgs>(args: SelectSubset<T, InspectionItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InspectionItem.
     * @param {InspectionItemUpsertArgs} args - Arguments to update or create a InspectionItem.
     * @example
     * // Update or create a InspectionItem
     * const inspectionItem = await prisma.inspectionItem.upsert({
     *   create: {
     *     // ... data to create a InspectionItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InspectionItem we want to update
     *   }
     * })
     */
    upsert<T extends InspectionItemUpsertArgs>(args: SelectSubset<T, InspectionItemUpsertArgs<ExtArgs>>): Prisma__InspectionItemClient<$Result.GetResult<Prisma.$InspectionItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InspectionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemCountArgs} args - Arguments to filter InspectionItems to count.
     * @example
     * // Count the number of InspectionItems
     * const count = await prisma.inspectionItem.count({
     *   where: {
     *     // ... the filter for the InspectionItems we want to count
     *   }
     * })
    **/
    count<T extends InspectionItemCountArgs>(
      args?: Subset<T, InspectionItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InspectionItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InspectionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InspectionItemAggregateArgs>(args: Subset<T, InspectionItemAggregateArgs>): Prisma.PrismaPromise<GetInspectionItemAggregateType<T>>

    /**
     * Group by InspectionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspectionItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InspectionItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InspectionItemGroupByArgs['orderBy'] }
        : { orderBy?: InspectionItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InspectionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInspectionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InspectionItem model
   */
  readonly fields: InspectionItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InspectionItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InspectionItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InspectionItem model
   */
  interface InspectionItemFieldRefs {
    readonly id: FieldRef<"InspectionItem", 'String'>
    readonly item: FieldRef<"InspectionItem", 'String'>
    readonly notes: FieldRef<"InspectionItem", 'String'>
    readonly completed: FieldRef<"InspectionItem", 'Boolean'>
    readonly assessmentId: FieldRef<"InspectionItem", 'String'>
    readonly createdAt: FieldRef<"InspectionItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InspectionItem findUnique
   */
  export type InspectionItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * Filter, which InspectionItem to fetch.
     */
    where: InspectionItemWhereUniqueInput
  }

  /**
   * InspectionItem findUniqueOrThrow
   */
  export type InspectionItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * Filter, which InspectionItem to fetch.
     */
    where: InspectionItemWhereUniqueInput
  }

  /**
   * InspectionItem findFirst
   */
  export type InspectionItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * Filter, which InspectionItem to fetch.
     */
    where?: InspectionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspectionItems to fetch.
     */
    orderBy?: InspectionItemOrderByWithRelationInput | InspectionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InspectionItems.
     */
    cursor?: InspectionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspectionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspectionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InspectionItems.
     */
    distinct?: InspectionItemScalarFieldEnum | InspectionItemScalarFieldEnum[]
  }

  /**
   * InspectionItem findFirstOrThrow
   */
  export type InspectionItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * Filter, which InspectionItem to fetch.
     */
    where?: InspectionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspectionItems to fetch.
     */
    orderBy?: InspectionItemOrderByWithRelationInput | InspectionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InspectionItems.
     */
    cursor?: InspectionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspectionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspectionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InspectionItems.
     */
    distinct?: InspectionItemScalarFieldEnum | InspectionItemScalarFieldEnum[]
  }

  /**
   * InspectionItem findMany
   */
  export type InspectionItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * Filter, which InspectionItems to fetch.
     */
    where?: InspectionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspectionItems to fetch.
     */
    orderBy?: InspectionItemOrderByWithRelationInput | InspectionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InspectionItems.
     */
    cursor?: InspectionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspectionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspectionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InspectionItems.
     */
    distinct?: InspectionItemScalarFieldEnum | InspectionItemScalarFieldEnum[]
  }

  /**
   * InspectionItem create
   */
  export type InspectionItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * The data needed to create a InspectionItem.
     */
    data: XOR<InspectionItemCreateInput, InspectionItemUncheckedCreateInput>
  }

  /**
   * InspectionItem createMany
   */
  export type InspectionItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InspectionItems.
     */
    data: InspectionItemCreateManyInput | InspectionItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InspectionItem update
   */
  export type InspectionItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * The data needed to update a InspectionItem.
     */
    data: XOR<InspectionItemUpdateInput, InspectionItemUncheckedUpdateInput>
    /**
     * Choose, which InspectionItem to update.
     */
    where: InspectionItemWhereUniqueInput
  }

  /**
   * InspectionItem updateMany
   */
  export type InspectionItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InspectionItems.
     */
    data: XOR<InspectionItemUpdateManyMutationInput, InspectionItemUncheckedUpdateManyInput>
    /**
     * Filter which InspectionItems to update
     */
    where?: InspectionItemWhereInput
    /**
     * Limit how many InspectionItems to update.
     */
    limit?: number
  }

  /**
   * InspectionItem upsert
   */
  export type InspectionItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * The filter to search for the InspectionItem to update in case it exists.
     */
    where: InspectionItemWhereUniqueInput
    /**
     * In case the InspectionItem found by the `where` argument doesn't exist, create a new InspectionItem with this data.
     */
    create: XOR<InspectionItemCreateInput, InspectionItemUncheckedCreateInput>
    /**
     * In case the InspectionItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InspectionItemUpdateInput, InspectionItemUncheckedUpdateInput>
  }

  /**
   * InspectionItem delete
   */
  export type InspectionItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
    /**
     * Filter which InspectionItem to delete.
     */
    where: InspectionItemWhereUniqueInput
  }

  /**
   * InspectionItem deleteMany
   */
  export type InspectionItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InspectionItems to delete
     */
    where?: InspectionItemWhereInput
    /**
     * Limit how many InspectionItems to delete.
     */
    limit?: number
  }

  /**
   * InspectionItem without action
   */
  export type InspectionItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspectionItem
     */
    select?: InspectionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspectionItem
     */
    omit?: InspectionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspectionItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AssessmentScalarFieldEnum: {
    id: 'id',
    assessmentNumber: 'assessmentNumber',
    status: 'status',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    customerEmail: 'customerEmail',
    insuranceCompany: 'insuranceCompany',
    claimNumber: 'claimNumber',
    registrationNumber: 'registrationNumber',
    vin: 'vin',
    odometer: 'odometer',
    vehicleNotes: 'vehicleNotes',
    aiRawResponse: 'aiRawResponse',
    verifiedVehicleJson: 'verifiedVehicleJson',
    verifiedDamageJson: 'verifiedDamageJson',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentScalarFieldEnum = (typeof AssessmentScalarFieldEnum)[keyof typeof AssessmentScalarFieldEnum]


  export const AssessmentImageScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    originalName: 'originalName',
    path: 'path',
    mimeType: 'mimeType',
    size: 'size',
    sortOrder: 'sortOrder',
    assessmentId: 'assessmentId',
    createdAt: 'createdAt'
  };

  export type AssessmentImageScalarFieldEnum = (typeof AssessmentImageScalarFieldEnum)[keyof typeof AssessmentImageScalarFieldEnum]


  export const VehicleMakeScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type VehicleMakeScalarFieldEnum = (typeof VehicleMakeScalarFieldEnum)[keyof typeof VehicleMakeScalarFieldEnum]


  export const VehicleModelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    makeId: 'makeId'
  };

  export type VehicleModelScalarFieldEnum = (typeof VehicleModelScalarFieldEnum)[keyof typeof VehicleModelScalarFieldEnum]


  export const VehicleVariantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    modelId: 'modelId'
  };

  export type VehicleVariantScalarFieldEnum = (typeof VehicleVariantScalarFieldEnum)[keyof typeof VehicleVariantScalarFieldEnum]


  export const VehiclePartScalarFieldEnum: {
    id: 'id',
    partNumber: 'partNumber',
    name: 'name',
    category: 'category',
    unitPrice: 'unitPrice',
    labourCost: 'labourCost',
    active: 'active',
    variantId: 'variantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehiclePartScalarFieldEnum = (typeof VehiclePartScalarFieldEnum)[keyof typeof VehiclePartScalarFieldEnum]


  export const AssessmentDamagedPartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    severity: 'severity',
    confirmed: 'confirmed',
    assessmentId: 'assessmentId',
    createdAt: 'createdAt'
  };

  export type AssessmentDamagedPartScalarFieldEnum = (typeof AssessmentDamagedPartScalarFieldEnum)[keyof typeof AssessmentDamagedPartScalarFieldEnum]


  export const AssessmentReplacementPartScalarFieldEnum: {
    id: 'id',
    partName: 'partName',
    partNumber: 'partNumber',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    subtotal: 'subtotal',
    confirmed: 'confirmed',
    vehiclePartId: 'vehiclePartId',
    assessmentId: 'assessmentId',
    createdAt: 'createdAt'
  };

  export type AssessmentReplacementPartScalarFieldEnum = (typeof AssessmentReplacementPartScalarFieldEnum)[keyof typeof AssessmentReplacementPartScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    website: 'website',
    createdAt: 'createdAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const SupplierPartPriceScalarFieldEnum: {
    id: 'id',
    supplierId: 'supplierId',
    partName: 'partName',
    vehicleMake: 'vehicleMake',
    vehicleModel: 'vehicleModel',
    vehicleYear: 'vehicleYear',
    partNumber: 'partNumber',
    price: 'price',
    currency: 'currency',
    availability: 'availability',
    brand: 'brand',
    condition: 'condition',
    url: 'url',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierPartPriceScalarFieldEnum = (typeof SupplierPartPriceScalarFieldEnum)[keyof typeof SupplierPartPriceScalarFieldEnum]


  export const PartPriceScalarFieldEnum: {
    id: 'id',
    make: 'make',
    model: 'model',
    year: 'year',
    partName: 'partName',
    partNumber: 'partNumber',
    supplier: 'supplier',
    price: 'price',
    currency: 'currency',
    condition: 'condition',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartPriceScalarFieldEnum = (typeof PartPriceScalarFieldEnum)[keyof typeof PartPriceScalarFieldEnum]


  export const InspectionItemScalarFieldEnum: {
    id: 'id',
    item: 'item',
    notes: 'notes',
    completed: 'completed',
    assessmentId: 'assessmentId',
    createdAt: 'createdAt'
  };

  export type InspectionItemScalarFieldEnum = (typeof InspectionItemScalarFieldEnum)[keyof typeof InspectionItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AssessmentOrderByRelevanceFieldEnum: {
    id: 'id',
    assessmentNumber: 'assessmentNumber',
    status: 'status',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    customerEmail: 'customerEmail',
    insuranceCompany: 'insuranceCompany',
    claimNumber: 'claimNumber',
    registrationNumber: 'registrationNumber',
    vin: 'vin',
    odometer: 'odometer',
    vehicleNotes: 'vehicleNotes',
    aiRawResponse: 'aiRawResponse',
    verifiedVehicleJson: 'verifiedVehicleJson',
    verifiedDamageJson: 'verifiedDamageJson',
    userId: 'userId'
  };

  export type AssessmentOrderByRelevanceFieldEnum = (typeof AssessmentOrderByRelevanceFieldEnum)[keyof typeof AssessmentOrderByRelevanceFieldEnum]


  export const AssessmentImageOrderByRelevanceFieldEnum: {
    id: 'id',
    filename: 'filename',
    originalName: 'originalName',
    path: 'path',
    mimeType: 'mimeType',
    assessmentId: 'assessmentId'
  };

  export type AssessmentImageOrderByRelevanceFieldEnum = (typeof AssessmentImageOrderByRelevanceFieldEnum)[keyof typeof AssessmentImageOrderByRelevanceFieldEnum]


  export const VehicleMakeOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type VehicleMakeOrderByRelevanceFieldEnum = (typeof VehicleMakeOrderByRelevanceFieldEnum)[keyof typeof VehicleMakeOrderByRelevanceFieldEnum]


  export const VehicleModelOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    makeId: 'makeId'
  };

  export type VehicleModelOrderByRelevanceFieldEnum = (typeof VehicleModelOrderByRelevanceFieldEnum)[keyof typeof VehicleModelOrderByRelevanceFieldEnum]


  export const VehicleVariantOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    modelId: 'modelId'
  };

  export type VehicleVariantOrderByRelevanceFieldEnum = (typeof VehicleVariantOrderByRelevanceFieldEnum)[keyof typeof VehicleVariantOrderByRelevanceFieldEnum]


  export const VehiclePartOrderByRelevanceFieldEnum: {
    id: 'id',
    partNumber: 'partNumber',
    name: 'name',
    category: 'category',
    variantId: 'variantId'
  };

  export type VehiclePartOrderByRelevanceFieldEnum = (typeof VehiclePartOrderByRelevanceFieldEnum)[keyof typeof VehiclePartOrderByRelevanceFieldEnum]


  export const AssessmentDamagedPartOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    severity: 'severity',
    assessmentId: 'assessmentId'
  };

  export type AssessmentDamagedPartOrderByRelevanceFieldEnum = (typeof AssessmentDamagedPartOrderByRelevanceFieldEnum)[keyof typeof AssessmentDamagedPartOrderByRelevanceFieldEnum]


  export const AssessmentReplacementPartOrderByRelevanceFieldEnum: {
    id: 'id',
    partName: 'partName',
    partNumber: 'partNumber',
    vehiclePartId: 'vehiclePartId',
    assessmentId: 'assessmentId'
  };

  export type AssessmentReplacementPartOrderByRelevanceFieldEnum = (typeof AssessmentReplacementPartOrderByRelevanceFieldEnum)[keyof typeof AssessmentReplacementPartOrderByRelevanceFieldEnum]


  export const SupplierOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    website: 'website'
  };

  export type SupplierOrderByRelevanceFieldEnum = (typeof SupplierOrderByRelevanceFieldEnum)[keyof typeof SupplierOrderByRelevanceFieldEnum]


  export const SupplierPartPriceOrderByRelevanceFieldEnum: {
    id: 'id',
    supplierId: 'supplierId',
    partName: 'partName',
    vehicleMake: 'vehicleMake',
    vehicleModel: 'vehicleModel',
    partNumber: 'partNumber',
    currency: 'currency',
    availability: 'availability',
    brand: 'brand',
    condition: 'condition',
    url: 'url',
    source: 'source'
  };

  export type SupplierPartPriceOrderByRelevanceFieldEnum = (typeof SupplierPartPriceOrderByRelevanceFieldEnum)[keyof typeof SupplierPartPriceOrderByRelevanceFieldEnum]


  export const PartPriceOrderByRelevanceFieldEnum: {
    id: 'id',
    make: 'make',
    model: 'model',
    partName: 'partName',
    partNumber: 'partNumber',
    supplier: 'supplier',
    currency: 'currency',
    condition: 'condition',
    source: 'source'
  };

  export type PartPriceOrderByRelevanceFieldEnum = (typeof PartPriceOrderByRelevanceFieldEnum)[keyof typeof PartPriceOrderByRelevanceFieldEnum]


  export const InspectionItemOrderByRelevanceFieldEnum: {
    id: 'id',
    item: 'item',
    notes: 'notes',
    assessmentId: 'assessmentId'
  };

  export type InspectionItemOrderByRelevanceFieldEnum = (typeof InspectionItemOrderByRelevanceFieldEnum)[keyof typeof InspectionItemOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    assessments?: AssessmentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assessments?: AssessmentOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    assessments?: AssessmentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AssessmentWhereInput = {
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    id?: StringFilter<"Assessment"> | string
    assessmentNumber?: StringFilter<"Assessment"> | string
    status?: StringFilter<"Assessment"> | string
    customerName?: StringFilter<"Assessment"> | string
    customerPhone?: StringFilter<"Assessment"> | string
    customerEmail?: StringFilter<"Assessment"> | string
    insuranceCompany?: StringFilter<"Assessment"> | string
    claimNumber?: StringFilter<"Assessment"> | string
    registrationNumber?: StringNullableFilter<"Assessment"> | string | null
    vin?: StringNullableFilter<"Assessment"> | string | null
    odometer?: StringNullableFilter<"Assessment"> | string | null
    vehicleNotes?: StringNullableFilter<"Assessment"> | string | null
    aiRawResponse?: StringNullableFilter<"Assessment"> | string | null
    verifiedVehicleJson?: StringNullableFilter<"Assessment"> | string | null
    verifiedDamageJson?: StringNullableFilter<"Assessment"> | string | null
    userId?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    images?: AssessmentImageListRelationFilter
    damagedParts?: AssessmentDamagedPartListRelationFilter
    replacementParts?: AssessmentReplacementPartListRelationFilter
    inspectionItems?: InspectionItemListRelationFilter
  }

  export type AssessmentOrderByWithRelationInput = {
    id?: SortOrder
    assessmentNumber?: SortOrder
    status?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    insuranceCompany?: SortOrder
    claimNumber?: SortOrder
    registrationNumber?: SortOrderInput | SortOrder
    vin?: SortOrderInput | SortOrder
    odometer?: SortOrderInput | SortOrder
    vehicleNotes?: SortOrderInput | SortOrder
    aiRawResponse?: SortOrderInput | SortOrder
    verifiedVehicleJson?: SortOrderInput | SortOrder
    verifiedDamageJson?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    images?: AssessmentImageOrderByRelationAggregateInput
    damagedParts?: AssessmentDamagedPartOrderByRelationAggregateInput
    replacementParts?: AssessmentReplacementPartOrderByRelationAggregateInput
    inspectionItems?: InspectionItemOrderByRelationAggregateInput
    _relevance?: AssessmentOrderByRelevanceInput
  }

  export type AssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assessmentNumber?: string
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    status?: StringFilter<"Assessment"> | string
    customerName?: StringFilter<"Assessment"> | string
    customerPhone?: StringFilter<"Assessment"> | string
    customerEmail?: StringFilter<"Assessment"> | string
    insuranceCompany?: StringFilter<"Assessment"> | string
    claimNumber?: StringFilter<"Assessment"> | string
    registrationNumber?: StringNullableFilter<"Assessment"> | string | null
    vin?: StringNullableFilter<"Assessment"> | string | null
    odometer?: StringNullableFilter<"Assessment"> | string | null
    vehicleNotes?: StringNullableFilter<"Assessment"> | string | null
    aiRawResponse?: StringNullableFilter<"Assessment"> | string | null
    verifiedVehicleJson?: StringNullableFilter<"Assessment"> | string | null
    verifiedDamageJson?: StringNullableFilter<"Assessment"> | string | null
    userId?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    images?: AssessmentImageListRelationFilter
    damagedParts?: AssessmentDamagedPartListRelationFilter
    replacementParts?: AssessmentReplacementPartListRelationFilter
    inspectionItems?: InspectionItemListRelationFilter
  }, "id" | "assessmentNumber">

  export type AssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    assessmentNumber?: SortOrder
    status?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    insuranceCompany?: SortOrder
    claimNumber?: SortOrder
    registrationNumber?: SortOrderInput | SortOrder
    vin?: SortOrderInput | SortOrder
    odometer?: SortOrderInput | SortOrder
    vehicleNotes?: SortOrderInput | SortOrder
    aiRawResponse?: SortOrderInput | SortOrder
    verifiedVehicleJson?: SortOrderInput | SortOrder
    verifiedDamageJson?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentCountOrderByAggregateInput
    _max?: AssessmentMaxOrderByAggregateInput
    _min?: AssessmentMinOrderByAggregateInput
  }

  export type AssessmentScalarWhereWithAggregatesInput = {
    AND?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    OR?: AssessmentScalarWhereWithAggregatesInput[]
    NOT?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assessment"> | string
    assessmentNumber?: StringWithAggregatesFilter<"Assessment"> | string
    status?: StringWithAggregatesFilter<"Assessment"> | string
    customerName?: StringWithAggregatesFilter<"Assessment"> | string
    customerPhone?: StringWithAggregatesFilter<"Assessment"> | string
    customerEmail?: StringWithAggregatesFilter<"Assessment"> | string
    insuranceCompany?: StringWithAggregatesFilter<"Assessment"> | string
    claimNumber?: StringWithAggregatesFilter<"Assessment"> | string
    registrationNumber?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    vin?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    odometer?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    vehicleNotes?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    aiRawResponse?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    verifiedVehicleJson?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    verifiedDamageJson?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    userId?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
  }

  export type AssessmentImageWhereInput = {
    AND?: AssessmentImageWhereInput | AssessmentImageWhereInput[]
    OR?: AssessmentImageWhereInput[]
    NOT?: AssessmentImageWhereInput | AssessmentImageWhereInput[]
    id?: StringFilter<"AssessmentImage"> | string
    filename?: StringFilter<"AssessmentImage"> | string
    originalName?: StringFilter<"AssessmentImage"> | string
    path?: StringFilter<"AssessmentImage"> | string
    mimeType?: StringFilter<"AssessmentImage"> | string
    size?: IntFilter<"AssessmentImage"> | number
    sortOrder?: IntFilter<"AssessmentImage"> | number
    assessmentId?: StringFilter<"AssessmentImage"> | string
    createdAt?: DateTimeFilter<"AssessmentImage"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentImageOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
    _relevance?: AssessmentImageOrderByRelevanceInput
  }

  export type AssessmentImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssessmentImageWhereInput | AssessmentImageWhereInput[]
    OR?: AssessmentImageWhereInput[]
    NOT?: AssessmentImageWhereInput | AssessmentImageWhereInput[]
    filename?: StringFilter<"AssessmentImage"> | string
    originalName?: StringFilter<"AssessmentImage"> | string
    path?: StringFilter<"AssessmentImage"> | string
    mimeType?: StringFilter<"AssessmentImage"> | string
    size?: IntFilter<"AssessmentImage"> | number
    sortOrder?: IntFilter<"AssessmentImage"> | number
    assessmentId?: StringFilter<"AssessmentImage"> | string
    createdAt?: DateTimeFilter<"AssessmentImage"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id">

  export type AssessmentImageOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    _count?: AssessmentImageCountOrderByAggregateInput
    _avg?: AssessmentImageAvgOrderByAggregateInput
    _max?: AssessmentImageMaxOrderByAggregateInput
    _min?: AssessmentImageMinOrderByAggregateInput
    _sum?: AssessmentImageSumOrderByAggregateInput
  }

  export type AssessmentImageScalarWhereWithAggregatesInput = {
    AND?: AssessmentImageScalarWhereWithAggregatesInput | AssessmentImageScalarWhereWithAggregatesInput[]
    OR?: AssessmentImageScalarWhereWithAggregatesInput[]
    NOT?: AssessmentImageScalarWhereWithAggregatesInput | AssessmentImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentImage"> | string
    filename?: StringWithAggregatesFilter<"AssessmentImage"> | string
    originalName?: StringWithAggregatesFilter<"AssessmentImage"> | string
    path?: StringWithAggregatesFilter<"AssessmentImage"> | string
    mimeType?: StringWithAggregatesFilter<"AssessmentImage"> | string
    size?: IntWithAggregatesFilter<"AssessmentImage"> | number
    sortOrder?: IntWithAggregatesFilter<"AssessmentImage"> | number
    assessmentId?: StringWithAggregatesFilter<"AssessmentImage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentImage"> | Date | string
  }

  export type VehicleMakeWhereInput = {
    AND?: VehicleMakeWhereInput | VehicleMakeWhereInput[]
    OR?: VehicleMakeWhereInput[]
    NOT?: VehicleMakeWhereInput | VehicleMakeWhereInput[]
    id?: StringFilter<"VehicleMake"> | string
    name?: StringFilter<"VehicleMake"> | string
    models?: VehicleModelListRelationFilter
  }

  export type VehicleMakeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    models?: VehicleModelOrderByRelationAggregateInput
    _relevance?: VehicleMakeOrderByRelevanceInput
  }

  export type VehicleMakeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: VehicleMakeWhereInput | VehicleMakeWhereInput[]
    OR?: VehicleMakeWhereInput[]
    NOT?: VehicleMakeWhereInput | VehicleMakeWhereInput[]
    models?: VehicleModelListRelationFilter
  }, "id" | "name">

  export type VehicleMakeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: VehicleMakeCountOrderByAggregateInput
    _max?: VehicleMakeMaxOrderByAggregateInput
    _min?: VehicleMakeMinOrderByAggregateInput
  }

  export type VehicleMakeScalarWhereWithAggregatesInput = {
    AND?: VehicleMakeScalarWhereWithAggregatesInput | VehicleMakeScalarWhereWithAggregatesInput[]
    OR?: VehicleMakeScalarWhereWithAggregatesInput[]
    NOT?: VehicleMakeScalarWhereWithAggregatesInput | VehicleMakeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleMake"> | string
    name?: StringWithAggregatesFilter<"VehicleMake"> | string
  }

  export type VehicleModelWhereInput = {
    AND?: VehicleModelWhereInput | VehicleModelWhereInput[]
    OR?: VehicleModelWhereInput[]
    NOT?: VehicleModelWhereInput | VehicleModelWhereInput[]
    id?: StringFilter<"VehicleModel"> | string
    name?: StringFilter<"VehicleModel"> | string
    makeId?: StringFilter<"VehicleModel"> | string
    make?: XOR<VehicleMakeScalarRelationFilter, VehicleMakeWhereInput>
    variants?: VehicleVariantListRelationFilter
  }

  export type VehicleModelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    makeId?: SortOrder
    make?: VehicleMakeOrderByWithRelationInput
    variants?: VehicleVariantOrderByRelationAggregateInput
    _relevance?: VehicleModelOrderByRelevanceInput
  }

  export type VehicleModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_makeId?: VehicleModelNameMakeIdCompoundUniqueInput
    AND?: VehicleModelWhereInput | VehicleModelWhereInput[]
    OR?: VehicleModelWhereInput[]
    NOT?: VehicleModelWhereInput | VehicleModelWhereInput[]
    name?: StringFilter<"VehicleModel"> | string
    makeId?: StringFilter<"VehicleModel"> | string
    make?: XOR<VehicleMakeScalarRelationFilter, VehicleMakeWhereInput>
    variants?: VehicleVariantListRelationFilter
  }, "id" | "name_makeId">

  export type VehicleModelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    makeId?: SortOrder
    _count?: VehicleModelCountOrderByAggregateInput
    _max?: VehicleModelMaxOrderByAggregateInput
    _min?: VehicleModelMinOrderByAggregateInput
  }

  export type VehicleModelScalarWhereWithAggregatesInput = {
    AND?: VehicleModelScalarWhereWithAggregatesInput | VehicleModelScalarWhereWithAggregatesInput[]
    OR?: VehicleModelScalarWhereWithAggregatesInput[]
    NOT?: VehicleModelScalarWhereWithAggregatesInput | VehicleModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleModel"> | string
    name?: StringWithAggregatesFilter<"VehicleModel"> | string
    makeId?: StringWithAggregatesFilter<"VehicleModel"> | string
  }

  export type VehicleVariantWhereInput = {
    AND?: VehicleVariantWhereInput | VehicleVariantWhereInput[]
    OR?: VehicleVariantWhereInput[]
    NOT?: VehicleVariantWhereInput | VehicleVariantWhereInput[]
    id?: StringFilter<"VehicleVariant"> | string
    name?: StringFilter<"VehicleVariant"> | string
    modelId?: StringFilter<"VehicleVariant"> | string
    model?: XOR<VehicleModelScalarRelationFilter, VehicleModelWhereInput>
    parts?: VehiclePartListRelationFilter
  }

  export type VehicleVariantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    modelId?: SortOrder
    model?: VehicleModelOrderByWithRelationInput
    parts?: VehiclePartOrderByRelationAggregateInput
    _relevance?: VehicleVariantOrderByRelevanceInput
  }

  export type VehicleVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_modelId?: VehicleVariantNameModelIdCompoundUniqueInput
    AND?: VehicleVariantWhereInput | VehicleVariantWhereInput[]
    OR?: VehicleVariantWhereInput[]
    NOT?: VehicleVariantWhereInput | VehicleVariantWhereInput[]
    name?: StringFilter<"VehicleVariant"> | string
    modelId?: StringFilter<"VehicleVariant"> | string
    model?: XOR<VehicleModelScalarRelationFilter, VehicleModelWhereInput>
    parts?: VehiclePartListRelationFilter
  }, "id" | "name_modelId">

  export type VehicleVariantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    modelId?: SortOrder
    _count?: VehicleVariantCountOrderByAggregateInput
    _max?: VehicleVariantMaxOrderByAggregateInput
    _min?: VehicleVariantMinOrderByAggregateInput
  }

  export type VehicleVariantScalarWhereWithAggregatesInput = {
    AND?: VehicleVariantScalarWhereWithAggregatesInput | VehicleVariantScalarWhereWithAggregatesInput[]
    OR?: VehicleVariantScalarWhereWithAggregatesInput[]
    NOT?: VehicleVariantScalarWhereWithAggregatesInput | VehicleVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleVariant"> | string
    name?: StringWithAggregatesFilter<"VehicleVariant"> | string
    modelId?: StringWithAggregatesFilter<"VehicleVariant"> | string
  }

  export type VehiclePartWhereInput = {
    AND?: VehiclePartWhereInput | VehiclePartWhereInput[]
    OR?: VehiclePartWhereInput[]
    NOT?: VehiclePartWhereInput | VehiclePartWhereInput[]
    id?: StringFilter<"VehiclePart"> | string
    partNumber?: StringFilter<"VehiclePart"> | string
    name?: StringFilter<"VehiclePart"> | string
    category?: StringFilter<"VehiclePart"> | string
    unitPrice?: FloatFilter<"VehiclePart"> | number
    labourCost?: FloatFilter<"VehiclePart"> | number
    active?: BoolFilter<"VehiclePart"> | boolean
    variantId?: StringNullableFilter<"VehiclePart"> | string | null
    createdAt?: DateTimeFilter<"VehiclePart"> | Date | string
    updatedAt?: DateTimeFilter<"VehiclePart"> | Date | string
    variant?: XOR<VehicleVariantNullableScalarRelationFilter, VehicleVariantWhereInput> | null
  }

  export type VehiclePartOrderByWithRelationInput = {
    id?: SortOrder
    partNumber?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unitPrice?: SortOrder
    labourCost?: SortOrder
    active?: SortOrder
    variantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    variant?: VehicleVariantOrderByWithRelationInput
    _relevance?: VehiclePartOrderByRelevanceInput
  }

  export type VehiclePartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehiclePartWhereInput | VehiclePartWhereInput[]
    OR?: VehiclePartWhereInput[]
    NOT?: VehiclePartWhereInput | VehiclePartWhereInput[]
    partNumber?: StringFilter<"VehiclePart"> | string
    name?: StringFilter<"VehiclePart"> | string
    category?: StringFilter<"VehiclePart"> | string
    unitPrice?: FloatFilter<"VehiclePart"> | number
    labourCost?: FloatFilter<"VehiclePart"> | number
    active?: BoolFilter<"VehiclePart"> | boolean
    variantId?: StringNullableFilter<"VehiclePart"> | string | null
    createdAt?: DateTimeFilter<"VehiclePart"> | Date | string
    updatedAt?: DateTimeFilter<"VehiclePart"> | Date | string
    variant?: XOR<VehicleVariantNullableScalarRelationFilter, VehicleVariantWhereInput> | null
  }, "id">

  export type VehiclePartOrderByWithAggregationInput = {
    id?: SortOrder
    partNumber?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unitPrice?: SortOrder
    labourCost?: SortOrder
    active?: SortOrder
    variantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehiclePartCountOrderByAggregateInput
    _avg?: VehiclePartAvgOrderByAggregateInput
    _max?: VehiclePartMaxOrderByAggregateInput
    _min?: VehiclePartMinOrderByAggregateInput
    _sum?: VehiclePartSumOrderByAggregateInput
  }

  export type VehiclePartScalarWhereWithAggregatesInput = {
    AND?: VehiclePartScalarWhereWithAggregatesInput | VehiclePartScalarWhereWithAggregatesInput[]
    OR?: VehiclePartScalarWhereWithAggregatesInput[]
    NOT?: VehiclePartScalarWhereWithAggregatesInput | VehiclePartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehiclePart"> | string
    partNumber?: StringWithAggregatesFilter<"VehiclePart"> | string
    name?: StringWithAggregatesFilter<"VehiclePart"> | string
    category?: StringWithAggregatesFilter<"VehiclePart"> | string
    unitPrice?: FloatWithAggregatesFilter<"VehiclePart"> | number
    labourCost?: FloatWithAggregatesFilter<"VehiclePart"> | number
    active?: BoolWithAggregatesFilter<"VehiclePart"> | boolean
    variantId?: StringNullableWithAggregatesFilter<"VehiclePart"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VehiclePart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VehiclePart"> | Date | string
  }

  export type AssessmentDamagedPartWhereInput = {
    AND?: AssessmentDamagedPartWhereInput | AssessmentDamagedPartWhereInput[]
    OR?: AssessmentDamagedPartWhereInput[]
    NOT?: AssessmentDamagedPartWhereInput | AssessmentDamagedPartWhereInput[]
    id?: StringFilter<"AssessmentDamagedPart"> | string
    name?: StringFilter<"AssessmentDamagedPart"> | string
    severity?: StringNullableFilter<"AssessmentDamagedPart"> | string | null
    confirmed?: BoolFilter<"AssessmentDamagedPart"> | boolean
    assessmentId?: StringFilter<"AssessmentDamagedPart"> | string
    createdAt?: DateTimeFilter<"AssessmentDamagedPart"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentDamagedPartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    severity?: SortOrderInput | SortOrder
    confirmed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
    _relevance?: AssessmentDamagedPartOrderByRelevanceInput
  }

  export type AssessmentDamagedPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssessmentDamagedPartWhereInput | AssessmentDamagedPartWhereInput[]
    OR?: AssessmentDamagedPartWhereInput[]
    NOT?: AssessmentDamagedPartWhereInput | AssessmentDamagedPartWhereInput[]
    name?: StringFilter<"AssessmentDamagedPart"> | string
    severity?: StringNullableFilter<"AssessmentDamagedPart"> | string | null
    confirmed?: BoolFilter<"AssessmentDamagedPart"> | boolean
    assessmentId?: StringFilter<"AssessmentDamagedPart"> | string
    createdAt?: DateTimeFilter<"AssessmentDamagedPart"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id">

  export type AssessmentDamagedPartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    severity?: SortOrderInput | SortOrder
    confirmed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    _count?: AssessmentDamagedPartCountOrderByAggregateInput
    _max?: AssessmentDamagedPartMaxOrderByAggregateInput
    _min?: AssessmentDamagedPartMinOrderByAggregateInput
  }

  export type AssessmentDamagedPartScalarWhereWithAggregatesInput = {
    AND?: AssessmentDamagedPartScalarWhereWithAggregatesInput | AssessmentDamagedPartScalarWhereWithAggregatesInput[]
    OR?: AssessmentDamagedPartScalarWhereWithAggregatesInput[]
    NOT?: AssessmentDamagedPartScalarWhereWithAggregatesInput | AssessmentDamagedPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentDamagedPart"> | string
    name?: StringWithAggregatesFilter<"AssessmentDamagedPart"> | string
    severity?: StringNullableWithAggregatesFilter<"AssessmentDamagedPart"> | string | null
    confirmed?: BoolWithAggregatesFilter<"AssessmentDamagedPart"> | boolean
    assessmentId?: StringWithAggregatesFilter<"AssessmentDamagedPart"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentDamagedPart"> | Date | string
  }

  export type AssessmentReplacementPartWhereInput = {
    AND?: AssessmentReplacementPartWhereInput | AssessmentReplacementPartWhereInput[]
    OR?: AssessmentReplacementPartWhereInput[]
    NOT?: AssessmentReplacementPartWhereInput | AssessmentReplacementPartWhereInput[]
    id?: StringFilter<"AssessmentReplacementPart"> | string
    partName?: StringFilter<"AssessmentReplacementPart"> | string
    partNumber?: StringNullableFilter<"AssessmentReplacementPart"> | string | null
    quantity?: IntFilter<"AssessmentReplacementPart"> | number
    unitPrice?: FloatFilter<"AssessmentReplacementPart"> | number
    subtotal?: FloatFilter<"AssessmentReplacementPart"> | number
    confirmed?: BoolFilter<"AssessmentReplacementPart"> | boolean
    vehiclePartId?: StringNullableFilter<"AssessmentReplacementPart"> | string | null
    assessmentId?: StringFilter<"AssessmentReplacementPart"> | string
    createdAt?: DateTimeFilter<"AssessmentReplacementPart"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentReplacementPartOrderByWithRelationInput = {
    id?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrderInput | SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
    confirmed?: SortOrder
    vehiclePartId?: SortOrderInput | SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
    _relevance?: AssessmentReplacementPartOrderByRelevanceInput
  }

  export type AssessmentReplacementPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssessmentReplacementPartWhereInput | AssessmentReplacementPartWhereInput[]
    OR?: AssessmentReplacementPartWhereInput[]
    NOT?: AssessmentReplacementPartWhereInput | AssessmentReplacementPartWhereInput[]
    partName?: StringFilter<"AssessmentReplacementPart"> | string
    partNumber?: StringNullableFilter<"AssessmentReplacementPart"> | string | null
    quantity?: IntFilter<"AssessmentReplacementPart"> | number
    unitPrice?: FloatFilter<"AssessmentReplacementPart"> | number
    subtotal?: FloatFilter<"AssessmentReplacementPart"> | number
    confirmed?: BoolFilter<"AssessmentReplacementPart"> | boolean
    vehiclePartId?: StringNullableFilter<"AssessmentReplacementPart"> | string | null
    assessmentId?: StringFilter<"AssessmentReplacementPart"> | string
    createdAt?: DateTimeFilter<"AssessmentReplacementPart"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id">

  export type AssessmentReplacementPartOrderByWithAggregationInput = {
    id?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrderInput | SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
    confirmed?: SortOrder
    vehiclePartId?: SortOrderInput | SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    _count?: AssessmentReplacementPartCountOrderByAggregateInput
    _avg?: AssessmentReplacementPartAvgOrderByAggregateInput
    _max?: AssessmentReplacementPartMaxOrderByAggregateInput
    _min?: AssessmentReplacementPartMinOrderByAggregateInput
    _sum?: AssessmentReplacementPartSumOrderByAggregateInput
  }

  export type AssessmentReplacementPartScalarWhereWithAggregatesInput = {
    AND?: AssessmentReplacementPartScalarWhereWithAggregatesInput | AssessmentReplacementPartScalarWhereWithAggregatesInput[]
    OR?: AssessmentReplacementPartScalarWhereWithAggregatesInput[]
    NOT?: AssessmentReplacementPartScalarWhereWithAggregatesInput | AssessmentReplacementPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentReplacementPart"> | string
    partName?: StringWithAggregatesFilter<"AssessmentReplacementPart"> | string
    partNumber?: StringNullableWithAggregatesFilter<"AssessmentReplacementPart"> | string | null
    quantity?: IntWithAggregatesFilter<"AssessmentReplacementPart"> | number
    unitPrice?: FloatWithAggregatesFilter<"AssessmentReplacementPart"> | number
    subtotal?: FloatWithAggregatesFilter<"AssessmentReplacementPart"> | number
    confirmed?: BoolWithAggregatesFilter<"AssessmentReplacementPart"> | boolean
    vehiclePartId?: StringNullableWithAggregatesFilter<"AssessmentReplacementPart"> | string | null
    assessmentId?: StringWithAggregatesFilter<"AssessmentReplacementPart"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentReplacementPart"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    website?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    prices?: SupplierPartPriceListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    prices?: SupplierPartPriceOrderByRelationAggregateInput
    _relevance?: SupplierOrderByRelevanceInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    website?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    prices?: SupplierPartPriceListRelationFilter
  }, "id" | "name">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    website?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type SupplierPartPriceWhereInput = {
    AND?: SupplierPartPriceWhereInput | SupplierPartPriceWhereInput[]
    OR?: SupplierPartPriceWhereInput[]
    NOT?: SupplierPartPriceWhereInput | SupplierPartPriceWhereInput[]
    id?: StringFilter<"SupplierPartPrice"> | string
    supplierId?: StringFilter<"SupplierPartPrice"> | string
    partName?: StringFilter<"SupplierPartPrice"> | string
    vehicleMake?: StringNullableFilter<"SupplierPartPrice"> | string | null
    vehicleModel?: StringNullableFilter<"SupplierPartPrice"> | string | null
    vehicleYear?: IntNullableFilter<"SupplierPartPrice"> | number | null
    partNumber?: StringNullableFilter<"SupplierPartPrice"> | string | null
    price?: FloatFilter<"SupplierPartPrice"> | number
    currency?: StringFilter<"SupplierPartPrice"> | string
    availability?: StringFilter<"SupplierPartPrice"> | string
    brand?: StringNullableFilter<"SupplierPartPrice"> | string | null
    condition?: StringFilter<"SupplierPartPrice"> | string
    url?: StringNullableFilter<"SupplierPartPrice"> | string | null
    source?: StringFilter<"SupplierPartPrice"> | string
    createdAt?: DateTimeFilter<"SupplierPartPrice"> | Date | string
    updatedAt?: DateTimeFilter<"SupplierPartPrice"> | Date | string
    supplier?: XOR<SupplierScalarRelationFilter, SupplierWhereInput>
  }

  export type SupplierPartPriceOrderByWithRelationInput = {
    id?: SortOrder
    supplierId?: SortOrder
    partName?: SortOrder
    vehicleMake?: SortOrderInput | SortOrder
    vehicleModel?: SortOrderInput | SortOrder
    vehicleYear?: SortOrderInput | SortOrder
    partNumber?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    availability?: SortOrder
    brand?: SortOrderInput | SortOrder
    condition?: SortOrder
    url?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplier?: SupplierOrderByWithRelationInput
    _relevance?: SupplierPartPriceOrderByRelevanceInput
  }

  export type SupplierPartPriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    supplierId_partName_vehicleMake_vehicleModel?: SupplierPartPriceSupplierIdPartNameVehicleMakeVehicleModelCompoundUniqueInput
    AND?: SupplierPartPriceWhereInput | SupplierPartPriceWhereInput[]
    OR?: SupplierPartPriceWhereInput[]
    NOT?: SupplierPartPriceWhereInput | SupplierPartPriceWhereInput[]
    supplierId?: StringFilter<"SupplierPartPrice"> | string
    partName?: StringFilter<"SupplierPartPrice"> | string
    vehicleMake?: StringNullableFilter<"SupplierPartPrice"> | string | null
    vehicleModel?: StringNullableFilter<"SupplierPartPrice"> | string | null
    vehicleYear?: IntNullableFilter<"SupplierPartPrice"> | number | null
    partNumber?: StringNullableFilter<"SupplierPartPrice"> | string | null
    price?: FloatFilter<"SupplierPartPrice"> | number
    currency?: StringFilter<"SupplierPartPrice"> | string
    availability?: StringFilter<"SupplierPartPrice"> | string
    brand?: StringNullableFilter<"SupplierPartPrice"> | string | null
    condition?: StringFilter<"SupplierPartPrice"> | string
    url?: StringNullableFilter<"SupplierPartPrice"> | string | null
    source?: StringFilter<"SupplierPartPrice"> | string
    createdAt?: DateTimeFilter<"SupplierPartPrice"> | Date | string
    updatedAt?: DateTimeFilter<"SupplierPartPrice"> | Date | string
    supplier?: XOR<SupplierScalarRelationFilter, SupplierWhereInput>
  }, "id" | "supplierId_partName_vehicleMake_vehicleModel">

  export type SupplierPartPriceOrderByWithAggregationInput = {
    id?: SortOrder
    supplierId?: SortOrder
    partName?: SortOrder
    vehicleMake?: SortOrderInput | SortOrder
    vehicleModel?: SortOrderInput | SortOrder
    vehicleYear?: SortOrderInput | SortOrder
    partNumber?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    availability?: SortOrder
    brand?: SortOrderInput | SortOrder
    condition?: SortOrder
    url?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierPartPriceCountOrderByAggregateInput
    _avg?: SupplierPartPriceAvgOrderByAggregateInput
    _max?: SupplierPartPriceMaxOrderByAggregateInput
    _min?: SupplierPartPriceMinOrderByAggregateInput
    _sum?: SupplierPartPriceSumOrderByAggregateInput
  }

  export type SupplierPartPriceScalarWhereWithAggregatesInput = {
    AND?: SupplierPartPriceScalarWhereWithAggregatesInput | SupplierPartPriceScalarWhereWithAggregatesInput[]
    OR?: SupplierPartPriceScalarWhereWithAggregatesInput[]
    NOT?: SupplierPartPriceScalarWhereWithAggregatesInput | SupplierPartPriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    supplierId?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    partName?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    vehicleMake?: StringNullableWithAggregatesFilter<"SupplierPartPrice"> | string | null
    vehicleModel?: StringNullableWithAggregatesFilter<"SupplierPartPrice"> | string | null
    vehicleYear?: IntNullableWithAggregatesFilter<"SupplierPartPrice"> | number | null
    partNumber?: StringNullableWithAggregatesFilter<"SupplierPartPrice"> | string | null
    price?: FloatWithAggregatesFilter<"SupplierPartPrice"> | number
    currency?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    availability?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    brand?: StringNullableWithAggregatesFilter<"SupplierPartPrice"> | string | null
    condition?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    url?: StringNullableWithAggregatesFilter<"SupplierPartPrice"> | string | null
    source?: StringWithAggregatesFilter<"SupplierPartPrice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SupplierPartPrice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupplierPartPrice"> | Date | string
  }

  export type PartPriceWhereInput = {
    AND?: PartPriceWhereInput | PartPriceWhereInput[]
    OR?: PartPriceWhereInput[]
    NOT?: PartPriceWhereInput | PartPriceWhereInput[]
    id?: StringFilter<"PartPrice"> | string
    make?: StringFilter<"PartPrice"> | string
    model?: StringFilter<"PartPrice"> | string
    year?: IntNullableFilter<"PartPrice"> | number | null
    partName?: StringFilter<"PartPrice"> | string
    partNumber?: StringNullableFilter<"PartPrice"> | string | null
    supplier?: StringFilter<"PartPrice"> | string
    price?: FloatFilter<"PartPrice"> | number
    currency?: StringFilter<"PartPrice"> | string
    condition?: StringFilter<"PartPrice"> | string
    source?: StringFilter<"PartPrice"> | string
    createdAt?: DateTimeFilter<"PartPrice"> | Date | string
    updatedAt?: DateTimeFilter<"PartPrice"> | Date | string
  }

  export type PartPriceOrderByWithRelationInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrderInput | SortOrder
    partName?: SortOrder
    partNumber?: SortOrderInput | SortOrder
    supplier?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    condition?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PartPriceOrderByRelevanceInput
  }

  export type PartPriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartPriceWhereInput | PartPriceWhereInput[]
    OR?: PartPriceWhereInput[]
    NOT?: PartPriceWhereInput | PartPriceWhereInput[]
    make?: StringFilter<"PartPrice"> | string
    model?: StringFilter<"PartPrice"> | string
    year?: IntNullableFilter<"PartPrice"> | number | null
    partName?: StringFilter<"PartPrice"> | string
    partNumber?: StringNullableFilter<"PartPrice"> | string | null
    supplier?: StringFilter<"PartPrice"> | string
    price?: FloatFilter<"PartPrice"> | number
    currency?: StringFilter<"PartPrice"> | string
    condition?: StringFilter<"PartPrice"> | string
    source?: StringFilter<"PartPrice"> | string
    createdAt?: DateTimeFilter<"PartPrice"> | Date | string
    updatedAt?: DateTimeFilter<"PartPrice"> | Date | string
  }, "id">

  export type PartPriceOrderByWithAggregationInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrderInput | SortOrder
    partName?: SortOrder
    partNumber?: SortOrderInput | SortOrder
    supplier?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    condition?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartPriceCountOrderByAggregateInput
    _avg?: PartPriceAvgOrderByAggregateInput
    _max?: PartPriceMaxOrderByAggregateInput
    _min?: PartPriceMinOrderByAggregateInput
    _sum?: PartPriceSumOrderByAggregateInput
  }

  export type PartPriceScalarWhereWithAggregatesInput = {
    AND?: PartPriceScalarWhereWithAggregatesInput | PartPriceScalarWhereWithAggregatesInput[]
    OR?: PartPriceScalarWhereWithAggregatesInput[]
    NOT?: PartPriceScalarWhereWithAggregatesInput | PartPriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PartPrice"> | string
    make?: StringWithAggregatesFilter<"PartPrice"> | string
    model?: StringWithAggregatesFilter<"PartPrice"> | string
    year?: IntNullableWithAggregatesFilter<"PartPrice"> | number | null
    partName?: StringWithAggregatesFilter<"PartPrice"> | string
    partNumber?: StringNullableWithAggregatesFilter<"PartPrice"> | string | null
    supplier?: StringWithAggregatesFilter<"PartPrice"> | string
    price?: FloatWithAggregatesFilter<"PartPrice"> | number
    currency?: StringWithAggregatesFilter<"PartPrice"> | string
    condition?: StringWithAggregatesFilter<"PartPrice"> | string
    source?: StringWithAggregatesFilter<"PartPrice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PartPrice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PartPrice"> | Date | string
  }

  export type InspectionItemWhereInput = {
    AND?: InspectionItemWhereInput | InspectionItemWhereInput[]
    OR?: InspectionItemWhereInput[]
    NOT?: InspectionItemWhereInput | InspectionItemWhereInput[]
    id?: StringFilter<"InspectionItem"> | string
    item?: StringFilter<"InspectionItem"> | string
    notes?: StringNullableFilter<"InspectionItem"> | string | null
    completed?: BoolFilter<"InspectionItem"> | boolean
    assessmentId?: StringFilter<"InspectionItem"> | string
    createdAt?: DateTimeFilter<"InspectionItem"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type InspectionItemOrderByWithRelationInput = {
    id?: SortOrder
    item?: SortOrder
    notes?: SortOrderInput | SortOrder
    completed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
    _relevance?: InspectionItemOrderByRelevanceInput
  }

  export type InspectionItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InspectionItemWhereInput | InspectionItemWhereInput[]
    OR?: InspectionItemWhereInput[]
    NOT?: InspectionItemWhereInput | InspectionItemWhereInput[]
    item?: StringFilter<"InspectionItem"> | string
    notes?: StringNullableFilter<"InspectionItem"> | string | null
    completed?: BoolFilter<"InspectionItem"> | boolean
    assessmentId?: StringFilter<"InspectionItem"> | string
    createdAt?: DateTimeFilter<"InspectionItem"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id">

  export type InspectionItemOrderByWithAggregationInput = {
    id?: SortOrder
    item?: SortOrder
    notes?: SortOrderInput | SortOrder
    completed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
    _count?: InspectionItemCountOrderByAggregateInput
    _max?: InspectionItemMaxOrderByAggregateInput
    _min?: InspectionItemMinOrderByAggregateInput
  }

  export type InspectionItemScalarWhereWithAggregatesInput = {
    AND?: InspectionItemScalarWhereWithAggregatesInput | InspectionItemScalarWhereWithAggregatesInput[]
    OR?: InspectionItemScalarWhereWithAggregatesInput[]
    NOT?: InspectionItemScalarWhereWithAggregatesInput | InspectionItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InspectionItem"> | string
    item?: StringWithAggregatesFilter<"InspectionItem"> | string
    notes?: StringNullableWithAggregatesFilter<"InspectionItem"> | string | null
    completed?: BoolWithAggregatesFilter<"InspectionItem"> | boolean
    assessmentId?: StringWithAggregatesFilter<"InspectionItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InspectionItem"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assessments?: AssessmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAssessmentsInput
    images?: AssessmentImageCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AssessmentImageUncheckedCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartUncheckedCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartUncheckedCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAssessmentsNestedInput
    images?: AssessmentImageUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AssessmentImageUncheckedUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentCreateManyInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageCreateInput = {
    id?: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder?: number
    createdAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutImagesInput
  }

  export type AssessmentImageUncheckedCreateInput = {
    id?: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder?: number
    assessmentId: string
    createdAt?: Date | string
  }

  export type AssessmentImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutImagesNestedInput
  }

  export type AssessmentImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageCreateManyInput = {
    id?: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder?: number
    assessmentId: string
    createdAt?: Date | string
  }

  export type AssessmentImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleMakeCreateInput = {
    id?: string
    name: string
    models?: VehicleModelCreateNestedManyWithoutMakeInput
  }

  export type VehicleMakeUncheckedCreateInput = {
    id?: string
    name: string
    models?: VehicleModelUncheckedCreateNestedManyWithoutMakeInput
  }

  export type VehicleMakeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    models?: VehicleModelUpdateManyWithoutMakeNestedInput
  }

  export type VehicleMakeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    models?: VehicleModelUncheckedUpdateManyWithoutMakeNestedInput
  }

  export type VehicleMakeCreateManyInput = {
    id?: string
    name: string
  }

  export type VehicleMakeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleMakeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleModelCreateInput = {
    id?: string
    name: string
    make: VehicleMakeCreateNestedOneWithoutModelsInput
    variants?: VehicleVariantCreateNestedManyWithoutModelInput
  }

  export type VehicleModelUncheckedCreateInput = {
    id?: string
    name: string
    makeId: string
    variants?: VehicleVariantUncheckedCreateNestedManyWithoutModelInput
  }

  export type VehicleModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    make?: VehicleMakeUpdateOneRequiredWithoutModelsNestedInput
    variants?: VehicleVariantUpdateManyWithoutModelNestedInput
  }

  export type VehicleModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    makeId?: StringFieldUpdateOperationsInput | string
    variants?: VehicleVariantUncheckedUpdateManyWithoutModelNestedInput
  }

  export type VehicleModelCreateManyInput = {
    id?: string
    name: string
    makeId: string
  }

  export type VehicleModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    makeId?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleVariantCreateInput = {
    id?: string
    name: string
    model: VehicleModelCreateNestedOneWithoutVariantsInput
    parts?: VehiclePartCreateNestedManyWithoutVariantInput
  }

  export type VehicleVariantUncheckedCreateInput = {
    id?: string
    name: string
    modelId: string
    parts?: VehiclePartUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VehicleVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: VehicleModelUpdateOneRequiredWithoutVariantsNestedInput
    parts?: VehiclePartUpdateManyWithoutVariantNestedInput
  }

  export type VehicleVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    parts?: VehiclePartUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type VehicleVariantCreateManyInput = {
    id?: string
    name: string
    modelId: string
  }

  export type VehicleVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
  }

  export type VehiclePartCreateInput = {
    id?: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    variant?: VehicleVariantCreateNestedOneWithoutPartsInput
  }

  export type VehiclePartUncheckedCreateInput = {
    id?: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active?: boolean
    variantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehiclePartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variant?: VehicleVariantUpdateOneWithoutPartsNestedInput
  }

  export type VehiclePartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehiclePartCreateManyInput = {
    id?: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active?: boolean
    variantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehiclePartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehiclePartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentDamagedPartCreateInput = {
    id?: string
    name: string
    severity?: string | null
    confirmed?: boolean
    createdAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutDamagedPartsInput
  }

  export type AssessmentDamagedPartUncheckedCreateInput = {
    id?: string
    name: string
    severity?: string | null
    confirmed?: boolean
    assessmentId: string
    createdAt?: Date | string
  }

  export type AssessmentDamagedPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutDamagedPartsNestedInput
  }

  export type AssessmentDamagedPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentDamagedPartCreateManyInput = {
    id?: string
    name: string
    severity?: string | null
    confirmed?: boolean
    assessmentId: string
    createdAt?: Date | string
  }

  export type AssessmentDamagedPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentDamagedPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentReplacementPartCreateInput = {
    id?: string
    partName: string
    partNumber?: string | null
    quantity?: number
    unitPrice: number
    subtotal: number
    confirmed?: boolean
    vehiclePartId?: string | null
    createdAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutReplacementPartsInput
  }

  export type AssessmentReplacementPartUncheckedCreateInput = {
    id?: string
    partName: string
    partNumber?: string | null
    quantity?: number
    unitPrice: number
    subtotal: number
    confirmed?: boolean
    vehiclePartId?: string | null
    assessmentId: string
    createdAt?: Date | string
  }

  export type AssessmentReplacementPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutReplacementPartsNestedInput
  }

  export type AssessmentReplacementPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentReplacementPartCreateManyInput = {
    id?: string
    partName: string
    partNumber?: string | null
    quantity?: number
    unitPrice: number
    subtotal: number
    confirmed?: boolean
    vehiclePartId?: string | null
    assessmentId: string
    createdAt?: Date | string
  }

  export type AssessmentReplacementPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentReplacementPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    id?: string
    name: string
    website?: string | null
    createdAt?: Date | string
    prices?: SupplierPartPriceCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    name: string
    website?: string | null
    createdAt?: Date | string
    prices?: SupplierPartPriceUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prices?: SupplierPartPriceUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prices?: SupplierPartPriceUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    name: string
    website?: string | null
    createdAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierPartPriceCreateInput = {
    id?: string
    partName: string
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleYear?: number | null
    partNumber?: string | null
    price: number
    currency?: string
    availability?: string
    brand?: string | null
    condition?: string
    url?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: SupplierCreateNestedOneWithoutPricesInput
  }

  export type SupplierPartPriceUncheckedCreateInput = {
    id?: string
    supplierId: string
    partName: string
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleYear?: number | null
    partNumber?: string | null
    price: number
    currency?: string
    availability?: string
    brand?: string | null
    condition?: string
    url?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierPartPriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneRequiredWithoutPricesNestedInput
  }

  export type SupplierPartPriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierPartPriceCreateManyInput = {
    id?: string
    supplierId: string
    partName: string
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleYear?: number | null
    partNumber?: string | null
    price: number
    currency?: string
    availability?: string
    brand?: string | null
    condition?: string
    url?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierPartPriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierPartPriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartPriceCreateInput = {
    id?: string
    make: string
    model: string
    year?: number | null
    partName: string
    partNumber?: string | null
    supplier: string
    price: number
    currency?: string
    condition?: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartPriceUncheckedCreateInput = {
    id?: string
    make: string
    model: string
    year?: number | null
    partName: string
    partNumber?: string | null
    supplier: string
    price: number
    currency?: string
    condition?: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartPriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartPriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartPriceCreateManyInput = {
    id?: string
    make: string
    model: string
    year?: number | null
    partName: string
    partNumber?: string | null
    supplier: string
    price: number
    currency?: string
    condition?: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartPriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartPriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    supplier?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InspectionItemCreateInput = {
    id?: string
    item: string
    notes?: string | null
    completed?: boolean
    createdAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutInspectionItemsInput
  }

  export type InspectionItemUncheckedCreateInput = {
    id?: string
    item: string
    notes?: string | null
    completed?: boolean
    assessmentId: string
    createdAt?: Date | string
  }

  export type InspectionItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutInspectionItemsNestedInput
  }

  export type InspectionItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InspectionItemCreateManyInput = {
    id?: string
    item: string
    notes?: string | null
    completed?: boolean
    assessmentId: string
    createdAt?: Date | string
  }

  export type InspectionItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InspectionItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    assessmentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AssessmentListRelationFilter = {
    every?: AssessmentWhereInput
    some?: AssessmentWhereInput
    none?: AssessmentWhereInput
  }

  export type AssessmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AssessmentImageListRelationFilter = {
    every?: AssessmentImageWhereInput
    some?: AssessmentImageWhereInput
    none?: AssessmentImageWhereInput
  }

  export type AssessmentDamagedPartListRelationFilter = {
    every?: AssessmentDamagedPartWhereInput
    some?: AssessmentDamagedPartWhereInput
    none?: AssessmentDamagedPartWhereInput
  }

  export type AssessmentReplacementPartListRelationFilter = {
    every?: AssessmentReplacementPartWhereInput
    some?: AssessmentReplacementPartWhereInput
    none?: AssessmentReplacementPartWhereInput
  }

  export type InspectionItemListRelationFilter = {
    every?: InspectionItemWhereInput
    some?: InspectionItemWhereInput
    none?: InspectionItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssessmentImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssessmentDamagedPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssessmentReplacementPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InspectionItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssessmentOrderByRelevanceInput = {
    fields: AssessmentOrderByRelevanceFieldEnum | AssessmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    assessmentNumber?: SortOrder
    status?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    insuranceCompany?: SortOrder
    claimNumber?: SortOrder
    registrationNumber?: SortOrder
    vin?: SortOrder
    odometer?: SortOrder
    vehicleNotes?: SortOrder
    aiRawResponse?: SortOrder
    verifiedVehicleJson?: SortOrder
    verifiedDamageJson?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    assessmentNumber?: SortOrder
    status?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    insuranceCompany?: SortOrder
    claimNumber?: SortOrder
    registrationNumber?: SortOrder
    vin?: SortOrder
    odometer?: SortOrder
    vehicleNotes?: SortOrder
    aiRawResponse?: SortOrder
    verifiedVehicleJson?: SortOrder
    verifiedDamageJson?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    assessmentNumber?: SortOrder
    status?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    insuranceCompany?: SortOrder
    claimNumber?: SortOrder
    registrationNumber?: SortOrder
    vin?: SortOrder
    odometer?: SortOrder
    vehicleNotes?: SortOrder
    aiRawResponse?: SortOrder
    verifiedVehicleJson?: SortOrder
    verifiedDamageJson?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AssessmentScalarRelationFilter = {
    is?: AssessmentWhereInput
    isNot?: AssessmentWhereInput
  }

  export type AssessmentImageOrderByRelevanceInput = {
    fields: AssessmentImageOrderByRelevanceFieldEnum | AssessmentImageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AssessmentImageCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentImageAvgOrderByAggregateInput = {
    size?: SortOrder
    sortOrder?: SortOrder
  }

  export type AssessmentImageMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentImageMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    originalName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentImageSumOrderByAggregateInput = {
    size?: SortOrder
    sortOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type VehicleModelListRelationFilter = {
    every?: VehicleModelWhereInput
    some?: VehicleModelWhereInput
    none?: VehicleModelWhereInput
  }

  export type VehicleModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleMakeOrderByRelevanceInput = {
    fields: VehicleMakeOrderByRelevanceFieldEnum | VehicleMakeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VehicleMakeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type VehicleMakeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type VehicleMakeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type VehicleMakeScalarRelationFilter = {
    is?: VehicleMakeWhereInput
    isNot?: VehicleMakeWhereInput
  }

  export type VehicleVariantListRelationFilter = {
    every?: VehicleVariantWhereInput
    some?: VehicleVariantWhereInput
    none?: VehicleVariantWhereInput
  }

  export type VehicleVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleModelOrderByRelevanceInput = {
    fields: VehicleModelOrderByRelevanceFieldEnum | VehicleModelOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VehicleModelNameMakeIdCompoundUniqueInput = {
    name: string
    makeId: string
  }

  export type VehicleModelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    makeId?: SortOrder
  }

  export type VehicleModelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    makeId?: SortOrder
  }

  export type VehicleModelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    makeId?: SortOrder
  }

  export type VehicleModelScalarRelationFilter = {
    is?: VehicleModelWhereInput
    isNot?: VehicleModelWhereInput
  }

  export type VehiclePartListRelationFilter = {
    every?: VehiclePartWhereInput
    some?: VehiclePartWhereInput
    none?: VehiclePartWhereInput
  }

  export type VehiclePartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleVariantOrderByRelevanceInput = {
    fields: VehicleVariantOrderByRelevanceFieldEnum | VehicleVariantOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VehicleVariantNameModelIdCompoundUniqueInput = {
    name: string
    modelId: string
  }

  export type VehicleVariantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    modelId?: SortOrder
  }

  export type VehicleVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    modelId?: SortOrder
  }

  export type VehicleVariantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    modelId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VehicleVariantNullableScalarRelationFilter = {
    is?: VehicleVariantWhereInput | null
    isNot?: VehicleVariantWhereInput | null
  }

  export type VehiclePartOrderByRelevanceInput = {
    fields: VehiclePartOrderByRelevanceFieldEnum | VehiclePartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VehiclePartCountOrderByAggregateInput = {
    id?: SortOrder
    partNumber?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unitPrice?: SortOrder
    labourCost?: SortOrder
    active?: SortOrder
    variantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehiclePartAvgOrderByAggregateInput = {
    unitPrice?: SortOrder
    labourCost?: SortOrder
  }

  export type VehiclePartMaxOrderByAggregateInput = {
    id?: SortOrder
    partNumber?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unitPrice?: SortOrder
    labourCost?: SortOrder
    active?: SortOrder
    variantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehiclePartMinOrderByAggregateInput = {
    id?: SortOrder
    partNumber?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unitPrice?: SortOrder
    labourCost?: SortOrder
    active?: SortOrder
    variantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehiclePartSumOrderByAggregateInput = {
    unitPrice?: SortOrder
    labourCost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AssessmentDamagedPartOrderByRelevanceInput = {
    fields: AssessmentDamagedPartOrderByRelevanceFieldEnum | AssessmentDamagedPartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AssessmentDamagedPartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    severity?: SortOrder
    confirmed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentDamagedPartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    severity?: SortOrder
    confirmed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentDamagedPartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    severity?: SortOrder
    confirmed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentReplacementPartOrderByRelevanceInput = {
    fields: AssessmentReplacementPartOrderByRelevanceFieldEnum | AssessmentReplacementPartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AssessmentReplacementPartCountOrderByAggregateInput = {
    id?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
    confirmed?: SortOrder
    vehiclePartId?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentReplacementPartAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
  }

  export type AssessmentReplacementPartMaxOrderByAggregateInput = {
    id?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
    confirmed?: SortOrder
    vehiclePartId?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentReplacementPartMinOrderByAggregateInput = {
    id?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
    confirmed?: SortOrder
    vehiclePartId?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentReplacementPartSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    subtotal?: SortOrder
  }

  export type SupplierPartPriceListRelationFilter = {
    every?: SupplierPartPriceWhereInput
    some?: SupplierPartPriceWhereInput
    none?: SupplierPartPriceWhereInput
  }

  export type SupplierPartPriceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupplierOrderByRelevanceInput = {
    fields: SupplierOrderByRelevanceFieldEnum | SupplierOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SupplierScalarRelationFilter = {
    is?: SupplierWhereInput
    isNot?: SupplierWhereInput
  }

  export type SupplierPartPriceOrderByRelevanceInput = {
    fields: SupplierPartPriceOrderByRelevanceFieldEnum | SupplierPartPriceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SupplierPartPriceSupplierIdPartNameVehicleMakeVehicleModelCompoundUniqueInput = {
    supplierId: string
    partName: string
    vehicleMake: string
    vehicleModel: string
  }

  export type SupplierPartPriceCountOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    partName?: SortOrder
    vehicleMake?: SortOrder
    vehicleModel?: SortOrder
    vehicleYear?: SortOrder
    partNumber?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    availability?: SortOrder
    brand?: SortOrder
    condition?: SortOrder
    url?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierPartPriceAvgOrderByAggregateInput = {
    vehicleYear?: SortOrder
    price?: SortOrder
  }

  export type SupplierPartPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    partName?: SortOrder
    vehicleMake?: SortOrder
    vehicleModel?: SortOrder
    vehicleYear?: SortOrder
    partNumber?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    availability?: SortOrder
    brand?: SortOrder
    condition?: SortOrder
    url?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierPartPriceMinOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    partName?: SortOrder
    vehicleMake?: SortOrder
    vehicleModel?: SortOrder
    vehicleYear?: SortOrder
    partNumber?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    availability?: SortOrder
    brand?: SortOrder
    condition?: SortOrder
    url?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierPartPriceSumOrderByAggregateInput = {
    vehicleYear?: SortOrder
    price?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PartPriceOrderByRelevanceInput = {
    fields: PartPriceOrderByRelevanceFieldEnum | PartPriceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PartPriceCountOrderByAggregateInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrder
    supplier?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    condition?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartPriceAvgOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
  }

  export type PartPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrder
    supplier?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    condition?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartPriceMinOrderByAggregateInput = {
    id?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    partName?: SortOrder
    partNumber?: SortOrder
    supplier?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    condition?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartPriceSumOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
  }

  export type InspectionItemOrderByRelevanceInput = {
    fields: InspectionItemOrderByRelevanceFieldEnum | InspectionItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InspectionItemCountOrderByAggregateInput = {
    id?: SortOrder
    item?: SortOrder
    notes?: SortOrder
    completed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type InspectionItemMaxOrderByAggregateInput = {
    id?: SortOrder
    item?: SortOrder
    notes?: SortOrder
    completed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type InspectionItemMinOrderByAggregateInput = {
    id?: SortOrder
    item?: SortOrder
    notes?: SortOrder
    completed?: SortOrder
    assessmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentCreateNestedManyWithoutUserInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type AssessmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AssessmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutUserInput | AssessmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutUserInput | AssessmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutUserInput | AssessmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AssessmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutUserInput | AssessmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutUserInput | AssessmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutUserInput | AssessmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAssessmentsInput = {
    create?: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssessmentsInput
    connect?: UserWhereUniqueInput
  }

  export type AssessmentImageCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<AssessmentImageCreateWithoutAssessmentInput, AssessmentImageUncheckedCreateWithoutAssessmentInput> | AssessmentImageCreateWithoutAssessmentInput[] | AssessmentImageUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentImageCreateOrConnectWithoutAssessmentInput | AssessmentImageCreateOrConnectWithoutAssessmentInput[]
    createMany?: AssessmentImageCreateManyAssessmentInputEnvelope
    connect?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
  }

  export type AssessmentDamagedPartCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<AssessmentDamagedPartCreateWithoutAssessmentInput, AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput> | AssessmentDamagedPartCreateWithoutAssessmentInput[] | AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput | AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput[]
    createMany?: AssessmentDamagedPartCreateManyAssessmentInputEnvelope
    connect?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
  }

  export type AssessmentReplacementPartCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<AssessmentReplacementPartCreateWithoutAssessmentInput, AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput> | AssessmentReplacementPartCreateWithoutAssessmentInput[] | AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput | AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput[]
    createMany?: AssessmentReplacementPartCreateManyAssessmentInputEnvelope
    connect?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
  }

  export type InspectionItemCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<InspectionItemCreateWithoutAssessmentInput, InspectionItemUncheckedCreateWithoutAssessmentInput> | InspectionItemCreateWithoutAssessmentInput[] | InspectionItemUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: InspectionItemCreateOrConnectWithoutAssessmentInput | InspectionItemCreateOrConnectWithoutAssessmentInput[]
    createMany?: InspectionItemCreateManyAssessmentInputEnvelope
    connect?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
  }

  export type AssessmentImageUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<AssessmentImageCreateWithoutAssessmentInput, AssessmentImageUncheckedCreateWithoutAssessmentInput> | AssessmentImageCreateWithoutAssessmentInput[] | AssessmentImageUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentImageCreateOrConnectWithoutAssessmentInput | AssessmentImageCreateOrConnectWithoutAssessmentInput[]
    createMany?: AssessmentImageCreateManyAssessmentInputEnvelope
    connect?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
  }

  export type AssessmentDamagedPartUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<AssessmentDamagedPartCreateWithoutAssessmentInput, AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput> | AssessmentDamagedPartCreateWithoutAssessmentInput[] | AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput | AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput[]
    createMany?: AssessmentDamagedPartCreateManyAssessmentInputEnvelope
    connect?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
  }

  export type AssessmentReplacementPartUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<AssessmentReplacementPartCreateWithoutAssessmentInput, AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput> | AssessmentReplacementPartCreateWithoutAssessmentInput[] | AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput | AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput[]
    createMany?: AssessmentReplacementPartCreateManyAssessmentInputEnvelope
    connect?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
  }

  export type InspectionItemUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<InspectionItemCreateWithoutAssessmentInput, InspectionItemUncheckedCreateWithoutAssessmentInput> | InspectionItemCreateWithoutAssessmentInput[] | InspectionItemUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: InspectionItemCreateOrConnectWithoutAssessmentInput | InspectionItemCreateOrConnectWithoutAssessmentInput[]
    createMany?: InspectionItemCreateManyAssessmentInputEnvelope
    connect?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneWithoutAssessmentsNestedInput = {
    create?: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssessmentsInput
    upsert?: UserUpsertWithoutAssessmentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssessmentsInput, UserUpdateWithoutAssessmentsInput>, UserUncheckedUpdateWithoutAssessmentsInput>
  }

  export type AssessmentImageUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentImageCreateWithoutAssessmentInput, AssessmentImageUncheckedCreateWithoutAssessmentInput> | AssessmentImageCreateWithoutAssessmentInput[] | AssessmentImageUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentImageCreateOrConnectWithoutAssessmentInput | AssessmentImageCreateOrConnectWithoutAssessmentInput[]
    upsert?: AssessmentImageUpsertWithWhereUniqueWithoutAssessmentInput | AssessmentImageUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: AssessmentImageCreateManyAssessmentInputEnvelope
    set?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    disconnect?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    delete?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    connect?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    update?: AssessmentImageUpdateWithWhereUniqueWithoutAssessmentInput | AssessmentImageUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: AssessmentImageUpdateManyWithWhereWithoutAssessmentInput | AssessmentImageUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: AssessmentImageScalarWhereInput | AssessmentImageScalarWhereInput[]
  }

  export type AssessmentDamagedPartUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentDamagedPartCreateWithoutAssessmentInput, AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput> | AssessmentDamagedPartCreateWithoutAssessmentInput[] | AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput | AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput[]
    upsert?: AssessmentDamagedPartUpsertWithWhereUniqueWithoutAssessmentInput | AssessmentDamagedPartUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: AssessmentDamagedPartCreateManyAssessmentInputEnvelope
    set?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    disconnect?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    delete?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    connect?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    update?: AssessmentDamagedPartUpdateWithWhereUniqueWithoutAssessmentInput | AssessmentDamagedPartUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: AssessmentDamagedPartUpdateManyWithWhereWithoutAssessmentInput | AssessmentDamagedPartUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: AssessmentDamagedPartScalarWhereInput | AssessmentDamagedPartScalarWhereInput[]
  }

  export type AssessmentReplacementPartUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentReplacementPartCreateWithoutAssessmentInput, AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput> | AssessmentReplacementPartCreateWithoutAssessmentInput[] | AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput | AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput[]
    upsert?: AssessmentReplacementPartUpsertWithWhereUniqueWithoutAssessmentInput | AssessmentReplacementPartUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: AssessmentReplacementPartCreateManyAssessmentInputEnvelope
    set?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    disconnect?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    delete?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    connect?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    update?: AssessmentReplacementPartUpdateWithWhereUniqueWithoutAssessmentInput | AssessmentReplacementPartUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: AssessmentReplacementPartUpdateManyWithWhereWithoutAssessmentInput | AssessmentReplacementPartUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: AssessmentReplacementPartScalarWhereInput | AssessmentReplacementPartScalarWhereInput[]
  }

  export type InspectionItemUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<InspectionItemCreateWithoutAssessmentInput, InspectionItemUncheckedCreateWithoutAssessmentInput> | InspectionItemCreateWithoutAssessmentInput[] | InspectionItemUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: InspectionItemCreateOrConnectWithoutAssessmentInput | InspectionItemCreateOrConnectWithoutAssessmentInput[]
    upsert?: InspectionItemUpsertWithWhereUniqueWithoutAssessmentInput | InspectionItemUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: InspectionItemCreateManyAssessmentInputEnvelope
    set?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    disconnect?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    delete?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    connect?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    update?: InspectionItemUpdateWithWhereUniqueWithoutAssessmentInput | InspectionItemUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: InspectionItemUpdateManyWithWhereWithoutAssessmentInput | InspectionItemUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: InspectionItemScalarWhereInput | InspectionItemScalarWhereInput[]
  }

  export type AssessmentImageUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentImageCreateWithoutAssessmentInput, AssessmentImageUncheckedCreateWithoutAssessmentInput> | AssessmentImageCreateWithoutAssessmentInput[] | AssessmentImageUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentImageCreateOrConnectWithoutAssessmentInput | AssessmentImageCreateOrConnectWithoutAssessmentInput[]
    upsert?: AssessmentImageUpsertWithWhereUniqueWithoutAssessmentInput | AssessmentImageUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: AssessmentImageCreateManyAssessmentInputEnvelope
    set?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    disconnect?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    delete?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    connect?: AssessmentImageWhereUniqueInput | AssessmentImageWhereUniqueInput[]
    update?: AssessmentImageUpdateWithWhereUniqueWithoutAssessmentInput | AssessmentImageUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: AssessmentImageUpdateManyWithWhereWithoutAssessmentInput | AssessmentImageUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: AssessmentImageScalarWhereInput | AssessmentImageScalarWhereInput[]
  }

  export type AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentDamagedPartCreateWithoutAssessmentInput, AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput> | AssessmentDamagedPartCreateWithoutAssessmentInput[] | AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput | AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput[]
    upsert?: AssessmentDamagedPartUpsertWithWhereUniqueWithoutAssessmentInput | AssessmentDamagedPartUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: AssessmentDamagedPartCreateManyAssessmentInputEnvelope
    set?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    disconnect?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    delete?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    connect?: AssessmentDamagedPartWhereUniqueInput | AssessmentDamagedPartWhereUniqueInput[]
    update?: AssessmentDamagedPartUpdateWithWhereUniqueWithoutAssessmentInput | AssessmentDamagedPartUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: AssessmentDamagedPartUpdateManyWithWhereWithoutAssessmentInput | AssessmentDamagedPartUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: AssessmentDamagedPartScalarWhereInput | AssessmentDamagedPartScalarWhereInput[]
  }

  export type AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentReplacementPartCreateWithoutAssessmentInput, AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput> | AssessmentReplacementPartCreateWithoutAssessmentInput[] | AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput | AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput[]
    upsert?: AssessmentReplacementPartUpsertWithWhereUniqueWithoutAssessmentInput | AssessmentReplacementPartUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: AssessmentReplacementPartCreateManyAssessmentInputEnvelope
    set?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    disconnect?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    delete?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    connect?: AssessmentReplacementPartWhereUniqueInput | AssessmentReplacementPartWhereUniqueInput[]
    update?: AssessmentReplacementPartUpdateWithWhereUniqueWithoutAssessmentInput | AssessmentReplacementPartUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: AssessmentReplacementPartUpdateManyWithWhereWithoutAssessmentInput | AssessmentReplacementPartUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: AssessmentReplacementPartScalarWhereInput | AssessmentReplacementPartScalarWhereInput[]
  }

  export type InspectionItemUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<InspectionItemCreateWithoutAssessmentInput, InspectionItemUncheckedCreateWithoutAssessmentInput> | InspectionItemCreateWithoutAssessmentInput[] | InspectionItemUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: InspectionItemCreateOrConnectWithoutAssessmentInput | InspectionItemCreateOrConnectWithoutAssessmentInput[]
    upsert?: InspectionItemUpsertWithWhereUniqueWithoutAssessmentInput | InspectionItemUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: InspectionItemCreateManyAssessmentInputEnvelope
    set?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    disconnect?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    delete?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    connect?: InspectionItemWhereUniqueInput | InspectionItemWhereUniqueInput[]
    update?: InspectionItemUpdateWithWhereUniqueWithoutAssessmentInput | InspectionItemUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: InspectionItemUpdateManyWithWhereWithoutAssessmentInput | InspectionItemUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: InspectionItemScalarWhereInput | InspectionItemScalarWhereInput[]
  }

  export type AssessmentCreateNestedOneWithoutImagesInput = {
    create?: XOR<AssessmentCreateWithoutImagesInput, AssessmentUncheckedCreateWithoutImagesInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutImagesInput
    connect?: AssessmentWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssessmentUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<AssessmentCreateWithoutImagesInput, AssessmentUncheckedCreateWithoutImagesInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutImagesInput
    upsert?: AssessmentUpsertWithoutImagesInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutImagesInput, AssessmentUpdateWithoutImagesInput>, AssessmentUncheckedUpdateWithoutImagesInput>
  }

  export type VehicleModelCreateNestedManyWithoutMakeInput = {
    create?: XOR<VehicleModelCreateWithoutMakeInput, VehicleModelUncheckedCreateWithoutMakeInput> | VehicleModelCreateWithoutMakeInput[] | VehicleModelUncheckedCreateWithoutMakeInput[]
    connectOrCreate?: VehicleModelCreateOrConnectWithoutMakeInput | VehicleModelCreateOrConnectWithoutMakeInput[]
    createMany?: VehicleModelCreateManyMakeInputEnvelope
    connect?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
  }

  export type VehicleModelUncheckedCreateNestedManyWithoutMakeInput = {
    create?: XOR<VehicleModelCreateWithoutMakeInput, VehicleModelUncheckedCreateWithoutMakeInput> | VehicleModelCreateWithoutMakeInput[] | VehicleModelUncheckedCreateWithoutMakeInput[]
    connectOrCreate?: VehicleModelCreateOrConnectWithoutMakeInput | VehicleModelCreateOrConnectWithoutMakeInput[]
    createMany?: VehicleModelCreateManyMakeInputEnvelope
    connect?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
  }

  export type VehicleModelUpdateManyWithoutMakeNestedInput = {
    create?: XOR<VehicleModelCreateWithoutMakeInput, VehicleModelUncheckedCreateWithoutMakeInput> | VehicleModelCreateWithoutMakeInput[] | VehicleModelUncheckedCreateWithoutMakeInput[]
    connectOrCreate?: VehicleModelCreateOrConnectWithoutMakeInput | VehicleModelCreateOrConnectWithoutMakeInput[]
    upsert?: VehicleModelUpsertWithWhereUniqueWithoutMakeInput | VehicleModelUpsertWithWhereUniqueWithoutMakeInput[]
    createMany?: VehicleModelCreateManyMakeInputEnvelope
    set?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    disconnect?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    delete?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    connect?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    update?: VehicleModelUpdateWithWhereUniqueWithoutMakeInput | VehicleModelUpdateWithWhereUniqueWithoutMakeInput[]
    updateMany?: VehicleModelUpdateManyWithWhereWithoutMakeInput | VehicleModelUpdateManyWithWhereWithoutMakeInput[]
    deleteMany?: VehicleModelScalarWhereInput | VehicleModelScalarWhereInput[]
  }

  export type VehicleModelUncheckedUpdateManyWithoutMakeNestedInput = {
    create?: XOR<VehicleModelCreateWithoutMakeInput, VehicleModelUncheckedCreateWithoutMakeInput> | VehicleModelCreateWithoutMakeInput[] | VehicleModelUncheckedCreateWithoutMakeInput[]
    connectOrCreate?: VehicleModelCreateOrConnectWithoutMakeInput | VehicleModelCreateOrConnectWithoutMakeInput[]
    upsert?: VehicleModelUpsertWithWhereUniqueWithoutMakeInput | VehicleModelUpsertWithWhereUniqueWithoutMakeInput[]
    createMany?: VehicleModelCreateManyMakeInputEnvelope
    set?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    disconnect?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    delete?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    connect?: VehicleModelWhereUniqueInput | VehicleModelWhereUniqueInput[]
    update?: VehicleModelUpdateWithWhereUniqueWithoutMakeInput | VehicleModelUpdateWithWhereUniqueWithoutMakeInput[]
    updateMany?: VehicleModelUpdateManyWithWhereWithoutMakeInput | VehicleModelUpdateManyWithWhereWithoutMakeInput[]
    deleteMany?: VehicleModelScalarWhereInput | VehicleModelScalarWhereInput[]
  }

  export type VehicleMakeCreateNestedOneWithoutModelsInput = {
    create?: XOR<VehicleMakeCreateWithoutModelsInput, VehicleMakeUncheckedCreateWithoutModelsInput>
    connectOrCreate?: VehicleMakeCreateOrConnectWithoutModelsInput
    connect?: VehicleMakeWhereUniqueInput
  }

  export type VehicleVariantCreateNestedManyWithoutModelInput = {
    create?: XOR<VehicleVariantCreateWithoutModelInput, VehicleVariantUncheckedCreateWithoutModelInput> | VehicleVariantCreateWithoutModelInput[] | VehicleVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: VehicleVariantCreateOrConnectWithoutModelInput | VehicleVariantCreateOrConnectWithoutModelInput[]
    createMany?: VehicleVariantCreateManyModelInputEnvelope
    connect?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
  }

  export type VehicleVariantUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<VehicleVariantCreateWithoutModelInput, VehicleVariantUncheckedCreateWithoutModelInput> | VehicleVariantCreateWithoutModelInput[] | VehicleVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: VehicleVariantCreateOrConnectWithoutModelInput | VehicleVariantCreateOrConnectWithoutModelInput[]
    createMany?: VehicleVariantCreateManyModelInputEnvelope
    connect?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
  }

  export type VehicleMakeUpdateOneRequiredWithoutModelsNestedInput = {
    create?: XOR<VehicleMakeCreateWithoutModelsInput, VehicleMakeUncheckedCreateWithoutModelsInput>
    connectOrCreate?: VehicleMakeCreateOrConnectWithoutModelsInput
    upsert?: VehicleMakeUpsertWithoutModelsInput
    connect?: VehicleMakeWhereUniqueInput
    update?: XOR<XOR<VehicleMakeUpdateToOneWithWhereWithoutModelsInput, VehicleMakeUpdateWithoutModelsInput>, VehicleMakeUncheckedUpdateWithoutModelsInput>
  }

  export type VehicleVariantUpdateManyWithoutModelNestedInput = {
    create?: XOR<VehicleVariantCreateWithoutModelInput, VehicleVariantUncheckedCreateWithoutModelInput> | VehicleVariantCreateWithoutModelInput[] | VehicleVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: VehicleVariantCreateOrConnectWithoutModelInput | VehicleVariantCreateOrConnectWithoutModelInput[]
    upsert?: VehicleVariantUpsertWithWhereUniqueWithoutModelInput | VehicleVariantUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: VehicleVariantCreateManyModelInputEnvelope
    set?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    disconnect?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    delete?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    connect?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    update?: VehicleVariantUpdateWithWhereUniqueWithoutModelInput | VehicleVariantUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: VehicleVariantUpdateManyWithWhereWithoutModelInput | VehicleVariantUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: VehicleVariantScalarWhereInput | VehicleVariantScalarWhereInput[]
  }

  export type VehicleVariantUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<VehicleVariantCreateWithoutModelInput, VehicleVariantUncheckedCreateWithoutModelInput> | VehicleVariantCreateWithoutModelInput[] | VehicleVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: VehicleVariantCreateOrConnectWithoutModelInput | VehicleVariantCreateOrConnectWithoutModelInput[]
    upsert?: VehicleVariantUpsertWithWhereUniqueWithoutModelInput | VehicleVariantUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: VehicleVariantCreateManyModelInputEnvelope
    set?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    disconnect?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    delete?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    connect?: VehicleVariantWhereUniqueInput | VehicleVariantWhereUniqueInput[]
    update?: VehicleVariantUpdateWithWhereUniqueWithoutModelInput | VehicleVariantUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: VehicleVariantUpdateManyWithWhereWithoutModelInput | VehicleVariantUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: VehicleVariantScalarWhereInput | VehicleVariantScalarWhereInput[]
  }

  export type VehicleModelCreateNestedOneWithoutVariantsInput = {
    create?: XOR<VehicleModelCreateWithoutVariantsInput, VehicleModelUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: VehicleModelCreateOrConnectWithoutVariantsInput
    connect?: VehicleModelWhereUniqueInput
  }

  export type VehiclePartCreateNestedManyWithoutVariantInput = {
    create?: XOR<VehiclePartCreateWithoutVariantInput, VehiclePartUncheckedCreateWithoutVariantInput> | VehiclePartCreateWithoutVariantInput[] | VehiclePartUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VehiclePartCreateOrConnectWithoutVariantInput | VehiclePartCreateOrConnectWithoutVariantInput[]
    createMany?: VehiclePartCreateManyVariantInputEnvelope
    connect?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
  }

  export type VehiclePartUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<VehiclePartCreateWithoutVariantInput, VehiclePartUncheckedCreateWithoutVariantInput> | VehiclePartCreateWithoutVariantInput[] | VehiclePartUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VehiclePartCreateOrConnectWithoutVariantInput | VehiclePartCreateOrConnectWithoutVariantInput[]
    createMany?: VehiclePartCreateManyVariantInputEnvelope
    connect?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
  }

  export type VehicleModelUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<VehicleModelCreateWithoutVariantsInput, VehicleModelUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: VehicleModelCreateOrConnectWithoutVariantsInput
    upsert?: VehicleModelUpsertWithoutVariantsInput
    connect?: VehicleModelWhereUniqueInput
    update?: XOR<XOR<VehicleModelUpdateToOneWithWhereWithoutVariantsInput, VehicleModelUpdateWithoutVariantsInput>, VehicleModelUncheckedUpdateWithoutVariantsInput>
  }

  export type VehiclePartUpdateManyWithoutVariantNestedInput = {
    create?: XOR<VehiclePartCreateWithoutVariantInput, VehiclePartUncheckedCreateWithoutVariantInput> | VehiclePartCreateWithoutVariantInput[] | VehiclePartUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VehiclePartCreateOrConnectWithoutVariantInput | VehiclePartCreateOrConnectWithoutVariantInput[]
    upsert?: VehiclePartUpsertWithWhereUniqueWithoutVariantInput | VehiclePartUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: VehiclePartCreateManyVariantInputEnvelope
    set?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    disconnect?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    delete?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    connect?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    update?: VehiclePartUpdateWithWhereUniqueWithoutVariantInput | VehiclePartUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: VehiclePartUpdateManyWithWhereWithoutVariantInput | VehiclePartUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: VehiclePartScalarWhereInput | VehiclePartScalarWhereInput[]
  }

  export type VehiclePartUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<VehiclePartCreateWithoutVariantInput, VehiclePartUncheckedCreateWithoutVariantInput> | VehiclePartCreateWithoutVariantInput[] | VehiclePartUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: VehiclePartCreateOrConnectWithoutVariantInput | VehiclePartCreateOrConnectWithoutVariantInput[]
    upsert?: VehiclePartUpsertWithWhereUniqueWithoutVariantInput | VehiclePartUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: VehiclePartCreateManyVariantInputEnvelope
    set?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    disconnect?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    delete?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    connect?: VehiclePartWhereUniqueInput | VehiclePartWhereUniqueInput[]
    update?: VehiclePartUpdateWithWhereUniqueWithoutVariantInput | VehiclePartUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: VehiclePartUpdateManyWithWhereWithoutVariantInput | VehiclePartUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: VehiclePartScalarWhereInput | VehiclePartScalarWhereInput[]
  }

  export type VehicleVariantCreateNestedOneWithoutPartsInput = {
    create?: XOR<VehicleVariantCreateWithoutPartsInput, VehicleVariantUncheckedCreateWithoutPartsInput>
    connectOrCreate?: VehicleVariantCreateOrConnectWithoutPartsInput
    connect?: VehicleVariantWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type VehicleVariantUpdateOneWithoutPartsNestedInput = {
    create?: XOR<VehicleVariantCreateWithoutPartsInput, VehicleVariantUncheckedCreateWithoutPartsInput>
    connectOrCreate?: VehicleVariantCreateOrConnectWithoutPartsInput
    upsert?: VehicleVariantUpsertWithoutPartsInput
    disconnect?: VehicleVariantWhereInput | boolean
    delete?: VehicleVariantWhereInput | boolean
    connect?: VehicleVariantWhereUniqueInput
    update?: XOR<XOR<VehicleVariantUpdateToOneWithWhereWithoutPartsInput, VehicleVariantUpdateWithoutPartsInput>, VehicleVariantUncheckedUpdateWithoutPartsInput>
  }

  export type AssessmentCreateNestedOneWithoutDamagedPartsInput = {
    create?: XOR<AssessmentCreateWithoutDamagedPartsInput, AssessmentUncheckedCreateWithoutDamagedPartsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutDamagedPartsInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUpdateOneRequiredWithoutDamagedPartsNestedInput = {
    create?: XOR<AssessmentCreateWithoutDamagedPartsInput, AssessmentUncheckedCreateWithoutDamagedPartsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutDamagedPartsInput
    upsert?: AssessmentUpsertWithoutDamagedPartsInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutDamagedPartsInput, AssessmentUpdateWithoutDamagedPartsInput>, AssessmentUncheckedUpdateWithoutDamagedPartsInput>
  }

  export type AssessmentCreateNestedOneWithoutReplacementPartsInput = {
    create?: XOR<AssessmentCreateWithoutReplacementPartsInput, AssessmentUncheckedCreateWithoutReplacementPartsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutReplacementPartsInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUpdateOneRequiredWithoutReplacementPartsNestedInput = {
    create?: XOR<AssessmentCreateWithoutReplacementPartsInput, AssessmentUncheckedCreateWithoutReplacementPartsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutReplacementPartsInput
    upsert?: AssessmentUpsertWithoutReplacementPartsInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutReplacementPartsInput, AssessmentUpdateWithoutReplacementPartsInput>, AssessmentUncheckedUpdateWithoutReplacementPartsInput>
  }

  export type SupplierPartPriceCreateNestedManyWithoutSupplierInput = {
    create?: XOR<SupplierPartPriceCreateWithoutSupplierInput, SupplierPartPriceUncheckedCreateWithoutSupplierInput> | SupplierPartPriceCreateWithoutSupplierInput[] | SupplierPartPriceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplierPartPriceCreateOrConnectWithoutSupplierInput | SupplierPartPriceCreateOrConnectWithoutSupplierInput[]
    createMany?: SupplierPartPriceCreateManySupplierInputEnvelope
    connect?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
  }

  export type SupplierPartPriceUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<SupplierPartPriceCreateWithoutSupplierInput, SupplierPartPriceUncheckedCreateWithoutSupplierInput> | SupplierPartPriceCreateWithoutSupplierInput[] | SupplierPartPriceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplierPartPriceCreateOrConnectWithoutSupplierInput | SupplierPartPriceCreateOrConnectWithoutSupplierInput[]
    createMany?: SupplierPartPriceCreateManySupplierInputEnvelope
    connect?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
  }

  export type SupplierPartPriceUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<SupplierPartPriceCreateWithoutSupplierInput, SupplierPartPriceUncheckedCreateWithoutSupplierInput> | SupplierPartPriceCreateWithoutSupplierInput[] | SupplierPartPriceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplierPartPriceCreateOrConnectWithoutSupplierInput | SupplierPartPriceCreateOrConnectWithoutSupplierInput[]
    upsert?: SupplierPartPriceUpsertWithWhereUniqueWithoutSupplierInput | SupplierPartPriceUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: SupplierPartPriceCreateManySupplierInputEnvelope
    set?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    disconnect?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    delete?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    connect?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    update?: SupplierPartPriceUpdateWithWhereUniqueWithoutSupplierInput | SupplierPartPriceUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: SupplierPartPriceUpdateManyWithWhereWithoutSupplierInput | SupplierPartPriceUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: SupplierPartPriceScalarWhereInput | SupplierPartPriceScalarWhereInput[]
  }

  export type SupplierPartPriceUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<SupplierPartPriceCreateWithoutSupplierInput, SupplierPartPriceUncheckedCreateWithoutSupplierInput> | SupplierPartPriceCreateWithoutSupplierInput[] | SupplierPartPriceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: SupplierPartPriceCreateOrConnectWithoutSupplierInput | SupplierPartPriceCreateOrConnectWithoutSupplierInput[]
    upsert?: SupplierPartPriceUpsertWithWhereUniqueWithoutSupplierInput | SupplierPartPriceUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: SupplierPartPriceCreateManySupplierInputEnvelope
    set?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    disconnect?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    delete?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    connect?: SupplierPartPriceWhereUniqueInput | SupplierPartPriceWhereUniqueInput[]
    update?: SupplierPartPriceUpdateWithWhereUniqueWithoutSupplierInput | SupplierPartPriceUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: SupplierPartPriceUpdateManyWithWhereWithoutSupplierInput | SupplierPartPriceUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: SupplierPartPriceScalarWhereInput | SupplierPartPriceScalarWhereInput[]
  }

  export type SupplierCreateNestedOneWithoutPricesInput = {
    create?: XOR<SupplierCreateWithoutPricesInput, SupplierUncheckedCreateWithoutPricesInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutPricesInput
    connect?: SupplierWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SupplierUpdateOneRequiredWithoutPricesNestedInput = {
    create?: XOR<SupplierCreateWithoutPricesInput, SupplierUncheckedCreateWithoutPricesInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutPricesInput
    upsert?: SupplierUpsertWithoutPricesInput
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutPricesInput, SupplierUpdateWithoutPricesInput>, SupplierUncheckedUpdateWithoutPricesInput>
  }

  export type AssessmentCreateNestedOneWithoutInspectionItemsInput = {
    create?: XOR<AssessmentCreateWithoutInspectionItemsInput, AssessmentUncheckedCreateWithoutInspectionItemsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutInspectionItemsInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUpdateOneRequiredWithoutInspectionItemsNestedInput = {
    create?: XOR<AssessmentCreateWithoutInspectionItemsInput, AssessmentUncheckedCreateWithoutInspectionItemsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutInspectionItemsInput
    upsert?: AssessmentUpsertWithoutInspectionItemsInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutInspectionItemsInput, AssessmentUpdateWithoutInspectionItemsInput>, AssessmentUncheckedUpdateWithoutInspectionItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AssessmentCreateWithoutUserInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AssessmentImageCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutUserInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AssessmentImageUncheckedCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartUncheckedCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartUncheckedCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutUserInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput>
  }

  export type AssessmentCreateManyUserInputEnvelope = {
    data: AssessmentCreateManyUserInput | AssessmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AssessmentUpsertWithWhereUniqueWithoutUserInput = {
    where: AssessmentWhereUniqueInput
    update: XOR<AssessmentUpdateWithoutUserInput, AssessmentUncheckedUpdateWithoutUserInput>
    create: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput>
  }

  export type AssessmentUpdateWithWhereUniqueWithoutUserInput = {
    where: AssessmentWhereUniqueInput
    data: XOR<AssessmentUpdateWithoutUserInput, AssessmentUncheckedUpdateWithoutUserInput>
  }

  export type AssessmentUpdateManyWithWhereWithoutUserInput = {
    where: AssessmentScalarWhereInput
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyWithoutUserInput>
  }

  export type AssessmentScalarWhereInput = {
    AND?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    OR?: AssessmentScalarWhereInput[]
    NOT?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    id?: StringFilter<"Assessment"> | string
    assessmentNumber?: StringFilter<"Assessment"> | string
    status?: StringFilter<"Assessment"> | string
    customerName?: StringFilter<"Assessment"> | string
    customerPhone?: StringFilter<"Assessment"> | string
    customerEmail?: StringFilter<"Assessment"> | string
    insuranceCompany?: StringFilter<"Assessment"> | string
    claimNumber?: StringFilter<"Assessment"> | string
    registrationNumber?: StringNullableFilter<"Assessment"> | string | null
    vin?: StringNullableFilter<"Assessment"> | string | null
    odometer?: StringNullableFilter<"Assessment"> | string | null
    vehicleNotes?: StringNullableFilter<"Assessment"> | string | null
    aiRawResponse?: StringNullableFilter<"Assessment"> | string | null
    verifiedVehicleJson?: StringNullableFilter<"Assessment"> | string | null
    verifiedDamageJson?: StringNullableFilter<"Assessment"> | string | null
    userId?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
  }

  export type UserCreateWithoutAssessmentsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutAssessmentsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAssessmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
  }

  export type AssessmentImageCreateWithoutAssessmentInput = {
    id?: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder?: number
    createdAt?: Date | string
  }

  export type AssessmentImageUncheckedCreateWithoutAssessmentInput = {
    id?: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder?: number
    createdAt?: Date | string
  }

  export type AssessmentImageCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentImageWhereUniqueInput
    create: XOR<AssessmentImageCreateWithoutAssessmentInput, AssessmentImageUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentImageCreateManyAssessmentInputEnvelope = {
    data: AssessmentImageCreateManyAssessmentInput | AssessmentImageCreateManyAssessmentInput[]
    skipDuplicates?: boolean
  }

  export type AssessmentDamagedPartCreateWithoutAssessmentInput = {
    id?: string
    name: string
    severity?: string | null
    confirmed?: boolean
    createdAt?: Date | string
  }

  export type AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput = {
    id?: string
    name: string
    severity?: string | null
    confirmed?: boolean
    createdAt?: Date | string
  }

  export type AssessmentDamagedPartCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentDamagedPartWhereUniqueInput
    create: XOR<AssessmentDamagedPartCreateWithoutAssessmentInput, AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentDamagedPartCreateManyAssessmentInputEnvelope = {
    data: AssessmentDamagedPartCreateManyAssessmentInput | AssessmentDamagedPartCreateManyAssessmentInput[]
    skipDuplicates?: boolean
  }

  export type AssessmentReplacementPartCreateWithoutAssessmentInput = {
    id?: string
    partName: string
    partNumber?: string | null
    quantity?: number
    unitPrice: number
    subtotal: number
    confirmed?: boolean
    vehiclePartId?: string | null
    createdAt?: Date | string
  }

  export type AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput = {
    id?: string
    partName: string
    partNumber?: string | null
    quantity?: number
    unitPrice: number
    subtotal: number
    confirmed?: boolean
    vehiclePartId?: string | null
    createdAt?: Date | string
  }

  export type AssessmentReplacementPartCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentReplacementPartWhereUniqueInput
    create: XOR<AssessmentReplacementPartCreateWithoutAssessmentInput, AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentReplacementPartCreateManyAssessmentInputEnvelope = {
    data: AssessmentReplacementPartCreateManyAssessmentInput | AssessmentReplacementPartCreateManyAssessmentInput[]
    skipDuplicates?: boolean
  }

  export type InspectionItemCreateWithoutAssessmentInput = {
    id?: string
    item: string
    notes?: string | null
    completed?: boolean
    createdAt?: Date | string
  }

  export type InspectionItemUncheckedCreateWithoutAssessmentInput = {
    id?: string
    item: string
    notes?: string | null
    completed?: boolean
    createdAt?: Date | string
  }

  export type InspectionItemCreateOrConnectWithoutAssessmentInput = {
    where: InspectionItemWhereUniqueInput
    create: XOR<InspectionItemCreateWithoutAssessmentInput, InspectionItemUncheckedCreateWithoutAssessmentInput>
  }

  export type InspectionItemCreateManyAssessmentInputEnvelope = {
    data: InspectionItemCreateManyAssessmentInput | InspectionItemCreateManyAssessmentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAssessmentsInput = {
    update: XOR<UserUpdateWithoutAssessmentsInput, UserUncheckedUpdateWithoutAssessmentsInput>
    create: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssessmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssessmentsInput, UserUncheckedUpdateWithoutAssessmentsInput>
  }

  export type UserUpdateWithoutAssessmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAssessmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: AssessmentImageWhereUniqueInput
    update: XOR<AssessmentImageUpdateWithoutAssessmentInput, AssessmentImageUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentImageCreateWithoutAssessmentInput, AssessmentImageUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentImageUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: AssessmentImageWhereUniqueInput
    data: XOR<AssessmentImageUpdateWithoutAssessmentInput, AssessmentImageUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentImageUpdateManyWithWhereWithoutAssessmentInput = {
    where: AssessmentImageScalarWhereInput
    data: XOR<AssessmentImageUpdateManyMutationInput, AssessmentImageUncheckedUpdateManyWithoutAssessmentInput>
  }

  export type AssessmentImageScalarWhereInput = {
    AND?: AssessmentImageScalarWhereInput | AssessmentImageScalarWhereInput[]
    OR?: AssessmentImageScalarWhereInput[]
    NOT?: AssessmentImageScalarWhereInput | AssessmentImageScalarWhereInput[]
    id?: StringFilter<"AssessmentImage"> | string
    filename?: StringFilter<"AssessmentImage"> | string
    originalName?: StringFilter<"AssessmentImage"> | string
    path?: StringFilter<"AssessmentImage"> | string
    mimeType?: StringFilter<"AssessmentImage"> | string
    size?: IntFilter<"AssessmentImage"> | number
    sortOrder?: IntFilter<"AssessmentImage"> | number
    assessmentId?: StringFilter<"AssessmentImage"> | string
    createdAt?: DateTimeFilter<"AssessmentImage"> | Date | string
  }

  export type AssessmentDamagedPartUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: AssessmentDamagedPartWhereUniqueInput
    update: XOR<AssessmentDamagedPartUpdateWithoutAssessmentInput, AssessmentDamagedPartUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentDamagedPartCreateWithoutAssessmentInput, AssessmentDamagedPartUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentDamagedPartUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: AssessmentDamagedPartWhereUniqueInput
    data: XOR<AssessmentDamagedPartUpdateWithoutAssessmentInput, AssessmentDamagedPartUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentDamagedPartUpdateManyWithWhereWithoutAssessmentInput = {
    where: AssessmentDamagedPartScalarWhereInput
    data: XOR<AssessmentDamagedPartUpdateManyMutationInput, AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentInput>
  }

  export type AssessmentDamagedPartScalarWhereInput = {
    AND?: AssessmentDamagedPartScalarWhereInput | AssessmentDamagedPartScalarWhereInput[]
    OR?: AssessmentDamagedPartScalarWhereInput[]
    NOT?: AssessmentDamagedPartScalarWhereInput | AssessmentDamagedPartScalarWhereInput[]
    id?: StringFilter<"AssessmentDamagedPart"> | string
    name?: StringFilter<"AssessmentDamagedPart"> | string
    severity?: StringNullableFilter<"AssessmentDamagedPart"> | string | null
    confirmed?: BoolFilter<"AssessmentDamagedPart"> | boolean
    assessmentId?: StringFilter<"AssessmentDamagedPart"> | string
    createdAt?: DateTimeFilter<"AssessmentDamagedPart"> | Date | string
  }

  export type AssessmentReplacementPartUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: AssessmentReplacementPartWhereUniqueInput
    update: XOR<AssessmentReplacementPartUpdateWithoutAssessmentInput, AssessmentReplacementPartUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentReplacementPartCreateWithoutAssessmentInput, AssessmentReplacementPartUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentReplacementPartUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: AssessmentReplacementPartWhereUniqueInput
    data: XOR<AssessmentReplacementPartUpdateWithoutAssessmentInput, AssessmentReplacementPartUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentReplacementPartUpdateManyWithWhereWithoutAssessmentInput = {
    where: AssessmentReplacementPartScalarWhereInput
    data: XOR<AssessmentReplacementPartUpdateManyMutationInput, AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentInput>
  }

  export type AssessmentReplacementPartScalarWhereInput = {
    AND?: AssessmentReplacementPartScalarWhereInput | AssessmentReplacementPartScalarWhereInput[]
    OR?: AssessmentReplacementPartScalarWhereInput[]
    NOT?: AssessmentReplacementPartScalarWhereInput | AssessmentReplacementPartScalarWhereInput[]
    id?: StringFilter<"AssessmentReplacementPart"> | string
    partName?: StringFilter<"AssessmentReplacementPart"> | string
    partNumber?: StringNullableFilter<"AssessmentReplacementPart"> | string | null
    quantity?: IntFilter<"AssessmentReplacementPart"> | number
    unitPrice?: FloatFilter<"AssessmentReplacementPart"> | number
    subtotal?: FloatFilter<"AssessmentReplacementPart"> | number
    confirmed?: BoolFilter<"AssessmentReplacementPart"> | boolean
    vehiclePartId?: StringNullableFilter<"AssessmentReplacementPart"> | string | null
    assessmentId?: StringFilter<"AssessmentReplacementPart"> | string
    createdAt?: DateTimeFilter<"AssessmentReplacementPart"> | Date | string
  }

  export type InspectionItemUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: InspectionItemWhereUniqueInput
    update: XOR<InspectionItemUpdateWithoutAssessmentInput, InspectionItemUncheckedUpdateWithoutAssessmentInput>
    create: XOR<InspectionItemCreateWithoutAssessmentInput, InspectionItemUncheckedCreateWithoutAssessmentInput>
  }

  export type InspectionItemUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: InspectionItemWhereUniqueInput
    data: XOR<InspectionItemUpdateWithoutAssessmentInput, InspectionItemUncheckedUpdateWithoutAssessmentInput>
  }

  export type InspectionItemUpdateManyWithWhereWithoutAssessmentInput = {
    where: InspectionItemScalarWhereInput
    data: XOR<InspectionItemUpdateManyMutationInput, InspectionItemUncheckedUpdateManyWithoutAssessmentInput>
  }

  export type InspectionItemScalarWhereInput = {
    AND?: InspectionItemScalarWhereInput | InspectionItemScalarWhereInput[]
    OR?: InspectionItemScalarWhereInput[]
    NOT?: InspectionItemScalarWhereInput | InspectionItemScalarWhereInput[]
    id?: StringFilter<"InspectionItem"> | string
    item?: StringFilter<"InspectionItem"> | string
    notes?: StringNullableFilter<"InspectionItem"> | string | null
    completed?: BoolFilter<"InspectionItem"> | boolean
    assessmentId?: StringFilter<"InspectionItem"> | string
    createdAt?: DateTimeFilter<"InspectionItem"> | Date | string
  }

  export type AssessmentCreateWithoutImagesInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAssessmentsInput
    damagedParts?: AssessmentDamagedPartCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutImagesInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    damagedParts?: AssessmentDamagedPartUncheckedCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartUncheckedCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutImagesInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutImagesInput, AssessmentUncheckedCreateWithoutImagesInput>
  }

  export type AssessmentUpsertWithoutImagesInput = {
    update: XOR<AssessmentUpdateWithoutImagesInput, AssessmentUncheckedUpdateWithoutImagesInput>
    create: XOR<AssessmentCreateWithoutImagesInput, AssessmentUncheckedCreateWithoutImagesInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutImagesInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutImagesInput, AssessmentUncheckedUpdateWithoutImagesInput>
  }

  export type AssessmentUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAssessmentsNestedInput
    damagedParts?: AssessmentDamagedPartUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    damagedParts?: AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type VehicleModelCreateWithoutMakeInput = {
    id?: string
    name: string
    variants?: VehicleVariantCreateNestedManyWithoutModelInput
  }

  export type VehicleModelUncheckedCreateWithoutMakeInput = {
    id?: string
    name: string
    variants?: VehicleVariantUncheckedCreateNestedManyWithoutModelInput
  }

  export type VehicleModelCreateOrConnectWithoutMakeInput = {
    where: VehicleModelWhereUniqueInput
    create: XOR<VehicleModelCreateWithoutMakeInput, VehicleModelUncheckedCreateWithoutMakeInput>
  }

  export type VehicleModelCreateManyMakeInputEnvelope = {
    data: VehicleModelCreateManyMakeInput | VehicleModelCreateManyMakeInput[]
    skipDuplicates?: boolean
  }

  export type VehicleModelUpsertWithWhereUniqueWithoutMakeInput = {
    where: VehicleModelWhereUniqueInput
    update: XOR<VehicleModelUpdateWithoutMakeInput, VehicleModelUncheckedUpdateWithoutMakeInput>
    create: XOR<VehicleModelCreateWithoutMakeInput, VehicleModelUncheckedCreateWithoutMakeInput>
  }

  export type VehicleModelUpdateWithWhereUniqueWithoutMakeInput = {
    where: VehicleModelWhereUniqueInput
    data: XOR<VehicleModelUpdateWithoutMakeInput, VehicleModelUncheckedUpdateWithoutMakeInput>
  }

  export type VehicleModelUpdateManyWithWhereWithoutMakeInput = {
    where: VehicleModelScalarWhereInput
    data: XOR<VehicleModelUpdateManyMutationInput, VehicleModelUncheckedUpdateManyWithoutMakeInput>
  }

  export type VehicleModelScalarWhereInput = {
    AND?: VehicleModelScalarWhereInput | VehicleModelScalarWhereInput[]
    OR?: VehicleModelScalarWhereInput[]
    NOT?: VehicleModelScalarWhereInput | VehicleModelScalarWhereInput[]
    id?: StringFilter<"VehicleModel"> | string
    name?: StringFilter<"VehicleModel"> | string
    makeId?: StringFilter<"VehicleModel"> | string
  }

  export type VehicleMakeCreateWithoutModelsInput = {
    id?: string
    name: string
  }

  export type VehicleMakeUncheckedCreateWithoutModelsInput = {
    id?: string
    name: string
  }

  export type VehicleMakeCreateOrConnectWithoutModelsInput = {
    where: VehicleMakeWhereUniqueInput
    create: XOR<VehicleMakeCreateWithoutModelsInput, VehicleMakeUncheckedCreateWithoutModelsInput>
  }

  export type VehicleVariantCreateWithoutModelInput = {
    id?: string
    name: string
    parts?: VehiclePartCreateNestedManyWithoutVariantInput
  }

  export type VehicleVariantUncheckedCreateWithoutModelInput = {
    id?: string
    name: string
    parts?: VehiclePartUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VehicleVariantCreateOrConnectWithoutModelInput = {
    where: VehicleVariantWhereUniqueInput
    create: XOR<VehicleVariantCreateWithoutModelInput, VehicleVariantUncheckedCreateWithoutModelInput>
  }

  export type VehicleVariantCreateManyModelInputEnvelope = {
    data: VehicleVariantCreateManyModelInput | VehicleVariantCreateManyModelInput[]
    skipDuplicates?: boolean
  }

  export type VehicleMakeUpsertWithoutModelsInput = {
    update: XOR<VehicleMakeUpdateWithoutModelsInput, VehicleMakeUncheckedUpdateWithoutModelsInput>
    create: XOR<VehicleMakeCreateWithoutModelsInput, VehicleMakeUncheckedCreateWithoutModelsInput>
    where?: VehicleMakeWhereInput
  }

  export type VehicleMakeUpdateToOneWithWhereWithoutModelsInput = {
    where?: VehicleMakeWhereInput
    data: XOR<VehicleMakeUpdateWithoutModelsInput, VehicleMakeUncheckedUpdateWithoutModelsInput>
  }

  export type VehicleMakeUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleMakeUncheckedUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleVariantUpsertWithWhereUniqueWithoutModelInput = {
    where: VehicleVariantWhereUniqueInput
    update: XOR<VehicleVariantUpdateWithoutModelInput, VehicleVariantUncheckedUpdateWithoutModelInput>
    create: XOR<VehicleVariantCreateWithoutModelInput, VehicleVariantUncheckedCreateWithoutModelInput>
  }

  export type VehicleVariantUpdateWithWhereUniqueWithoutModelInput = {
    where: VehicleVariantWhereUniqueInput
    data: XOR<VehicleVariantUpdateWithoutModelInput, VehicleVariantUncheckedUpdateWithoutModelInput>
  }

  export type VehicleVariantUpdateManyWithWhereWithoutModelInput = {
    where: VehicleVariantScalarWhereInput
    data: XOR<VehicleVariantUpdateManyMutationInput, VehicleVariantUncheckedUpdateManyWithoutModelInput>
  }

  export type VehicleVariantScalarWhereInput = {
    AND?: VehicleVariantScalarWhereInput | VehicleVariantScalarWhereInput[]
    OR?: VehicleVariantScalarWhereInput[]
    NOT?: VehicleVariantScalarWhereInput | VehicleVariantScalarWhereInput[]
    id?: StringFilter<"VehicleVariant"> | string
    name?: StringFilter<"VehicleVariant"> | string
    modelId?: StringFilter<"VehicleVariant"> | string
  }

  export type VehicleModelCreateWithoutVariantsInput = {
    id?: string
    name: string
    make: VehicleMakeCreateNestedOneWithoutModelsInput
  }

  export type VehicleModelUncheckedCreateWithoutVariantsInput = {
    id?: string
    name: string
    makeId: string
  }

  export type VehicleModelCreateOrConnectWithoutVariantsInput = {
    where: VehicleModelWhereUniqueInput
    create: XOR<VehicleModelCreateWithoutVariantsInput, VehicleModelUncheckedCreateWithoutVariantsInput>
  }

  export type VehiclePartCreateWithoutVariantInput = {
    id?: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehiclePartUncheckedCreateWithoutVariantInput = {
    id?: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehiclePartCreateOrConnectWithoutVariantInput = {
    where: VehiclePartWhereUniqueInput
    create: XOR<VehiclePartCreateWithoutVariantInput, VehiclePartUncheckedCreateWithoutVariantInput>
  }

  export type VehiclePartCreateManyVariantInputEnvelope = {
    data: VehiclePartCreateManyVariantInput | VehiclePartCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type VehicleModelUpsertWithoutVariantsInput = {
    update: XOR<VehicleModelUpdateWithoutVariantsInput, VehicleModelUncheckedUpdateWithoutVariantsInput>
    create: XOR<VehicleModelCreateWithoutVariantsInput, VehicleModelUncheckedCreateWithoutVariantsInput>
    where?: VehicleModelWhereInput
  }

  export type VehicleModelUpdateToOneWithWhereWithoutVariantsInput = {
    where?: VehicleModelWhereInput
    data: XOR<VehicleModelUpdateWithoutVariantsInput, VehicleModelUncheckedUpdateWithoutVariantsInput>
  }

  export type VehicleModelUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    make?: VehicleMakeUpdateOneRequiredWithoutModelsNestedInput
  }

  export type VehicleModelUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    makeId?: StringFieldUpdateOperationsInput | string
  }

  export type VehiclePartUpsertWithWhereUniqueWithoutVariantInput = {
    where: VehiclePartWhereUniqueInput
    update: XOR<VehiclePartUpdateWithoutVariantInput, VehiclePartUncheckedUpdateWithoutVariantInput>
    create: XOR<VehiclePartCreateWithoutVariantInput, VehiclePartUncheckedCreateWithoutVariantInput>
  }

  export type VehiclePartUpdateWithWhereUniqueWithoutVariantInput = {
    where: VehiclePartWhereUniqueInput
    data: XOR<VehiclePartUpdateWithoutVariantInput, VehiclePartUncheckedUpdateWithoutVariantInput>
  }

  export type VehiclePartUpdateManyWithWhereWithoutVariantInput = {
    where: VehiclePartScalarWhereInput
    data: XOR<VehiclePartUpdateManyMutationInput, VehiclePartUncheckedUpdateManyWithoutVariantInput>
  }

  export type VehiclePartScalarWhereInput = {
    AND?: VehiclePartScalarWhereInput | VehiclePartScalarWhereInput[]
    OR?: VehiclePartScalarWhereInput[]
    NOT?: VehiclePartScalarWhereInput | VehiclePartScalarWhereInput[]
    id?: StringFilter<"VehiclePart"> | string
    partNumber?: StringFilter<"VehiclePart"> | string
    name?: StringFilter<"VehiclePart"> | string
    category?: StringFilter<"VehiclePart"> | string
    unitPrice?: FloatFilter<"VehiclePart"> | number
    labourCost?: FloatFilter<"VehiclePart"> | number
    active?: BoolFilter<"VehiclePart"> | boolean
    variantId?: StringNullableFilter<"VehiclePart"> | string | null
    createdAt?: DateTimeFilter<"VehiclePart"> | Date | string
    updatedAt?: DateTimeFilter<"VehiclePart"> | Date | string
  }

  export type VehicleVariantCreateWithoutPartsInput = {
    id?: string
    name: string
    model: VehicleModelCreateNestedOneWithoutVariantsInput
  }

  export type VehicleVariantUncheckedCreateWithoutPartsInput = {
    id?: string
    name: string
    modelId: string
  }

  export type VehicleVariantCreateOrConnectWithoutPartsInput = {
    where: VehicleVariantWhereUniqueInput
    create: XOR<VehicleVariantCreateWithoutPartsInput, VehicleVariantUncheckedCreateWithoutPartsInput>
  }

  export type VehicleVariantUpsertWithoutPartsInput = {
    update: XOR<VehicleVariantUpdateWithoutPartsInput, VehicleVariantUncheckedUpdateWithoutPartsInput>
    create: XOR<VehicleVariantCreateWithoutPartsInput, VehicleVariantUncheckedCreateWithoutPartsInput>
    where?: VehicleVariantWhereInput
  }

  export type VehicleVariantUpdateToOneWithWhereWithoutPartsInput = {
    where?: VehicleVariantWhereInput
    data: XOR<VehicleVariantUpdateWithoutPartsInput, VehicleVariantUncheckedUpdateWithoutPartsInput>
  }

  export type VehicleVariantUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: VehicleModelUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type VehicleVariantUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentCreateWithoutDamagedPartsInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAssessmentsInput
    images?: AssessmentImageCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutDamagedPartsInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AssessmentImageUncheckedCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartUncheckedCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutDamagedPartsInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutDamagedPartsInput, AssessmentUncheckedCreateWithoutDamagedPartsInput>
  }

  export type AssessmentUpsertWithoutDamagedPartsInput = {
    update: XOR<AssessmentUpdateWithoutDamagedPartsInput, AssessmentUncheckedUpdateWithoutDamagedPartsInput>
    create: XOR<AssessmentCreateWithoutDamagedPartsInput, AssessmentUncheckedCreateWithoutDamagedPartsInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutDamagedPartsInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutDamagedPartsInput, AssessmentUncheckedUpdateWithoutDamagedPartsInput>
  }

  export type AssessmentUpdateWithoutDamagedPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAssessmentsNestedInput
    images?: AssessmentImageUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutDamagedPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AssessmentImageUncheckedUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentCreateWithoutReplacementPartsInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAssessmentsInput
    images?: AssessmentImageCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutReplacementPartsInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AssessmentImageUncheckedCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartUncheckedCreateNestedManyWithoutAssessmentInput
    inspectionItems?: InspectionItemUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutReplacementPartsInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutReplacementPartsInput, AssessmentUncheckedCreateWithoutReplacementPartsInput>
  }

  export type AssessmentUpsertWithoutReplacementPartsInput = {
    update: XOR<AssessmentUpdateWithoutReplacementPartsInput, AssessmentUncheckedUpdateWithoutReplacementPartsInput>
    create: XOR<AssessmentCreateWithoutReplacementPartsInput, AssessmentUncheckedCreateWithoutReplacementPartsInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutReplacementPartsInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutReplacementPartsInput, AssessmentUncheckedUpdateWithoutReplacementPartsInput>
  }

  export type AssessmentUpdateWithoutReplacementPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAssessmentsNestedInput
    images?: AssessmentImageUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutReplacementPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AssessmentImageUncheckedUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type SupplierPartPriceCreateWithoutSupplierInput = {
    id?: string
    partName: string
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleYear?: number | null
    partNumber?: string | null
    price: number
    currency?: string
    availability?: string
    brand?: string | null
    condition?: string
    url?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierPartPriceUncheckedCreateWithoutSupplierInput = {
    id?: string
    partName: string
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleYear?: number | null
    partNumber?: string | null
    price: number
    currency?: string
    availability?: string
    brand?: string | null
    condition?: string
    url?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierPartPriceCreateOrConnectWithoutSupplierInput = {
    where: SupplierPartPriceWhereUniqueInput
    create: XOR<SupplierPartPriceCreateWithoutSupplierInput, SupplierPartPriceUncheckedCreateWithoutSupplierInput>
  }

  export type SupplierPartPriceCreateManySupplierInputEnvelope = {
    data: SupplierPartPriceCreateManySupplierInput | SupplierPartPriceCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type SupplierPartPriceUpsertWithWhereUniqueWithoutSupplierInput = {
    where: SupplierPartPriceWhereUniqueInput
    update: XOR<SupplierPartPriceUpdateWithoutSupplierInput, SupplierPartPriceUncheckedUpdateWithoutSupplierInput>
    create: XOR<SupplierPartPriceCreateWithoutSupplierInput, SupplierPartPriceUncheckedCreateWithoutSupplierInput>
  }

  export type SupplierPartPriceUpdateWithWhereUniqueWithoutSupplierInput = {
    where: SupplierPartPriceWhereUniqueInput
    data: XOR<SupplierPartPriceUpdateWithoutSupplierInput, SupplierPartPriceUncheckedUpdateWithoutSupplierInput>
  }

  export type SupplierPartPriceUpdateManyWithWhereWithoutSupplierInput = {
    where: SupplierPartPriceScalarWhereInput
    data: XOR<SupplierPartPriceUpdateManyMutationInput, SupplierPartPriceUncheckedUpdateManyWithoutSupplierInput>
  }

  export type SupplierPartPriceScalarWhereInput = {
    AND?: SupplierPartPriceScalarWhereInput | SupplierPartPriceScalarWhereInput[]
    OR?: SupplierPartPriceScalarWhereInput[]
    NOT?: SupplierPartPriceScalarWhereInput | SupplierPartPriceScalarWhereInput[]
    id?: StringFilter<"SupplierPartPrice"> | string
    supplierId?: StringFilter<"SupplierPartPrice"> | string
    partName?: StringFilter<"SupplierPartPrice"> | string
    vehicleMake?: StringNullableFilter<"SupplierPartPrice"> | string | null
    vehicleModel?: StringNullableFilter<"SupplierPartPrice"> | string | null
    vehicleYear?: IntNullableFilter<"SupplierPartPrice"> | number | null
    partNumber?: StringNullableFilter<"SupplierPartPrice"> | string | null
    price?: FloatFilter<"SupplierPartPrice"> | number
    currency?: StringFilter<"SupplierPartPrice"> | string
    availability?: StringFilter<"SupplierPartPrice"> | string
    brand?: StringNullableFilter<"SupplierPartPrice"> | string | null
    condition?: StringFilter<"SupplierPartPrice"> | string
    url?: StringNullableFilter<"SupplierPartPrice"> | string | null
    source?: StringFilter<"SupplierPartPrice"> | string
    createdAt?: DateTimeFilter<"SupplierPartPrice"> | Date | string
    updatedAt?: DateTimeFilter<"SupplierPartPrice"> | Date | string
  }

  export type SupplierCreateWithoutPricesInput = {
    id?: string
    name: string
    website?: string | null
    createdAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutPricesInput = {
    id?: string
    name: string
    website?: string | null
    createdAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutPricesInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutPricesInput, SupplierUncheckedCreateWithoutPricesInput>
  }

  export type SupplierUpsertWithoutPricesInput = {
    update: XOR<SupplierUpdateWithoutPricesInput, SupplierUncheckedUpdateWithoutPricesInput>
    create: XOR<SupplierCreateWithoutPricesInput, SupplierUncheckedCreateWithoutPricesInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutPricesInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutPricesInput, SupplierUncheckedUpdateWithoutPricesInput>
  }

  export type SupplierUpdateWithoutPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateWithoutInspectionItemsInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAssessmentsInput
    images?: AssessmentImageCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutInspectionItemsInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: AssessmentImageUncheckedCreateNestedManyWithoutAssessmentInput
    damagedParts?: AssessmentDamagedPartUncheckedCreateNestedManyWithoutAssessmentInput
    replacementParts?: AssessmentReplacementPartUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutInspectionItemsInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutInspectionItemsInput, AssessmentUncheckedCreateWithoutInspectionItemsInput>
  }

  export type AssessmentUpsertWithoutInspectionItemsInput = {
    update: XOR<AssessmentUpdateWithoutInspectionItemsInput, AssessmentUncheckedUpdateWithoutInspectionItemsInput>
    create: XOR<AssessmentCreateWithoutInspectionItemsInput, AssessmentUncheckedCreateWithoutInspectionItemsInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutInspectionItemsInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutInspectionItemsInput, AssessmentUncheckedUpdateWithoutInspectionItemsInput>
  }

  export type AssessmentUpdateWithoutInspectionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAssessmentsNestedInput
    images?: AssessmentImageUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutInspectionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AssessmentImageUncheckedUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentCreateManyUserInput = {
    id?: string
    assessmentNumber: string
    status?: string
    customerName: string
    customerPhone: string
    customerEmail: string
    insuranceCompany: string
    claimNumber: string
    registrationNumber?: string | null
    vin?: string | null
    odometer?: string | null
    vehicleNotes?: string | null
    aiRawResponse?: string | null
    verifiedVehicleJson?: string | null
    verifiedDamageJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AssessmentImageUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: AssessmentImageUncheckedUpdateManyWithoutAssessmentNestedInput
    damagedParts?: AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentNestedInput
    replacementParts?: AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentNestedInput
    inspectionItems?: InspectionItemUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    insuranceCompany?: StringFieldUpdateOperationsInput | string
    claimNumber?: StringFieldUpdateOperationsInput | string
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    odometer?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiRawResponse?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedVehicleJson?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedDamageJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageCreateManyAssessmentInput = {
    id?: string
    filename: string
    originalName: string
    path: string
    mimeType: string
    size: number
    sortOrder?: number
    createdAt?: Date | string
  }

  export type AssessmentDamagedPartCreateManyAssessmentInput = {
    id?: string
    name: string
    severity?: string | null
    confirmed?: boolean
    createdAt?: Date | string
  }

  export type AssessmentReplacementPartCreateManyAssessmentInput = {
    id?: string
    partName: string
    partNumber?: string | null
    quantity?: number
    unitPrice: number
    subtotal: number
    confirmed?: boolean
    vehiclePartId?: string | null
    createdAt?: Date | string
  }

  export type InspectionItemCreateManyAssessmentInput = {
    id?: string
    item: string
    notes?: string | null
    completed?: boolean
    createdAt?: Date | string
  }

  export type AssessmentImageUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentImageUncheckedUpdateManyWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentDamagedPartUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentDamagedPartUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentDamagedPartUncheckedUpdateManyWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentReplacementPartUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentReplacementPartUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentReplacementPartUncheckedUpdateManyWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    vehiclePartId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InspectionItemUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InspectionItemUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InspectionItemUncheckedUpdateManyWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleModelCreateManyMakeInput = {
    id?: string
    name: string
  }

  export type VehicleModelUpdateWithoutMakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    variants?: VehicleVariantUpdateManyWithoutModelNestedInput
  }

  export type VehicleModelUncheckedUpdateWithoutMakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    variants?: VehicleVariantUncheckedUpdateManyWithoutModelNestedInput
  }

  export type VehicleModelUncheckedUpdateManyWithoutMakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleVariantCreateManyModelInput = {
    id?: string
    name: string
  }

  export type VehicleVariantUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parts?: VehiclePartUpdateManyWithoutVariantNestedInput
  }

  export type VehicleVariantUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parts?: VehiclePartUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type VehicleVariantUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VehiclePartCreateManyVariantInput = {
    id?: string
    partNumber: string
    name: string
    category: string
    unitPrice: number
    labourCost: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehiclePartUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehiclePartUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehiclePartUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    partNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    labourCost?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierPartPriceCreateManySupplierInput = {
    id?: string
    partName: string
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleYear?: number | null
    partNumber?: string | null
    price: number
    currency?: string
    availability?: string
    brand?: string | null
    condition?: string
    url?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierPartPriceUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierPartPriceUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierPartPriceUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    partName?: StringFieldUpdateOperationsInput | string
    vehicleMake?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleModel?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleYear?: NullableIntFieldUpdateOperationsInput | number | null
    partNumber?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    availability?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
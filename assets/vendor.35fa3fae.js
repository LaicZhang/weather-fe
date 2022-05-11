var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
var root$1 = root;
var Symbol$1 = root$1.Symbol;
var Symbol$2 = Symbol$1;
var objectProto$e = Object.prototype;
var hasOwnProperty$b = objectProto$e.hasOwnProperty;
var nativeObjectToString$1 = objectProto$e.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$d = Object.prototype;
var nativeObjectToString = objectProto$d.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$3 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
function arrayMap(array4, iteratee) {
  var index = -1, length = array4 == null ? 0 : array4.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array4[index], index, array4);
  }
  return result;
}
var isArray$2 = Array.isArray;
var isArray$3 = isArray$2;
var INFINITY$3 = 1 / 0;
var symbolProto$2 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$3(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$3 ? "-0" : result;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string3) {
  var index = string3.length;
  while (index-- && reWhitespace.test(string3.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string3) {
  return string3 ? string3.slice(0, trimmedEndIndex(string3) + 1).replace(reTrimStart, "") : string3;
}
function isObject$2(value) {
  var type4 = typeof value;
  return value != null && (type4 == "object" || type4 == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$2(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
function identity$1(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$2(value) {
  if (!isObject$2(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
var coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$c = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject$2(value) || isMasked(value)) {
    return false;
  }
  var pattern4 = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern4.test(toSource(value));
}
function getValue$1(object4, key) {
  return object4 == null ? void 0 : object4[key];
}
function getNative(object4, key) {
  var value = getValue$1(object4, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$2 = getNative(root$1, "WeakMap");
var WeakMap$3 = WeakMap$2;
var objectCreate = Object.create;
var baseCreate = function() {
  function object4() {
  }
  return function(proto) {
    if (!isObject$2(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object4.prototype = proto;
    var result = new object4();
    object4.prototype = void 0;
    return result;
  };
}();
var baseCreate$1 = baseCreate;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function noop$1() {
}
function copyArray(source2, array4) {
  var index = -1, length = source2.length;
  array4 || (array4 = Array(length));
  while (++index < length) {
    array4[index] = source2[index];
  }
  return array4;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
var defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity$1 : function(func, string3) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string3),
    "writable": true
  });
};
var baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
var setToString$1 = setToString;
function arrayEach(array4, iteratee) {
  var index = -1, length = array4 == null ? 0 : array4.length;
  while (++index < length) {
    if (iteratee(array4[index], index, array4) === false) {
      break;
    }
  }
  return array4;
}
function baseFindIndex(array4, predicate, fromIndex, fromRight) {
  var length = array4.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array4[index], index, array4)) {
      return index;
    }
  }
  return -1;
}
function baseIsNaN(value) {
  return value !== value;
}
function strictIndexOf(array4, value, fromIndex) {
  var index = fromIndex - 1, length = array4.length;
  while (++index < length) {
    if (array4[index] === value) {
      return index;
    }
  }
  return -1;
}
function baseIndexOf(array4, value, fromIndex) {
  return value === value ? strictIndexOf(array4, value, fromIndex) : baseFindIndex(array4, baseIsNaN, fromIndex);
}
function arrayIncludes(array4, value) {
  var length = array4 == null ? 0 : array4.length;
  return !!length && baseIndexOf(array4, value, 0) > -1;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type4 = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type4 == "number" || type4 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object4, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object4, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object4[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
function assignValue(object4, key, value) {
  var objValue = object4[key];
  if (!(hasOwnProperty$9.call(object4, key) && eq(objValue, value)) || value === void 0 && !(key in object4)) {
    baseAssignValue(object4, key, value);
  }
}
function copyObject(source2, props, object4, customizer) {
  var isNew = !object4;
  object4 || (object4 = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object4[key], source2[key], key, object4, source2) : void 0;
    if (newValue === void 0) {
      newValue = source2[key];
    }
    if (isNew) {
      baseAssignValue(object4, key, newValue);
    } else {
      assignValue(object4, key, newValue);
    }
  }
  return object4;
}
var nativeMax$1 = Math.max;
function overRest(func, start2, transform) {
  start2 = nativeMax$1(start2 === void 0 ? func.length - 1 : start2, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax$1(args.length - start2, 0), array4 = Array(length);
    while (++index < length) {
      array4[index] = args[start2 + index];
    }
    index = -1;
    var otherArgs = Array(start2 + 1);
    while (++index < start2) {
      otherArgs[index] = args[index];
    }
    otherArgs[start2] = transform(array4);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start2) {
  return setToString$1(overRest(func, start2, identity$1), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike$1(value) {
  return value != null && isLength(value.length) && !isFunction$2(value);
}
var objectProto$a = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
  return value === proto;
}
function baseTimes(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$2 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$2 ? Buffer$2.isBuffer : void 0;
var isBuffer$1 = nativeIsBuffer || stubFalse;
var isBuffer$2 = isBuffer$1;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types2 = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types2) {
      return types2;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
var nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray$3 = isTypedArray$2;
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$3(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$2(value), isType = !isArr && !isArg && !isBuff && isTypedArray$3(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var nativeKeys$1 = nativeKeys;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function baseKeys(object4) {
  if (!isPrototype(object4)) {
    return nativeKeys$1(object4);
  }
  var result = [];
  for (var key in Object(object4)) {
    if (hasOwnProperty$6.call(object4, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys$1(object4) {
  return isArrayLike$1(object4) ? arrayLikeKeys(object4) : baseKeys(object4);
}
function nativeKeysIn(object4) {
  var result = [];
  if (object4 != null) {
    for (var key in Object(object4)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseKeysIn(object4) {
  if (!isObject$2(object4)) {
    return nativeKeysIn(object4);
  }
  var isProto = isPrototype(object4), result = [];
  for (var key in object4) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$5.call(object4, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object4) {
  return isArrayLike$1(object4) ? arrayLikeKeys(object4, true) : baseKeysIn(object4);
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object4) {
  if (isArray$3(value)) {
    return false;
  }
  var type4 = typeof value;
  if (type4 == "number" || type4 == "symbol" || type4 == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object4 != null && value in Object(object4);
}
var nativeCreate = getNative(Object, "create");
var nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashGet(key) {
  var data2 = this.__data__;
  if (nativeCreate$1) {
    var result = data2[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$4.call(data2, key) ? data2[key] : void 0;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashHas(key) {
  var data2 = this.__data__;
  return nativeCreate$1 ? data2[key] !== void 0 : hasOwnProperty$3.call(data2, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data2 = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data2[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array4, key) {
  var length = array4.length;
  while (length--) {
    if (eq(array4[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto$1 = Array.prototype;
var splice = arrayProto$1.splice;
function listCacheDelete(key) {
  var data2 = this.__data__, index = assocIndexOf(data2, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data2.length - 1;
  if (index == lastIndex) {
    data2.pop();
  } else {
    splice.call(data2, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data2 = this.__data__, index = assocIndexOf(data2, key);
  return index < 0 ? void 0 : data2[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data2 = this.__data__, index = assocIndexOf(data2, key);
  if (index < 0) {
    ++this.size;
    data2.push([key, value]);
  } else {
    data2[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
var Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type4 = typeof value;
  return type4 == "string" || type4 == "number" || type4 == "symbol" || type4 == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data2 = map2.__data__;
  return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data2 = getMapData(this, key), size = data2.size;
  data2.set(key, value);
  this.size += data2.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT$2 = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string3) {
  var result = [];
  if (string3.charCodeAt(0) === 46) {
    result.push("");
  }
  string3.replace(rePropName, function(match, number4, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number4 || match);
  });
  return result;
});
var stringToPath$1 = stringToPath;
function toString$1(value) {
  return value == null ? "" : baseToString(value);
}
function castPath(value, object4) {
  if (isArray$3(value)) {
    return value;
  }
  return isKey(value, object4) ? [value] : stringToPath$1(toString$1(value));
}
var INFINITY$2 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
}
function baseGet(object4, path) {
  path = castPath(path, object4);
  var index = 0, length = path.length;
  while (object4 != null && index < length) {
    object4 = object4[toKey(path[index++])];
  }
  return index && index == length ? object4 : void 0;
}
function get(object4, path, defaultValue) {
  var result = object4 == null ? void 0 : baseGet(object4, path);
  return result === void 0 ? defaultValue : result;
}
function arrayPush(array4, values) {
  var index = -1, length = values.length, offset = array4.length;
  while (++index < length) {
    array4[offset + index] = values[index];
  }
  return array4;
}
var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray$3(value) || isArguments$1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
function baseFlatten(array4, depth, predicate, isStrict, result) {
  var index = -1, length = array4.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array4[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
function flatten(array4) {
  var length = array4 == null ? 0 : array4.length;
  return length ? baseFlatten(array4, 1) : [];
}
function flatRest(func) {
  return setToString$1(overRest(func, void 0, flatten), func + "");
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var getPrototype$1 = getPrototype;
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray$3(value) ? value : [value];
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data2 = this.__data__, result = data2["delete"](key);
  this.size = data2.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE$1 = 200;
function stackSet(key, value) {
  var data2 = this.__data__;
  if (data2 instanceof ListCache) {
    var pairs = data2.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
      pairs.push([key, value]);
      this.size = ++data2.size;
      return this;
    }
    data2 = this.__data__ = new MapCache(pairs);
  }
  data2.set(key, value);
  this.size = data2.size;
  return this;
}
function Stack(entries) {
  var data2 = this.__data__ = new ListCache(entries);
  this.size = data2.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object4, source2) {
  return object4 && copyObject(source2, keys$1(source2), object4);
}
function baseAssignIn(object4, source2) {
  return object4 && copyObject(source2, keysIn(source2), object4);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer$1 = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array4, predicate) {
  var index = -1, length = array4 == null ? 0 : array4.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array4[index];
    if (predicate(value, index, array4)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$3 = Object.prototype;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object4) {
  if (object4 == null) {
    return [];
  }
  object4 = Object(object4);
  return arrayFilter(nativeGetSymbols$1(object4), function(symbol) {
    return propertyIsEnumerable.call(object4, symbol);
  });
};
var getSymbols$1 = getSymbols;
function copySymbols(source2, object4) {
  return copyObject(source2, getSymbols$1(source2), object4);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object4) {
  var result = [];
  while (object4) {
    arrayPush(result, getSymbols$1(object4));
    object4 = getPrototype$1(object4);
  }
  return result;
};
var getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source2, object4) {
  return copyObject(source2, getSymbolsIn$1(source2), object4);
}
function baseGetAllKeys(object4, keysFunc, symbolsFunc) {
  var result = keysFunc(object4);
  return isArray$3(object4) ? result : arrayPush(result, symbolsFunc(object4));
}
function getAllKeys(object4) {
  return baseGetAllKeys(object4, keys$1, getSymbols$1);
}
function getAllKeysIn(object4) {
  return baseGetAllKeys(object4, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
var DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
var Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
var Set$2 = Set$1;
var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$3);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$3 && getTag(new WeakMap$3()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var getTag$1 = getTag;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function initCloneArray(array4) {
  var length = array4.length, result = new array4.constructor(length);
  if (length && typeof array4[0] == "string" && hasOwnProperty$2.call(array4, "index")) {
    result.index = array4.index;
    result.input = array4.input;
  }
  return result;
}
var Uint8Array$1 = root$1.Uint8Array;
var Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp4) {
  var result = new regexp4.constructor(regexp4.source, reFlags.exec(regexp4));
  result.lastIndex = regexp4.lastIndex;
  return result;
}
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object4, tag, isDeep) {
  var Ctor = object4.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object4);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object4);
    case dataViewTag$2:
      return cloneDataView(object4, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object4, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object4);
    case regexpTag$2:
      return cloneRegExp(object4);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object4);
  }
}
function initCloneObject(object4) {
  return typeof object4.constructor == "function" && !isPrototype(object4) ? baseCreate$1(getPrototype$1(object4)) : {};
}
var mapTag$2 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$2;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
var isMap$1 = isMap;
var setTag$2 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$2;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet$1 = isSet;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object4, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object4 ? customizer(value, key, object4, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$2(value)) {
    return value;
  }
  var isArr = isArray$3(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$2(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object4) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object4 ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys$1;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_SYMBOLS_FLAG = 4;
function clone$3(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array4, predicate) {
  var index = -1, length = array4 == null ? 0 : array4.length;
  while (++index < length) {
    if (predicate(array4[index], index, array4)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array4, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array4.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array4);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array4;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack.set(array4, other);
  stack.set(other, array4);
  while (++index < arrLength) {
    var arrValue = array4[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array4, stack) : customizer(arrValue, othValue, index, array4, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array4);
  stack["delete"](other);
  return result;
}
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object4, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object4.byteLength != other.byteLength || object4.byteOffset != other.byteOffset) {
        return false;
      }
      object4 = object4.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object4.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object4), new Uint8Array$2(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object4, +other);
    case errorTag:
      return object4.name == other.name && object4.message == other.message;
    case regexpTag:
    case stringTag:
      return object4 == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object4.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object4);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack.set(object4, other);
      var result = equalArrays(convert(object4), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object4);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object4) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object4, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object4), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object4);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object4;
  }
  var result = true;
  stack.set(object4, other);
  stack.set(other, object4);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object4[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object4, stack) : customizer(objValue, othValue, key, object4, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object4.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object4 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object4);
  stack["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object4, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$3(object4), othIsArr = isArray$3(other), objTag = objIsArr ? arrayTag : getTag$1(object4), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$2(object4)) {
    if (!isBuffer$2(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray$3(object4) ? equalArrays(object4, other, bitmask, customizer, equalFunc, stack) : equalByTag(object4, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object4, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object4.value() : object4, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object4, other, bitmask, customizer, equalFunc, stack);
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
function baseHasIn(object4, key) {
  return object4 != null && key in Object(object4);
}
function hasPath(object4, path, hasFunc) {
  path = castPath(path, object4);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object4 != null && hasFunc(object4, key))) {
      break;
    }
    object4 = object4[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object4 == null ? 0 : object4.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray$3(object4) || isArguments$1(object4));
}
function hasIn(object4, path) {
  return object4 != null && hasPath(object4, path, baseHasIn);
}
var now = function() {
  return root$1.Date.now();
};
var now$1 = now;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$2(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike$1(value);
}
function arrayIncludesWith(array4, value, comparator) {
  var index = -1, length = array4 == null ? 0 : array4.length;
  while (++index < length) {
    if (comparator(value, array4[index])) {
      return true;
    }
  }
  return false;
}
var INFINITY$1 = 1 / 0;
function flattenDeep(array4) {
  var length = array4 == null ? 0 : array4.length;
  return length ? baseFlatten(array4, INFINITY$1) : [];
}
function fromPairs(pairs) {
  var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}
function isEqual$1(value, other) {
  return baseIsEqual(value, other);
}
function isNil(value) {
  return value == null;
}
function baseSet(object4, path, value, customizer) {
  if (!isObject$2(object4)) {
    return object4;
  }
  path = castPath(path, object4);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object4;
  while (nested != null && ++index < length) {
    var key = toKey(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object4;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject$2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object4;
}
function basePickBy(object4, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = baseGet(object4, path);
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object4), value);
    }
  }
  return result;
}
function basePick(object4, paths) {
  return basePickBy(object4, paths, function(value, path) {
    return hasIn(object4, path);
  });
}
var pick = flatRest(function(object4, paths) {
  return object4 == null ? {} : basePick(object4, paths);
});
var pick$1 = pick;
function set(object4, path, value) {
  return object4 == null ? object4 : baseSet(object4, path, value);
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject$2(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var INFINITY = 1 / 0;
var createSet = !(Set$2 && 1 / setToArray(new Set$2([, -0]))[1] == INFINITY) ? noop$1 : function(values) {
  return new Set$2(values);
};
var createSet$1 = createSet;
var LARGE_ARRAY_SIZE = 200;
function baseUniq(array4, iteratee, comparator) {
  var index = -1, includes = arrayIncludes, length = array4.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set2 = iteratee ? null : createSet$1(array4);
    if (set2) {
      return setToArray(set2);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array4[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});
var union$1 = union;
function t(t2) {
  return t2.split("-")[0];
}
function e$1(t2) {
  return t2.split("-")[1];
}
function n$1(e2) {
  return ["top", "bottom"].includes(t(e2)) ? "x" : "y";
}
function r$1(t2) {
  return t2 === "y" ? "height" : "width";
}
function i$1(i2, o2, a2) {
  let { reference: l2, floating: s2 } = i2;
  const c2 = l2.x + l2.width / 2 - s2.width / 2, f2 = l2.y + l2.height / 2 - s2.height / 2, u2 = n$1(o2), m2 = r$1(u2), g2 = l2[m2] / 2 - s2[m2] / 2, d2 = u2 === "x";
  let p2;
  switch (t(o2)) {
    case "top":
      p2 = { x: c2, y: l2.y - s2.height };
      break;
    case "bottom":
      p2 = { x: c2, y: l2.y + l2.height };
      break;
    case "right":
      p2 = { x: l2.x + l2.width, y: f2 };
      break;
    case "left":
      p2 = { x: l2.x - s2.width, y: f2 };
      break;
    default:
      p2 = { x: l2.x, y: l2.y };
  }
  switch (e$1(o2)) {
    case "start":
      p2[u2] -= g2 * (a2 && d2 ? -1 : 1);
      break;
    case "end":
      p2[u2] += g2 * (a2 && d2 ? -1 : 1);
  }
  return p2;
}
const o$2 = async (t2, e2, n2) => {
  const { placement: r2 = "bottom", strategy: o2 = "absolute", middleware: a2 = [], platform: l2 } = n2, s2 = await (l2.isRTL == null ? void 0 : l2.isRTL(e2));
  let c2 = await l2.getElementRects({ reference: t2, floating: e2, strategy: o2 }), { x: f2, y: u2 } = i$1(c2, r2, s2), m2 = r2, g2 = {};
  for (let n3 = 0; n3 < a2.length; n3++) {
    const { name: d2, fn: p2 } = a2[n3], { x: h2, y: y2, data: x2, reset: w2 } = await p2({ x: f2, y: u2, initialPlacement: r2, placement: m2, strategy: o2, middlewareData: g2, rects: c2, platform: l2, elements: { reference: t2, floating: e2 } });
    f2 = h2 != null ? h2 : f2, u2 = y2 != null ? y2 : u2, g2 = __spreadProps(__spreadValues({}, g2), { [d2]: __spreadValues(__spreadValues({}, g2[d2]), x2) }), w2 && (typeof w2 == "object" && (w2.placement && (m2 = w2.placement), w2.rects && (c2 = w2.rects === true ? await l2.getElementRects({ reference: t2, floating: e2, strategy: o2 }) : w2.rects), { x: f2, y: u2 } = i$1(c2, m2, s2)), n3 = -1);
  }
  return { x: f2, y: u2, placement: m2, strategy: o2, middlewareData: g2 };
};
function a$2(t2) {
  return typeof t2 != "number" ? function(t3) {
    return __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l$2(t2) {
  return __spreadProps(__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
}
const c$1 = Math.min, f$1 = Math.max;
function u$2(t2, e2, n2) {
  return f$1(t2, c$1(e2, n2));
}
const m$3 = (t2) => ({ name: "arrow", options: t2, async fn(e2) {
  const { element: i2, padding: o2 = 0 } = t2 != null ? t2 : {}, { x: l2, y: s2, placement: c2, rects: f2, platform: m2 } = e2;
  if (i2 == null)
    return {};
  const g2 = a$2(o2), d2 = { x: l2, y: s2 }, p2 = n$1(c2), h2 = r$1(p2), y2 = await m2.getDimensions(i2), x2 = p2 === "y" ? "top" : "left", w2 = p2 === "y" ? "bottom" : "right", v2 = f2.reference[h2] + f2.reference[p2] - d2[p2] - f2.floating[h2], b2 = d2[p2] - f2.reference[p2], R2 = await (m2.getOffsetParent == null ? void 0 : m2.getOffsetParent(i2)), A2 = R2 ? p2 === "y" ? R2.clientHeight || 0 : R2.clientWidth || 0 : 0, P2 = v2 / 2 - b2 / 2, T2 = g2[x2], O2 = A2 - y2[h2] - g2[w2], D2 = A2 / 2 - y2[h2] / 2 + P2, L2 = u$2(T2, D2, O2);
  return { data: { [p2]: L2, centerOffset: D2 - L2 } };
} });
const x$2 = ["top", "right", "bottom", "left"];
x$2.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
const T$2 = function(r2) {
  return r2 === void 0 && (r2 = 0), { name: "offset", options: r2, async fn(i2) {
    const { x: o2, y: a2, placement: l2, rects: s2, platform: c2, elements: f2 } = i2, u2 = function(r3, i3, o3, a3) {
      a3 === void 0 && (a3 = false);
      const l3 = t(r3), s3 = e$1(r3), c3 = n$1(r3) === "x", f3 = ["left", "top"].includes(l3) ? -1 : 1, u3 = a3 && c3 ? -1 : 1, m2 = typeof o3 == "function" ? o3(__spreadProps(__spreadValues({}, i3), { placement: r3 })) : o3;
      let { mainAxis: g2, crossAxis: d2, alignmentAxis: p2 } = typeof m2 == "number" ? { mainAxis: m2, crossAxis: 0, alignmentAxis: null } : __spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, m2);
      return s3 && typeof p2 == "number" && (d2 = s3 === "end" ? -1 * p2 : p2), c3 ? { x: d2 * u3, y: g2 * f3 } : { x: g2 * f3, y: d2 * u3 };
    }(l2, s2, r2, await (c2.isRTL == null ? void 0 : c2.isRTL(f2.floating)));
    return { x: o2 + u2.x, y: a2 + u2.y, data: u2 };
  } };
};
function n(t2) {
  return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
}
function o$1(t2) {
  if (t2 == null)
    return window;
  if (!n(t2)) {
    const e2 = t2.ownerDocument;
    return e2 && e2.defaultView || window;
  }
  return t2;
}
function i(t2) {
  return o$1(t2).getComputedStyle(t2);
}
function r(t2) {
  return n(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
}
function l$1(t2) {
  return t2 instanceof o$1(t2).HTMLElement;
}
function c(t2) {
  return t2 instanceof o$1(t2).Element;
}
function f(t2) {
  if (typeof ShadowRoot == "undefined")
    return false;
  return t2 instanceof o$1(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function s$1(t2) {
  const { overflow: e2, overflowX: n2, overflowY: o2 } = i(t2);
  return /auto|scroll|overlay|hidden/.test(e2 + o2 + n2);
}
function u$1(t2) {
  return ["table", "td", "th"].includes(r(t2));
}
function d$1(t2) {
  const e2 = navigator.userAgent.toLowerCase().includes("firefox"), n2 = i(t2);
  return n2.transform !== "none" || n2.perspective !== "none" || n2.contain === "paint" || ["transform", "perspective"].includes(n2.willChange) || e2 && n2.willChange === "filter" || e2 && !!n2.filter && n2.filter !== "none";
}
function h$1() {
  return !/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
const a$1 = Math.min, g = Math.max, p$1 = Math.round;
function m$2(t2, e2, n2) {
  var i2, r2, f2, s2;
  e2 === void 0 && (e2 = false), n2 === void 0 && (n2 = false);
  const u2 = t2.getBoundingClientRect();
  let d2 = 1, a2 = 1;
  e2 && l$1(t2) && (d2 = t2.offsetWidth > 0 && p$1(u2.width) / t2.offsetWidth || 1, a2 = t2.offsetHeight > 0 && p$1(u2.height) / t2.offsetHeight || 1);
  const g2 = c(t2) ? o$1(t2) : window, m2 = !h$1() && n2, w2 = (u2.left + (m2 && (i2 = (r2 = g2.visualViewport) == null ? void 0 : r2.offsetLeft) != null ? i2 : 0)) / d2, v2 = (u2.top + (m2 && (f2 = (s2 = g2.visualViewport) == null ? void 0 : s2.offsetTop) != null ? f2 : 0)) / a2, y2 = u2.width / d2, x2 = u2.height / a2;
  return { width: y2, height: x2, top: v2, right: w2 + y2, bottom: v2 + x2, left: w2, x: w2, y: v2 };
}
function w$1(t2) {
  return (e2 = t2, (e2 instanceof o$1(e2).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e2;
}
function v$1(t2) {
  return c(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function y(t2) {
  return m$2(w$1(t2)).left + v$1(t2).scrollLeft;
}
function x$1(t2, e2, n2) {
  const o2 = l$1(e2), i2 = w$1(e2), c2 = m$2(t2, o2 && function(t3) {
    const e3 = m$2(t3);
    return p$1(e3.width) !== t3.offsetWidth || p$1(e3.height) !== t3.offsetHeight;
  }(e2), n2 === "fixed");
  let f2 = { scrollLeft: 0, scrollTop: 0 };
  const u2 = { x: 0, y: 0 };
  if (o2 || !o2 && n2 !== "fixed")
    if ((r(e2) !== "body" || s$1(i2)) && (f2 = v$1(e2)), l$1(e2)) {
      const t3 = m$2(e2, true);
      u2.x = t3.x + e2.clientLeft, u2.y = t3.y + e2.clientTop;
    } else
      i2 && (u2.x = y(i2));
  return { x: c2.left + f2.scrollLeft - u2.x, y: c2.top + f2.scrollTop - u2.y, width: c2.width, height: c2.height };
}
function L$1(t2) {
  return r(t2) === "html" ? t2 : t2.assignedSlot || t2.parentNode || (f(t2) ? t2.host : null) || w$1(t2);
}
function b$1(t2) {
  return l$1(t2) && getComputedStyle(t2).position !== "fixed" ? t2.offsetParent : null;
}
function R$1(t2) {
  const e2 = o$1(t2);
  let n2 = b$1(t2);
  for (; n2 && u$1(n2) && getComputedStyle(n2).position === "static"; )
    n2 = b$1(n2);
  return n2 && (r(n2) === "html" || r(n2) === "body" && getComputedStyle(n2).position === "static" && !d$1(n2)) ? e2 : n2 || function(t3) {
    let e3 = L$1(t3);
    for (f(e3) && (e3 = e3.host); l$1(e3) && !["html", "body"].includes(r(e3)); ) {
      if (d$1(e3))
        return e3;
      e3 = e3.parentNode;
    }
    return null;
  }(t2) || e2;
}
function T$1(t2) {
  if (l$1(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e2 = m$2(t2);
  return { width: e2.width, height: e2.height };
}
function W$2(t2) {
  const e2 = L$1(t2);
  return ["html", "body", "#document"].includes(r(e2)) ? t2.ownerDocument.body : l$1(e2) && s$1(e2) ? e2 : W$2(e2);
}
function C$1(t2, e2) {
  var n2;
  e2 === void 0 && (e2 = []);
  const i2 = W$2(t2), r2 = i2 === ((n2 = t2.ownerDocument) == null ? void 0 : n2.body), l2 = o$1(i2), c2 = r2 ? [l2].concat(l2.visualViewport || [], s$1(i2) ? i2 : []) : i2, f2 = e2.concat(c2);
  return r2 ? f2 : f2.concat(C$1(c2));
}
function E$2(e2, n2, r2) {
  return n2 === "viewport" ? l$2(function(t2, e3) {
    const n3 = o$1(t2), i2 = w$1(t2), r3 = n3.visualViewport;
    let l2 = i2.clientWidth, c2 = i2.clientHeight, f2 = 0, s2 = 0;
    if (r3) {
      l2 = r3.width, c2 = r3.height;
      const t3 = h$1();
      (t3 || !t3 && e3 === "fixed") && (f2 = r3.offsetLeft, s2 = r3.offsetTop);
    }
    return { width: l2, height: c2, x: f2, y: s2 };
  }(e2, r2)) : c(n2) ? function(t2, e3) {
    const n3 = m$2(t2, false, e3 === "fixed"), o2 = n3.top + t2.clientTop, i2 = n3.left + t2.clientLeft;
    return { top: o2, left: i2, x: i2, y: o2, right: i2 + t2.clientWidth, bottom: o2 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n2, r2) : l$2(function(t2) {
    var e3;
    const n3 = w$1(t2), o2 = v$1(t2), r3 = (e3 = t2.ownerDocument) == null ? void 0 : e3.body, l2 = g(n3.scrollWidth, n3.clientWidth, r3 ? r3.scrollWidth : 0, r3 ? r3.clientWidth : 0), c2 = g(n3.scrollHeight, n3.clientHeight, r3 ? r3.scrollHeight : 0, r3 ? r3.clientHeight : 0);
    let f2 = -o2.scrollLeft + y(t2);
    const s2 = -o2.scrollTop;
    return i(r3 || n3).direction === "rtl" && (f2 += g(n3.clientWidth, r3 ? r3.clientWidth : 0) - l2), { width: l2, height: c2, x: f2, y: s2 };
  }(w$1(e2)));
}
function H$1(t2) {
  const e2 = C$1(t2), n2 = ["absolute", "fixed"].includes(i(t2).position) && l$1(t2) ? R$1(t2) : t2;
  return c(n2) ? e2.filter((t3) => c(t3) && function(t4, e3) {
    const n3 = e3 == null || e3.getRootNode == null ? void 0 : e3.getRootNode();
    if (t4 != null && t4.contains(e3))
      return true;
    if (n3 && f(n3)) {
      let n4 = e3;
      do {
        if (n4 && t4 === n4)
          return true;
        n4 = n4.parentNode || n4.host;
      } while (n4);
    }
    return false;
  }(t3, n2) && r(t3) !== "body") : [];
}
const S$1 = { getClippingRect: function(t2) {
  let { element: e2, boundary: n2, rootBoundary: o2, strategy: i2 } = t2;
  const r2 = [...n2 === "clippingAncestors" ? H$1(e2) : [].concat(n2), o2], l2 = r2[0], c2 = r2.reduce((t3, n3) => {
    const o3 = E$2(e2, n3, i2);
    return t3.top = g(o3.top, t3.top), t3.right = a$1(o3.right, t3.right), t3.bottom = a$1(o3.bottom, t3.bottom), t3.left = g(o3.left, t3.left), t3;
  }, E$2(e2, l2, i2));
  return { width: c2.right - c2.left, height: c2.bottom - c2.top, x: c2.left, y: c2.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e2, offsetParent: n2, strategy: o2 } = t2;
  const i2 = l$1(n2), c2 = w$1(n2);
  if (n2 === c2)
    return e2;
  let f2 = { scrollLeft: 0, scrollTop: 0 };
  const u2 = { x: 0, y: 0 };
  if ((i2 || !i2 && o2 !== "fixed") && ((r(n2) !== "body" || s$1(c2)) && (f2 = v$1(n2)), l$1(n2))) {
    const t3 = m$2(n2, true);
    u2.x = t3.x + n2.clientLeft, u2.y = t3.y + n2.clientTop;
  }
  return __spreadProps(__spreadValues({}, e2), { x: e2.x - f2.scrollLeft + u2.x, y: e2.y - f2.scrollTop + u2.y });
}, isElement: c, getDimensions: T$1, getOffsetParent: R$1, getDocumentElement: w$1, getElementRects: (t2) => {
  let { reference: e2, floating: n2, strategy: o2 } = t2;
  return { reference: x$1(e2, R$1(n2), o2), floating: __spreadProps(__spreadValues({}, T$1(n2)), { x: 0, y: 0 }) };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => i(t2).direction === "rtl" };
const N$2 = (t2, n2, o2) => o$2(t2, n2, __spreadValues({ platform: S$1 }, o2));
var E$1 = "top", R = "bottom", W$1 = "right", P$1 = "left", me = "auto", G = [E$1, R, W$1, P$1], U$1 = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(t2, e2) {
  return t2.concat([e2 + "-" + U$1, e2 + "-" + J]);
}, []), Ee = [].concat(G, [me]).reduce(function(t2, e2) {
  return t2.concat([e2, e2 + "-" + U$1, e2 + "-" + J]);
}, []), Ge = "beforeRead", Je = "read", Ke = "afterRead", Qe = "beforeMain", Ze = "main", et = "afterMain", tt = "beforeWrite", nt = "write", rt$1 = "afterWrite", ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt$1];
function C(t2) {
  return t2 ? (t2.nodeName || "").toLowerCase() : null;
}
function H(t2) {
  if (t2 == null)
    return window;
  if (t2.toString() !== "[object Window]") {
    var e2 = t2.ownerDocument;
    return e2 && e2.defaultView || window;
  }
  return t2;
}
function Q(t2) {
  var e2 = H(t2).Element;
  return t2 instanceof e2 || t2 instanceof Element;
}
function B(t2) {
  var e2 = H(t2).HTMLElement;
  return t2 instanceof e2 || t2 instanceof HTMLElement;
}
function Pe(t2) {
  if (typeof ShadowRoot == "undefined")
    return false;
  var e2 = H(t2).ShadowRoot;
  return t2 instanceof e2 || t2 instanceof ShadowRoot;
}
function Mt(t2) {
  var e2 = t2.state;
  Object.keys(e2.elements).forEach(function(n2) {
    var r2 = e2.styles[n2] || {}, o2 = e2.attributes[n2] || {}, i2 = e2.elements[n2];
    !B(i2) || !C(i2) || (Object.assign(i2.style, r2), Object.keys(o2).forEach(function(a2) {
      var s2 = o2[a2];
      s2 === false ? i2.removeAttribute(a2) : i2.setAttribute(a2, s2 === true ? "" : s2);
    }));
  });
}
function Rt(t2) {
  var e2 = t2.state, n2 = { popper: { position: e2.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(e2.elements.popper.style, n2.popper), e2.styles = n2, e2.elements.arrow && Object.assign(e2.elements.arrow.style, n2.arrow), function() {
    Object.keys(e2.elements).forEach(function(r2) {
      var o2 = e2.elements[r2], i2 = e2.attributes[r2] || {}, a2 = Object.keys(e2.styles.hasOwnProperty(r2) ? e2.styles[r2] : n2[r2]), s2 = a2.reduce(function(f2, c2) {
        return f2[c2] = "", f2;
      }, {});
      !B(o2) || !C(o2) || (Object.assign(o2.style, s2), Object.keys(i2).forEach(function(f2) {
        o2.removeAttribute(f2);
      }));
    });
  };
}
var Ae = { name: "applyStyles", enabled: true, phase: "write", fn: Mt, effect: Rt, requires: ["computeStyles"] };
function q(t2) {
  return t2.split("-")[0];
}
var X$1 = Math.max, ve = Math.min, Z = Math.round;
function ee(t2, e2) {
  e2 === void 0 && (e2 = false);
  var n2 = t2.getBoundingClientRect(), r2 = 1, o2 = 1;
  if (B(t2) && e2) {
    var i2 = t2.offsetHeight, a2 = t2.offsetWidth;
    a2 > 0 && (r2 = Z(n2.width) / a2 || 1), i2 > 0 && (o2 = Z(n2.height) / i2 || 1);
  }
  return { width: n2.width / r2, height: n2.height / o2, top: n2.top / o2, right: n2.right / r2, bottom: n2.bottom / o2, left: n2.left / r2, x: n2.left / r2, y: n2.top / o2 };
}
function ke(t2) {
  var e2 = ee(t2), n2 = t2.offsetWidth, r2 = t2.offsetHeight;
  return Math.abs(e2.width - n2) <= 1 && (n2 = e2.width), Math.abs(e2.height - r2) <= 1 && (r2 = e2.height), { x: t2.offsetLeft, y: t2.offsetTop, width: n2, height: r2 };
}
function it(t2, e2) {
  var n2 = e2.getRootNode && e2.getRootNode();
  if (t2.contains(e2))
    return true;
  if (n2 && Pe(n2)) {
    var r2 = e2;
    do {
      if (r2 && t2.isSameNode(r2))
        return true;
      r2 = r2.parentNode || r2.host;
    } while (r2);
  }
  return false;
}
function N$1(t2) {
  return H(t2).getComputedStyle(t2);
}
function Wt(t2) {
  return ["table", "td", "th"].indexOf(C(t2)) >= 0;
}
function I$1(t2) {
  return ((Q(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
}
function ge(t2) {
  return C(t2) === "html" ? t2 : t2.assignedSlot || t2.parentNode || (Pe(t2) ? t2.host : null) || I$1(t2);
}
function at(t2) {
  return !B(t2) || N$1(t2).position === "fixed" ? null : t2.offsetParent;
}
function Bt(t2) {
  var e2 = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n2 = navigator.userAgent.indexOf("Trident") !== -1;
  if (n2 && B(t2)) {
    var r2 = N$1(t2);
    if (r2.position === "fixed")
      return null;
  }
  var o2 = ge(t2);
  for (Pe(o2) && (o2 = o2.host); B(o2) && ["html", "body"].indexOf(C(o2)) < 0; ) {
    var i2 = N$1(o2);
    if (i2.transform !== "none" || i2.perspective !== "none" || i2.contain === "paint" || ["transform", "perspective"].indexOf(i2.willChange) !== -1 || e2 && i2.willChange === "filter" || e2 && i2.filter && i2.filter !== "none")
      return o2;
    o2 = o2.parentNode;
  }
  return null;
}
function se(t2) {
  for (var e2 = H(t2), n2 = at(t2); n2 && Wt(n2) && N$1(n2).position === "static"; )
    n2 = at(n2);
  return n2 && (C(n2) === "html" || C(n2) === "body" && N$1(n2).position === "static") ? e2 : n2 || Bt(t2) || e2;
}
function Le(t2) {
  return ["top", "bottom"].indexOf(t2) >= 0 ? "x" : "y";
}
function fe(t2, e2, n2) {
  return X$1(t2, ve(e2, n2));
}
function St(t2, e2, n2) {
  var r2 = fe(t2, e2, n2);
  return r2 > n2 ? n2 : r2;
}
function st() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function ft(t2) {
  return Object.assign({}, st(), t2);
}
function ct(t2, e2) {
  return e2.reduce(function(n2, r2) {
    return n2[r2] = t2, n2;
  }, {});
}
var Tt = function(t2, e2) {
  return t2 = typeof t2 == "function" ? t2(Object.assign({}, e2.rects, { placement: e2.placement })) : t2, ft(typeof t2 != "number" ? t2 : ct(t2, G));
};
function Ht(t2) {
  var e2, n2 = t2.state, r2 = t2.name, o2 = t2.options, i2 = n2.elements.arrow, a2 = n2.modifiersData.popperOffsets, s2 = q(n2.placement), f2 = Le(s2), c2 = [P$1, W$1].indexOf(s2) >= 0, u2 = c2 ? "height" : "width";
  if (!(!i2 || !a2)) {
    var m2 = Tt(o2.padding, n2), v2 = ke(i2), l2 = f2 === "y" ? E$1 : P$1, h2 = f2 === "y" ? R : W$1, p2 = n2.rects.reference[u2] + n2.rects.reference[f2] - a2[f2] - n2.rects.popper[u2], g2 = a2[f2] - n2.rects.reference[f2], x2 = se(i2), y2 = x2 ? f2 === "y" ? x2.clientHeight || 0 : x2.clientWidth || 0 : 0, $ = p2 / 2 - g2 / 2, d2 = m2[l2], b2 = y2 - v2[u2] - m2[h2], w2 = y2 / 2 - v2[u2] / 2 + $, O2 = fe(d2, w2, b2), j = f2;
    n2.modifiersData[r2] = (e2 = {}, e2[j] = O2, e2.centerOffset = O2 - w2, e2);
  }
}
function Ct(t2) {
  var e2 = t2.state, n2 = t2.options, r2 = n2.element, o2 = r2 === void 0 ? "[data-popper-arrow]" : r2;
  o2 != null && (typeof o2 == "string" && (o2 = e2.elements.popper.querySelector(o2), !o2) || !it(e2.elements.popper, o2) || (e2.elements.arrow = o2));
}
var pt = { name: "arrow", enabled: true, phase: "main", fn: Ht, effect: Ct, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function te(t2) {
  return t2.split("-")[1];
}
var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Vt(t2) {
  var e2 = t2.x, n2 = t2.y, r2 = window, o2 = r2.devicePixelRatio || 1;
  return { x: Z(e2 * o2) / o2 || 0, y: Z(n2 * o2) / o2 || 0 };
}
function ut(t2) {
  var e2, n2 = t2.popper, r2 = t2.popperRect, o2 = t2.placement, i2 = t2.variation, a2 = t2.offsets, s2 = t2.position, f2 = t2.gpuAcceleration, c2 = t2.adaptive, u2 = t2.roundOffsets, m2 = t2.isFixed, v2 = a2.x, l2 = v2 === void 0 ? 0 : v2, h2 = a2.y, p2 = h2 === void 0 ? 0 : h2, g2 = typeof u2 == "function" ? u2({ x: l2, y: p2 }) : { x: l2, y: p2 };
  l2 = g2.x, p2 = g2.y;
  var x2 = a2.hasOwnProperty("x"), y2 = a2.hasOwnProperty("y"), $ = P$1, d2 = E$1, b2 = window;
  if (c2) {
    var w2 = se(n2), O2 = "clientHeight", j = "clientWidth";
    if (w2 === H(n2) && (w2 = I$1(n2), N$1(w2).position !== "static" && s2 === "absolute" && (O2 = "scrollHeight", j = "scrollWidth")), w2 = w2, o2 === E$1 || (o2 === P$1 || o2 === W$1) && i2 === J) {
      d2 = R;
      var A2 = m2 && w2 === b2 && b2.visualViewport ? b2.visualViewport.height : w2[O2];
      p2 -= A2 - r2.height, p2 *= f2 ? 1 : -1;
    }
    if (o2 === P$1 || (o2 === E$1 || o2 === R) && i2 === J) {
      $ = W$1;
      var k = m2 && w2 === b2 && b2.visualViewport ? b2.visualViewport.width : w2[j];
      l2 -= k - r2.width, l2 *= f2 ? 1 : -1;
    }
  }
  var D2 = Object.assign({ position: s2 }, c2 && qt), S2 = u2 === true ? Vt({ x: l2, y: p2 }) : { x: l2, y: p2 };
  if (l2 = S2.x, p2 = S2.y, f2) {
    var L2;
    return Object.assign({}, D2, (L2 = {}, L2[d2] = y2 ? "0" : "", L2[$] = x2 ? "0" : "", L2.transform = (b2.devicePixelRatio || 1) <= 1 ? "translate(" + l2 + "px, " + p2 + "px)" : "translate3d(" + l2 + "px, " + p2 + "px, 0)", L2));
  }
  return Object.assign({}, D2, (e2 = {}, e2[d2] = y2 ? p2 + "px" : "", e2[$] = x2 ? l2 + "px" : "", e2.transform = "", e2));
}
function Nt(t2) {
  var e2 = t2.state, n2 = t2.options, r2 = n2.gpuAcceleration, o2 = r2 === void 0 ? true : r2, i2 = n2.adaptive, a2 = i2 === void 0 ? true : i2, s2 = n2.roundOffsets, f2 = s2 === void 0 ? true : s2, c2 = { placement: q(e2.placement), variation: te(e2.placement), popper: e2.elements.popper, popperRect: e2.rects.popper, gpuAcceleration: o2, isFixed: e2.options.strategy === "fixed" };
  e2.modifiersData.popperOffsets != null && (e2.styles.popper = Object.assign({}, e2.styles.popper, ut(Object.assign({}, c2, { offsets: e2.modifiersData.popperOffsets, position: e2.options.strategy, adaptive: a2, roundOffsets: f2 })))), e2.modifiersData.arrow != null && (e2.styles.arrow = Object.assign({}, e2.styles.arrow, ut(Object.assign({}, c2, { offsets: e2.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: f2 })))), e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-placement": e2.placement });
}
var Me = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: Nt, data: {} }, ye = { passive: true };
function It(t2) {
  var e2 = t2.state, n2 = t2.instance, r2 = t2.options, o2 = r2.scroll, i2 = o2 === void 0 ? true : o2, a2 = r2.resize, s2 = a2 === void 0 ? true : a2, f2 = H(e2.elements.popper), c2 = [].concat(e2.scrollParents.reference, e2.scrollParents.popper);
  return i2 && c2.forEach(function(u2) {
    u2.addEventListener("scroll", n2.update, ye);
  }), s2 && f2.addEventListener("resize", n2.update, ye), function() {
    i2 && c2.forEach(function(u2) {
      u2.removeEventListener("scroll", n2.update, ye);
    }), s2 && f2.removeEventListener("resize", n2.update, ye);
  };
}
var Re = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
}, effect: It, data: {} }, _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
function be(t2) {
  return t2.replace(/left|right|bottom|top/g, function(e2) {
    return _t[e2];
  });
}
var zt = { start: "end", end: "start" };
function lt$1(t2) {
  return t2.replace(/start|end/g, function(e2) {
    return zt[e2];
  });
}
function We(t2) {
  var e2 = H(t2), n2 = e2.pageXOffset, r2 = e2.pageYOffset;
  return { scrollLeft: n2, scrollTop: r2 };
}
function Be(t2) {
  return ee(I$1(t2)).left + We(t2).scrollLeft;
}
function Ft(t2) {
  var e2 = H(t2), n2 = I$1(t2), r2 = e2.visualViewport, o2 = n2.clientWidth, i2 = n2.clientHeight, a2 = 0, s2 = 0;
  return r2 && (o2 = r2.width, i2 = r2.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a2 = r2.offsetLeft, s2 = r2.offsetTop)), { width: o2, height: i2, x: a2 + Be(t2), y: s2 };
}
function Ut(t2) {
  var e2, n2 = I$1(t2), r2 = We(t2), o2 = (e2 = t2.ownerDocument) == null ? void 0 : e2.body, i2 = X$1(n2.scrollWidth, n2.clientWidth, o2 ? o2.scrollWidth : 0, o2 ? o2.clientWidth : 0), a2 = X$1(n2.scrollHeight, n2.clientHeight, o2 ? o2.scrollHeight : 0, o2 ? o2.clientHeight : 0), s2 = -r2.scrollLeft + Be(t2), f2 = -r2.scrollTop;
  return N$1(o2 || n2).direction === "rtl" && (s2 += X$1(n2.clientWidth, o2 ? o2.clientWidth : 0) - i2), { width: i2, height: a2, x: s2, y: f2 };
}
function Se(t2) {
  var e2 = N$1(t2), n2 = e2.overflow, r2 = e2.overflowX, o2 = e2.overflowY;
  return /auto|scroll|overlay|hidden/.test(n2 + o2 + r2);
}
function dt(t2) {
  return ["html", "body", "#document"].indexOf(C(t2)) >= 0 ? t2.ownerDocument.body : B(t2) && Se(t2) ? t2 : dt(ge(t2));
}
function ce(t2, e2) {
  var n2;
  e2 === void 0 && (e2 = []);
  var r2 = dt(t2), o2 = r2 === ((n2 = t2.ownerDocument) == null ? void 0 : n2.body), i2 = H(r2), a2 = o2 ? [i2].concat(i2.visualViewport || [], Se(r2) ? r2 : []) : r2, s2 = e2.concat(a2);
  return o2 ? s2 : s2.concat(ce(ge(a2)));
}
function Te(t2) {
  return Object.assign({}, t2, { left: t2.x, top: t2.y, right: t2.x + t2.width, bottom: t2.y + t2.height });
}
function Xt(t2) {
  var e2 = ee(t2);
  return e2.top = e2.top + t2.clientTop, e2.left = e2.left + t2.clientLeft, e2.bottom = e2.top + t2.clientHeight, e2.right = e2.left + t2.clientWidth, e2.width = t2.clientWidth, e2.height = t2.clientHeight, e2.x = e2.left, e2.y = e2.top, e2;
}
function ht(t2, e2) {
  return e2 === je ? Te(Ft(t2)) : Q(e2) ? Xt(e2) : Te(Ut(I$1(t2)));
}
function Yt(t2) {
  var e2 = ce(ge(t2)), n2 = ["absolute", "fixed"].indexOf(N$1(t2).position) >= 0, r2 = n2 && B(t2) ? se(t2) : t2;
  return Q(r2) ? e2.filter(function(o2) {
    return Q(o2) && it(o2, r2) && C(o2) !== "body";
  }) : [];
}
function Gt(t2, e2, n2) {
  var r2 = e2 === "clippingParents" ? Yt(t2) : [].concat(e2), o2 = [].concat(r2, [n2]), i2 = o2[0], a2 = o2.reduce(function(s2, f2) {
    var c2 = ht(t2, f2);
    return s2.top = X$1(c2.top, s2.top), s2.right = ve(c2.right, s2.right), s2.bottom = ve(c2.bottom, s2.bottom), s2.left = X$1(c2.left, s2.left), s2;
  }, ht(t2, i2));
  return a2.width = a2.right - a2.left, a2.height = a2.bottom - a2.top, a2.x = a2.left, a2.y = a2.top, a2;
}
function mt(t2) {
  var e2 = t2.reference, n2 = t2.element, r2 = t2.placement, o2 = r2 ? q(r2) : null, i2 = r2 ? te(r2) : null, a2 = e2.x + e2.width / 2 - n2.width / 2, s2 = e2.y + e2.height / 2 - n2.height / 2, f2;
  switch (o2) {
    case E$1:
      f2 = { x: a2, y: e2.y - n2.height };
      break;
    case R:
      f2 = { x: a2, y: e2.y + e2.height };
      break;
    case W$1:
      f2 = { x: e2.x + e2.width, y: s2 };
      break;
    case P$1:
      f2 = { x: e2.x - n2.width, y: s2 };
      break;
    default:
      f2 = { x: e2.x, y: e2.y };
  }
  var c2 = o2 ? Le(o2) : null;
  if (c2 != null) {
    var u2 = c2 === "y" ? "height" : "width";
    switch (i2) {
      case U$1:
        f2[c2] = f2[c2] - (e2[u2] / 2 - n2[u2] / 2);
        break;
      case J:
        f2[c2] = f2[c2] + (e2[u2] / 2 - n2[u2] / 2);
        break;
    }
  }
  return f2;
}
function ne(t2, e2) {
  e2 === void 0 && (e2 = {});
  var n2 = e2, r2 = n2.placement, o2 = r2 === void 0 ? t2.placement : r2, i2 = n2.boundary, a2 = i2 === void 0 ? Xe : i2, s2 = n2.rootBoundary, f2 = s2 === void 0 ? je : s2, c2 = n2.elementContext, u2 = c2 === void 0 ? K : c2, m2 = n2.altBoundary, v2 = m2 === void 0 ? false : m2, l2 = n2.padding, h2 = l2 === void 0 ? 0 : l2, p2 = ft(typeof h2 != "number" ? h2 : ct(h2, G)), g2 = u2 === K ? Ye : K, x2 = t2.rects.popper, y2 = t2.elements[v2 ? g2 : u2], $ = Gt(Q(y2) ? y2 : y2.contextElement || I$1(t2.elements.popper), a2, f2), d2 = ee(t2.elements.reference), b2 = mt({ reference: d2, element: x2, strategy: "absolute", placement: o2 }), w2 = Te(Object.assign({}, x2, b2)), O2 = u2 === K ? w2 : d2, j = { top: $.top - O2.top + p2.top, bottom: O2.bottom - $.bottom + p2.bottom, left: $.left - O2.left + p2.left, right: O2.right - $.right + p2.right }, A2 = t2.modifiersData.offset;
  if (u2 === K && A2) {
    var k = A2[o2];
    Object.keys(j).forEach(function(D2) {
      var S2 = [W$1, R].indexOf(D2) >= 0 ? 1 : -1, L2 = [E$1, R].indexOf(D2) >= 0 ? "y" : "x";
      j[D2] += k[L2] * S2;
    });
  }
  return j;
}
function Jt(t2, e2) {
  e2 === void 0 && (e2 = {});
  var n2 = e2, r2 = n2.placement, o2 = n2.boundary, i2 = n2.rootBoundary, a2 = n2.padding, s2 = n2.flipVariations, f2 = n2.allowedAutoPlacements, c2 = f2 === void 0 ? Ee : f2, u2 = te(r2), m2 = u2 ? s2 ? De : De.filter(function(h2) {
    return te(h2) === u2;
  }) : G, v2 = m2.filter(function(h2) {
    return c2.indexOf(h2) >= 0;
  });
  v2.length === 0 && (v2 = m2);
  var l2 = v2.reduce(function(h2, p2) {
    return h2[p2] = ne(t2, { placement: p2, boundary: o2, rootBoundary: i2, padding: a2 })[q(p2)], h2;
  }, {});
  return Object.keys(l2).sort(function(h2, p2) {
    return l2[h2] - l2[p2];
  });
}
function Kt(t2) {
  if (q(t2) === me)
    return [];
  var e2 = be(t2);
  return [lt$1(t2), e2, lt$1(e2)];
}
function Qt(t2) {
  var e2 = t2.state, n2 = t2.options, r2 = t2.name;
  if (!e2.modifiersData[r2]._skip) {
    for (var o2 = n2.mainAxis, i2 = o2 === void 0 ? true : o2, a2 = n2.altAxis, s2 = a2 === void 0 ? true : a2, f2 = n2.fallbackPlacements, c2 = n2.padding, u2 = n2.boundary, m2 = n2.rootBoundary, v2 = n2.altBoundary, l2 = n2.flipVariations, h2 = l2 === void 0 ? true : l2, p2 = n2.allowedAutoPlacements, g2 = e2.options.placement, x2 = q(g2), y2 = x2 === g2, $ = f2 || (y2 || !h2 ? [be(g2)] : Kt(g2)), d2 = [g2].concat($).reduce(function(z, V) {
      return z.concat(q(V) === me ? Jt(e2, { placement: V, boundary: u2, rootBoundary: m2, padding: c2, flipVariations: h2, allowedAutoPlacements: p2 }) : V);
    }, []), b2 = e2.rects.reference, w2 = e2.rects.popper, O2 = /* @__PURE__ */ new Map(), j = true, A2 = d2[0], k = 0; k < d2.length; k++) {
      var D2 = d2[k], S2 = q(D2), L2 = te(D2) === U$1, re = [E$1, R].indexOf(S2) >= 0, oe = re ? "width" : "height", M2 = ne(e2, { placement: D2, boundary: u2, rootBoundary: m2, altBoundary: v2, padding: c2 }), T2 = re ? L2 ? W$1 : P$1 : L2 ? R : E$1;
      b2[oe] > w2[oe] && (T2 = be(T2));
      var pe = be(T2), _2 = [];
      if (i2 && _2.push(M2[S2] <= 0), s2 && _2.push(M2[T2] <= 0, M2[pe] <= 0), _2.every(function(z) {
        return z;
      })) {
        A2 = D2, j = false;
        break;
      }
      O2.set(D2, _2);
    }
    if (j)
      for (var ue = h2 ? 3 : 1, xe = function(z) {
        var V = d2.find(function(de) {
          var ae = O2.get(de);
          if (ae)
            return ae.slice(0, z).every(function(Y2) {
              return Y2;
            });
        });
        if (V)
          return A2 = V, "break";
      }, ie = ue; ie > 0; ie--) {
        var le = xe(ie);
        if (le === "break")
          break;
      }
    e2.placement !== A2 && (e2.modifiersData[r2]._skip = true, e2.placement = A2, e2.reset = true);
  }
}
var vt = { name: "flip", enabled: true, phase: "main", fn: Qt, requiresIfExists: ["offset"], data: { _skip: false } };
function gt(t2, e2, n2) {
  return n2 === void 0 && (n2 = { x: 0, y: 0 }), { top: t2.top - e2.height - n2.y, right: t2.right - e2.width + n2.x, bottom: t2.bottom - e2.height + n2.y, left: t2.left - e2.width - n2.x };
}
function yt(t2) {
  return [E$1, W$1, R, P$1].some(function(e2) {
    return t2[e2] >= 0;
  });
}
function Zt(t2) {
  var e2 = t2.state, n2 = t2.name, r2 = e2.rects.reference, o2 = e2.rects.popper, i2 = e2.modifiersData.preventOverflow, a2 = ne(e2, { elementContext: "reference" }), s2 = ne(e2, { altBoundary: true }), f2 = gt(a2, r2), c2 = gt(s2, o2, i2), u2 = yt(f2), m2 = yt(c2);
  e2.modifiersData[n2] = { referenceClippingOffsets: f2, popperEscapeOffsets: c2, isReferenceHidden: u2, hasPopperEscaped: m2 }, e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-reference-hidden": u2, "data-popper-escaped": m2 });
}
var bt = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
function en(t2, e2, n2) {
  var r2 = q(t2), o2 = [P$1, E$1].indexOf(r2) >= 0 ? -1 : 1, i2 = typeof n2 == "function" ? n2(Object.assign({}, e2, { placement: t2 })) : n2, a2 = i2[0], s2 = i2[1];
  return a2 = a2 || 0, s2 = (s2 || 0) * o2, [P$1, W$1].indexOf(r2) >= 0 ? { x: s2, y: a2 } : { x: a2, y: s2 };
}
function tn(t2) {
  var e2 = t2.state, n2 = t2.options, r2 = t2.name, o2 = n2.offset, i2 = o2 === void 0 ? [0, 0] : o2, a2 = Ee.reduce(function(u2, m2) {
    return u2[m2] = en(m2, e2.rects, i2), u2;
  }, {}), s2 = a2[e2.placement], f2 = s2.x, c2 = s2.y;
  e2.modifiersData.popperOffsets != null && (e2.modifiersData.popperOffsets.x += f2, e2.modifiersData.popperOffsets.y += c2), e2.modifiersData[r2] = a2;
}
var wt = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: tn };
function nn(t2) {
  var e2 = t2.state, n2 = t2.name;
  e2.modifiersData[n2] = mt({ reference: e2.rects.reference, element: e2.rects.popper, strategy: "absolute", placement: e2.placement });
}
var He = { name: "popperOffsets", enabled: true, phase: "read", fn: nn, data: {} };
function rn(t2) {
  return t2 === "x" ? "y" : "x";
}
function on(t2) {
  var e2 = t2.state, n2 = t2.options, r2 = t2.name, o2 = n2.mainAxis, i2 = o2 === void 0 ? true : o2, a2 = n2.altAxis, s2 = a2 === void 0 ? false : a2, f2 = n2.boundary, c2 = n2.rootBoundary, u2 = n2.altBoundary, m2 = n2.padding, v2 = n2.tether, l2 = v2 === void 0 ? true : v2, h2 = n2.tetherOffset, p2 = h2 === void 0 ? 0 : h2, g2 = ne(e2, { boundary: f2, rootBoundary: c2, padding: m2, altBoundary: u2 }), x2 = q(e2.placement), y2 = te(e2.placement), $ = !y2, d2 = Le(x2), b2 = rn(d2), w2 = e2.modifiersData.popperOffsets, O2 = e2.rects.reference, j = e2.rects.popper, A2 = typeof p2 == "function" ? p2(Object.assign({}, e2.rects, { placement: e2.placement })) : p2, k = typeof A2 == "number" ? { mainAxis: A2, altAxis: A2 } : Object.assign({ mainAxis: 0, altAxis: 0 }, A2), D2 = e2.modifiersData.offset ? e2.modifiersData.offset[e2.placement] : null, S2 = { x: 0, y: 0 };
  if (w2) {
    if (i2) {
      var L2, re = d2 === "y" ? E$1 : P$1, oe = d2 === "y" ? R : W$1, M2 = d2 === "y" ? "height" : "width", T2 = w2[d2], pe = T2 + g2[re], _2 = T2 - g2[oe], ue = l2 ? -j[M2] / 2 : 0, xe = y2 === U$1 ? O2[M2] : j[M2], ie = y2 === U$1 ? -j[M2] : -O2[M2], le = e2.elements.arrow, z = l2 && le ? ke(le) : { width: 0, height: 0 }, V = e2.modifiersData["arrow#persistent"] ? e2.modifiersData["arrow#persistent"].padding : st(), de = V[re], ae = V[oe], Y2 = fe(0, O2[M2], z[M2]), jt = $ ? O2[M2] / 2 - ue - Y2 - de - k.mainAxis : xe - Y2 - de - k.mainAxis, Dt = $ ? -O2[M2] / 2 + ue + Y2 + ae + k.mainAxis : ie + Y2 + ae + k.mainAxis, Oe = e2.elements.arrow && se(e2.elements.arrow), Et = Oe ? d2 === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0, Ce = (L2 = D2 == null ? void 0 : D2[d2]) != null ? L2 : 0, Pt = T2 + jt - Ce - Et, At = T2 + Dt - Ce, qe = fe(l2 ? ve(pe, Pt) : pe, T2, l2 ? X$1(_2, At) : _2);
      w2[d2] = qe, S2[d2] = qe - T2;
    }
    if (s2) {
      var Ve, kt = d2 === "x" ? E$1 : P$1, Lt = d2 === "x" ? R : W$1, F2 = w2[b2], he = b2 === "y" ? "height" : "width", Ne = F2 + g2[kt], Ie = F2 - g2[Lt], $e = [E$1, P$1].indexOf(x2) !== -1, _e = (Ve = D2 == null ? void 0 : D2[b2]) != null ? Ve : 0, ze = $e ? Ne : F2 - O2[he] - j[he] - _e + k.altAxis, Fe = $e ? F2 + O2[he] + j[he] - _e - k.altAxis : Ie, Ue = l2 && $e ? St(ze, F2, Fe) : fe(l2 ? ze : Ne, F2, l2 ? Fe : Ie);
      w2[b2] = Ue, S2[b2] = Ue - F2;
    }
    e2.modifiersData[r2] = S2;
  }
}
var xt = { name: "preventOverflow", enabled: true, phase: "main", fn: on, requiresIfExists: ["offset"] };
function an(t2) {
  return { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop };
}
function sn(t2) {
  return t2 === H(t2) || !B(t2) ? We(t2) : an(t2);
}
function fn(t2) {
  var e2 = t2.getBoundingClientRect(), n2 = Z(e2.width) / t2.offsetWidth || 1, r2 = Z(e2.height) / t2.offsetHeight || 1;
  return n2 !== 1 || r2 !== 1;
}
function cn(t2, e2, n2) {
  n2 === void 0 && (n2 = false);
  var r2 = B(e2), o2 = B(e2) && fn(e2), i2 = I$1(e2), a2 = ee(t2, o2), s2 = { scrollLeft: 0, scrollTop: 0 }, f2 = { x: 0, y: 0 };
  return (r2 || !r2 && !n2) && ((C(e2) !== "body" || Se(i2)) && (s2 = sn(e2)), B(e2) ? (f2 = ee(e2, true), f2.x += e2.clientLeft, f2.y += e2.clientTop) : i2 && (f2.x = Be(i2))), { x: a2.left + s2.scrollLeft - f2.x, y: a2.top + s2.scrollTop - f2.y, width: a2.width, height: a2.height };
}
function pn(t2) {
  var e2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set(), r2 = [];
  t2.forEach(function(i2) {
    e2.set(i2.name, i2);
  });
  function o2(i2) {
    n2.add(i2.name);
    var a2 = [].concat(i2.requires || [], i2.requiresIfExists || []);
    a2.forEach(function(s2) {
      if (!n2.has(s2)) {
        var f2 = e2.get(s2);
        f2 && o2(f2);
      }
    }), r2.push(i2);
  }
  return t2.forEach(function(i2) {
    n2.has(i2.name) || o2(i2);
  }), r2;
}
function un(t2) {
  var e2 = pn(t2);
  return ot.reduce(function(n2, r2) {
    return n2.concat(e2.filter(function(o2) {
      return o2.phase === r2;
    }));
  }, []);
}
function ln(t2) {
  var e2;
  return function() {
    return e2 || (e2 = new Promise(function(n2) {
      Promise.resolve().then(function() {
        e2 = void 0, n2(t2());
      });
    })), e2;
  };
}
function dn(t2) {
  var e2 = t2.reduce(function(n2, r2) {
    var o2 = n2[r2.name];
    return n2[r2.name] = o2 ? Object.assign({}, o2, r2, { options: Object.assign({}, o2.options, r2.options), data: Object.assign({}, o2.data, r2.data) }) : r2, n2;
  }, {});
  return Object.keys(e2).map(function(n2) {
    return e2[n2];
  });
}
var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
function $t() {
  for (var t2 = arguments.length, e2 = new Array(t2), n2 = 0; n2 < t2; n2++)
    e2[n2] = arguments[n2];
  return !e2.some(function(r2) {
    return !(r2 && typeof r2.getBoundingClientRect == "function");
  });
}
function we(t2) {
  t2 === void 0 && (t2 = {});
  var e2 = t2, n2 = e2.defaultModifiers, r2 = n2 === void 0 ? [] : n2, o2 = e2.defaultOptions, i2 = o2 === void 0 ? Ot : o2;
  return function(a2, s2, f2) {
    f2 === void 0 && (f2 = i2);
    var c2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, i2), modifiersData: {}, elements: { reference: a2, popper: s2 }, attributes: {}, styles: {} }, u2 = [], m2 = false, v2 = { state: c2, setOptions: function(p2) {
      var g2 = typeof p2 == "function" ? p2(c2.options) : p2;
      h2(), c2.options = Object.assign({}, i2, c2.options, g2), c2.scrollParents = { reference: Q(a2) ? ce(a2) : a2.contextElement ? ce(a2.contextElement) : [], popper: ce(s2) };
      var x2 = un(dn([].concat(r2, c2.options.modifiers)));
      return c2.orderedModifiers = x2.filter(function(y2) {
        return y2.enabled;
      }), l2(), v2.update();
    }, forceUpdate: function() {
      if (!m2) {
        var p2 = c2.elements, g2 = p2.reference, x2 = p2.popper;
        if ($t(g2, x2)) {
          c2.rects = { reference: cn(g2, se(x2), c2.options.strategy === "fixed"), popper: ke(x2) }, c2.reset = false, c2.placement = c2.options.placement, c2.orderedModifiers.forEach(function(j) {
            return c2.modifiersData[j.name] = Object.assign({}, j.data);
          });
          for (var y2 = 0; y2 < c2.orderedModifiers.length; y2++) {
            if (c2.reset === true) {
              c2.reset = false, y2 = -1;
              continue;
            }
            var $ = c2.orderedModifiers[y2], d2 = $.fn, b2 = $.options, w2 = b2 === void 0 ? {} : b2, O2 = $.name;
            typeof d2 == "function" && (c2 = d2({ state: c2, options: w2, name: O2, instance: v2 }) || c2);
          }
        }
      }
    }, update: ln(function() {
      return new Promise(function(p2) {
        v2.forceUpdate(), p2(c2);
      });
    }), destroy: function() {
      h2(), m2 = true;
    } };
    if (!$t(a2, s2))
      return v2;
    v2.setOptions(f2).then(function(p2) {
      !m2 && f2.onFirstUpdate && f2.onFirstUpdate(p2);
    });
    function l2() {
      c2.orderedModifiers.forEach(function(p2) {
        var g2 = p2.name, x2 = p2.options, y2 = x2 === void 0 ? {} : x2, $ = p2.effect;
        if (typeof $ == "function") {
          var d2 = $({ state: c2, name: g2, instance: v2, options: y2 }), b2 = function() {
          };
          u2.push(d2 || b2);
        }
      });
    }
    function h2() {
      u2.forEach(function(p2) {
        return p2();
      }), u2 = [];
    }
    return v2;
  };
}
we();
var mn = [Re, He, Me, Ae];
we({ defaultModifiers: mn });
var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt], yn = we({ defaultModifiers: gn });
function bound01(n2, max3) {
  if (isOnePointZero(n2)) {
    n2 = "100%";
  }
  var isPercent = isPercentage(n2);
  n2 = max3 === 360 ? n2 : Math.min(max3, Math.max(0, parseFloat(n2)));
  if (isPercent) {
    n2 = parseInt(String(n2 * max3), 10) / 100;
  }
  if (Math.abs(n2 - max3) < 1e-6) {
    return 1;
  }
  if (max3 === 360) {
    n2 = (n2 < 0 ? n2 % max3 + max3 : n2 % max3) / parseFloat(String(max3));
  } else {
    n2 = n2 % max3 / parseFloat(String(max3));
  }
  return n2;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n2) {
  return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
}
function isPercentage(n2) {
  return typeof n2 === "string" && n2.indexOf("%") !== -1;
}
function boundAlpha(a2) {
  a2 = parseFloat(a2);
  if (isNaN(a2) || a2 < 0 || a2 > 1) {
    a2 = 1;
  }
  return a2;
}
function convertToPercentage(n2) {
  if (n2 <= 1) {
    return "".concat(Number(n2) * 100, "%");
  }
  return n2;
}
function pad2(c2) {
  return c2.length === 1 ? "0" + c2 : String(c2);
}
function rgbToRgb(r2, g2, b2) {
  return {
    r: bound01(r2, 255) * 255,
    g: bound01(g2, 255) * 255,
    b: bound01(b2, 255) * 255
  };
}
function rgbToHsl(r2, g2, b2) {
  r2 = bound01(r2, 255);
  g2 = bound01(g2, 255);
  b2 = bound01(b2, 255);
  var max3 = Math.max(r2, g2, b2);
  var min3 = Math.min(r2, g2, b2);
  var h2 = 0;
  var s2 = 0;
  var l2 = (max3 + min3) / 2;
  if (max3 === min3) {
    s2 = 0;
    h2 = 0;
  } else {
    var d2 = max3 - min3;
    s2 = l2 > 0.5 ? d2 / (2 - max3 - min3) : d2 / (max3 + min3);
    switch (max3) {
      case r2:
        h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        h2 = (b2 - r2) / d2 + 2;
        break;
      case b2:
        h2 = (r2 - g2) / d2 + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s: s2, l: l2 };
}
function hue2rgb(p2, q2, t2) {
  if (t2 < 0) {
    t2 += 1;
  }
  if (t2 > 1) {
    t2 -= 1;
  }
  if (t2 < 1 / 6) {
    return p2 + (q2 - p2) * (6 * t2);
  }
  if (t2 < 1 / 2) {
    return q2;
  }
  if (t2 < 2 / 3) {
    return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
  }
  return p2;
}
function hslToRgb(h2, s2, l2) {
  var r2;
  var g2;
  var b2;
  h2 = bound01(h2, 360);
  s2 = bound01(s2, 100);
  l2 = bound01(l2, 100);
  if (s2 === 0) {
    g2 = l2;
    b2 = l2;
    r2 = l2;
  } else {
    var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
    var p2 = 2 * l2 - q2;
    r2 = hue2rgb(p2, q2, h2 + 1 / 3);
    g2 = hue2rgb(p2, q2, h2);
    b2 = hue2rgb(p2, q2, h2 - 1 / 3);
  }
  return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
}
function rgbToHsv(r2, g2, b2) {
  r2 = bound01(r2, 255);
  g2 = bound01(g2, 255);
  b2 = bound01(b2, 255);
  var max3 = Math.max(r2, g2, b2);
  var min3 = Math.min(r2, g2, b2);
  var h2 = 0;
  var v2 = max3;
  var d2 = max3 - min3;
  var s2 = max3 === 0 ? 0 : d2 / max3;
  if (max3 === min3) {
    h2 = 0;
  } else {
    switch (max3) {
      case r2:
        h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        h2 = (b2 - r2) / d2 + 2;
        break;
      case b2:
        h2 = (r2 - g2) / d2 + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s: s2, v: v2 };
}
function hsvToRgb(h2, s2, v2) {
  h2 = bound01(h2, 360) * 6;
  s2 = bound01(s2, 100);
  v2 = bound01(v2, 100);
  var i2 = Math.floor(h2);
  var f2 = h2 - i2;
  var p2 = v2 * (1 - s2);
  var q2 = v2 * (1 - f2 * s2);
  var t2 = v2 * (1 - (1 - f2) * s2);
  var mod = i2 % 6;
  var r2 = [v2, q2, p2, p2, t2, v2][mod];
  var g2 = [t2, v2, v2, q2, p2, p2][mod];
  var b2 = [p2, p2, t2, v2, v2, q2][mod];
  return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
}
function rgbToHex(r2, g2, b2, allow3Char) {
  var hex2 = [
    pad2(Math.round(r2).toString(16)),
    pad2(Math.round(g2).toString(16)),
    pad2(Math.round(b2).toString(16))
  ];
  if (allow3Char && hex2[0].startsWith(hex2[0].charAt(1)) && hex2[1].startsWith(hex2[1].charAt(1)) && hex2[2].startsWith(hex2[2].charAt(1))) {
    return hex2[0].charAt(0) + hex2[1].charAt(0) + hex2[2].charAt(0);
  }
  return hex2.join("");
}
function rgbaToHex(r2, g2, b2, a2, allow4Char) {
  var hex2 = [
    pad2(Math.round(r2).toString(16)),
    pad2(Math.round(g2).toString(16)),
    pad2(Math.round(b2).toString(16)),
    pad2(convertDecimalToHex(a2))
  ];
  if (allow4Char && hex2[0].startsWith(hex2[0].charAt(1)) && hex2[1].startsWith(hex2[1].charAt(1)) && hex2[2].startsWith(hex2[2].charAt(1)) && hex2[3].startsWith(hex2[3].charAt(1))) {
    return hex2[0].charAt(0) + hex2[1].charAt(0) + hex2[2].charAt(0) + hex2[3].charAt(0);
  }
  return hex2.join("");
}
function convertDecimalToHex(d2) {
  return Math.round(parseFloat(d2) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a2 = 1;
  var s2 = null;
  var v2 = null;
  var l2 = null;
  var ok = false;
  var format2 = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format2 = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s2 = convertToPercentage(color.s);
      v2 = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s2, v2);
      ok = true;
      format2 = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s2 = convertToPercentage(color.s);
      l2 = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s2, l2);
      ok = true;
      format2 = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a2 = color.a;
    }
  }
  a2 = boundAlpha(a2);
  return {
    ok,
    format: color.format || format2,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a2
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var TinyColor = function() {
  function TinyColor2(color, opts) {
    if (color === void 0) {
      color = "";
    }
    if (opts === void 0) {
      opts = {};
    }
    var _a;
    if (color instanceof TinyColor2) {
      return color;
    }
    if (typeof color === "number") {
      color = numberInputToObject(color);
    }
    this.originalInput = color;
    var rgb = inputToRGB(color);
    this.originalInput = color;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb.a;
    this.roundA = Math.round(100 * this.a) / 100;
    this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
    this.gradientType = opts.gradientType;
    if (this.r < 1) {
      this.r = Math.round(this.r);
    }
    if (this.g < 1) {
      this.g = Math.round(this.g);
    }
    if (this.b < 1) {
      this.b = Math.round(this.b);
    }
    this.isValid = rgb.ok;
  }
  TinyColor2.prototype.isDark = function() {
    return this.getBrightness() < 128;
  };
  TinyColor2.prototype.isLight = function() {
    return !this.isDark();
  };
  TinyColor2.prototype.getBrightness = function() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  };
  TinyColor2.prototype.getLuminance = function() {
    var rgb = this.toRgb();
    var R2;
    var G2;
    var B2;
    var RsRGB = rgb.r / 255;
    var GsRGB = rgb.g / 255;
    var BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) {
      R2 = RsRGB / 12.92;
    } else {
      R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    }
    if (GsRGB <= 0.03928) {
      G2 = GsRGB / 12.92;
    } else {
      G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    }
    if (BsRGB <= 0.03928) {
      B2 = BsRGB / 12.92;
    } else {
      B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
  };
  TinyColor2.prototype.getAlpha = function() {
    return this.a;
  };
  TinyColor2.prototype.setAlpha = function(alpha) {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(100 * this.a) / 100;
    return this;
  };
  TinyColor2.prototype.toHsv = function() {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
  };
  TinyColor2.prototype.toHsvString = function() {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    var h2 = Math.round(hsv.h * 360);
    var s2 = Math.round(hsv.s * 100);
    var v2 = Math.round(hsv.v * 100);
    return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toHsl = function() {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
  };
  TinyColor2.prototype.toHslString = function() {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    var h2 = Math.round(hsl.h * 360);
    var s2 = Math.round(hsl.s * 100);
    var l2 = Math.round(hsl.l * 100);
    return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%)") : "hsla(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toHex = function(allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }
    return rgbToHex(this.r, this.g, this.b, allow3Char);
  };
  TinyColor2.prototype.toHexString = function(allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }
    return "#" + this.toHex(allow3Char);
  };
  TinyColor2.prototype.toHex8 = function(allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }
    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
  };
  TinyColor2.prototype.toHex8String = function(allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }
    return "#" + this.toHex8(allow4Char);
  };
  TinyColor2.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  };
  TinyColor2.prototype.toRgbString = function() {
    var r2 = Math.round(this.r);
    var g2 = Math.round(this.g);
    var b2 = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(r2, ", ").concat(g2, ", ").concat(b2, ")") : "rgba(".concat(r2, ", ").concat(g2, ", ").concat(b2, ", ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toPercentageRgb = function() {
    var fmt = function(x2) {
      return "".concat(Math.round(bound01(x2, 255) * 100), "%");
    };
    return {
      r: fmt(this.r),
      g: fmt(this.g),
      b: fmt(this.b),
      a: this.a
    };
  };
  TinyColor2.prototype.toPercentageRgbString = function() {
    var rnd = function(x2) {
      return Math.round(bound01(x2, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toName = function() {
    if (this.a === 0) {
      return "transparent";
    }
    if (this.a < 1) {
      return false;
    }
    var hex2 = "#" + rgbToHex(this.r, this.g, this.b, false);
    for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
      var _b = _a[_i], key = _b[0], value = _b[1];
      if (hex2 === value) {
        return key;
      }
    }
    return false;
  };
  TinyColor2.prototype.toString = function(format2) {
    var formatSet = Boolean(format2);
    format2 = format2 !== null && format2 !== void 0 ? format2 : this.format;
    var formattedString = false;
    var hasAlpha = this.a < 1 && this.a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format2.startsWith("hex") || format2 === "name");
    if (needsAlphaFormat) {
      if (format2 === "name" && this.a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format2 === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format2 === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format2 === "hex" || format2 === "hex6") {
      formattedString = this.toHexString();
    }
    if (format2 === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format2 === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format2 === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format2 === "name") {
      formattedString = this.toName();
    }
    if (format2 === "hsl") {
      formattedString = this.toHslString();
    }
    if (format2 === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  };
  TinyColor2.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  };
  TinyColor2.prototype.clone = function() {
    return new TinyColor2(this.toString());
  };
  TinyColor2.prototype.lighten = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.brighten = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var rgb = this.toRgb();
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
    return new TinyColor2(rgb);
  };
  TinyColor2.prototype.darken = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.tint = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    return this.mix("white", amount);
  };
  TinyColor2.prototype.shade = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    return this.mix("black", amount);
  };
  TinyColor2.prototype.desaturate = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.saturate = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.greyscale = function() {
    return this.desaturate(100);
  };
  TinyColor2.prototype.spin = function(amount) {
    var hsl = this.toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.mix = function(color, amount) {
    if (amount === void 0) {
      amount = 50;
    }
    var rgb1 = this.toRgb();
    var rgb2 = new TinyColor2(color).toRgb();
    var p2 = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
      g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
      b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
      a: (rgb2.a - rgb1.a) * p2 + rgb1.a
    };
    return new TinyColor2(rgba);
  };
  TinyColor2.prototype.analogous = function(results, slices) {
    if (results === void 0) {
      results = 6;
    }
    if (slices === void 0) {
      slices = 30;
    }
    var hsl = this.toHsl();
    var part = 360 / slices;
    var ret = [this];
    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(new TinyColor2(hsl));
    }
    return ret;
  };
  TinyColor2.prototype.complement = function() {
    var hsl = this.toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.monochromatic = function(results) {
    if (results === void 0) {
      results = 6;
    }
    var hsv = this.toHsv();
    var h2 = hsv.h;
    var s2 = hsv.s;
    var v2 = hsv.v;
    var res = [];
    var modification = 1 / results;
    while (results--) {
      res.push(new TinyColor2({ h: h2, s: s2, v: v2 }));
      v2 = (v2 + modification) % 1;
    }
    return res;
  };
  TinyColor2.prototype.splitcomplement = function() {
    var hsl = this.toHsl();
    var h2 = hsl.h;
    return [
      this,
      new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
    ];
  };
  TinyColor2.prototype.onBackground = function(background) {
    var fg = this.toRgb();
    var bg = new TinyColor2(background).toRgb();
    return new TinyColor2({
      r: bg.r + (fg.r - bg.r) * fg.a,
      g: bg.g + (fg.g - bg.g) * fg.a,
      b: bg.b + (fg.b - bg.b) * fg.a
    });
  };
  TinyColor2.prototype.triad = function() {
    return this.polyad(3);
  };
  TinyColor2.prototype.tetrad = function() {
    return this.polyad(4);
  };
  TinyColor2.prototype.polyad = function(n2) {
    var hsl = this.toHsl();
    var h2 = hsl.h;
    var result = [this];
    var increment = 360 / n2;
    for (var i2 = 1; i2 < n2; i2++) {
      result.push(new TinyColor2({ h: (h2 + i2 * increment) % 360, s: hsl.s, l: hsl.l }));
    }
    return result;
  };
  TinyColor2.prototype.equals = function(color) {
    return this.toRgbString() === new TinyColor2(color).toRgbString();
  };
  return TinyColor2;
}();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a2 = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a2, k, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a2;
}
var dayjs_min = { exports: {} };
(function(module2, exports2) {
  !function(t2, e2) {
    module2.exports = e2();
  }(commonjsGlobal, function() {
    var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", f2 = "month", h2 = "quarter", c2 = "year", d2 = "date", $ = "Invalid Date", l2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m2 = function(t3, e3, n3) {
      var r3 = String(t3);
      return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
    }, g2 = { s: m2, z: function(t3) {
      var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
      return (e3 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i3, 2, "0");
    }, m: function t3(e3, n3) {
      if (e3.date() < n3.date())
        return -t3(n3, e3);
      var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r3, f2), s3 = n3 - i3 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), f2);
      return +(-(r3 + (n3 - i3) / (s3 ? i3 - u3 : u3 - i3)) || 0);
    }, a: function(t3) {
      return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
    }, p: function(t3) {
      return { M: f2, y: c2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i2, ms: r2, Q: h2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t3) {
      return t3 === void 0;
    } }, v2 = "en", D2 = {};
    D2[v2] = M2;
    var p2 = function(t3) {
      return t3 instanceof _2;
    }, S2 = function t3(e3, n3, r3) {
      var i3;
      if (!e3)
        return v2;
      if (typeof e3 == "string") {
        var s3 = e3.toLowerCase();
        D2[s3] && (i3 = s3), n3 && (D2[s3] = n3, i3 = s3);
        var u3 = e3.split("-");
        if (!i3 && u3.length > 1)
          return t3(u3[0]);
      } else {
        var a3 = e3.name;
        D2[a3] = e3, i3 = a3;
      }
      return !r3 && i3 && (v2 = i3), i3 || !r3 && v2;
    }, w2 = function(t3, e3) {
      if (p2(t3))
        return t3.clone();
      var n3 = typeof e3 == "object" ? e3 : {};
      return n3.date = t3, n3.args = arguments, new _2(n3);
    }, O2 = g2;
    O2.l = S2, O2.i = p2, O2.w = function(t3, e3) {
      return w2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
    };
    var _2 = function() {
      function M3(t3) {
        this.$L = S2(t3.locale, null, true), this.parse(t3);
      }
      var m3 = M3.prototype;
      return m3.parse = function(t3) {
        this.$d = function(t4) {
          var e3 = t4.date, n3 = t4.utc;
          if (e3 === null)
            return new Date(NaN);
          if (O2.u(e3))
            return new Date();
          if (e3 instanceof Date)
            return new Date(e3);
          if (typeof e3 == "string" && !/Z$/i.test(e3)) {
            var r3 = e3.match(l2);
            if (r3) {
              var i3 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
              return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
            }
          }
          return new Date(e3);
        }(t3), this.$x = t3.x || {}, this.init();
      }, m3.init = function() {
        var t3 = this.$d;
        this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
      }, m3.$utils = function() {
        return O2;
      }, m3.isValid = function() {
        return !(this.$d.toString() === $);
      }, m3.isSame = function(t3, e3) {
        var n3 = w2(t3);
        return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
      }, m3.isAfter = function(t3, e3) {
        return w2(t3) < this.startOf(e3);
      }, m3.isBefore = function(t3, e3) {
        return this.endOf(e3) < w2(t3);
      }, m3.$g = function(t3, e3, n3) {
        return O2.u(t3) ? this[e3] : this.set(n3, t3);
      }, m3.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m3.valueOf = function() {
        return this.$d.getTime();
      }, m3.startOf = function(t3, e3) {
        var n3 = this, r3 = !!O2.u(e3) || e3, h3 = O2.p(t3), $2 = function(t4, e4) {
          var i3 = O2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
          return r3 ? i3 : i3.endOf(a2);
        }, l3 = function(t4, e4) {
          return O2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
        }, y3 = this.$W, M4 = this.$M, m4 = this.$D, g3 = "set" + (this.$u ? "UTC" : "");
        switch (h3) {
          case c2:
            return r3 ? $2(1, 0) : $2(31, 11);
          case f2:
            return r3 ? $2(1, M4) : $2(0, M4 + 1);
          case o2:
            var v3 = this.$locale().weekStart || 0, D3 = (y3 < v3 ? y3 + 7 : y3) - v3;
            return $2(r3 ? m4 - D3 : m4 + (6 - D3), M4);
          case a2:
          case d2:
            return l3(g3 + "Hours", 0);
          case u2:
            return l3(g3 + "Minutes", 1);
          case s2:
            return l3(g3 + "Seconds", 2);
          case i2:
            return l3(g3 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m3.endOf = function(t3) {
        return this.startOf(t3, false);
      }, m3.$set = function(t3, e3) {
        var n3, o3 = O2.p(t3), h3 = "set" + (this.$u ? "UTC" : ""), $2 = (n3 = {}, n3[a2] = h3 + "Date", n3[d2] = h3 + "Date", n3[f2] = h3 + "Month", n3[c2] = h3 + "FullYear", n3[u2] = h3 + "Hours", n3[s2] = h3 + "Minutes", n3[i2] = h3 + "Seconds", n3[r2] = h3 + "Milliseconds", n3)[o3], l3 = o3 === a2 ? this.$D + (e3 - this.$W) : e3;
        if (o3 === f2 || o3 === c2) {
          var y3 = this.clone().set(d2, 1);
          y3.$d[$2](l3), y3.init(), this.$d = y3.set(d2, Math.min(this.$D, y3.daysInMonth())).$d;
        } else
          $2 && this.$d[$2](l3);
        return this.init(), this;
      }, m3.set = function(t3, e3) {
        return this.clone().$set(t3, e3);
      }, m3.get = function(t3) {
        return this[O2.p(t3)]();
      }, m3.add = function(r3, h3) {
        var d3, $2 = this;
        r3 = Number(r3);
        var l3 = O2.p(h3), y3 = function(t3) {
          var e3 = w2($2);
          return O2.w(e3.date(e3.date() + Math.round(t3 * r3)), $2);
        };
        if (l3 === f2)
          return this.set(f2, this.$M + r3);
        if (l3 === c2)
          return this.set(c2, this.$y + r3);
        if (l3 === a2)
          return y3(1);
        if (l3 === o2)
          return y3(7);
        var M4 = (d3 = {}, d3[s2] = e2, d3[u2] = n2, d3[i2] = t2, d3)[l3] || 1, m4 = this.$d.getTime() + r3 * M4;
        return O2.w(m4, this);
      }, m3.subtract = function(t3, e3) {
        return this.add(-1 * t3, e3);
      }, m3.format = function(t3) {
        var e3 = this, n3 = this.$locale();
        if (!this.isValid())
          return n3.invalidDate || $;
        var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = O2.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n3.weekdays, f3 = n3.months, h3 = function(t4, n4, i4, s4) {
          return t4 && (t4[n4] || t4(e3, r3)) || i4[n4].slice(0, s4);
        }, c3 = function(t4) {
          return O2.s(s3 % 12 || 12, t4, "0");
        }, d3 = n3.meridiem || function(t4, e4, n4) {
          var r4 = t4 < 12 ? "AM" : "PM";
          return n4 ? r4.toLowerCase() : r4;
        }, l3 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a3 + 1, MM: O2.s(a3 + 1, 2, "0"), MMM: h3(n3.monthsShort, a3, f3, 3), MMMM: h3(f3, a3), D: this.$D, DD: O2.s(this.$D, 2, "0"), d: String(this.$W), dd: h3(n3.weekdaysMin, this.$W, o3, 2), ddd: h3(n3.weekdaysShort, this.$W, o3, 3), dddd: o3[this.$W], H: String(s3), HH: O2.s(s3, 2, "0"), h: c3(1), hh: c3(2), a: d3(s3, u3, true), A: d3(s3, u3, false), m: String(u3), mm: O2.s(u3, 2, "0"), s: String(this.$s), ss: O2.s(this.$s, 2, "0"), SSS: O2.s(this.$ms, 3, "0"), Z: i3 };
        return r3.replace(y2, function(t4, e4) {
          return e4 || l3[t4] || i3.replace(":", "");
        });
      }, m3.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m3.diff = function(r3, d3, $2) {
        var l3, y3 = O2.p(d3), M4 = w2(r3), m4 = (M4.utcOffset() - this.utcOffset()) * e2, g3 = this - M4, v3 = O2.m(this, M4);
        return v3 = (l3 = {}, l3[c2] = v3 / 12, l3[f2] = v3, l3[h2] = v3 / 3, l3[o2] = (g3 - m4) / 6048e5, l3[a2] = (g3 - m4) / 864e5, l3[u2] = g3 / n2, l3[s2] = g3 / e2, l3[i2] = g3 / t2, l3)[y3] || g3, $2 ? v3 : O2.a(v3);
      }, m3.daysInMonth = function() {
        return this.endOf(f2).$D;
      }, m3.$locale = function() {
        return D2[this.$L];
      }, m3.locale = function(t3, e3) {
        if (!t3)
          return this.$L;
        var n3 = this.clone(), r3 = S2(t3, e3, true);
        return r3 && (n3.$L = r3), n3;
      }, m3.clone = function() {
        return O2.w(this.$d, this);
      }, m3.toDate = function() {
        return new Date(this.valueOf());
      }, m3.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m3.toISOString = function() {
        return this.$d.toISOString();
      }, m3.toString = function() {
        return this.$d.toUTCString();
      }, M3;
    }(), T2 = _2.prototype;
    return w2.prototype = T2, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", f2], ["$y", c2], ["$D", d2]].forEach(function(t3) {
      T2[t3[1]] = function(e3) {
        return this.$g(e3, t3[0], t3[1]);
      };
    }), w2.extend = function(t3, e3) {
      return t3.$i || (t3(e3, _2, w2), t3.$i = true), w2;
    }, w2.locale = S2, w2.isDayjs = p2, w2.unix = function(t3) {
      return w2(1e3 * t3);
    }, w2.en = D2[v2], w2.Ls = D2, w2.p = {}, w2;
  });
})(dayjs_min);
var dayjs = dayjs_min.exports;
var localeData$1 = { exports: {} };
(function(module2, exports2) {
  !function(n2, e2) {
    module2.exports = e2();
  }(commonjsGlobal, function() {
    return function(n2, e2, t2) {
      var r2 = e2.prototype, o2 = function(n3) {
        return n3 && (n3.indexOf ? n3 : n3.s);
      }, u2 = function(n3, e3, t3, r3, u3) {
        var i3 = n3.name ? n3 : n3.$locale(), a3 = o2(i3[e3]), s3 = o2(i3[t3]), f2 = a3 || s3.map(function(n4) {
          return n4.slice(0, r3);
        });
        if (!u3)
          return f2;
        var d2 = i3.weekStart;
        return f2.map(function(n4, e4) {
          return f2[(e4 + (d2 || 0)) % 7];
        });
      }, i2 = function() {
        return t2.Ls[t2.locale()];
      }, a2 = function(n3, e3) {
        return n3.formats[e3] || function(n4) {
          return n4.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n5, e4, t3) {
            return e4 || t3.slice(1);
          });
        }(n3.formats[e3.toUpperCase()]);
      }, s2 = function() {
        var n3 = this;
        return { months: function(e3) {
          return e3 ? e3.format("MMMM") : u2(n3, "months");
        }, monthsShort: function(e3) {
          return e3 ? e3.format("MMM") : u2(n3, "monthsShort", "months", 3);
        }, firstDayOfWeek: function() {
          return n3.$locale().weekStart || 0;
        }, weekdays: function(e3) {
          return e3 ? e3.format("dddd") : u2(n3, "weekdays");
        }, weekdaysMin: function(e3) {
          return e3 ? e3.format("dd") : u2(n3, "weekdaysMin", "weekdays", 2);
        }, weekdaysShort: function(e3) {
          return e3 ? e3.format("ddd") : u2(n3, "weekdaysShort", "weekdays", 3);
        }, longDateFormat: function(e3) {
          return a2(n3.$locale(), e3);
        }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
      };
      r2.localeData = function() {
        return s2.bind(this)();
      }, t2.localeData = function() {
        var n3 = i2();
        return { firstDayOfWeek: function() {
          return n3.weekStart || 0;
        }, weekdays: function() {
          return t2.weekdays();
        }, weekdaysShort: function() {
          return t2.weekdaysShort();
        }, weekdaysMin: function() {
          return t2.weekdaysMin();
        }, months: function() {
          return t2.months();
        }, monthsShort: function() {
          return t2.monthsShort();
        }, longDateFormat: function(e3) {
          return a2(n3, e3);
        }, meridiem: n3.meridiem, ordinal: n3.ordinal };
      }, t2.months = function() {
        return u2(i2(), "months");
      }, t2.monthsShort = function() {
        return u2(i2(), "monthsShort", "months", 3);
      }, t2.weekdays = function(n3) {
        return u2(i2(), "weekdays", null, null, n3);
      }, t2.weekdaysShort = function(n3) {
        return u2(i2(), "weekdaysShort", "weekdays", 3, n3);
      }, t2.weekdaysMin = function(n3) {
        return u2(i2(), "weekdaysMin", "weekdays", 2, n3);
      };
    };
  });
})(localeData$1);
var localeData = localeData$1.exports;
var customParseFormat$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    var e2 = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t2 = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n2 = /\d\d/, r2 = /\d\d?/, i2 = /\d*[^\s\d-_:/()]+/, o2 = {}, s2 = function(e3) {
      return (e3 = +e3) + (e3 > 68 ? 1900 : 2e3);
    };
    var a2 = function(e3) {
      return function(t3) {
        this[e3] = +t3;
      };
    }, f2 = [/[+-]\d\d:?(\d\d)?|Z/, function(e3) {
      (this.zone || (this.zone = {})).offset = function(e4) {
        if (!e4)
          return 0;
        if (e4 === "Z")
          return 0;
        var t3 = e4.match(/([+-]|\d\d)/g), n3 = 60 * t3[1] + (+t3[2] || 0);
        return n3 === 0 ? 0 : t3[0] === "+" ? -n3 : n3;
      }(e3);
    }], h2 = function(e3) {
      var t3 = o2[e3];
      return t3 && (t3.indexOf ? t3 : t3.s.concat(t3.f));
    }, u2 = function(e3, t3) {
      var n3, r3 = o2.meridiem;
      if (r3) {
        for (var i3 = 1; i3 <= 24; i3 += 1)
          if (e3.indexOf(r3(i3, 0, t3)) > -1) {
            n3 = i3 > 12;
            break;
          }
      } else
        n3 = e3 === (t3 ? "pm" : "PM");
      return n3;
    }, d2 = { A: [i2, function(e3) {
      this.afternoon = u2(e3, false);
    }], a: [i2, function(e3) {
      this.afternoon = u2(e3, true);
    }], S: [/\d/, function(e3) {
      this.milliseconds = 100 * +e3;
    }], SS: [n2, function(e3) {
      this.milliseconds = 10 * +e3;
    }], SSS: [/\d{3}/, function(e3) {
      this.milliseconds = +e3;
    }], s: [r2, a2("seconds")], ss: [r2, a2("seconds")], m: [r2, a2("minutes")], mm: [r2, a2("minutes")], H: [r2, a2("hours")], h: [r2, a2("hours")], HH: [r2, a2("hours")], hh: [r2, a2("hours")], D: [r2, a2("day")], DD: [n2, a2("day")], Do: [i2, function(e3) {
      var t3 = o2.ordinal, n3 = e3.match(/\d+/);
      if (this.day = n3[0], t3)
        for (var r3 = 1; r3 <= 31; r3 += 1)
          t3(r3).replace(/\[|\]/g, "") === e3 && (this.day = r3);
    }], M: [r2, a2("month")], MM: [n2, a2("month")], MMM: [i2, function(e3) {
      var t3 = h2("months"), n3 = (h2("monthsShort") || t3.map(function(e4) {
        return e4.slice(0, 3);
      })).indexOf(e3) + 1;
      if (n3 < 1)
        throw new Error();
      this.month = n3 % 12 || n3;
    }], MMMM: [i2, function(e3) {
      var t3 = h2("months").indexOf(e3) + 1;
      if (t3 < 1)
        throw new Error();
      this.month = t3 % 12 || t3;
    }], Y: [/[+-]?\d+/, a2("year")], YY: [n2, function(e3) {
      this.year = s2(e3);
    }], YYYY: [/\d{4}/, a2("year")], Z: f2, ZZ: f2 };
    function c2(n3) {
      var r3, i3;
      r3 = n3, i3 = o2 && o2.formats;
      for (var s3 = (n3 = r3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t3, n4, r4) {
        var o3 = r4 && r4.toUpperCase();
        return n4 || i3[r4] || e2[r4] || i3[o3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e3, t4, n5) {
          return t4 || n5.slice(1);
        });
      })).match(t2), a3 = s3.length, f3 = 0; f3 < a3; f3 += 1) {
        var h3 = s3[f3], u3 = d2[h3], c3 = u3 && u3[0], l2 = u3 && u3[1];
        s3[f3] = l2 ? { regex: c3, parser: l2 } : h3.replace(/^\[|\]$/g, "");
      }
      return function(e3) {
        for (var t3 = {}, n4 = 0, r4 = 0; n4 < a3; n4 += 1) {
          var i4 = s3[n4];
          if (typeof i4 == "string")
            r4 += i4.length;
          else {
            var o3 = i4.regex, f4 = i4.parser, h4 = e3.slice(r4), u4 = o3.exec(h4)[0];
            f4.call(t3, u4), e3 = e3.replace(u4, "");
          }
        }
        return function(e4) {
          var t4 = e4.afternoon;
          if (t4 !== void 0) {
            var n5 = e4.hours;
            t4 ? n5 < 12 && (e4.hours += 12) : n5 === 12 && (e4.hours = 0), delete e4.afternoon;
          }
        }(t3), t3;
      };
    }
    return function(e3, t3, n3) {
      n3.p.customParseFormat = true, e3 && e3.parseTwoDigitYear && (s2 = e3.parseTwoDigitYear);
      var r3 = t3.prototype, i3 = r3.parse;
      r3.parse = function(e4) {
        var t4 = e4.date, r4 = e4.utc, s3 = e4.args;
        this.$u = r4;
        var a3 = s3[1];
        if (typeof a3 == "string") {
          var f3 = s3[2] === true, h3 = s3[3] === true, u3 = f3 || h3, d3 = s3[2];
          h3 && (d3 = s3[2]), o2 = this.$locale(), !f3 && d3 && (o2 = n3.Ls[d3]), this.$d = function(e5, t5, n4) {
            try {
              if (["x", "X"].indexOf(t5) > -1)
                return new Date((t5 === "X" ? 1e3 : 1) * e5);
              var r5 = c2(t5)(e5), i4 = r5.year, o3 = r5.month, s4 = r5.day, a4 = r5.hours, f4 = r5.minutes, h4 = r5.seconds, u4 = r5.milliseconds, d4 = r5.zone, l3 = new Date(), m3 = s4 || (i4 || o3 ? 1 : l3.getDate()), M3 = i4 || l3.getFullYear(), Y2 = 0;
              i4 && !o3 || (Y2 = o3 > 0 ? o3 - 1 : l3.getMonth());
              var p2 = a4 || 0, v2 = f4 || 0, D2 = h4 || 0, g2 = u4 || 0;
              return d4 ? new Date(Date.UTC(M3, Y2, m3, p2, v2, D2, g2 + 60 * d4.offset * 1e3)) : n4 ? new Date(Date.UTC(M3, Y2, m3, p2, v2, D2, g2)) : new Date(M3, Y2, m3, p2, v2, D2, g2);
            } catch (e6) {
              return new Date("");
            }
          }(t4, a3, r4), this.init(), d3 && d3 !== true && (this.$L = this.locale(d3).$L), u3 && t4 != this.format(a3) && (this.$d = new Date("")), o2 = {};
        } else if (a3 instanceof Array)
          for (var l2 = a3.length, m2 = 1; m2 <= l2; m2 += 1) {
            s3[1] = a3[m2 - 1];
            var M2 = n3.apply(this, s3);
            if (M2.isValid()) {
              this.$d = M2.$d, this.$L = M2.$L, this.init();
              break;
            }
            m2 === l2 && (this.$d = new Date(""));
          }
        else
          i3.call(this, e4);
      };
    };
  });
})(customParseFormat$1);
var customParseFormat = customParseFormat$1.exports;
var D = false, o, p, m$1, u, d, M, l, w, x, E, F, _, h, A, X;
function a() {
  if (!D) {
    D = true;
    var e2 = navigator.userAgent, n2 = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e2), i2 = /(Mac OS X)|(Windows)|(Linux)/.exec(e2);
    if (_ = /\b(iPhone|iP[ao]d)/.exec(e2), h = /\b(iP[ao]d)/.exec(e2), E = /Android/i.exec(e2), A = /FBAN\/\w+;/i.exec(e2), X = /Mobile/i.exec(e2), F = !!/Win64/.exec(e2), n2) {
      o = n2[1] ? parseFloat(n2[1]) : n2[5] ? parseFloat(n2[5]) : NaN, o && document && document.documentMode && (o = document.documentMode);
      var r2 = /(?:Trident\/(\d+.\d+))/.exec(e2);
      M = r2 ? parseFloat(r2[1]) + 4 : o, p = n2[2] ? parseFloat(n2[2]) : NaN, m$1 = n2[3] ? parseFloat(n2[3]) : NaN, u = n2[4] ? parseFloat(n2[4]) : NaN, u ? (n2 = /(?:Chrome\/(\d+\.\d+))/.exec(e2), d = n2 && n2[1] ? parseFloat(n2[1]) : NaN) : d = NaN;
    } else
      o = p = m$1 = d = u = NaN;
    if (i2) {
      if (i2[1]) {
        var t2 = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e2);
        l = t2 ? parseFloat(t2[1].replace("_", ".")) : true;
      } else
        l = false;
      w = !!i2[2], x = !!i2[3];
    } else
      l = w = x = false;
  }
}
var v = { ie: function() {
  return a() || o;
}, ieCompatibilityMode: function() {
  return a() || M > o;
}, ie64: function() {
  return v.ie() && F;
}, firefox: function() {
  return a() || p;
}, opera: function() {
  return a() || m$1;
}, webkit: function() {
  return a() || u;
}, safari: function() {
  return v.webkit();
}, chrome: function() {
  return a() || d;
}, windows: function() {
  return a() || w;
}, osx: function() {
  return a() || l;
}, linux: function() {
  return a() || x;
}, iphone: function() {
  return a() || _;
}, mobile: function() {
  return a() || _ || h || E || X;
}, nativeApp: function() {
  return a() || A;
}, android: function() {
  return a() || E;
}, ipad: function() {
  return a() || h;
} }, b = v;
var s = !!(typeof window < "u" && window.document && window.document.createElement), Y = { canUseDOM: s, canUseWorkers: typeof Worker < "u", canUseEventListeners: s && !!(window.addEventListener || window.attachEvent), canUseViewport: s && !!window.screen, isInWorker: !s }, N = Y;
var O;
N.canUseDOM && (O = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== true);
function L(e2, n2) {
  if (!N.canUseDOM || n2 && !("addEventListener" in document))
    return false;
  var i2 = "on" + e2, r2 = i2 in document;
  if (!r2) {
    var t2 = document.createElement("div");
    t2.setAttribute(i2, "return;"), r2 = typeof t2[i2] == "function";
  }
  return !r2 && O && e2 === "wheel" && (r2 = document.implementation.hasFeature("Events.wheel", "3.0")), r2;
}
var I = L;
var P = 10, T = 40, U = 800;
function S(e2) {
  var n2 = 0, i2 = 0, r2 = 0, t2 = 0;
  return "detail" in e2 && (i2 = e2.detail), "wheelDelta" in e2 && (i2 = -e2.wheelDelta / 120), "wheelDeltaY" in e2 && (i2 = -e2.wheelDeltaY / 120), "wheelDeltaX" in e2 && (n2 = -e2.wheelDeltaX / 120), "axis" in e2 && e2.axis === e2.HORIZONTAL_AXIS && (n2 = i2, i2 = 0), r2 = n2 * P, t2 = i2 * P, "deltaY" in e2 && (t2 = e2.deltaY), "deltaX" in e2 && (r2 = e2.deltaX), (r2 || t2) && e2.deltaMode && (e2.deltaMode == 1 ? (r2 *= T, t2 *= T) : (r2 *= U, t2 *= U)), r2 && !n2 && (n2 = r2 < 1 ? -1 : 1), t2 && !i2 && (i2 = t2 < 1 ? -1 : 1), { spinX: n2, spinY: i2, pixelX: r2, pixelY: t2 };
}
S.getEventType = function() {
  return b.firefox() ? "DOMMouseScroll" : I("wheel") ? "wheel" : "mousewheel";
};
var W = S;
/**
* Checks if an event is supported in the current execution environment.
*
* NOTE: This will not work correctly for non-generic events such as `change`,
* `reset`, `load`, `error`, and `select`.
*
* Borrows from Modernizr.
*
* @param {string} eventNameSuffix Event name, e.g. "click".
* @param {?boolean} capture Check if the capture phase is supported.
* @return {boolean} True if the event is supported.
* @internal
* @license Modernizr 3.0.0pre (Custom Build) | MIT
*/
var advancedFormat$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2, t2, r2) {
      var n2 = t2.prototype, s2 = n2.format;
      r2.en.ordinal = function(e3) {
        var t3 = ["th", "st", "nd", "rd"], r3 = e3 % 100;
        return "[" + e3 + (t3[(r3 - 20) % 10] || t3[r3] || t3[0]) + "]";
      }, n2.format = function(e3) {
        var t3 = this, r3 = this.$locale();
        if (!this.isValid())
          return s2.bind(this)(e3);
        var n3 = this.$utils(), a2 = (e3 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e4) {
          switch (e4) {
            case "Q":
              return Math.ceil((t3.$M + 1) / 3);
            case "Do":
              return r3.ordinal(t3.$D);
            case "gggg":
              return t3.weekYear();
            case "GGGG":
              return t3.isoWeekYear();
            case "wo":
              return r3.ordinal(t3.week(), "W");
            case "w":
            case "ww":
              return n3.s(t3.week(), e4 === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return n3.s(t3.isoWeek(), e4 === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return n3.s(String(t3.$H === 0 ? 24 : t3.$H), e4 === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(t3.$d.getTime() / 1e3);
            case "x":
              return t3.$d.getTime();
            case "z":
              return "[" + t3.offsetName() + "]";
            case "zzz":
              return "[" + t3.offsetName("long") + "]";
            default:
              return e4;
          }
        });
        return s2.bind(this)(a2);
      };
    };
  });
})(advancedFormat$1);
var advancedFormat = advancedFormat$1.exports;
var weekOfYear$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    var e2 = "week", t2 = "year";
    return function(i2, n2, r2) {
      var f2 = n2.prototype;
      f2.week = function(i3) {
        if (i3 === void 0 && (i3 = null), i3 !== null)
          return this.add(7 * (i3 - this.week()), "day");
        var n3 = this.$locale().yearStart || 1;
        if (this.month() === 11 && this.date() > 25) {
          var f3 = r2(this).startOf(t2).add(1, t2).date(n3), s2 = r2(this).endOf(e2);
          if (f3.isBefore(s2))
            return 1;
        }
        var a2 = r2(this).startOf(t2).date(n3).startOf(e2).subtract(1, "millisecond"), o2 = this.diff(a2, e2, true);
        return o2 < 0 ? r2(this).startOf("week").week() : Math.ceil(o2);
      }, f2.weeks = function(e3) {
        return e3 === void 0 && (e3 = null), this.week(e3);
      };
    };
  });
})(weekOfYear$1);
var weekOfYear = weekOfYear$1.exports;
var weekYear$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2, t2) {
      t2.prototype.weekYear = function() {
        var e3 = this.month(), t3 = this.week(), n2 = this.year();
        return t3 === 1 && e3 === 11 ? n2 + 1 : e3 === 0 && t3 >= 52 ? n2 - 1 : n2;
      };
    };
  });
})(weekYear$1);
var weekYear = weekYear$1.exports;
var dayOfYear$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2, t2, n2) {
      t2.prototype.dayOfYear = function(e3) {
        var t3 = Math.round((n2(this).startOf("day") - n2(this).startOf("year")) / 864e5) + 1;
        return e3 == null ? t3 : this.add(e3 - t3, "day");
      };
    };
  });
})(dayOfYear$1);
var dayOfYear = dayOfYear$1.exports;
var isSameOrAfter$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2, t2) {
      t2.prototype.isSameOrAfter = function(e3, t3) {
        return this.isSame(e3, t3) || this.isAfter(e3, t3);
      };
    };
  });
})(isSameOrAfter$1);
var isSameOrAfter = isSameOrAfter$1.exports;
var isSameOrBefore$1 = { exports: {} };
(function(module2, exports2) {
  !function(e2, i2) {
    module2.exports = i2();
  }(commonjsGlobal, function() {
    return function(e2, i2) {
      i2.prototype.isSameOrBefore = function(e3, i3) {
        return this.isSame(e3, i3) || this.isBefore(e3, i3);
      };
    };
  });
})(isSameOrBefore$1);
var isSameOrBefore = isSameOrBefore$1.exports;
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source2 = arguments[i2];
      for (var key in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key)) {
          target[key] = source2[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a2 = [null];
      a2.push.apply(a2, args2);
      var Constructor = Function.bind.apply(Parent2, a2);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn2) {
  return Function.toString.call(fn2).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning = function warning2() {
};
if (typeof process !== "undefined" && process.env && false) {
  warning = function warning3(type4, errors) {
    if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
      if (errors.every(function(e2) {
        return typeof e2 === "string";
      })) {
        console.warn(type4, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i2 = 0;
  var len2 = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x2) {
      if (x2 === "%%") {
        return "%";
      }
      if (i2 >= len2) {
        return x2;
      }
      switch (x2) {
        case "%s":
          return String(args[i2++]);
        case "%d":
          return Number(args[i2++]);
        case "%j":
          try {
            return JSON.stringify(args[i2++]);
          } catch (_2) {
            return "[Circular]";
          }
          break;
        default:
          return x2;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value, type4) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a2) {
    func(a2, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this;
    _this = _Error.call(this, "Async Validation Error") || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }
  return AsyncValidationError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source2) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source2);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function(e2) {
      return e2;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source2);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source2);
    }
    objArrKeys.forEach(function(key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function(e2) {
    return e2;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
  var v2 = value;
  for (var i2 = 0; i2 < path.length; i2++) {
    if (v2 == void 0) {
      return v2;
    }
    v2 = v2[path[i2]];
  }
  return v2;
}
function complementError(rule, source2) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source2, rule.fullFields);
    } else {
      fieldValue = source2[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source2) {
  if (source2) {
    for (var s2 in source2) {
      if (source2.hasOwnProperty(s2)) {
        var value = source2[s2];
        if (typeof value === "object" && typeof target[s2] === "object") {
          target[s2] = _extends({}, target[s2], value);
        } else {
          target[s2] = value;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value, source2, errors, options, type4) {
  if (rule.required && (!source2.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value, source2, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var pattern$2 = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i"),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e2) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  object: function object(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email(value) {
    return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === "string" && value.length <= 2048 && !!value.match(pattern$2.url);
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern$2.hex);
  }
};
var type$1 = function type(rule, value, source2, errors, options) {
  if (rule.required && value === void 0) {
    required$1(rule, value, source2, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value, source2, errors, options) {
  var len2 = typeof rule.len === "number";
  var min3 = typeof rule.min === "number";
  var max3 = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === "number";
  var str = typeof value === "string";
  var arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len2) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min3 && !max3 && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max3 && !min3 && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min3 && max3 && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value, source2, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value, source2, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source2, errors, options);
      rules.range(rule, value, source2, errors, options);
      rules.pattern(rule, value, source2, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source2, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source2, errors, options);
      rules.range(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var regexp$1 = function regexp2(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source2, errors, options);
      rules.range(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source2, errors, options);
      rules.range(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if ((value === void 0 || value === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options, "array");
    if (value !== void 0 && value !== null) {
      rules.type(rule, value, source2, errors, options);
      rules.range(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (value !== void 0) {
      rules[ENUM](rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
    if (!isEmptyValue(value, "date")) {
      var dateObject;
      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }
      rules.type(rule, dateObject, source2, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source2, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value, callback, source2, options) {
  var errors = [];
  var type4 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source2, errors, options, type4);
  callback(errors);
};
var type2 = function type3(rule, value, callback, source2, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source2, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value, callback, source2, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source2, errors, options);
  }
  callback(errors);
};
var validators$2 = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp$1,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone2() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = /* @__PURE__ */ function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item = rules2[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate(source_, o2, oc) {
    var _this2 = this;
    if (o2 === void 0) {
      o2 = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source2 = source_;
    var options = o2;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source2);
      }
      return Promise.resolve(source2);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add2(e2) {
        if (Array.isArray(e2)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e2);
        } else {
          errors.push(e2);
        }
      }
      for (var i2 = 0; i2 < results.length; i2++) {
        add2(results[i2]);
      }
      if (!errors.length) {
        callback(null, source2);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys2 = options.keys || Object.keys(this.rules);
    keys2.forEach(function(z) {
      var arr = _this2.rules[z];
      var value = source2[z];
      arr.forEach(function(r2) {
        var rule = r2;
        if (typeof rule.transform === "function") {
          if (source2 === source_) {
            source2 = _extends({}, source2);
          }
          value = source2[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source: source2,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data2, doIt) {
      var rule = data2.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data2.value);
      rule.field = data2.field;
      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }
      function cb(e2) {
        if (e2 === void 0) {
          e2 = [];
        }
        var errorList = Array.isArray(e2) ? e2 : [e2];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source2));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data2.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source2));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data2.value).map(function(key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }
          fieldsSchema = _extends({}, fieldsSchema, data2.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data2.rule.options) {
            data2.rule.options.messages = options.messages;
            data2.rule.options.error = options.error;
          }
          schema.validate(data2.value, data2.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data2.value, cb, data2.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data2.value, cb, data2.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error);
          setTimeout(function() {
            throw error;
          }, 0);
          cb(error.message);
        }
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e2) {
          return cb(e2);
        });
      }
    }, function(results) {
      complete(results);
    }, source2);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators$2.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys2 = Object.keys(rule);
    var messageIndex = keys2.indexOf("message");
    if (messageIndex !== -1) {
      keys2.splice(messageIndex, 1);
    }
    if (keys2.length === 1 && keys2[0] === "required") {
      return validators$2.required;
    }
    return validators$2[this.getType(rule)] || void 0;
  };
  return Schema2;
}();
Schema.register = function register(type4, validator2) {
  if (typeof validator2 !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators$2[type4] = validator2;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators$2;
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i2 = 0; i2 < newInputs.length; i2++) {
    if (!isEqual(newInputs[i2], lastInputs[i2])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var cache = null;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (cache && cache.lastThis === this && isEqual2(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }
    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var matchHtmlRegExp = /["'&<>]/;
var escapeHtml_1 = escapeHtml;
function escapeHtml(string3) {
  var str = "" + string3;
  var match = matchHtmlRegExp.exec(str);
  if (!match) {
    return str;
  }
  var escape;
  var html = "";
  var index = 0;
  var lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escape;
  }
  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
var axios$2 = { exports: {} };
var bind$3 = function bind(fn2, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i2 = 0; i2 < args.length; i2++) {
      args[i2] = arguments[i2];
    }
    return fn2.apply(thisArg, args);
  };
};
var bind$2 = bind$3;
var toString = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type4) {
  type4 = type4.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type4;
  };
}
function isArray$1(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString$1(val) {
  return typeof val === "string";
}
function isNumber$1(val) {
  return typeof val === "number";
}
function isObject$1(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction$1(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject$1(val) && isFunction$1(val.pipe);
}
function isFormData(thing) {
  var pattern4 = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern4 || isFunction$1(thing.toString) && thing.toString() === pattern4);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim$1(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn2) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray$1(obj)) {
    for (var i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      fn2.call(null, obj[i2], i2, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn2.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge$1() {
  var result = {};
  function assignValue2(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge$1(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge$1({}, val);
    } else if (isArray$1(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
    forEach(arguments[i2], assignValue2);
  }
  return result;
}
function extend$1(a2, b2, thisArg) {
  forEach(b2, function assignValue2(val, key) {
    if (thisArg && typeof val === "function") {
      a2[key] = bind$2(val, thisArg);
    } else {
      a2[key] = val;
    }
  });
  return a2;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits$1(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter2) {
  var props;
  var i2;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i2 = thing.length;
  if (isUndefined(i2))
    return null;
  var arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
}
var isTypedArray$1 = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$h = {
  isArray: isArray$1,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isObject: isObject$1,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge: merge$1,
  extend: extend$1,
  trim: trim$1,
  stripBOM,
  inherits: inherits$1,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray: isTypedArray$1,
  isFileList
};
var utils$g = utils$h;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL(url2, params, paramsSerializer) {
  if (!params) {
    return url2;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$g.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$g.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$g.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$g.forEach(val, function parseValue(v2) {
        if (utils$g.isDate(v2)) {
          v2 = v2.toISOString();
        } else if (utils$g.isObject(v2)) {
          v2 = JSON.stringify(v2);
        }
        parts.push(encode(key) + "=" + encode(v2));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
};
var utils$f = utils$h;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn2) {
  utils$f.forEach(this.handlers, function forEachHandler(h2) {
    if (h2 !== null) {
      fn2(h2);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$e = utils$h;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$e.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$d = utils$h;
function AxiosError$5(message, code, config, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$d.inherits(AxiosError$5, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$5.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code) {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$5, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$5.from = function(error, code, config, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$d.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$5.call(axiosError, error.message, code, config, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$5;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$c = utils$h;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$c.isDate(value)) {
      return value.toISOString();
    }
    if (utils$c.isArrayBuffer(value) || utils$c.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$c.isPlainObject(data2) || utils$c.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$c.forEach(data2, function each2(value, key) {
        if (utils$c.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$c.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$c.endsWith(key, "[]") && (arr = utils$c.toArray(value))) {
            arr.forEach(function(el) {
              !utils$c.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var AxiosError$4 = AxiosError_1;
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$4("Request failed with status code " + response.status, [AxiosError$4.ERR_BAD_REQUEST, AxiosError$4.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
};
var utils$b = utils$h;
var cookies$1 = utils$b.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils$b.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$b.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$b.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$a = utils$h;
var ignoreDuplicateOf = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i2;
  if (!headers) {
    return parsed;
  }
  utils$a.forEach(headers.split("\n"), function parser(line) {
    i2 = line.indexOf(":");
    key = utils$a.trim(line.substr(0, i2)).toLowerCase();
    val = utils$a.trim(line.substr(i2 + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$9 = utils$h;
var isURLSameOrigin$1 = utils$9.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url2) {
    var href = url2;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$9.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
var AxiosError$3 = AxiosError_1;
var utils$8 = utils$h;
function CanceledError$3(message) {
  AxiosError$3.call(this, message == null ? "canceled" : message, AxiosError$3.ERR_CANCELED);
  this.name = "CanceledError";
}
utils$8.inherits(CanceledError$3, AxiosError$3, {
  __CANCEL__: true
});
var CanceledError_1 = CanceledError$3;
var parseProtocol$1 = function parseProtocol(url2) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
};
var utils$7 = utils$h;
var settle2 = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath$1 = buildFullPath$2;
var parseHeaders2 = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var transitionalDefaults$1 = transitional;
var AxiosError$2 = AxiosError_1;
var CanceledError$2 = CanceledError_1;
var parseProtocol2 = parseProtocol$1;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils$7.isFormData(requestData) && utils$7.isStandardBrowserEnv()) {
      delete requestHeaders["Content-Type"];
    }
    var request2 = new XMLHttpRequest();
    if (config.auth) {
      var username = config.auth.username || "";
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath$1(config.baseURL, config.url);
    request2.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
    request2.timeout = config.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      var response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config,
        request: request2
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config, request2));
      request2 = null;
    };
    request2.onerror = function handleError() {
      reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config, request2, request2));
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      var transitional3 = config.transitional || transitionalDefaults$1;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError$2(timeoutErrorMessage, transitional3.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED, config, request2));
      request2 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request2) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request2.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config.withCredentials)) {
      request2.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request2.addEventListener("progress", config.onDownloadProgress);
    }
    if (typeof config.onUploadProgress === "function" && request2.upload) {
      request2.upload.addEventListener("progress", config.onUploadProgress);
    }
    if (config.cancelToken || config.signal) {
      onCanceled = function(cancel) {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new CanceledError$2() : cancel);
        request2.abort();
        request2 = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }
    var protocol = parseProtocol2(fullPath);
    if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
      reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config));
      return;
    }
    request2.send(requestData);
  });
};
var _null = null;
var utils$6 = utils$h;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$4 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$6.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$6.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$4.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError$1.from(e2, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _null
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method4) {
  defaults$4.headers[method4] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method4) {
  defaults$4.headers[method4] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$4;
var utils$5 = utils$h;
var defaults$3 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$3;
  utils$5.forEach(fns, function transform(fn2) {
    data2 = fn2.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$h;
var transformData2 = transformData$1;
var isCancel2 = isCancel$1;
var defaults$2 = defaults_1;
var CanceledError$1 = CanceledError_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(config, config.data, config.headers, config.transformRequest);
  config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method4) {
    delete config.headers[method4];
  });
  var adapter = config.adapter || defaults$2.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$h;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data = {
  "version": "0.27.2"
};
var VERSION = data.version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type4, i2) {
  validators$1[type4] = function validator2(thing) {
    return typeof thing === type4 || "a" + (i2 < 1 ? "n " : " ") + type4;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys2 = Object.keys(options);
  var i2 = keys2.length;
  while (i2-- > 0) {
    var opt = keys2[i2];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$h;
var buildURL2 = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  var fullPath = buildFullPath2(config.baseURL, config.url);
  return buildURL2(fullPath, config.params, config.paramsSerializer);
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method4) {
  Axios$1.prototype[method4] = function(url2, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method4,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method4) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method: method4,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method4] = generateHTTPMethod();
  Axios$1.prototype[method4 + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CanceledError = CanceledError_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  this.promise.then(function(cancel) {
    if (!token._listeners)
      return;
    var i2;
    var l2 = token._listeners.length;
    for (i2 = 0; i2 < l2; i2++) {
      token._listeners[i2](cancel);
    }
    token._listeners = null;
  });
  this.promise.then = function(onfulfilled) {
    var _resolve;
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c2) {
    cancel = c2;
  });
  return {
    token,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread = function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var utils$1 = utils$h;
var isAxiosError = function isAxiosError2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};
var utils = utils$h;
var bind$1 = bind$3;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults$1 = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind$1(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios$1 = createInstance(defaults$1);
axios$1.Axios = Axios;
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
var axios = axios$2.exports;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3)
      if (Object.prototype.hasOwnProperty.call(b3, p2))
        d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var Browser = function() {
  function Browser2() {
    this.firefox = false;
    this.ie = false;
    this.edge = false;
    this.newEdge = false;
    this.weChat = false;
  }
  return Browser2;
}();
var Env = function() {
  function Env2() {
    this.browser = new Browser();
    this.node = false;
    this.wxa = false;
    this.worker = false;
    this.svgSupported = false;
    this.touchEventsSupported = false;
    this.pointerEventsSupported = false;
    this.domSupported = false;
    this.transformSupported = false;
    this.transform3dSupported = false;
    this.hasGlobalWindow = typeof window !== "undefined";
  }
  return Env2;
}();
var env = new Env();
if (typeof wx === "object" && typeof wx.getSystemInfoSync === "function") {
  env.wxa = true;
  env.touchEventsSupported = true;
} else if (typeof document === "undefined" && typeof self !== "undefined") {
  env.worker = true;
} else if (typeof navigator === "undefined") {
  env.node = true;
  env.svgSupported = true;
} else {
  detect(navigator.userAgent, env);
}
function detect(ua, env2) {
  var browser = env2.browser;
  var firefox = ua.match(/Firefox\/([\d.]+)/);
  var ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/.+?rv:(([\d.]+))/);
  var edge = ua.match(/Edge?\/([\d.]+)/);
  var weChat = /micromessenger/i.test(ua);
  if (firefox) {
    browser.firefox = true;
    browser.version = firefox[1];
  }
  if (ie) {
    browser.ie = true;
    browser.version = ie[1];
  }
  if (edge) {
    browser.edge = true;
    browser.version = edge[1];
    browser.newEdge = +edge[1].split(".")[0] > 18;
  }
  if (weChat) {
    browser.weChat = true;
  }
  env2.svgSupported = typeof SVGRect !== "undefined";
  env2.touchEventsSupported = "ontouchstart" in window && !browser.ie && !browser.edge;
  env2.pointerEventsSupported = "onpointerdown" in window && (browser.edge || browser.ie && +browser.version >= 11);
  env2.domSupported = typeof document !== "undefined";
  var style = document.documentElement.style;
  env2.transform3dSupported = (browser.ie && "transition" in style || browser.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in style) && !("OTransition" in style);
  env2.transformSupported = env2.transform3dSupported || browser.ie && +browser.version >= 9;
}
var env$1 = env;
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_FONT_FAMILY = "sans-serif";
var DEFAULT_FONT = DEFAULT_FONT_SIZE + "px " + DEFAULT_FONT_FAMILY;
var OFFSET = 20;
var SCALE = 100;
var defaultWidthMapStr = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function getTextWidthMap(mapStr) {
  var map2 = {};
  if (typeof JSON === "undefined") {
    return map2;
  }
  for (var i2 = 0; i2 < mapStr.length; i2++) {
    var char = String.fromCharCode(i2 + 32);
    var size = (mapStr.charCodeAt(i2) - OFFSET) / SCALE;
    map2[char] = size;
  }
  return map2;
}
var DEFAULT_TEXT_WIDTH_MAP = getTextWidthMap(defaultWidthMapStr);
var platformApi = {
  createCanvas: function() {
    return typeof document !== "undefined" && document.createElement("canvas");
  },
  measureText: function() {
    var _ctx;
    var _cachedFont;
    return function(text, font) {
      if (!_ctx) {
        var canvas = platformApi.createCanvas();
        _ctx = canvas && canvas.getContext("2d");
      }
      if (_ctx) {
        if (_cachedFont !== font) {
          _cachedFont = _ctx.font = font || DEFAULT_FONT;
        }
        return _ctx.measureText(text);
      } else {
        text = text || "";
        font = font || DEFAULT_FONT;
        var res = /^([0-9]*?)px$/.exec(font);
        var fontSize = +(res && res[1]) || DEFAULT_FONT_SIZE;
        var width = 0;
        if (font.indexOf("mono") >= 0) {
          width = fontSize * text.length;
        } else {
          for (var i2 = 0; i2 < text.length; i2++) {
            var preCalcWidth = DEFAULT_TEXT_WIDTH_MAP[text[i2]];
            width += preCalcWidth == null ? fontSize : preCalcWidth * fontSize;
          }
        }
        return { width };
      }
    };
  }(),
  loadImage: function(src, onload, onerror) {
    var image = new Image();
    image.onload = onload;
    image.onerror = onerror;
    image.src = src;
    return image;
  }
};
var BUILTIN_OBJECT = reduce([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(obj, val) {
  obj["[object " + val + "]"] = true;
  return obj;
}, {});
var TYPED_ARRAY = reduce([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(obj, val) {
  obj["[object " + val + "Array]"] = true;
  return obj;
}, {});
var objToString = Object.prototype.toString;
var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var ctorFunction = function() {
}.constructor;
var protoFunction = ctorFunction ? ctorFunction.prototype : null;
var protoKey = "__proto__";
var idStart = 2311;
function guid() {
  return idStart++;
}
function logError() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  if (typeof console !== "undefined") {
    console.error.apply(console, args);
  }
}
function clone$2(source2) {
  if (source2 == null || typeof source2 !== "object") {
    return source2;
  }
  var result = source2;
  var typeStr = objToString.call(source2);
  if (typeStr === "[object Array]") {
    if (!isPrimitive(source2)) {
      result = [];
      for (var i2 = 0, len2 = source2.length; i2 < len2; i2++) {
        result[i2] = clone$2(source2[i2]);
      }
    }
  } else if (TYPED_ARRAY[typeStr]) {
    if (!isPrimitive(source2)) {
      var Ctor = source2.constructor;
      if (Ctor.from) {
        result = Ctor.from(source2);
      } else {
        result = new Ctor(source2.length);
        for (var i2 = 0, len2 = source2.length; i2 < len2; i2++) {
          result[i2] = source2[i2];
        }
      }
    }
  } else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source2) && !isDom(source2)) {
    result = {};
    for (var key in source2) {
      if (source2.hasOwnProperty(key) && key !== protoKey) {
        result[key] = clone$2(source2[key]);
      }
    }
  }
  return result;
}
function merge(target, source2, overwrite) {
  if (!isObject(source2) || !isObject(target)) {
    return overwrite ? clone$2(source2) : target;
  }
  for (var key in source2) {
    if (source2.hasOwnProperty(key) && key !== protoKey) {
      var targetProp = target[key];
      var sourceProp = source2[key];
      if (isObject(sourceProp) && isObject(targetProp) && !isArray(sourceProp) && !isArray(targetProp) && !isDom(sourceProp) && !isDom(targetProp) && !isBuiltInObject(sourceProp) && !isBuiltInObject(targetProp) && !isPrimitive(sourceProp) && !isPrimitive(targetProp)) {
        merge(targetProp, sourceProp, overwrite);
      } else if (overwrite || !(key in target)) {
        target[key] = clone$2(source2[key]);
      }
    }
  }
  return target;
}
function extend(target, source2) {
  if (Object.assign) {
    Object.assign(target, source2);
  } else {
    for (var key in source2) {
      if (source2.hasOwnProperty(key) && key !== protoKey) {
        target[key] = source2[key];
      }
    }
  }
  return target;
}
function defaults(target, source2, overlay) {
  var keysArr = keys(source2);
  for (var i2 = 0; i2 < keysArr.length; i2++) {
    var key = keysArr[i2];
    if (overlay ? source2[key] != null : target[key] == null) {
      target[key] = source2[key];
    }
  }
  return target;
}
platformApi.createCanvas;
function indexOf(array4, value) {
  if (array4) {
    if (array4.indexOf) {
      return array4.indexOf(value);
    }
    for (var i2 = 0, len2 = array4.length; i2 < len2; i2++) {
      if (array4[i2] === value) {
        return i2;
      }
    }
  }
  return -1;
}
function inherits(clazz, baseClazz) {
  var clazzPrototype = clazz.prototype;
  function F2() {
  }
  F2.prototype = baseClazz.prototype;
  clazz.prototype = new F2();
  for (var prop in clazzPrototype) {
    if (clazzPrototype.hasOwnProperty(prop)) {
      clazz.prototype[prop] = clazzPrototype[prop];
    }
  }
  clazz.prototype.constructor = clazz;
  clazz.superClass = baseClazz;
}
function mixin(target, source2, override) {
  target = "prototype" in target ? target.prototype : target;
  source2 = "prototype" in source2 ? source2.prototype : source2;
  if (Object.getOwnPropertyNames) {
    var keyList = Object.getOwnPropertyNames(source2);
    for (var i2 = 0; i2 < keyList.length; i2++) {
      var key = keyList[i2];
      if (key !== "constructor") {
        if (override ? source2[key] != null : target[key] == null) {
          target[key] = source2[key];
        }
      }
    }
  } else {
    defaults(target, source2, override);
  }
}
function isArrayLike(data2) {
  if (!data2) {
    return false;
  }
  if (typeof data2 === "string") {
    return false;
  }
  return typeof data2.length === "number";
}
function each(arr, cb, context) {
  if (!(arr && cb)) {
    return;
  }
  if (arr.forEach && arr.forEach === nativeForEach) {
    arr.forEach(cb, context);
  } else if (arr.length === +arr.length) {
    for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
      cb.call(context, arr[i2], i2, arr);
    }
  } else {
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        cb.call(context, arr[key], key, arr);
      }
    }
  }
}
function map(arr, cb, context) {
  if (!arr) {
    return [];
  }
  if (!cb) {
    return slice(arr);
  }
  if (arr.map && arr.map === nativeMap) {
    return arr.map(cb, context);
  } else {
    var result = [];
    for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
      result.push(cb.call(context, arr[i2], i2, arr));
    }
    return result;
  }
}
function reduce(arr, cb, memo, context) {
  if (!(arr && cb)) {
    return;
  }
  for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
    memo = cb.call(context, memo, arr[i2], i2, arr);
  }
  return memo;
}
function filter(arr, cb, context) {
  if (!arr) {
    return [];
  }
  if (!cb) {
    return slice(arr);
  }
  if (arr.filter && arr.filter === nativeFilter) {
    return arr.filter(cb, context);
  } else {
    var result = [];
    for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
      if (cb.call(context, arr[i2], i2, arr)) {
        result.push(arr[i2]);
      }
    }
    return result;
  }
}
function find(arr, cb, context) {
  if (!(arr && cb)) {
    return;
  }
  for (var i2 = 0, len2 = arr.length; i2 < len2; i2++) {
    if (cb.call(context, arr[i2], i2, arr)) {
      return arr[i2];
    }
  }
}
function keys(obj) {
  if (!obj) {
    return [];
  }
  if (Object.keys) {
    return Object.keys(obj);
  }
  var keyList = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyList.push(key);
    }
  }
  return keyList;
}
function bindPolyfill(func, context) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  return function() {
    return func.apply(context, args.concat(nativeSlice.call(arguments)));
  };
}
var bind2 = protoFunction && isFunction(protoFunction.bind) ? protoFunction.call.bind(protoFunction.bind) : bindPolyfill;
function curry(func) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return function() {
    return func.apply(this, args.concat(nativeSlice.call(arguments)));
  };
}
function isArray(value) {
  if (Array.isArray) {
    return Array.isArray(value);
  }
  return objToString.call(value) === "[object Array]";
}
function isFunction(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
function isStringSafe(value) {
  return objToString.call(value) === "[object String]";
}
function isNumber(value) {
  return typeof value === "number";
}
function isObject(value) {
  var type4 = typeof value;
  return type4 === "function" || !!value && type4 === "object";
}
function isBuiltInObject(value) {
  return !!BUILTIN_OBJECT[objToString.call(value)];
}
function isTypedArray(value) {
  return !!TYPED_ARRAY[objToString.call(value)];
}
function isDom(value) {
  return typeof value === "object" && typeof value.nodeType === "number" && typeof value.ownerDocument === "object";
}
function isGradientObject(value) {
  return value.colorStops != null;
}
function isImagePatternObject(value) {
  return value.image != null;
}
function eqNaN(value) {
  return value !== value;
}
function retrieve() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  for (var i2 = 0, len2 = args.length; i2 < len2; i2++) {
    if (args[i2] != null) {
      return args[i2];
    }
  }
}
function retrieve2(value0, value1) {
  return value0 != null ? value0 : value1;
}
function retrieve3(value0, value1, value2) {
  return value0 != null ? value0 : value1 != null ? value1 : value2;
}
function slice(arr) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return nativeSlice.apply(arr, args);
}
function normalizeCssArray(val) {
  if (typeof val === "number") {
    return [val, val, val, val];
  }
  var len2 = val.length;
  if (len2 === 2) {
    return [val[0], val[1], val[0], val[1]];
  } else if (len2 === 3) {
    return [val[0], val[1], val[2], val[1]];
  }
  return val;
}
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
function trim(str) {
  if (str == null) {
    return null;
  } else if (typeof str.trim === "function") {
    return str.trim();
  } else {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }
}
var primitiveKey = "__ec_primitive__";
function setAsPrimitive(obj) {
  obj[primitiveKey] = true;
}
function isPrimitive(obj) {
  return obj[primitiveKey];
}
var HashMap = function() {
  function HashMap2(obj) {
    this.data = {};
    var isArr = isArray(obj);
    this.data = {};
    var thisMap = this;
    obj instanceof HashMap2 ? obj.each(visit) : obj && each(obj, visit);
    function visit(value, key) {
      isArr ? thisMap.set(value, key) : thisMap.set(key, value);
    }
  }
  HashMap2.prototype.get = function(key) {
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  };
  HashMap2.prototype.set = function(key, value) {
    return this.data[key] = value;
  };
  HashMap2.prototype.each = function(cb, context) {
    for (var key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        cb.call(context, this.data[key], key);
      }
    }
  };
  HashMap2.prototype.keys = function() {
    return keys(this.data);
  };
  HashMap2.prototype.removeKey = function(key) {
    delete this.data[key];
  };
  return HashMap2;
}();
function createHashMap(obj) {
  return new HashMap(obj);
}
function concatArray(a2, b2) {
  var newArray = new a2.constructor(a2.length + b2.length);
  for (var i2 = 0; i2 < a2.length; i2++) {
    newArray[i2] = a2[i2];
  }
  var offset = a2.length;
  for (var i2 = 0; i2 < b2.length; i2++) {
    newArray[i2 + offset] = b2[i2];
  }
  return newArray;
}
function createObject(proto, properties) {
  var obj;
  if (Object.create) {
    obj = Object.create(proto);
  } else {
    var StyleCtor = function() {
    };
    StyleCtor.prototype = proto;
    obj = new StyleCtor();
  }
  if (properties) {
    extend(obj, properties);
  }
  return obj;
}
function disableUserSelect(dom) {
  var domStyle = dom.style;
  domStyle.webkitUserSelect = "none";
  domStyle.userSelect = "none";
  domStyle.webkitTapHighlightColor = "rgba(0,0,0,0)";
  domStyle["-webkit-touch-callout"] = "none";
}
function hasOwn(own, prop) {
  return own.hasOwnProperty(prop);
}
function noop() {
}
var RADIAN_TO_DEGREE = 180 / Math.PI;
function create$1(x2, y2) {
  if (x2 == null) {
    x2 = 0;
  }
  if (y2 == null) {
    y2 = 0;
  }
  return [x2, y2];
}
function clone$1(v2) {
  return [v2[0], v2[1]];
}
function add(out2, v1, v2) {
  out2[0] = v1[0] + v2[0];
  out2[1] = v1[1] + v2[1];
  return out2;
}
function sub(out2, v1, v2) {
  out2[0] = v1[0] - v2[0];
  out2[1] = v1[1] - v2[1];
  return out2;
}
function len(v2) {
  return Math.sqrt(lenSquare(v2));
}
function lenSquare(v2) {
  return v2[0] * v2[0] + v2[1] * v2[1];
}
function scale$1(out2, v2, s2) {
  out2[0] = v2[0] * s2;
  out2[1] = v2[1] * s2;
  return out2;
}
function normalize(out2, v2) {
  var d2 = len(v2);
  if (d2 === 0) {
    out2[0] = 0;
    out2[1] = 0;
  } else {
    out2[0] = v2[0] / d2;
    out2[1] = v2[1] / d2;
  }
  return out2;
}
function distance(v1, v2) {
  return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
}
var dist$1 = distance;
function distanceSquare(v1, v2) {
  return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}
var distSquare = distanceSquare;
function lerp$1(out2, v1, v2, t2) {
  out2[0] = v1[0] + t2 * (v2[0] - v1[0]);
  out2[1] = v1[1] + t2 * (v2[1] - v1[1]);
  return out2;
}
function applyTransform(out2, v2, m2) {
  var x2 = v2[0];
  var y2 = v2[1];
  out2[0] = m2[0] * x2 + m2[2] * y2 + m2[4];
  out2[1] = m2[1] * x2 + m2[3] * y2 + m2[5];
  return out2;
}
function min$1(out2, v1, v2) {
  out2[0] = Math.min(v1[0], v2[0]);
  out2[1] = Math.min(v1[1], v2[1]);
  return out2;
}
function max$1(out2, v1, v2) {
  out2[0] = Math.max(v1[0], v2[0]);
  out2[1] = Math.max(v1[1], v2[1]);
  return out2;
}
var Param = function() {
  function Param2(target, e2) {
    this.target = target;
    this.topTarget = e2 && e2.topTarget;
  }
  return Param2;
}();
var Draggable = function() {
  function Draggable2(handler) {
    this.handler = handler;
    handler.on("mousedown", this._dragStart, this);
    handler.on("mousemove", this._drag, this);
    handler.on("mouseup", this._dragEnd, this);
  }
  Draggable2.prototype._dragStart = function(e2) {
    var draggingTarget = e2.target;
    while (draggingTarget && !draggingTarget.draggable) {
      draggingTarget = draggingTarget.parent || draggingTarget.__hostTarget;
    }
    if (draggingTarget) {
      this._draggingTarget = draggingTarget;
      draggingTarget.dragging = true;
      this._x = e2.offsetX;
      this._y = e2.offsetY;
      this.handler.dispatchToElement(new Param(draggingTarget, e2), "dragstart", e2.event);
    }
  };
  Draggable2.prototype._drag = function(e2) {
    var draggingTarget = this._draggingTarget;
    if (draggingTarget) {
      var x2 = e2.offsetX;
      var y2 = e2.offsetY;
      var dx = x2 - this._x;
      var dy = y2 - this._y;
      this._x = x2;
      this._y = y2;
      draggingTarget.drift(dx, dy, e2);
      this.handler.dispatchToElement(new Param(draggingTarget, e2), "drag", e2.event);
      var dropTarget = this.handler.findHover(x2, y2, draggingTarget).target;
      var lastDropTarget = this._dropTarget;
      this._dropTarget = dropTarget;
      if (draggingTarget !== dropTarget) {
        if (lastDropTarget && dropTarget !== lastDropTarget) {
          this.handler.dispatchToElement(new Param(lastDropTarget, e2), "dragleave", e2.event);
        }
        if (dropTarget && dropTarget !== lastDropTarget) {
          this.handler.dispatchToElement(new Param(dropTarget, e2), "dragenter", e2.event);
        }
      }
    }
  };
  Draggable2.prototype._dragEnd = function(e2) {
    var draggingTarget = this._draggingTarget;
    if (draggingTarget) {
      draggingTarget.dragging = false;
    }
    this.handler.dispatchToElement(new Param(draggingTarget, e2), "dragend", e2.event);
    if (this._dropTarget) {
      this.handler.dispatchToElement(new Param(this._dropTarget, e2), "drop", e2.event);
    }
    this._draggingTarget = null;
    this._dropTarget = null;
  };
  return Draggable2;
}();
var Draggable$1 = Draggable;
var Eventful = function() {
  function Eventful2(eventProcessors) {
    if (eventProcessors) {
      this._$eventProcessor = eventProcessors;
    }
  }
  Eventful2.prototype.on = function(event, query, handler, context) {
    if (!this._$handlers) {
      this._$handlers = {};
    }
    var _h = this._$handlers;
    if (typeof query === "function") {
      context = handler;
      handler = query;
      query = null;
    }
    if (!handler || !event) {
      return this;
    }
    var eventProcessor = this._$eventProcessor;
    if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
      query = eventProcessor.normalizeQuery(query);
    }
    if (!_h[event]) {
      _h[event] = [];
    }
    for (var i2 = 0; i2 < _h[event].length; i2++) {
      if (_h[event][i2].h === handler) {
        return this;
      }
    }
    var wrap = {
      h: handler,
      query,
      ctx: context || this,
      callAtLast: handler.zrEventfulCallAtLast
    };
    var lastIndex = _h[event].length - 1;
    var lastWrap = _h[event][lastIndex];
    lastWrap && lastWrap.callAtLast ? _h[event].splice(lastIndex, 0, wrap) : _h[event].push(wrap);
    return this;
  };
  Eventful2.prototype.isSilent = function(eventName) {
    var _h = this._$handlers;
    return !_h || !_h[eventName] || !_h[eventName].length;
  };
  Eventful2.prototype.off = function(eventType, handler) {
    var _h = this._$handlers;
    if (!_h) {
      return this;
    }
    if (!eventType) {
      this._$handlers = {};
      return this;
    }
    if (handler) {
      if (_h[eventType]) {
        var newList = [];
        for (var i2 = 0, l2 = _h[eventType].length; i2 < l2; i2++) {
          if (_h[eventType][i2].h !== handler) {
            newList.push(_h[eventType][i2]);
          }
        }
        _h[eventType] = newList;
      }
      if (_h[eventType] && _h[eventType].length === 0) {
        delete _h[eventType];
      }
    } else {
      delete _h[eventType];
    }
    return this;
  };
  Eventful2.prototype.trigger = function(eventType) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (!this._$handlers) {
      return this;
    }
    var _h = this._$handlers[eventType];
    var eventProcessor = this._$eventProcessor;
    if (_h) {
      var argLen = args.length;
      var len2 = _h.length;
      for (var i2 = 0; i2 < len2; i2++) {
        var hItem = _h[i2];
        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(eventType, hItem.query)) {
          continue;
        }
        switch (argLen) {
          case 0:
            hItem.h.call(hItem.ctx);
            break;
          case 1:
            hItem.h.call(hItem.ctx, args[0]);
            break;
          case 2:
            hItem.h.call(hItem.ctx, args[0], args[1]);
            break;
          default:
            hItem.h.apply(hItem.ctx, args);
            break;
        }
      }
    }
    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(eventType);
    return this;
  };
  Eventful2.prototype.triggerWithContext = function(type4) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (!this._$handlers) {
      return this;
    }
    var _h = this._$handlers[type4];
    var eventProcessor = this._$eventProcessor;
    if (_h) {
      var argLen = args.length;
      var ctx = args[argLen - 1];
      var len2 = _h.length;
      for (var i2 = 0; i2 < len2; i2++) {
        var hItem = _h[i2];
        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type4, hItem.query)) {
          continue;
        }
        switch (argLen) {
          case 0:
            hItem.h.call(ctx);
            break;
          case 1:
            hItem.h.call(ctx, args[0]);
            break;
          case 2:
            hItem.h.call(ctx, args[0], args[1]);
            break;
          default:
            hItem.h.apply(ctx, args.slice(1, argLen - 1));
            break;
        }
      }
    }
    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type4);
    return this;
  };
  return Eventful2;
}();
var Eventful$1 = Eventful;
var LN2 = Math.log(2);
function determinant(rows, rank, rowStart, rowMask, colMask, detCache) {
  var cacheKey = rowMask + "-" + colMask;
  var fullRank = rows.length;
  if (detCache.hasOwnProperty(cacheKey)) {
    return detCache[cacheKey];
  }
  if (rank === 1) {
    var colStart = Math.round(Math.log((1 << fullRank) - 1 & ~colMask) / LN2);
    return rows[rowStart][colStart];
  }
  var subRowMask = rowMask | 1 << rowStart;
  var subRowStart = rowStart + 1;
  while (rowMask & 1 << subRowStart) {
    subRowStart++;
  }
  var sum = 0;
  for (var j = 0, colLocalIdx = 0; j < fullRank; j++) {
    var colTag = 1 << j;
    if (!(colTag & colMask)) {
      sum += (colLocalIdx % 2 ? -1 : 1) * rows[rowStart][j] * determinant(rows, rank - 1, subRowStart, subRowMask, colMask | colTag, detCache);
      colLocalIdx++;
    }
  }
  detCache[cacheKey] = sum;
  return sum;
}
function buildTransformer(src, dest) {
  var mA = [
    [src[0], src[1], 1, 0, 0, 0, -dest[0] * src[0], -dest[0] * src[1]],
    [0, 0, 0, src[0], src[1], 1, -dest[1] * src[0], -dest[1] * src[1]],
    [src[2], src[3], 1, 0, 0, 0, -dest[2] * src[2], -dest[2] * src[3]],
    [0, 0, 0, src[2], src[3], 1, -dest[3] * src[2], -dest[3] * src[3]],
    [src[4], src[5], 1, 0, 0, 0, -dest[4] * src[4], -dest[4] * src[5]],
    [0, 0, 0, src[4], src[5], 1, -dest[5] * src[4], -dest[5] * src[5]],
    [src[6], src[7], 1, 0, 0, 0, -dest[6] * src[6], -dest[6] * src[7]],
    [0, 0, 0, src[6], src[7], 1, -dest[7] * src[6], -dest[7] * src[7]]
  ];
  var detCache = {};
  var det = determinant(mA, 8, 0, 0, 0, detCache);
  if (det === 0) {
    return;
  }
  var vh = [];
  for (var i2 = 0; i2 < 8; i2++) {
    for (var j = 0; j < 8; j++) {
      vh[j] == null && (vh[j] = 0);
      vh[j] += ((i2 + j) % 2 ? -1 : 1) * determinant(mA, 7, i2 === 0 ? 1 : 0, 1 << i2, 1 << j, detCache) / det * dest[i2];
    }
  }
  return function(out2, srcPointX, srcPointY) {
    var pk = srcPointX * vh[6] + srcPointY * vh[7] + 1;
    out2[0] = (srcPointX * vh[0] + srcPointY * vh[1] + vh[2]) / pk;
    out2[1] = (srcPointX * vh[3] + srcPointY * vh[4] + vh[5]) / pk;
  };
}
var EVENT_SAVED_PROP = "___zrEVENTSAVED";
var _calcOut$1 = [];
function transformLocalCoord(out2, elFrom, elTarget, inX, inY) {
  return transformCoordWithViewport(_calcOut$1, elFrom, inX, inY, true) && transformCoordWithViewport(out2, elTarget, _calcOut$1[0], _calcOut$1[1]);
}
function transformCoordWithViewport(out2, el, inX, inY, inverse) {
  if (el.getBoundingClientRect && env$1.domSupported && !isCanvasEl(el)) {
    var saved = el[EVENT_SAVED_PROP] || (el[EVENT_SAVED_PROP] = {});
    var markers = prepareCoordMarkers(el, saved);
    var transformer = preparePointerTransformer(markers, saved, inverse);
    if (transformer) {
      transformer(out2, inX, inY);
      return true;
    }
  }
  return false;
}
function prepareCoordMarkers(el, saved) {
  var markers = saved.markers;
  if (markers) {
    return markers;
  }
  markers = saved.markers = [];
  var propLR = ["left", "right"];
  var propTB = ["top", "bottom"];
  for (var i2 = 0; i2 < 4; i2++) {
    var marker = document.createElement("div");
    var stl = marker.style;
    var idxLR = i2 % 2;
    var idxTB = (i2 >> 1) % 2;
    stl.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      propLR[idxLR] + ":0",
      propTB[idxTB] + ":0",
      propLR[1 - idxLR] + ":auto",
      propTB[1 - idxTB] + ":auto",
      ""
    ].join("!important;");
    el.appendChild(marker);
    markers.push(marker);
  }
  return markers;
}
function preparePointerTransformer(markers, saved, inverse) {
  var transformerName = inverse ? "invTrans" : "trans";
  var transformer = saved[transformerName];
  var oldSrcCoords = saved.srcCoords;
  var srcCoords = [];
  var destCoords = [];
  var oldCoordTheSame = true;
  for (var i2 = 0; i2 < 4; i2++) {
    var rect = markers[i2].getBoundingClientRect();
    var ii = 2 * i2;
    var x2 = rect.left;
    var y2 = rect.top;
    srcCoords.push(x2, y2);
    oldCoordTheSame = oldCoordTheSame && oldSrcCoords && x2 === oldSrcCoords[ii] && y2 === oldSrcCoords[ii + 1];
    destCoords.push(markers[i2].offsetLeft, markers[i2].offsetTop);
  }
  return oldCoordTheSame && transformer ? transformer : (saved.srcCoords = srcCoords, saved[transformerName] = inverse ? buildTransformer(destCoords, srcCoords) : buildTransformer(srcCoords, destCoords));
}
function isCanvasEl(el) {
  return el.nodeName.toUpperCase() === "CANVAS";
}
var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
var _calcOut = [];
var firefoxNotSupportOffsetXY = env$1.browser.firefox && +env$1.browser.version.split(".")[0] < 39;
function clientToLocal(el, e2, out2, calculate) {
  out2 = out2 || {};
  if (calculate) {
    calculateZrXY(el, e2, out2);
  } else if (firefoxNotSupportOffsetXY && e2.layerX != null && e2.layerX !== e2.offsetX) {
    out2.zrX = e2.layerX;
    out2.zrY = e2.layerY;
  } else if (e2.offsetX != null) {
    out2.zrX = e2.offsetX;
    out2.zrY = e2.offsetY;
  } else {
    calculateZrXY(el, e2, out2);
  }
  return out2;
}
function calculateZrXY(el, e2, out2) {
  if (env$1.domSupported && el.getBoundingClientRect) {
    var ex = e2.clientX;
    var ey = e2.clientY;
    if (isCanvasEl(el)) {
      var box = el.getBoundingClientRect();
      out2.zrX = ex - box.left;
      out2.zrY = ey - box.top;
      return;
    } else {
      if (transformCoordWithViewport(_calcOut, el, ex, ey)) {
        out2.zrX = _calcOut[0];
        out2.zrY = _calcOut[1];
        return;
      }
    }
  }
  out2.zrX = out2.zrY = 0;
}
function getNativeEvent(e2) {
  return e2 || window.event;
}
function normalizeEvent(el, e2, calculate) {
  e2 = getNativeEvent(e2);
  if (e2.zrX != null) {
    return e2;
  }
  var eventType = e2.type;
  var isTouch = eventType && eventType.indexOf("touch") >= 0;
  if (!isTouch) {
    clientToLocal(el, e2, e2, calculate);
    var wheelDelta = getWheelDeltaMayPolyfill(e2);
    e2.zrDelta = wheelDelta ? wheelDelta / 120 : -(e2.detail || 0) / 3;
  } else {
    var touch = eventType !== "touchend" ? e2.targetTouches[0] : e2.changedTouches[0];
    touch && clientToLocal(el, touch, e2, calculate);
  }
  var button = e2.button;
  if (e2.which == null && button !== void 0 && MOUSE_EVENT_REG.test(e2.type)) {
    e2.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
  }
  return e2;
}
function getWheelDeltaMayPolyfill(e2) {
  var rawWheelDelta = e2.wheelDelta;
  if (rawWheelDelta) {
    return rawWheelDelta;
  }
  var deltaX = e2.deltaX;
  var deltaY = e2.deltaY;
  if (deltaX == null || deltaY == null) {
    return rawWheelDelta;
  }
  var delta = deltaY !== 0 ? Math.abs(deltaY) : Math.abs(deltaX);
  var sign = deltaY > 0 ? -1 : deltaY < 0 ? 1 : deltaX > 0 ? -1 : 1;
  return 3 * delta * sign;
}
function addEventListener(el, name, handler, opt) {
  el.addEventListener(name, handler, opt);
}
function removeEventListener(el, name, handler, opt) {
  el.removeEventListener(name, handler, opt);
}
var stop = function(e2) {
  e2.preventDefault();
  e2.stopPropagation();
  e2.cancelBubble = true;
};
function isMiddleOrRightButtonOnMouseUpDown(e2) {
  return e2.which === 2 || e2.which === 3;
}
var GestureMgr = function() {
  function GestureMgr2() {
    this._track = [];
  }
  GestureMgr2.prototype.recognize = function(event, target, root2) {
    this._doTrack(event, target, root2);
    return this._recognize(event);
  };
  GestureMgr2.prototype.clear = function() {
    this._track.length = 0;
    return this;
  };
  GestureMgr2.prototype._doTrack = function(event, target, root2) {
    var touches = event.touches;
    if (!touches) {
      return;
    }
    var trackItem = {
      points: [],
      touches: [],
      target,
      event
    };
    for (var i2 = 0, len2 = touches.length; i2 < len2; i2++) {
      var touch = touches[i2];
      var pos = clientToLocal(root2, touch, {});
      trackItem.points.push([pos.zrX, pos.zrY]);
      trackItem.touches.push(touch);
    }
    this._track.push(trackItem);
  };
  GestureMgr2.prototype._recognize = function(event) {
    for (var eventName in recognizers) {
      if (recognizers.hasOwnProperty(eventName)) {
        var gestureInfo = recognizers[eventName](this._track, event);
        if (gestureInfo) {
          return gestureInfo;
        }
      }
    }
  };
  return GestureMgr2;
}();
function dist(pointPair) {
  var dx = pointPair[1][0] - pointPair[0][0];
  var dy = pointPair[1][1] - pointPair[0][1];
  return Math.sqrt(dx * dx + dy * dy);
}
function center(pointPair) {
  return [
    (pointPair[0][0] + pointPair[1][0]) / 2,
    (pointPair[0][1] + pointPair[1][1]) / 2
  ];
}
var recognizers = {
  pinch: function(tracks, event) {
    var trackLen = tracks.length;
    if (!trackLen) {
      return;
    }
    var pinchEnd = (tracks[trackLen - 1] || {}).points;
    var pinchPre = (tracks[trackLen - 2] || {}).points || pinchEnd;
    if (pinchPre && pinchPre.length > 1 && pinchEnd && pinchEnd.length > 1) {
      var pinchScale = dist(pinchEnd) / dist(pinchPre);
      !isFinite(pinchScale) && (pinchScale = 1);
      event.pinchScale = pinchScale;
      var pinchCenter = center(pinchEnd);
      event.pinchX = pinchCenter[0];
      event.pinchY = pinchCenter[1];
      return {
        type: "pinch",
        target: tracks[0].target,
        event
      };
    }
  }
};
var SILENT = "silent";
function makeEventPacket(eveType, targetInfo, event) {
  return {
    type: eveType,
    event,
    target: targetInfo.target,
    topTarget: targetInfo.topTarget,
    cancelBubble: false,
    offsetX: event.zrX,
    offsetY: event.zrY,
    gestureEvent: event.gestureEvent,
    pinchX: event.pinchX,
    pinchY: event.pinchY,
    pinchScale: event.pinchScale,
    wheelDelta: event.zrDelta,
    zrByTouch: event.zrByTouch,
    which: event.which,
    stop: stopEvent
  };
}
function stopEvent() {
  stop(this.event);
}
var EmptyProxy = function(_super) {
  __extends(EmptyProxy2, _super);
  function EmptyProxy2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.handler = null;
    return _this;
  }
  EmptyProxy2.prototype.dispose = function() {
  };
  EmptyProxy2.prototype.setCursor = function() {
  };
  return EmptyProxy2;
}(Eventful$1);
var HoveredResult = function() {
  function HoveredResult2(x2, y2) {
    this.x = x2;
    this.y = y2;
  }
  return HoveredResult2;
}();
var handlerNames = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
];
var Handler = function(_super) {
  __extends(Handler2, _super);
  function Handler2(storage, painter, proxy, painterRoot) {
    var _this = _super.call(this) || this;
    _this._hovered = new HoveredResult(0, 0);
    _this.storage = storage;
    _this.painter = painter;
    _this.painterRoot = painterRoot;
    proxy = proxy || new EmptyProxy();
    _this.proxy = null;
    _this.setHandlerProxy(proxy);
    _this._draggingMgr = new Draggable$1(_this);
    return _this;
  }
  Handler2.prototype.setHandlerProxy = function(proxy) {
    if (this.proxy) {
      this.proxy.dispose();
    }
    if (proxy) {
      each(handlerNames, function(name) {
        proxy.on && proxy.on(name, this[name], this);
      }, this);
      proxy.handler = this;
    }
    this.proxy = proxy;
  };
  Handler2.prototype.mousemove = function(event) {
    var x2 = event.zrX;
    var y2 = event.zrY;
    var isOutside = isOutsideBoundary(this, x2, y2);
    var lastHovered = this._hovered;
    var lastHoveredTarget = lastHovered.target;
    if (lastHoveredTarget && !lastHoveredTarget.__zr) {
      lastHovered = this.findHover(lastHovered.x, lastHovered.y);
      lastHoveredTarget = lastHovered.target;
    }
    var hovered = this._hovered = isOutside ? new HoveredResult(x2, y2) : this.findHover(x2, y2);
    var hoveredTarget = hovered.target;
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : "default");
    if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(lastHovered, "mouseout", event);
    }
    this.dispatchToElement(hovered, "mousemove", event);
    if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(hovered, "mouseover", event);
    }
  };
  Handler2.prototype.mouseout = function(event) {
    var eventControl = event.zrEventControl;
    if (eventControl !== "only_globalout") {
      this.dispatchToElement(this._hovered, "mouseout", event);
    }
    if (eventControl !== "no_globalout") {
      this.trigger("globalout", { type: "globalout", event });
    }
  };
  Handler2.prototype.resize = function() {
    this._hovered = new HoveredResult(0, 0);
  };
  Handler2.prototype.dispatch = function(eventName, eventArgs) {
    var handler = this[eventName];
    handler && handler.call(this, eventArgs);
  };
  Handler2.prototype.dispose = function() {
    this.proxy.dispose();
    this.storage = null;
    this.proxy = null;
    this.painter = null;
  };
  Handler2.prototype.setCursorStyle = function(cursorStyle) {
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(cursorStyle);
  };
  Handler2.prototype.dispatchToElement = function(targetInfo, eventName, event) {
    targetInfo = targetInfo || {};
    var el = targetInfo.target;
    if (el && el.silent) {
      return;
    }
    var eventKey = "on" + eventName;
    var eventPacket = makeEventPacket(eventName, targetInfo, event);
    while (el) {
      el[eventKey] && (eventPacket.cancelBubble = !!el[eventKey].call(el, eventPacket));
      el.trigger(eventName, eventPacket);
      el = el.__hostTarget ? el.__hostTarget : el.parent;
      if (eventPacket.cancelBubble) {
        break;
      }
    }
    if (!eventPacket.cancelBubble) {
      this.trigger(eventName, eventPacket);
      if (this.painter && this.painter.eachOtherLayer) {
        this.painter.eachOtherLayer(function(layer) {
          if (typeof layer[eventKey] === "function") {
            layer[eventKey].call(layer, eventPacket);
          }
          if (layer.trigger) {
            layer.trigger(eventName, eventPacket);
          }
        });
      }
    }
  };
  Handler2.prototype.findHover = function(x2, y2, exclude) {
    var list = this.storage.getDisplayList();
    var out2 = new HoveredResult(x2, y2);
    for (var i2 = list.length - 1; i2 >= 0; i2--) {
      var hoverCheckResult = void 0;
      if (list[i2] !== exclude && !list[i2].ignore && (hoverCheckResult = isHover(list[i2], x2, y2))) {
        !out2.topTarget && (out2.topTarget = list[i2]);
        if (hoverCheckResult !== SILENT) {
          out2.target = list[i2];
          break;
        }
      }
    }
    return out2;
  };
  Handler2.prototype.processGesture = function(event, stage) {
    if (!this._gestureMgr) {
      this._gestureMgr = new GestureMgr();
    }
    var gestureMgr = this._gestureMgr;
    stage === "start" && gestureMgr.clear();
    var gestureInfo = gestureMgr.recognize(event, this.findHover(event.zrX, event.zrY, null).target, this.proxy.dom);
    stage === "end" && gestureMgr.clear();
    if (gestureInfo) {
      var type4 = gestureInfo.type;
      event.gestureEvent = type4;
      var res = new HoveredResult();
      res.target = gestureInfo.target;
      this.dispatchToElement(res, type4, gestureInfo.event);
    }
  };
  return Handler2;
}(Eventful$1);
each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(name) {
  Handler.prototype[name] = function(event) {
    var x2 = event.zrX;
    var y2 = event.zrY;
    var isOutside = isOutsideBoundary(this, x2, y2);
    var hovered;
    var hoveredTarget;
    if (name !== "mouseup" || !isOutside) {
      hovered = this.findHover(x2, y2);
      hoveredTarget = hovered.target;
    }
    if (name === "mousedown") {
      this._downEl = hoveredTarget;
      this._downPoint = [event.zrX, event.zrY];
      this._upEl = hoveredTarget;
    } else if (name === "mouseup") {
      this._upEl = hoveredTarget;
    } else if (name === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || dist$1(this._downPoint, [event.zrX, event.zrY]) > 4) {
        return;
      }
      this._downPoint = null;
    }
    this.dispatchToElement(hovered, name, event);
  };
});
function isHover(displayable, x2, y2) {
  if (displayable[displayable.rectHover ? "rectContain" : "contain"](x2, y2)) {
    var el = displayable;
    var isSilent = void 0;
    var ignoreClip = false;
    while (el) {
      if (el.ignoreClip) {
        ignoreClip = true;
      }
      if (!ignoreClip) {
        var clipPath = el.getClipPath();
        if (clipPath && !clipPath.contain(x2, y2)) {
          return false;
        }
        if (el.silent) {
          isSilent = true;
        }
      }
      var hostEl = el.__hostTarget;
      el = hostEl ? hostEl : el.parent;
    }
    return isSilent ? SILENT : true;
  }
  return false;
}
function isOutsideBoundary(handlerInstance, x2, y2) {
  var painter = handlerInstance.painter;
  return x2 < 0 || x2 > painter.getWidth() || y2 < 0 || y2 > painter.getHeight();
}
var Handler$1 = Handler;
var DEFAULT_MIN_MERGE = 32;
var DEFAULT_MIN_GALLOPING = 7;
function minRunLength(n2) {
  var r2 = 0;
  while (n2 >= DEFAULT_MIN_MERGE) {
    r2 |= n2 & 1;
    n2 >>= 1;
  }
  return n2 + r2;
}
function makeAscendingRun(array4, lo, hi, compare) {
  var runHi = lo + 1;
  if (runHi === hi) {
    return 1;
  }
  if (compare(array4[runHi++], array4[lo]) < 0) {
    while (runHi < hi && compare(array4[runHi], array4[runHi - 1]) < 0) {
      runHi++;
    }
    reverseRun(array4, lo, runHi);
  } else {
    while (runHi < hi && compare(array4[runHi], array4[runHi - 1]) >= 0) {
      runHi++;
    }
  }
  return runHi - lo;
}
function reverseRun(array4, lo, hi) {
  hi--;
  while (lo < hi) {
    var t2 = array4[lo];
    array4[lo++] = array4[hi];
    array4[hi--] = t2;
  }
}
function binaryInsertionSort(array4, lo, hi, start2, compare) {
  if (start2 === lo) {
    start2++;
  }
  for (; start2 < hi; start2++) {
    var pivot = array4[start2];
    var left = lo;
    var right = start2;
    var mid;
    while (left < right) {
      mid = left + right >>> 1;
      if (compare(pivot, array4[mid]) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    var n2 = start2 - left;
    switch (n2) {
      case 3:
        array4[left + 3] = array4[left + 2];
      case 2:
        array4[left + 2] = array4[left + 1];
      case 1:
        array4[left + 1] = array4[left];
        break;
      default:
        while (n2 > 0) {
          array4[left + n2] = array4[left + n2 - 1];
          n2--;
        }
    }
    array4[left] = pivot;
  }
}
function gallopLeft(value, array4, start2, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;
  if (compare(value, array4[start2 + hint]) > 0) {
    maxOffset = length - hint;
    while (offset < maxOffset && compare(value, array4[start2 + hint + offset]) > 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    lastOffset += hint;
    offset += hint;
  } else {
    maxOffset = hint + 1;
    while (offset < maxOffset && compare(value, array4[start2 + hint - offset]) <= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  }
  lastOffset++;
  while (lastOffset < offset) {
    var m2 = lastOffset + (offset - lastOffset >>> 1);
    if (compare(value, array4[start2 + m2]) > 0) {
      lastOffset = m2 + 1;
    } else {
      offset = m2;
    }
  }
  return offset;
}
function gallopRight(value, array4, start2, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;
  if (compare(value, array4[start2 + hint]) < 0) {
    maxOffset = hint + 1;
    while (offset < maxOffset && compare(value, array4[start2 + hint - offset]) < 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  } else {
    maxOffset = length - hint;
    while (offset < maxOffset && compare(value, array4[start2 + hint + offset]) >= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    lastOffset += hint;
    offset += hint;
  }
  lastOffset++;
  while (lastOffset < offset) {
    var m2 = lastOffset + (offset - lastOffset >>> 1);
    if (compare(value, array4[start2 + m2]) < 0) {
      offset = m2;
    } else {
      lastOffset = m2 + 1;
    }
  }
  return offset;
}
function TimSort(array4, compare) {
  var minGallop = DEFAULT_MIN_GALLOPING;
  var runStart;
  var runLength;
  var stackSize = 0;
  var tmp = [];
  runStart = [];
  runLength = [];
  function pushRun(_runStart, _runLength) {
    runStart[stackSize] = _runStart;
    runLength[stackSize] = _runLength;
    stackSize += 1;
  }
  function mergeRuns() {
    while (stackSize > 1) {
      var n2 = stackSize - 2;
      if (n2 >= 1 && runLength[n2 - 1] <= runLength[n2] + runLength[n2 + 1] || n2 >= 2 && runLength[n2 - 2] <= runLength[n2] + runLength[n2 - 1]) {
        if (runLength[n2 - 1] < runLength[n2 + 1]) {
          n2--;
        }
      } else if (runLength[n2] > runLength[n2 + 1]) {
        break;
      }
      mergeAt(n2);
    }
  }
  function forceMergeRuns() {
    while (stackSize > 1) {
      var n2 = stackSize - 2;
      if (n2 > 0 && runLength[n2 - 1] < runLength[n2 + 1]) {
        n2--;
      }
      mergeAt(n2);
    }
  }
  function mergeAt(i2) {
    var start1 = runStart[i2];
    var length1 = runLength[i2];
    var start2 = runStart[i2 + 1];
    var length2 = runLength[i2 + 1];
    runLength[i2] = length1 + length2;
    if (i2 === stackSize - 3) {
      runStart[i2 + 1] = runStart[i2 + 2];
      runLength[i2 + 1] = runLength[i2 + 2];
    }
    stackSize--;
    var k = gallopRight(array4[start2], array4, start1, length1, 0, compare);
    start1 += k;
    length1 -= k;
    if (length1 === 0) {
      return;
    }
    length2 = gallopLeft(array4[start1 + length1 - 1], array4, start2, length2, length2 - 1, compare);
    if (length2 === 0) {
      return;
    }
    if (length1 <= length2) {
      mergeLow(start1, length1, start2, length2);
    } else {
      mergeHigh(start1, length1, start2, length2);
    }
  }
  function mergeLow(start1, length1, start2, length2) {
    var i2 = 0;
    for (i2 = 0; i2 < length1; i2++) {
      tmp[i2] = array4[start1 + i2];
    }
    var cursor1 = 0;
    var cursor2 = start2;
    var dest = start1;
    array4[dest++] = array4[cursor2++];
    if (--length2 === 0) {
      for (i2 = 0; i2 < length1; i2++) {
        array4[dest + i2] = tmp[cursor1 + i2];
      }
      return;
    }
    if (length1 === 1) {
      for (i2 = 0; i2 < length2; i2++) {
        array4[dest + i2] = array4[cursor2 + i2];
      }
      array4[dest + length2] = tmp[cursor1];
      return;
    }
    var _minGallop = minGallop;
    var count1;
    var count2;
    var exit;
    while (1) {
      count1 = 0;
      count2 = 0;
      exit = false;
      do {
        if (compare(array4[cursor2], tmp[cursor1]) < 0) {
          array4[dest++] = array4[cursor2++];
          count2++;
          count1 = 0;
          if (--length2 === 0) {
            exit = true;
            break;
          }
        } else {
          array4[dest++] = tmp[cursor1++];
          count1++;
          count2 = 0;
          if (--length1 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < _minGallop);
      if (exit) {
        break;
      }
      do {
        count1 = gallopRight(array4[cursor2], tmp, cursor1, length1, 0, compare);
        if (count1 !== 0) {
          for (i2 = 0; i2 < count1; i2++) {
            array4[dest + i2] = tmp[cursor1 + i2];
          }
          dest += count1;
          cursor1 += count1;
          length1 -= count1;
          if (length1 <= 1) {
            exit = true;
            break;
          }
        }
        array4[dest++] = array4[cursor2++];
        if (--length2 === 0) {
          exit = true;
          break;
        }
        count2 = gallopLeft(tmp[cursor1], array4, cursor2, length2, 0, compare);
        if (count2 !== 0) {
          for (i2 = 0; i2 < count2; i2++) {
            array4[dest + i2] = array4[cursor2 + i2];
          }
          dest += count2;
          cursor2 += count2;
          length2 -= count2;
          if (length2 === 0) {
            exit = true;
            break;
          }
        }
        array4[dest++] = tmp[cursor1++];
        if (--length1 === 1) {
          exit = true;
          break;
        }
        _minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
      if (exit) {
        break;
      }
      if (_minGallop < 0) {
        _minGallop = 0;
      }
      _minGallop += 2;
    }
    minGallop = _minGallop;
    minGallop < 1 && (minGallop = 1);
    if (length1 === 1) {
      for (i2 = 0; i2 < length2; i2++) {
        array4[dest + i2] = array4[cursor2 + i2];
      }
      array4[dest + length2] = tmp[cursor1];
    } else if (length1 === 0) {
      throw new Error();
    } else {
      for (i2 = 0; i2 < length1; i2++) {
        array4[dest + i2] = tmp[cursor1 + i2];
      }
    }
  }
  function mergeHigh(start1, length1, start2, length2) {
    var i2 = 0;
    for (i2 = 0; i2 < length2; i2++) {
      tmp[i2] = array4[start2 + i2];
    }
    var cursor1 = start1 + length1 - 1;
    var cursor2 = length2 - 1;
    var dest = start2 + length2 - 1;
    var customCursor = 0;
    var customDest = 0;
    array4[dest--] = array4[cursor1--];
    if (--length1 === 0) {
      customCursor = dest - (length2 - 1);
      for (i2 = 0; i2 < length2; i2++) {
        array4[customCursor + i2] = tmp[i2];
      }
      return;
    }
    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;
      for (i2 = length1 - 1; i2 >= 0; i2--) {
        array4[customDest + i2] = array4[customCursor + i2];
      }
      array4[dest] = tmp[cursor2];
      return;
    }
    var _minGallop = minGallop;
    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;
      do {
        if (compare(tmp[cursor2], array4[cursor1]) < 0) {
          array4[dest--] = array4[cursor1--];
          count1++;
          count2 = 0;
          if (--length1 === 0) {
            exit = true;
            break;
          }
        } else {
          array4[dest--] = tmp[cursor2--];
          count2++;
          count1 = 0;
          if (--length2 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < _minGallop);
      if (exit) {
        break;
      }
      do {
        count1 = length1 - gallopRight(tmp[cursor2], array4, start1, length1, length1 - 1, compare);
        if (count1 !== 0) {
          dest -= count1;
          cursor1 -= count1;
          length1 -= count1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;
          for (i2 = count1 - 1; i2 >= 0; i2--) {
            array4[customDest + i2] = array4[customCursor + i2];
          }
          if (length1 === 0) {
            exit = true;
            break;
          }
        }
        array4[dest--] = tmp[cursor2--];
        if (--length2 === 1) {
          exit = true;
          break;
        }
        count2 = length2 - gallopLeft(array4[cursor1], tmp, 0, length2, length2 - 1, compare);
        if (count2 !== 0) {
          dest -= count2;
          cursor2 -= count2;
          length2 -= count2;
          customDest = dest + 1;
          customCursor = cursor2 + 1;
          for (i2 = 0; i2 < count2; i2++) {
            array4[customDest + i2] = tmp[customCursor + i2];
          }
          if (length2 <= 1) {
            exit = true;
            break;
          }
        }
        array4[dest--] = array4[cursor1--];
        if (--length1 === 0) {
          exit = true;
          break;
        }
        _minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
      if (exit) {
        break;
      }
      if (_minGallop < 0) {
        _minGallop = 0;
      }
      _minGallop += 2;
    }
    minGallop = _minGallop;
    if (minGallop < 1) {
      minGallop = 1;
    }
    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;
      for (i2 = length1 - 1; i2 >= 0; i2--) {
        array4[customDest + i2] = array4[customCursor + i2];
      }
      array4[dest] = tmp[cursor2];
    } else if (length2 === 0) {
      throw new Error();
    } else {
      customCursor = dest - (length2 - 1);
      for (i2 = 0; i2 < length2; i2++) {
        array4[customCursor + i2] = tmp[i2];
      }
    }
  }
  return {
    mergeRuns,
    forceMergeRuns,
    pushRun
  };
}
function sort(array4, compare, lo, hi) {
  if (!lo) {
    lo = 0;
  }
  if (!hi) {
    hi = array4.length;
  }
  var remaining = hi - lo;
  if (remaining < 2) {
    return;
  }
  var runLength = 0;
  if (remaining < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(array4, lo, hi, compare);
    binaryInsertionSort(array4, lo, hi, lo + runLength, compare);
    return;
  }
  var ts = TimSort(array4, compare);
  var minRun = minRunLength(remaining);
  do {
    runLength = makeAscendingRun(array4, lo, hi, compare);
    if (runLength < minRun) {
      var force = remaining;
      if (force > minRun) {
        force = minRun;
      }
      binaryInsertionSort(array4, lo, lo + force, lo + runLength, compare);
      runLength = force;
    }
    ts.pushRun(lo, runLength);
    ts.mergeRuns();
    remaining -= runLength;
    lo += runLength;
  } while (remaining !== 0);
  ts.forceMergeRuns();
}
var REDRAW_BIT = 1;
var STYLE_CHANGED_BIT = 2;
var SHAPE_CHANGED_BIT = 4;
var invalidZErrorLogged = false;
function logInvalidZError() {
  if (invalidZErrorLogged) {
    return;
  }
  invalidZErrorLogged = true;
  console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors");
}
function shapeCompareFunc(a2, b2) {
  if (a2.zlevel === b2.zlevel) {
    if (a2.z === b2.z) {
      return a2.z2 - b2.z2;
    }
    return a2.z - b2.z;
  }
  return a2.zlevel - b2.zlevel;
}
var Storage = function() {
  function Storage2() {
    this._roots = [];
    this._displayList = [];
    this._displayListLen = 0;
    this.displayableSortFunc = shapeCompareFunc;
  }
  Storage2.prototype.traverse = function(cb, context) {
    for (var i2 = 0; i2 < this._roots.length; i2++) {
      this._roots[i2].traverse(cb, context);
    }
  };
  Storage2.prototype.getDisplayList = function(update, includeIgnore) {
    includeIgnore = includeIgnore || false;
    var displayList = this._displayList;
    if (update || !displayList.length) {
      this.updateDisplayList(includeIgnore);
    }
    return displayList;
  };
  Storage2.prototype.updateDisplayList = function(includeIgnore) {
    this._displayListLen = 0;
    var roots2 = this._roots;
    var displayList = this._displayList;
    for (var i2 = 0, len2 = roots2.length; i2 < len2; i2++) {
      this._updateAndAddDisplayable(roots2[i2], null, includeIgnore);
    }
    displayList.length = this._displayListLen;
    sort(displayList, shapeCompareFunc);
  };
  Storage2.prototype._updateAndAddDisplayable = function(el, clipPaths, includeIgnore) {
    if (el.ignore && !includeIgnore) {
      return;
    }
    el.beforeUpdate();
    el.update();
    el.afterUpdate();
    var userSetClipPath = el.getClipPath();
    if (el.ignoreClip) {
      clipPaths = null;
    } else if (userSetClipPath) {
      if (clipPaths) {
        clipPaths = clipPaths.slice();
      } else {
        clipPaths = [];
      }
      var currentClipPath = userSetClipPath;
      var parentClipPath = el;
      while (currentClipPath) {
        currentClipPath.parent = parentClipPath;
        currentClipPath.updateTransform();
        clipPaths.push(currentClipPath);
        parentClipPath = currentClipPath;
        currentClipPath = currentClipPath.getClipPath();
      }
    }
    if (el.childrenRef) {
      var children = el.childrenRef();
      for (var i2 = 0; i2 < children.length; i2++) {
        var child = children[i2];
        if (el.__dirty) {
          child.__dirty |= REDRAW_BIT;
        }
        this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
      }
      el.__dirty = 0;
    } else {
      var disp = el;
      if (clipPaths && clipPaths.length) {
        disp.__clipPaths = clipPaths;
      } else if (disp.__clipPaths && disp.__clipPaths.length > 0) {
        disp.__clipPaths = [];
      }
      if (isNaN(disp.z)) {
        logInvalidZError();
        disp.z = 0;
      }
      if (isNaN(disp.z2)) {
        logInvalidZError();
        disp.z2 = 0;
      }
      if (isNaN(disp.zlevel)) {
        logInvalidZError();
        disp.zlevel = 0;
      }
      this._displayList[this._displayListLen++] = disp;
    }
    var decalEl = el.getDecalElement && el.getDecalElement();
    if (decalEl) {
      this._updateAndAddDisplayable(decalEl, clipPaths, includeIgnore);
    }
    var textGuide = el.getTextGuideLine();
    if (textGuide) {
      this._updateAndAddDisplayable(textGuide, clipPaths, includeIgnore);
    }
    var textEl = el.getTextContent();
    if (textEl) {
      this._updateAndAddDisplayable(textEl, clipPaths, includeIgnore);
    }
  };
  Storage2.prototype.addRoot = function(el) {
    if (el.__zr && el.__zr.storage === this) {
      return;
    }
    this._roots.push(el);
  };
  Storage2.prototype.delRoot = function(el) {
    if (el instanceof Array) {
      for (var i2 = 0, l2 = el.length; i2 < l2; i2++) {
        this.delRoot(el[i2]);
      }
      return;
    }
    var idx = indexOf(this._roots, el);
    if (idx >= 0) {
      this._roots.splice(idx, 1);
    }
  };
  Storage2.prototype.delAllRoots = function() {
    this._roots = [];
    this._displayList = [];
    this._displayListLen = 0;
    return;
  };
  Storage2.prototype.getRoots = function() {
    return this._roots;
  };
  Storage2.prototype.dispose = function() {
    this._displayList = null;
    this._roots = null;
  };
  return Storage2;
}();
var Storage$1 = Storage;
var requestAnimationFrame$1;
requestAnimationFrame$1 = env$1.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(func) {
  return setTimeout(func, 16);
};
var requestAnimationFrame$2 = requestAnimationFrame$1;
var easingFuncs = {
  linear: function(k) {
    return k;
  },
  quadraticIn: function(k) {
    return k * k;
  },
  quadraticOut: function(k) {
    return k * (2 - k);
  },
  quadraticInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function(k) {
    return k * k * k;
  },
  cubicOut: function(k) {
    return --k * k * k + 1;
  },
  cubicInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  },
  quarticIn: function(k) {
    return k * k * k * k;
  },
  quarticOut: function(k) {
    return 1 - --k * k * k * k;
  },
  quarticInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
  },
  quinticIn: function(k) {
    return k * k * k * k * k;
  },
  quinticOut: function(k) {
    return --k * k * k * k * k + 1;
  },
  quinticInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  },
  sinusoidalIn: function(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  },
  sinusoidalOut: function(k) {
    return Math.sin(k * Math.PI / 2);
  },
  sinusoidalInOut: function(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  },
  exponentialIn: function(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  },
  exponentialOut: function(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  },
  exponentialInOut: function(k) {
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  },
  circularIn: function(k) {
    return 1 - Math.sqrt(1 - k * k);
  },
  circularOut: function(k) {
    return Math.sqrt(1 - --k * k);
  },
  circularInOut: function(k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  },
  elasticIn: function(k) {
    var s2;
    var a2 = 0.1;
    var p2 = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a2 || a2 < 1) {
      a2 = 1;
      s2 = p2 / 4;
    } else {
      s2 = p2 * Math.asin(1 / a2) / (2 * Math.PI);
    }
    return -(a2 * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s2) * (2 * Math.PI) / p2));
  },
  elasticOut: function(k) {
    var s2;
    var a2 = 0.1;
    var p2 = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a2 || a2 < 1) {
      a2 = 1;
      s2 = p2 / 4;
    } else {
      s2 = p2 * Math.asin(1 / a2) / (2 * Math.PI);
    }
    return a2 * Math.pow(2, -10 * k) * Math.sin((k - s2) * (2 * Math.PI) / p2) + 1;
  },
  elasticInOut: function(k) {
    var s2;
    var a2 = 0.1;
    var p2 = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a2 || a2 < 1) {
      a2 = 1;
      s2 = p2 / 4;
    } else {
      s2 = p2 * Math.asin(1 / a2) / (2 * Math.PI);
    }
    if ((k *= 2) < 1) {
      return -0.5 * (a2 * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s2) * (2 * Math.PI) / p2));
    }
    return a2 * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s2) * (2 * Math.PI) / p2) * 0.5 + 1;
  },
  backIn: function(k) {
    var s2 = 1.70158;
    return k * k * ((s2 + 1) * k - s2);
  },
  backOut: function(k) {
    var s2 = 1.70158;
    return --k * k * ((s2 + 1) * k + s2) + 1;
  },
  backInOut: function(k) {
    var s2 = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s2 + 1) * k - s2));
    }
    return 0.5 * ((k -= 2) * k * ((s2 + 1) * k + s2) + 2);
  },
  bounceIn: function(k) {
    return 1 - easingFuncs.bounceOut(1 - k);
  },
  bounceOut: function(k) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
  },
  bounceInOut: function(k) {
    if (k < 0.5) {
      return easingFuncs.bounceIn(k * 2) * 0.5;
    }
    return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
var easingFuncs$1 = easingFuncs;
var mathPow = Math.pow;
var mathSqrt$3 = Math.sqrt;
var EPSILON$2 = 1e-8;
var EPSILON_NUMERIC = 1e-4;
var THREE_SQRT = mathSqrt$3(3);
var ONE_THIRD = 1 / 3;
var _v0 = create$1();
var _v1 = create$1();
var _v2 = create$1();
function isAroundZero(val) {
  return val > -EPSILON$2 && val < EPSILON$2;
}
function isNotAroundZero$1(val) {
  return val > EPSILON$2 || val < -EPSILON$2;
}
function cubicAt(p0, p1, p2, p3, t2) {
  var onet = 1 - t2;
  return onet * onet * (onet * p0 + 3 * t2 * p1) + t2 * t2 * (t2 * p3 + 3 * onet * p2);
}
function cubicDerivativeAt(p0, p1, p2, p3, t2) {
  var onet = 1 - t2;
  return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t2) * onet + (p3 - p2) * t2 * t2);
}
function cubicRootAt(p0, p1, p2, p3, val, roots2) {
  var a2 = p3 + 3 * (p1 - p2) - p0;
  var b2 = 3 * (p2 - p1 * 2 + p0);
  var c2 = 3 * (p1 - p0);
  var d2 = p0 - val;
  var A2 = b2 * b2 - 3 * a2 * c2;
  var B2 = b2 * c2 - 9 * a2 * d2;
  var C2 = c2 * c2 - 3 * b2 * d2;
  var n2 = 0;
  if (isAroundZero(A2) && isAroundZero(B2)) {
    if (isAroundZero(b2)) {
      roots2[0] = 0;
    } else {
      var t1 = -c2 / b2;
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
    }
  } else {
    var disc = B2 * B2 - 4 * A2 * C2;
    if (isAroundZero(disc)) {
      var K2 = B2 / A2;
      var t1 = -b2 / a2 + K2;
      var t2 = -K2 / 2;
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        roots2[n2++] = t2;
      }
    } else if (disc > 0) {
      var discSqrt = mathSqrt$3(disc);
      var Y1 = A2 * b2 + 1.5 * a2 * (-B2 + discSqrt);
      var Y2 = A2 * b2 + 1.5 * a2 * (-B2 - discSqrt);
      if (Y1 < 0) {
        Y1 = -mathPow(-Y1, ONE_THIRD);
      } else {
        Y1 = mathPow(Y1, ONE_THIRD);
      }
      if (Y2 < 0) {
        Y2 = -mathPow(-Y2, ONE_THIRD);
      } else {
        Y2 = mathPow(Y2, ONE_THIRD);
      }
      var t1 = (-b2 - (Y1 + Y2)) / (3 * a2);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
    } else {
      var T2 = (2 * A2 * b2 - 3 * a2 * B2) / (2 * mathSqrt$3(A2 * A2 * A2));
      var theta = Math.acos(T2) / 3;
      var ASqrt = mathSqrt$3(A2);
      var tmp = Math.cos(theta);
      var t1 = (-b2 - 2 * ASqrt * tmp) / (3 * a2);
      var t2 = (-b2 + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a2);
      var t3 = (-b2 + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a2);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        roots2[n2++] = t2;
      }
      if (t3 >= 0 && t3 <= 1) {
        roots2[n2++] = t3;
      }
    }
  }
  return n2;
}
function cubicExtrema(p0, p1, p2, p3, extrema2) {
  var b2 = 6 * p2 - 12 * p1 + 6 * p0;
  var a2 = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
  var c2 = 3 * p1 - 3 * p0;
  var n2 = 0;
  if (isAroundZero(a2)) {
    if (isNotAroundZero$1(b2)) {
      var t1 = -c2 / b2;
      if (t1 >= 0 && t1 <= 1) {
        extrema2[n2++] = t1;
      }
    }
  } else {
    var disc = b2 * b2 - 4 * a2 * c2;
    if (isAroundZero(disc)) {
      extrema2[0] = -b2 / (2 * a2);
    } else if (disc > 0) {
      var discSqrt = mathSqrt$3(disc);
      var t1 = (-b2 + discSqrt) / (2 * a2);
      var t2 = (-b2 - discSqrt) / (2 * a2);
      if (t1 >= 0 && t1 <= 1) {
        extrema2[n2++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        extrema2[n2++] = t2;
      }
    }
  }
  return n2;
}
function cubicSubdivide(p0, p1, p2, p3, t2, out2) {
  var p01 = (p1 - p0) * t2 + p0;
  var p12 = (p2 - p1) * t2 + p1;
  var p23 = (p3 - p2) * t2 + p2;
  var p012 = (p12 - p01) * t2 + p01;
  var p123 = (p23 - p12) * t2 + p12;
  var p0123 = (p123 - p012) * t2 + p012;
  out2[0] = p0;
  out2[1] = p01;
  out2[2] = p012;
  out2[3] = p0123;
  out2[4] = p0123;
  out2[5] = p123;
  out2[6] = p23;
  out2[7] = p3;
}
function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, out2) {
  var t2;
  var interval = 5e-3;
  var d2 = Infinity;
  var prev;
  var next;
  var d1;
  var d22;
  _v0[0] = x4;
  _v0[1] = y4;
  for (var _t2 = 0; _t2 < 1; _t2 += 0.05) {
    _v1[0] = cubicAt(x0, x1, x2, x3, _t2);
    _v1[1] = cubicAt(y0, y1, y2, y3, _t2);
    d1 = distSquare(_v0, _v1);
    if (d1 < d2) {
      t2 = _t2;
      d2 = d1;
    }
  }
  d2 = Infinity;
  for (var i2 = 0; i2 < 32; i2++) {
    if (interval < EPSILON_NUMERIC) {
      break;
    }
    prev = t2 - interval;
    next = t2 + interval;
    _v1[0] = cubicAt(x0, x1, x2, x3, prev);
    _v1[1] = cubicAt(y0, y1, y2, y3, prev);
    d1 = distSquare(_v1, _v0);
    if (prev >= 0 && d1 < d2) {
      t2 = prev;
      d2 = d1;
    } else {
      _v2[0] = cubicAt(x0, x1, x2, x3, next);
      _v2[1] = cubicAt(y0, y1, y2, y3, next);
      d22 = distSquare(_v2, _v0);
      if (next <= 1 && d22 < d2) {
        t2 = next;
        d2 = d22;
      } else {
        interval *= 0.5;
      }
    }
  }
  if (out2) {
    out2[0] = cubicAt(x0, x1, x2, x3, t2);
    out2[1] = cubicAt(y0, y1, y2, y3, t2);
  }
  return mathSqrt$3(d2);
}
function cubicLength(x0, y0, x1, y1, x2, y2, x3, y3, iteration) {
  var px = x0;
  var py = y0;
  var d2 = 0;
  var step = 1 / iteration;
  for (var i2 = 1; i2 <= iteration; i2++) {
    var t2 = i2 * step;
    var x4 = cubicAt(x0, x1, x2, x3, t2);
    var y4 = cubicAt(y0, y1, y2, y3, t2);
    var dx = x4 - px;
    var dy = y4 - py;
    d2 += Math.sqrt(dx * dx + dy * dy);
    px = x4;
    py = y4;
  }
  return d2;
}
function quadraticAt(p0, p1, p2, t2) {
  var onet = 1 - t2;
  return onet * (onet * p0 + 2 * t2 * p1) + t2 * t2 * p2;
}
function quadraticDerivativeAt(p0, p1, p2, t2) {
  return 2 * ((1 - t2) * (p1 - p0) + t2 * (p2 - p1));
}
function quadraticRootAt(p0, p1, p2, val, roots2) {
  var a2 = p0 - 2 * p1 + p2;
  var b2 = 2 * (p1 - p0);
  var c2 = p0 - val;
  var n2 = 0;
  if (isAroundZero(a2)) {
    if (isNotAroundZero$1(b2)) {
      var t1 = -c2 / b2;
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
    }
  } else {
    var disc = b2 * b2 - 4 * a2 * c2;
    if (isAroundZero(disc)) {
      var t1 = -b2 / (2 * a2);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
    } else if (disc > 0) {
      var discSqrt = mathSqrt$3(disc);
      var t1 = (-b2 + discSqrt) / (2 * a2);
      var t2 = (-b2 - discSqrt) / (2 * a2);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n2++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        roots2[n2++] = t2;
      }
    }
  }
  return n2;
}
function quadraticExtremum(p0, p1, p2) {
  var divider = p0 + p2 - 2 * p1;
  if (divider === 0) {
    return 0.5;
  } else {
    return (p0 - p1) / divider;
  }
}
function quadraticSubdivide(p0, p1, p2, t2, out2) {
  var p01 = (p1 - p0) * t2 + p0;
  var p12 = (p2 - p1) * t2 + p1;
  var p012 = (p12 - p01) * t2 + p01;
  out2[0] = p0;
  out2[1] = p01;
  out2[2] = p012;
  out2[3] = p012;
  out2[4] = p12;
  out2[5] = p2;
}
function quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, out2) {
  var t2;
  var interval = 5e-3;
  var d2 = Infinity;
  _v0[0] = x3;
  _v0[1] = y3;
  for (var _t2 = 0; _t2 < 1; _t2 += 0.05) {
    _v1[0] = quadraticAt(x0, x1, x2, _t2);
    _v1[1] = quadraticAt(y0, y1, y2, _t2);
    var d1 = distSquare(_v0, _v1);
    if (d1 < d2) {
      t2 = _t2;
      d2 = d1;
    }
  }
  d2 = Infinity;
  for (var i2 = 0; i2 < 32; i2++) {
    if (interval < EPSILON_NUMERIC) {
      break;
    }
    var prev = t2 - interval;
    var next = t2 + interval;
    _v1[0] = quadraticAt(x0, x1, x2, prev);
    _v1[1] = quadraticAt(y0, y1, y2, prev);
    var d1 = distSquare(_v1, _v0);
    if (prev >= 0 && d1 < d2) {
      t2 = prev;
      d2 = d1;
    } else {
      _v2[0] = quadraticAt(x0, x1, x2, next);
      _v2[1] = quadraticAt(y0, y1, y2, next);
      var d22 = distSquare(_v2, _v0);
      if (next <= 1 && d22 < d2) {
        t2 = next;
        d2 = d22;
      } else {
        interval *= 0.5;
      }
    }
  }
  if (out2) {
    out2[0] = quadraticAt(x0, x1, x2, t2);
    out2[1] = quadraticAt(y0, y1, y2, t2);
  }
  return mathSqrt$3(d2);
}
function quadraticLength(x0, y0, x1, y1, x2, y2, iteration) {
  var px = x0;
  var py = y0;
  var d2 = 0;
  var step = 1 / iteration;
  for (var i2 = 1; i2 <= iteration; i2++) {
    var t2 = i2 * step;
    var x3 = quadraticAt(x0, x1, x2, t2);
    var y3 = quadraticAt(y0, y1, y2, t2);
    var dx = x3 - px;
    var dy = y3 - py;
    d2 += Math.sqrt(dx * dx + dy * dy);
    px = x3;
    py = y3;
  }
  return d2;
}
var regexp3 = /cubic-bezier\(([0-9,\.e ]+)\)/;
function createCubicEasingFunc(cubicEasingStr) {
  var cubic = cubicEasingStr && regexp3.exec(cubicEasingStr);
  if (cubic) {
    var points2 = cubic[1].split(",");
    var a_1 = +trim(points2[0]);
    var b_1 = +trim(points2[1]);
    var c_1 = +trim(points2[2]);
    var d_1 = +trim(points2[3]);
    if (isNaN(a_1 + b_1 + c_1 + d_1)) {
      return;
    }
    var roots_1 = [];
    return function(p2) {
      return p2 <= 0 ? 0 : p2 >= 1 ? 1 : cubicRootAt(0, a_1, c_1, 1, p2, roots_1) && cubicAt(0, b_1, d_1, 1, roots_1[0]);
    };
  }
}
var Clip = function() {
  function Clip2(opts) {
    this._inited = false;
    this._startTime = 0;
    this._pausedTime = 0;
    this._paused = false;
    this._life = opts.life || 1e3;
    this._delay = opts.delay || 0;
    this.loop = opts.loop || false;
    this.onframe = opts.onframe || noop;
    this.ondestroy = opts.ondestroy || noop;
    this.onrestart = opts.onrestart || noop;
    opts.easing && this.setEasing(opts.easing);
  }
  Clip2.prototype.step = function(globalTime, deltaTime) {
    if (!this._inited) {
      this._startTime = globalTime + this._delay;
      this._inited = true;
    }
    if (this._paused) {
      this._pausedTime += deltaTime;
      return;
    }
    var life = this._life;
    var elapsedTime = globalTime - this._startTime - this._pausedTime;
    var percent = elapsedTime / life;
    if (percent < 0) {
      percent = 0;
    }
    percent = Math.min(percent, 1);
    var easingFunc = this.easingFunc;
    var schedule = easingFunc ? easingFunc(percent) : percent;
    this.onframe(schedule);
    if (percent === 1) {
      if (this.loop) {
        var remainder = elapsedTime % life;
        this._startTime = globalTime - remainder;
        this._pausedTime = 0;
        this.onrestart();
      } else {
        return true;
      }
    }
    return false;
  };
  Clip2.prototype.pause = function() {
    this._paused = true;
  };
  Clip2.prototype.resume = function() {
    this._paused = false;
  };
  Clip2.prototype.setEasing = function(easing) {
    this.easing = easing;
    this.easingFunc = isFunction(easing) ? easing : easingFuncs$1[easing] || createCubicEasingFunc(easing);
  };
  return Clip2;
}();
var Clip$1 = Clip;
var Entry = function() {
  function Entry2(val) {
    this.value = val;
  }
  return Entry2;
}();
var LinkedList = function() {
  function LinkedList2() {
    this._len = 0;
  }
  LinkedList2.prototype.insert = function(val) {
    var entry = new Entry(val);
    this.insertEntry(entry);
    return entry;
  };
  LinkedList2.prototype.insertEntry = function(entry) {
    if (!this.head) {
      this.head = this.tail = entry;
    } else {
      this.tail.next = entry;
      entry.prev = this.tail;
      entry.next = null;
      this.tail = entry;
    }
    this._len++;
  };
  LinkedList2.prototype.remove = function(entry) {
    var prev = entry.prev;
    var next = entry.next;
    if (prev) {
      prev.next = next;
    } else {
      this.head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
  };
  LinkedList2.prototype.len = function() {
    return this._len;
  };
  LinkedList2.prototype.clear = function() {
    this.head = this.tail = null;
    this._len = 0;
  };
  return LinkedList2;
}();
var LRU = function() {
  function LRU2(maxSize) {
    this._list = new LinkedList();
    this._maxSize = 10;
    this._map = {};
    this._maxSize = maxSize;
  }
  LRU2.prototype.put = function(key, value) {
    var list = this._list;
    var map2 = this._map;
    var removed = null;
    if (map2[key] == null) {
      var len2 = list.len();
      var entry = this._lastRemovedEntry;
      if (len2 >= this._maxSize && len2 > 0) {
        var leastUsedEntry = list.head;
        list.remove(leastUsedEntry);
        delete map2[leastUsedEntry.key];
        removed = leastUsedEntry.value;
        this._lastRemovedEntry = leastUsedEntry;
      }
      if (entry) {
        entry.value = value;
      } else {
        entry = new Entry(value);
      }
      entry.key = key;
      list.insertEntry(entry);
      map2[key] = entry;
    }
    return removed;
  };
  LRU2.prototype.get = function(key) {
    var entry = this._map[key];
    var list = this._list;
    if (entry != null) {
      if (entry !== list.tail) {
        list.remove(entry);
        list.insertEntry(entry);
      }
      return entry.value;
    }
  };
  LRU2.prototype.clear = function() {
    this._list.clear();
    this._map = {};
  };
  LRU2.prototype.len = function() {
    return this._list.len();
  };
  return LRU2;
}();
var LRU$1 = LRU;
var kCSSColorTable = {
  "transparent": [0, 0, 0, 0],
  "aliceblue": [240, 248, 255, 1],
  "antiquewhite": [250, 235, 215, 1],
  "aqua": [0, 255, 255, 1],
  "aquamarine": [127, 255, 212, 1],
  "azure": [240, 255, 255, 1],
  "beige": [245, 245, 220, 1],
  "bisque": [255, 228, 196, 1],
  "black": [0, 0, 0, 1],
  "blanchedalmond": [255, 235, 205, 1],
  "blue": [0, 0, 255, 1],
  "blueviolet": [138, 43, 226, 1],
  "brown": [165, 42, 42, 1],
  "burlywood": [222, 184, 135, 1],
  "cadetblue": [95, 158, 160, 1],
  "chartreuse": [127, 255, 0, 1],
  "chocolate": [210, 105, 30, 1],
  "coral": [255, 127, 80, 1],
  "cornflowerblue": [100, 149, 237, 1],
  "cornsilk": [255, 248, 220, 1],
  "crimson": [220, 20, 60, 1],
  "cyan": [0, 255, 255, 1],
  "darkblue": [0, 0, 139, 1],
  "darkcyan": [0, 139, 139, 1],
  "darkgoldenrod": [184, 134, 11, 1],
  "darkgray": [169, 169, 169, 1],
  "darkgreen": [0, 100, 0, 1],
  "darkgrey": [169, 169, 169, 1],
  "darkkhaki": [189, 183, 107, 1],
  "darkmagenta": [139, 0, 139, 1],
  "darkolivegreen": [85, 107, 47, 1],
  "darkorange": [255, 140, 0, 1],
  "darkorchid": [153, 50, 204, 1],
  "darkred": [139, 0, 0, 1],
  "darksalmon": [233, 150, 122, 1],
  "darkseagreen": [143, 188, 143, 1],
  "darkslateblue": [72, 61, 139, 1],
  "darkslategray": [47, 79, 79, 1],
  "darkslategrey": [47, 79, 79, 1],
  "darkturquoise": [0, 206, 209, 1],
  "darkviolet": [148, 0, 211, 1],
  "deeppink": [255, 20, 147, 1],
  "deepskyblue": [0, 191, 255, 1],
  "dimgray": [105, 105, 105, 1],
  "dimgrey": [105, 105, 105, 1],
  "dodgerblue": [30, 144, 255, 1],
  "firebrick": [178, 34, 34, 1],
  "floralwhite": [255, 250, 240, 1],
  "forestgreen": [34, 139, 34, 1],
  "fuchsia": [255, 0, 255, 1],
  "gainsboro": [220, 220, 220, 1],
  "ghostwhite": [248, 248, 255, 1],
  "gold": [255, 215, 0, 1],
  "goldenrod": [218, 165, 32, 1],
  "gray": [128, 128, 128, 1],
  "green": [0, 128, 0, 1],
  "greenyellow": [173, 255, 47, 1],
  "grey": [128, 128, 128, 1],
  "honeydew": [240, 255, 240, 1],
  "hotpink": [255, 105, 180, 1],
  "indianred": [205, 92, 92, 1],
  "indigo": [75, 0, 130, 1],
  "ivory": [255, 255, 240, 1],
  "khaki": [240, 230, 140, 1],
  "lavender": [230, 230, 250, 1],
  "lavenderblush": [255, 240, 245, 1],
  "lawngreen": [124, 252, 0, 1],
  "lemonchiffon": [255, 250, 205, 1],
  "lightblue": [173, 216, 230, 1],
  "lightcoral": [240, 128, 128, 1],
  "lightcyan": [224, 255, 255, 1],
  "lightgoldenrodyellow": [250, 250, 210, 1],
  "lightgray": [211, 211, 211, 1],
  "lightgreen": [144, 238, 144, 1],
  "lightgrey": [211, 211, 211, 1],
  "lightpink": [255, 182, 193, 1],
  "lightsalmon": [255, 160, 122, 1],
  "lightseagreen": [32, 178, 170, 1],
  "lightskyblue": [135, 206, 250, 1],
  "lightslategray": [119, 136, 153, 1],
  "lightslategrey": [119, 136, 153, 1],
  "lightsteelblue": [176, 196, 222, 1],
  "lightyellow": [255, 255, 224, 1],
  "lime": [0, 255, 0, 1],
  "limegreen": [50, 205, 50, 1],
  "linen": [250, 240, 230, 1],
  "magenta": [255, 0, 255, 1],
  "maroon": [128, 0, 0, 1],
  "mediumaquamarine": [102, 205, 170, 1],
  "mediumblue": [0, 0, 205, 1],
  "mediumorchid": [186, 85, 211, 1],
  "mediumpurple": [147, 112, 219, 1],
  "mediumseagreen": [60, 179, 113, 1],
  "mediumslateblue": [123, 104, 238, 1],
  "mediumspringgreen": [0, 250, 154, 1],
  "mediumturquoise": [72, 209, 204, 1],
  "mediumvioletred": [199, 21, 133, 1],
  "midnightblue": [25, 25, 112, 1],
  "mintcream": [245, 255, 250, 1],
  "mistyrose": [255, 228, 225, 1],
  "moccasin": [255, 228, 181, 1],
  "navajowhite": [255, 222, 173, 1],
  "navy": [0, 0, 128, 1],
  "oldlace": [253, 245, 230, 1],
  "olive": [128, 128, 0, 1],
  "olivedrab": [107, 142, 35, 1],
  "orange": [255, 165, 0, 1],
  "orangered": [255, 69, 0, 1],
  "orchid": [218, 112, 214, 1],
  "palegoldenrod": [238, 232, 170, 1],
  "palegreen": [152, 251, 152, 1],
  "paleturquoise": [175, 238, 238, 1],
  "palevioletred": [219, 112, 147, 1],
  "papayawhip": [255, 239, 213, 1],
  "peachpuff": [255, 218, 185, 1],
  "peru": [205, 133, 63, 1],
  "pink": [255, 192, 203, 1],
  "plum": [221, 160, 221, 1],
  "powderblue": [176, 224, 230, 1],
  "purple": [128, 0, 128, 1],
  "red": [255, 0, 0, 1],
  "rosybrown": [188, 143, 143, 1],
  "royalblue": [65, 105, 225, 1],
  "saddlebrown": [139, 69, 19, 1],
  "salmon": [250, 128, 114, 1],
  "sandybrown": [244, 164, 96, 1],
  "seagreen": [46, 139, 87, 1],
  "seashell": [255, 245, 238, 1],
  "sienna": [160, 82, 45, 1],
  "silver": [192, 192, 192, 1],
  "skyblue": [135, 206, 235, 1],
  "slateblue": [106, 90, 205, 1],
  "slategray": [112, 128, 144, 1],
  "slategrey": [112, 128, 144, 1],
  "snow": [255, 250, 250, 1],
  "springgreen": [0, 255, 127, 1],
  "steelblue": [70, 130, 180, 1],
  "tan": [210, 180, 140, 1],
  "teal": [0, 128, 128, 1],
  "thistle": [216, 191, 216, 1],
  "tomato": [255, 99, 71, 1],
  "turquoise": [64, 224, 208, 1],
  "violet": [238, 130, 238, 1],
  "wheat": [245, 222, 179, 1],
  "white": [255, 255, 255, 1],
  "whitesmoke": [245, 245, 245, 1],
  "yellow": [255, 255, 0, 1],
  "yellowgreen": [154, 205, 50, 1]
};
function clampCssByte(i2) {
  i2 = Math.round(i2);
  return i2 < 0 ? 0 : i2 > 255 ? 255 : i2;
}
function clampCssAngle(i2) {
  i2 = Math.round(i2);
  return i2 < 0 ? 0 : i2 > 360 ? 360 : i2;
}
function clampCssFloat(f2) {
  return f2 < 0 ? 0 : f2 > 1 ? 1 : f2;
}
function parseCssInt(val) {
  var str = val;
  if (str.length && str.charAt(str.length - 1) === "%") {
    return clampCssByte(parseFloat(str) / 100 * 255);
  }
  return clampCssByte(parseInt(str, 10));
}
function parseCssFloat(val) {
  var str = val;
  if (str.length && str.charAt(str.length - 1) === "%") {
    return clampCssFloat(parseFloat(str) / 100);
  }
  return clampCssFloat(parseFloat(str));
}
function cssHueToRgb(m1, m2, h2) {
  if (h2 < 0) {
    h2 += 1;
  } else if (h2 > 1) {
    h2 -= 1;
  }
  if (h2 * 6 < 1) {
    return m1 + (m2 - m1) * h2 * 6;
  }
  if (h2 * 2 < 1) {
    return m2;
  }
  if (h2 * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h2) * 6;
  }
  return m1;
}
function lerpNumber(a2, b2, p2) {
  return a2 + (b2 - a2) * p2;
}
function setRgba(out2, r2, g2, b2, a2) {
  out2[0] = r2;
  out2[1] = g2;
  out2[2] = b2;
  out2[3] = a2;
  return out2;
}
function copyRgba(out2, a2) {
  out2[0] = a2[0];
  out2[1] = a2[1];
  out2[2] = a2[2];
  out2[3] = a2[3];
  return out2;
}
var colorCache = new LRU$1(20);
var lastRemovedArr = null;
function putToCache(colorStr, rgbaArr) {
  if (lastRemovedArr) {
    copyRgba(lastRemovedArr, rgbaArr);
  }
  lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || rgbaArr.slice());
}
function parse(colorStr, rgbaArr) {
  if (!colorStr) {
    return;
  }
  rgbaArr = rgbaArr || [];
  var cached = colorCache.get(colorStr);
  if (cached) {
    return copyRgba(rgbaArr, cached);
  }
  colorStr = colorStr + "";
  var str = colorStr.replace(/ /g, "").toLowerCase();
  if (str in kCSSColorTable) {
    copyRgba(rgbaArr, kCSSColorTable[str]);
    putToCache(colorStr, rgbaArr);
    return rgbaArr;
  }
  var strLen = str.length;
  if (str.charAt(0) === "#") {
    if (strLen === 4 || strLen === 5) {
      var iv = parseInt(str.slice(1, 4), 16);
      if (!(iv >= 0 && iv <= 4095)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return;
      }
      setRgba(rgbaArr, (iv & 3840) >> 4 | (iv & 3840) >> 8, iv & 240 | (iv & 240) >> 4, iv & 15 | (iv & 15) << 4, strLen === 5 ? parseInt(str.slice(4), 16) / 15 : 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    } else if (strLen === 7 || strLen === 9) {
      var iv = parseInt(str.slice(1, 7), 16);
      if (!(iv >= 0 && iv <= 16777215)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return;
      }
      setRgba(rgbaArr, (iv & 16711680) >> 16, (iv & 65280) >> 8, iv & 255, strLen === 9 ? parseInt(str.slice(7), 16) / 255 : 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    }
    return;
  }
  var op = str.indexOf("(");
  var ep = str.indexOf(")");
  if (op !== -1 && ep + 1 === strLen) {
    var fname = str.substr(0, op);
    var params = str.substr(op + 1, ep - (op + 1)).split(",");
    var alpha = 1;
    switch (fname) {
      case "rgba":
        if (params.length !== 4) {
          return params.length === 3 ? setRgba(rgbaArr, +params[0], +params[1], +params[2], 1) : setRgba(rgbaArr, 0, 0, 0, 1);
        }
        alpha = parseCssFloat(params.pop());
      case "rgb":
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      case "hsla":
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        params[3] = parseCssFloat(params[3]);
        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      case "hsl":
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      default:
        return;
    }
  }
  setRgba(rgbaArr, 0, 0, 0, 1);
  return;
}
function hsla2rgba(hsla, rgba) {
  var h2 = (parseFloat(hsla[0]) % 360 + 360) % 360 / 360;
  var s2 = parseCssFloat(hsla[1]);
  var l2 = parseCssFloat(hsla[2]);
  var m2 = l2 <= 0.5 ? l2 * (s2 + 1) : l2 + s2 - l2 * s2;
  var m1 = l2 * 2 - m2;
  rgba = rgba || [];
  setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h2 + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h2) * 255), clampCssByte(cssHueToRgb(m1, m2, h2 - 1 / 3) * 255), 1);
  if (hsla.length === 4) {
    rgba[3] = hsla[3];
  }
  return rgba;
}
function rgba2hsla(rgba) {
  if (!rgba) {
    return;
  }
  var R2 = rgba[0] / 255;
  var G2 = rgba[1] / 255;
  var B2 = rgba[2] / 255;
  var vMin = Math.min(R2, G2, B2);
  var vMax = Math.max(R2, G2, B2);
  var delta = vMax - vMin;
  var L2 = (vMax + vMin) / 2;
  var H2;
  var S2;
  if (delta === 0) {
    H2 = 0;
    S2 = 0;
  } else {
    if (L2 < 0.5) {
      S2 = delta / (vMax + vMin);
    } else {
      S2 = delta / (2 - vMax - vMin);
    }
    var deltaR = ((vMax - R2) / 6 + delta / 2) / delta;
    var deltaG = ((vMax - G2) / 6 + delta / 2) / delta;
    var deltaB = ((vMax - B2) / 6 + delta / 2) / delta;
    if (R2 === vMax) {
      H2 = deltaB - deltaG;
    } else if (G2 === vMax) {
      H2 = 1 / 3 + deltaR - deltaB;
    } else if (B2 === vMax) {
      H2 = 2 / 3 + deltaG - deltaR;
    }
    if (H2 < 0) {
      H2 += 1;
    }
    if (H2 > 1) {
      H2 -= 1;
    }
  }
  var hsla = [H2 * 360, S2, L2];
  if (rgba[3] != null) {
    hsla.push(rgba[3]);
  }
  return hsla;
}
function lift(color, level) {
  var colorArr = parse(color);
  if (colorArr) {
    for (var i2 = 0; i2 < 3; i2++) {
      if (level < 0) {
        colorArr[i2] = colorArr[i2] * (1 - level) | 0;
      } else {
        colorArr[i2] = (255 - colorArr[i2]) * level + colorArr[i2] | 0;
      }
      if (colorArr[i2] > 255) {
        colorArr[i2] = 255;
      } else if (colorArr[i2] < 0) {
        colorArr[i2] = 0;
      }
    }
    return stringify(colorArr, colorArr.length === 4 ? "rgba" : "rgb");
  }
}
function fastLerp(normalizedValue, colors, out2) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }
  out2 = out2 || [];
  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = colors[leftIndex];
  var rightColor = colors[rightIndex];
  var dv = value - leftIndex;
  out2[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
  out2[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
  out2[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
  out2[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
  return out2;
}
function lerp(normalizedValue, colors, fullOutput) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }
  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = parse(colors[leftIndex]);
  var rightColor = parse(colors[rightIndex]);
  var dv = value - leftIndex;
  var color = stringify([
    clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)),
    clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)),
    clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)),
    clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))
  ], "rgba");
  return fullOutput ? {
    color,
    leftIndex,
    rightIndex,
    value
  } : color;
}
function modifyHSL(color, h2, s2, l2) {
  var colorArr = parse(color);
  if (color) {
    colorArr = rgba2hsla(colorArr);
    h2 != null && (colorArr[0] = clampCssAngle(h2));
    s2 != null && (colorArr[1] = parseCssFloat(s2));
    l2 != null && (colorArr[2] = parseCssFloat(l2));
    return stringify(hsla2rgba(colorArr), "rgba");
  }
}
function modifyAlpha(color, alpha) {
  var colorArr = parse(color);
  if (colorArr && alpha != null) {
    colorArr[3] = clampCssFloat(alpha);
    return stringify(colorArr, "rgba");
  }
}
function stringify(arrColor, type4) {
  if (!arrColor || !arrColor.length) {
    return;
  }
  var colorStr = arrColor[0] + "," + arrColor[1] + "," + arrColor[2];
  if (type4 === "rgba" || type4 === "hsva" || type4 === "hsla") {
    colorStr += "," + arrColor[3];
  }
  return type4 + "(" + colorStr + ")";
}
function lum(color, backgroundLum) {
  var arr = parse(color);
  return arr ? (0.299 * arr[0] + 0.587 * arr[1] + 0.114 * arr[2]) * arr[3] / 255 + (1 - arr[3]) * backgroundLum : 0;
}
function isLinearGradient(val) {
  return val.type === "linear";
}
function isRadialGradient(val) {
  return val.type === "radial";
}
(function() {
  if (env$1.hasGlobalWindow && isFunction(window.btoa)) {
    return function(str) {
      return window.btoa(unescape(str));
    };
  }
  if (typeof Buffer !== "undefined") {
    return function(str) {
      return Buffer.from(str).toString("base64");
    };
  }
  return function(str) {
    return null;
  };
})();
var arraySlice = Array.prototype.slice;
function interpolateNumber(p0, p1, percent) {
  return (p1 - p0) * percent + p0;
}
function interpolate1DArray(out2, p0, p1, percent) {
  var len2 = p0.length;
  for (var i2 = 0; i2 < len2; i2++) {
    out2[i2] = interpolateNumber(p0[i2], p1[i2], percent);
  }
  return out2;
}
function interpolate2DArray(out2, p0, p1, percent) {
  var len2 = p0.length;
  var len22 = len2 && p0[0].length;
  for (var i2 = 0; i2 < len2; i2++) {
    if (!out2[i2]) {
      out2[i2] = [];
    }
    for (var j = 0; j < len22; j++) {
      out2[i2][j] = interpolateNumber(p0[i2][j], p1[i2][j], percent);
    }
  }
  return out2;
}
function add1DArray(out2, p0, p1, sign) {
  var len2 = p0.length;
  for (var i2 = 0; i2 < len2; i2++) {
    out2[i2] = p0[i2] + p1[i2] * sign;
  }
  return out2;
}
function add2DArray(out2, p0, p1, sign) {
  var len2 = p0.length;
  var len22 = len2 && p0[0].length;
  for (var i2 = 0; i2 < len2; i2++) {
    if (!out2[i2]) {
      out2[i2] = [];
    }
    for (var j = 0; j < len22; j++) {
      out2[i2][j] = p0[i2][j] + p1[i2][j] * sign;
    }
  }
  return out2;
}
function fillColorStops(val0, val1) {
  var len0 = val0.length;
  var len1 = val1.length;
  var shorterArr = len0 > len1 ? val1 : val0;
  var shorterLen = Math.min(len0, len1);
  var last = shorterArr[shorterLen - 1] || { color: [0, 0, 0, 0], offset: 0 };
  for (var i2 = shorterLen; i2 < Math.max(len0, len1); i2++) {
    shorterArr.push({
      offset: last.offset,
      color: last.color.slice()
    });
  }
}
function fillArray(val0, val1, arrDim) {
  var arr0 = val0;
  var arr1 = val1;
  if (!arr0.push || !arr1.push) {
    return;
  }
  var arr0Len = arr0.length;
  var arr1Len = arr1.length;
  if (arr0Len !== arr1Len) {
    var isPreviousLarger = arr0Len > arr1Len;
    if (isPreviousLarger) {
      arr0.length = arr1Len;
    } else {
      for (var i2 = arr0Len; i2 < arr1Len; i2++) {
        arr0.push(arrDim === 1 ? arr1[i2] : arraySlice.call(arr1[i2]));
      }
    }
  }
  var len2 = arr0[0] && arr0[0].length;
  for (var i2 = 0; i2 < arr0.length; i2++) {
    if (arrDim === 1) {
      if (isNaN(arr0[i2])) {
        arr0[i2] = arr1[i2];
      }
    } else {
      for (var j = 0; j < len2; j++) {
        if (isNaN(arr0[i2][j])) {
          arr0[i2][j] = arr1[i2][j];
        }
      }
    }
  }
}
function cloneValue(value) {
  if (isArrayLike(value)) {
    var len2 = value.length;
    if (isArrayLike(value[0])) {
      var ret = [];
      for (var i2 = 0; i2 < len2; i2++) {
        ret.push(arraySlice.call(value[i2]));
      }
      return ret;
    }
    return arraySlice.call(value);
  }
  return value;
}
function rgba2String(rgba) {
  rgba[0] = Math.floor(rgba[0]) || 0;
  rgba[1] = Math.floor(rgba[1]) || 0;
  rgba[2] = Math.floor(rgba[2]) || 0;
  rgba[3] = rgba[3] == null ? 1 : rgba[3];
  return "rgba(" + rgba.join(",") + ")";
}
function guessArrayDim(value) {
  return isArrayLike(value && value[0]) ? 2 : 1;
}
var VALUE_TYPE_NUMBER = 0;
var VALUE_TYPE_1D_ARRAY = 1;
var VALUE_TYPE_2D_ARRAY = 2;
var VALUE_TYPE_COLOR = 3;
var VALUE_TYPE_LINEAR_GRADIENT = 4;
var VALUE_TYPE_RADIAL_GRADIENT = 5;
var VALUE_TYPE_UNKOWN = 6;
function isGradientValueType(valType) {
  return valType === VALUE_TYPE_LINEAR_GRADIENT || valType === VALUE_TYPE_RADIAL_GRADIENT;
}
function isArrayValueType(valType) {
  return valType === VALUE_TYPE_1D_ARRAY || valType === VALUE_TYPE_2D_ARRAY;
}
var tmpRgba = [0, 0, 0, 0];
var Track = function() {
  function Track2(propName) {
    this.keyframes = [];
    this.discrete = false;
    this._invalid = false;
    this._needsSort = false;
    this._lastFr = 0;
    this._lastFrP = 0;
    this.propName = propName;
  }
  Track2.prototype.isFinished = function() {
    return this._finished;
  };
  Track2.prototype.setFinished = function() {
    this._finished = true;
    if (this._additiveTrack) {
      this._additiveTrack.setFinished();
    }
  };
  Track2.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  };
  Track2.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  };
  Track2.prototype.addKeyframe = function(time, rawValue, easing) {
    this._needsSort = true;
    var keyframes = this.keyframes;
    var len2 = keyframes.length;
    var discrete = false;
    var valType = VALUE_TYPE_UNKOWN;
    var value = rawValue;
    if (isArrayLike(rawValue)) {
      var arrayDim = guessArrayDim(rawValue);
      valType = arrayDim;
      if (arrayDim === 1 && !isNumber(rawValue[0]) || arrayDim === 2 && !isNumber(rawValue[0][0])) {
        discrete = true;
      }
    } else {
      if (isNumber(rawValue) && !eqNaN(rawValue)) {
        valType = VALUE_TYPE_NUMBER;
      } else if (isString(rawValue)) {
        if (!isNaN(+rawValue)) {
          valType = VALUE_TYPE_NUMBER;
        } else {
          var colorArray = parse(rawValue);
          if (colorArray) {
            value = colorArray;
            valType = VALUE_TYPE_COLOR;
          }
        }
      } else if (isGradientObject(rawValue)) {
        var parsedGradient = extend({}, value);
        parsedGradient.colorStops = map(rawValue.colorStops, function(colorStop) {
          return {
            offset: colorStop.offset,
            color: parse(colorStop.color)
          };
        });
        if (isLinearGradient(rawValue)) {
          valType = VALUE_TYPE_LINEAR_GRADIENT;
        } else if (isRadialGradient(rawValue)) {
          valType = VALUE_TYPE_RADIAL_GRADIENT;
        }
        value = parsedGradient;
      }
    }
    if (len2 === 0) {
      this.valType = valType;
    } else if (valType !== this.valType || valType === VALUE_TYPE_UNKOWN) {
      discrete = true;
    }
    this.discrete = this.discrete || discrete;
    var kf = {
      time,
      value,
      rawValue,
      percent: 0
    };
    if (easing) {
      kf.easing = easing;
      kf.easingFunc = isFunction(easing) ? easing : easingFuncs$1[easing] || createCubicEasingFunc(easing);
    }
    keyframes.push(kf);
    return kf;
  };
  Track2.prototype.prepare = function(maxTime, additiveTrack) {
    var kfs = this.keyframes;
    if (this._needsSort) {
      kfs.sort(function(a2, b2) {
        return a2.time - b2.time;
      });
    }
    var valType = this.valType;
    var kfsLen = kfs.length;
    var lastKf = kfs[kfsLen - 1];
    var isDiscrete = this.discrete;
    var isArr = isArrayValueType(valType);
    var isGradient = isGradientValueType(valType);
    for (var i2 = 0; i2 < kfsLen; i2++) {
      var kf = kfs[i2];
      var value = kf.value;
      var lastValue = lastKf.value;
      kf.percent = kf.time / maxTime;
      if (!isDiscrete) {
        if (isArr && i2 !== kfsLen - 1) {
          fillArray(value, lastValue, valType);
        } else if (isGradient) {
          fillColorStops(value.colorStops, lastValue.colorStops);
        }
      }
    }
    if (!isDiscrete && valType !== VALUE_TYPE_RADIAL_GRADIENT && additiveTrack && this.needsAnimate() && additiveTrack.needsAnimate() && valType === additiveTrack.valType && !additiveTrack._finished) {
      this._additiveTrack = additiveTrack;
      var startValue = kfs[0].value;
      for (var i2 = 0; i2 < kfsLen; i2++) {
        if (valType === VALUE_TYPE_NUMBER) {
          kfs[i2].additiveValue = kfs[i2].value - startValue;
        } else if (valType === VALUE_TYPE_COLOR) {
          kfs[i2].additiveValue = add1DArray([], kfs[i2].value, startValue, -1);
        } else if (isArrayValueType(valType)) {
          kfs[i2].additiveValue = valType === VALUE_TYPE_1D_ARRAY ? add1DArray([], kfs[i2].value, startValue, -1) : add2DArray([], kfs[i2].value, startValue, -1);
        }
      }
    }
  };
  Track2.prototype.step = function(target, percent) {
    if (this._finished) {
      return;
    }
    if (this._additiveTrack && this._additiveTrack._finished) {
      this._additiveTrack = null;
    }
    var isAdditive = this._additiveTrack != null;
    var valueKey = isAdditive ? "additiveValue" : "value";
    var valType = this.valType;
    var keyframes = this.keyframes;
    var kfsNum = keyframes.length;
    var propName = this.propName;
    var isValueColor = valType === VALUE_TYPE_COLOR;
    var frameIdx;
    var lastFrame = this._lastFr;
    var mathMin2 = Math.min;
    var frame;
    var nextFrame;
    if (kfsNum === 1) {
      frame = nextFrame = keyframes[0];
    } else {
      if (percent < 0) {
        frameIdx = 0;
      } else if (percent < this._lastFrP) {
        var start2 = mathMin2(lastFrame + 1, kfsNum - 1);
        for (frameIdx = start2; frameIdx >= 0; frameIdx--) {
          if (keyframes[frameIdx].percent <= percent) {
            break;
          }
        }
        frameIdx = mathMin2(frameIdx, kfsNum - 2);
      } else {
        for (frameIdx = lastFrame; frameIdx < kfsNum; frameIdx++) {
          if (keyframes[frameIdx].percent > percent) {
            break;
          }
        }
        frameIdx = mathMin2(frameIdx - 1, kfsNum - 2);
      }
      nextFrame = keyframes[frameIdx + 1];
      frame = keyframes[frameIdx];
    }
    if (!(frame && nextFrame)) {
      return;
    }
    this._lastFr = frameIdx;
    this._lastFrP = percent;
    var interval = nextFrame.percent - frame.percent;
    var w2 = interval === 0 ? 1 : mathMin2((percent - frame.percent) / interval, 1);
    if (nextFrame.easingFunc) {
      w2 = nextFrame.easingFunc(w2);
    }
    var targetArr = isAdditive ? this._additiveValue : isValueColor ? tmpRgba : target[propName];
    if ((isArrayValueType(valType) || isValueColor) && !targetArr) {
      targetArr = this._additiveValue = [];
    }
    if (this.discrete) {
      target[propName] = w2 < 1 ? frame.rawValue : nextFrame.rawValue;
    } else if (isArrayValueType(valType)) {
      valType === VALUE_TYPE_1D_ARRAY ? interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w2) : interpolate2DArray(targetArr, frame[valueKey], nextFrame[valueKey], w2);
    } else if (isGradientValueType(valType)) {
      var val = frame[valueKey];
      var nextVal_1 = nextFrame[valueKey];
      var isLinearGradient_1 = valType === VALUE_TYPE_LINEAR_GRADIENT;
      target[propName] = {
        type: isLinearGradient_1 ? "linear" : "radial",
        x: interpolateNumber(val.x, nextVal_1.x, w2),
        y: interpolateNumber(val.y, nextVal_1.y, w2),
        colorStops: map(val.colorStops, function(colorStop, idx) {
          var nextColorStop = nextVal_1.colorStops[idx];
          return {
            offset: interpolateNumber(colorStop.offset, nextColorStop.offset, w2),
            color: rgba2String(interpolate1DArray([], colorStop.color, nextColorStop.color, w2))
          };
        }),
        global: nextVal_1.global
      };
      if (isLinearGradient_1) {
        target[propName].x2 = interpolateNumber(val.x2, nextVal_1.x2, w2);
        target[propName].y2 = interpolateNumber(val.y2, nextVal_1.y2, w2);
      } else {
        target[propName].r = interpolateNumber(val.r, nextVal_1.r, w2);
      }
    } else if (isValueColor) {
      interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w2);
      if (!isAdditive) {
        target[propName] = rgba2String(targetArr);
      }
    } else {
      var value = interpolateNumber(frame[valueKey], nextFrame[valueKey], w2);
      if (isAdditive) {
        this._additiveValue = value;
      } else {
        target[propName] = value;
      }
    }
    if (isAdditive) {
      this._addToTarget(target);
    }
  };
  Track2.prototype._addToTarget = function(target) {
    var valType = this.valType;
    var propName = this.propName;
    var additiveValue = this._additiveValue;
    if (valType === VALUE_TYPE_NUMBER) {
      target[propName] = target[propName] + additiveValue;
    } else if (valType === VALUE_TYPE_COLOR) {
      parse(target[propName], tmpRgba);
      add1DArray(tmpRgba, tmpRgba, additiveValue, 1);
      target[propName] = rgba2String(tmpRgba);
    } else if (valType === VALUE_TYPE_1D_ARRAY) {
      add1DArray(target[propName], target[propName], additiveValue, 1);
    } else if (valType === VALUE_TYPE_2D_ARRAY) {
      add2DArray(target[propName], target[propName], additiveValue, 1);
    }
  };
  return Track2;
}();
var Animator = function() {
  function Animator2(target, loop, allowDiscreteAnimation, additiveTo) {
    this._tracks = {};
    this._trackKeys = [];
    this._maxTime = 0;
    this._started = 0;
    this._clip = null;
    this._target = target;
    this._loop = loop;
    if (loop && additiveTo) {
      logError("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = additiveTo;
    this._allowDiscrete = allowDiscreteAnimation;
  }
  Animator2.prototype.getMaxTime = function() {
    return this._maxTime;
  };
  Animator2.prototype.getDelay = function() {
    return this._delay;
  };
  Animator2.prototype.getLoop = function() {
    return this._loop;
  };
  Animator2.prototype.getTarget = function() {
    return this._target;
  };
  Animator2.prototype.changeTarget = function(target) {
    this._target = target;
  };
  Animator2.prototype.when = function(time, props, easing) {
    return this.whenWithKeys(time, props, keys(props), easing);
  };
  Animator2.prototype.whenWithKeys = function(time, props, propNames, easing) {
    var tracks = this._tracks;
    for (var i2 = 0; i2 < propNames.length; i2++) {
      var propName = propNames[i2];
      var track = tracks[propName];
      if (!track) {
        track = tracks[propName] = new Track(propName);
        var initialValue = void 0;
        var additiveTrack = this._getAdditiveTrack(propName);
        if (additiveTrack) {
          var addtiveTrackKfs = additiveTrack.keyframes;
          var lastFinalKf = addtiveTrackKfs[addtiveTrackKfs.length - 1];
          initialValue = lastFinalKf && lastFinalKf.value;
          if (additiveTrack.valType === VALUE_TYPE_COLOR && initialValue) {
            initialValue = rgba2String(initialValue);
          }
        } else {
          initialValue = this._target[propName];
        }
        if (initialValue == null) {
          continue;
        }
        if (time > 0) {
          track.addKeyframe(0, cloneValue(initialValue), easing);
        }
        this._trackKeys.push(propName);
      }
      track.addKeyframe(time, cloneValue(props[propName]), easing);
    }
    this._maxTime = Math.max(this._maxTime, time);
    return this;
  };
  Animator2.prototype.pause = function() {
    this._clip.pause();
    this._paused = true;
  };
  Animator2.prototype.resume = function() {
    this._clip.resume();
    this._paused = false;
  };
  Animator2.prototype.isPaused = function() {
    return !!this._paused;
  };
  Animator2.prototype.duration = function(duration) {
    this._maxTime = duration;
    this._force = true;
    return this;
  };
  Animator2.prototype._doneCallback = function() {
    this._setTracksFinished();
    this._clip = null;
    var doneList = this._doneCbs;
    if (doneList) {
      var len2 = doneList.length;
      for (var i2 = 0; i2 < len2; i2++) {
        doneList[i2].call(this);
      }
    }
  };
  Animator2.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var animation = this.animation;
    var abortedList = this._abortedCbs;
    if (animation) {
      animation.removeClip(this._clip);
    }
    this._clip = null;
    if (abortedList) {
      for (var i2 = 0; i2 < abortedList.length; i2++) {
        abortedList[i2].call(this);
      }
    }
  };
  Animator2.prototype._setTracksFinished = function() {
    var tracks = this._tracks;
    var tracksKeys = this._trackKeys;
    for (var i2 = 0; i2 < tracksKeys.length; i2++) {
      tracks[tracksKeys[i2]].setFinished();
    }
  };
  Animator2.prototype._getAdditiveTrack = function(trackName) {
    var additiveTrack;
    var additiveAnimators = this._additiveAnimators;
    if (additiveAnimators) {
      for (var i2 = 0; i2 < additiveAnimators.length; i2++) {
        var track = additiveAnimators[i2].getTrack(trackName);
        if (track) {
          additiveTrack = track;
        }
      }
    }
    return additiveTrack;
  };
  Animator2.prototype.start = function(easing) {
    if (this._started > 0) {
      return;
    }
    this._started = 1;
    var self2 = this;
    var tracks = [];
    var maxTime = this._maxTime || 0;
    for (var i2 = 0; i2 < this._trackKeys.length; i2++) {
      var propName = this._trackKeys[i2];
      var track = this._tracks[propName];
      var additiveTrack = this._getAdditiveTrack(propName);
      var kfs = track.keyframes;
      var kfsNum = kfs.length;
      track.prepare(maxTime, additiveTrack);
      if (track.needsAnimate()) {
        if (!this._allowDiscrete && track.discrete) {
          var lastKf = kfs[kfsNum - 1];
          if (lastKf) {
            self2._target[track.propName] = lastKf.rawValue;
          }
          track.setFinished();
        } else {
          tracks.push(track);
        }
      }
    }
    if (tracks.length || this._force) {
      var clip = new Clip$1({
        life: maxTime,
        loop: this._loop,
        delay: this._delay || 0,
        onframe: function(percent) {
          self2._started = 2;
          var additiveAnimators = self2._additiveAnimators;
          if (additiveAnimators) {
            var stillHasAdditiveAnimator = false;
            for (var i3 = 0; i3 < additiveAnimators.length; i3++) {
              if (additiveAnimators[i3]._clip) {
                stillHasAdditiveAnimator = true;
                break;
              }
            }
            if (!stillHasAdditiveAnimator) {
              self2._additiveAnimators = null;
            }
          }
          for (var i3 = 0; i3 < tracks.length; i3++) {
            tracks[i3].step(self2._target, percent);
          }
          var onframeList = self2._onframeCbs;
          if (onframeList) {
            for (var i3 = 0; i3 < onframeList.length; i3++) {
              onframeList[i3](self2._target, percent);
            }
          }
        },
        ondestroy: function() {
          self2._doneCallback();
        }
      });
      this._clip = clip;
      if (this.animation) {
        this.animation.addClip(clip);
      }
      if (easing) {
        clip.setEasing(easing);
      }
    } else {
      this._doneCallback();
    }
    return this;
  };
  Animator2.prototype.stop = function(forwardToLast) {
    if (!this._clip) {
      return;
    }
    var clip = this._clip;
    if (forwardToLast) {
      clip.onframe(1);
    }
    this._abortedCallback();
  };
  Animator2.prototype.delay = function(time) {
    this._delay = time;
    return this;
  };
  Animator2.prototype.during = function(cb) {
    if (cb) {
      if (!this._onframeCbs) {
        this._onframeCbs = [];
      }
      this._onframeCbs.push(cb);
    }
    return this;
  };
  Animator2.prototype.done = function(cb) {
    if (cb) {
      if (!this._doneCbs) {
        this._doneCbs = [];
      }
      this._doneCbs.push(cb);
    }
    return this;
  };
  Animator2.prototype.aborted = function(cb) {
    if (cb) {
      if (!this._abortedCbs) {
        this._abortedCbs = [];
      }
      this._abortedCbs.push(cb);
    }
    return this;
  };
  Animator2.prototype.getClip = function() {
    return this._clip;
  };
  Animator2.prototype.getTrack = function(propName) {
    return this._tracks[propName];
  };
  Animator2.prototype.getTracks = function() {
    var _this = this;
    return map(this._trackKeys, function(key) {
      return _this._tracks[key];
    });
  };
  Animator2.prototype.stopTracks = function(propNames, forwardToLast) {
    if (!propNames.length || !this._clip) {
      return true;
    }
    var tracks = this._tracks;
    var tracksKeys = this._trackKeys;
    for (var i2 = 0; i2 < propNames.length; i2++) {
      var track = tracks[propNames[i2]];
      if (track && !track.isFinished()) {
        if (forwardToLast) {
          track.step(this._target, 1);
        } else if (this._started === 1) {
          track.step(this._target, 0);
        }
        track.setFinished();
      }
    }
    var allAborted = true;
    for (var i2 = 0; i2 < tracksKeys.length; i2++) {
      if (!tracks[tracksKeys[i2]].isFinished()) {
        allAborted = false;
        break;
      }
    }
    if (allAborted) {
      this._abortedCallback();
    }
    return allAborted;
  };
  Animator2.prototype.saveTo = function(target, trackKeys, firstOrLast) {
    if (!target) {
      return;
    }
    trackKeys = trackKeys || this._trackKeys;
    for (var i2 = 0; i2 < trackKeys.length; i2++) {
      var propName = trackKeys[i2];
      var track = this._tracks[propName];
      if (!track || track.isFinished()) {
        continue;
      }
      var kfs = track.keyframes;
      var kf = kfs[firstOrLast ? 0 : kfs.length - 1];
      if (kf) {
        target[propName] = cloneValue(kf.rawValue);
      }
    }
  };
  Animator2.prototype.__changeFinalValue = function(finalProps, trackKeys) {
    trackKeys = trackKeys || keys(finalProps);
    for (var i2 = 0; i2 < trackKeys.length; i2++) {
      var propName = trackKeys[i2];
      var track = this._tracks[propName];
      if (!track) {
        continue;
      }
      var kfs = track.keyframes;
      if (kfs.length > 1) {
        var lastKf = kfs.pop();
        track.addKeyframe(lastKf.time, finalProps[propName]);
        track.prepare(this._maxTime, track.getAdditiveTrack());
      }
    }
  };
  return Animator2;
}();
var Animator$1 = Animator;
function getTime() {
  return new Date().getTime();
}
var Animation = function(_super) {
  __extends(Animation2, _super);
  function Animation2(opts) {
    var _this = _super.call(this) || this;
    _this._running = false;
    _this._time = 0;
    _this._pausedTime = 0;
    _this._pauseStart = 0;
    _this._paused = false;
    opts = opts || {};
    _this.stage = opts.stage || {};
    return _this;
  }
  Animation2.prototype.addClip = function(clip) {
    if (clip.animation) {
      this.removeClip(clip);
    }
    if (!this._head) {
      this._head = this._tail = clip;
    } else {
      this._tail.next = clip;
      clip.prev = this._tail;
      clip.next = null;
      this._tail = clip;
    }
    clip.animation = this;
  };
  Animation2.prototype.addAnimator = function(animator) {
    animator.animation = this;
    var clip = animator.getClip();
    if (clip) {
      this.addClip(clip);
    }
  };
  Animation2.prototype.removeClip = function(clip) {
    if (!clip.animation) {
      return;
    }
    var prev = clip.prev;
    var next = clip.next;
    if (prev) {
      prev.next = next;
    } else {
      this._head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this._tail = prev;
    }
    clip.next = clip.prev = clip.animation = null;
  };
  Animation2.prototype.removeAnimator = function(animator) {
    var clip = animator.getClip();
    if (clip) {
      this.removeClip(clip);
    }
    animator.animation = null;
  };
  Animation2.prototype.update = function(notTriggerFrameAndStageUpdate) {
    var time = getTime() - this._pausedTime;
    var delta = time - this._time;
    var clip = this._head;
    while (clip) {
      var nextClip = clip.next;
      var finished = clip.step(time, delta);
      if (finished) {
        clip.ondestroy();
        this.removeClip(clip);
        clip = nextClip;
      } else {
        clip = nextClip;
      }
    }
    this._time = time;
    if (!notTriggerFrameAndStageUpdate) {
      this.trigger("frame", delta);
      this.stage.update && this.stage.update();
    }
  };
  Animation2.prototype._startLoop = function() {
    var self2 = this;
    this._running = true;
    function step() {
      if (self2._running) {
        requestAnimationFrame$2(step);
        !self2._paused && self2.update();
      }
    }
    requestAnimationFrame$2(step);
  };
  Animation2.prototype.start = function() {
    if (this._running) {
      return;
    }
    this._time = getTime();
    this._pausedTime = 0;
    this._startLoop();
  };
  Animation2.prototype.stop = function() {
    this._running = false;
  };
  Animation2.prototype.pause = function() {
    if (!this._paused) {
      this._pauseStart = getTime();
      this._paused = true;
    }
  };
  Animation2.prototype.resume = function() {
    if (this._paused) {
      this._pausedTime += getTime() - this._pauseStart;
      this._paused = false;
    }
  };
  Animation2.prototype.clear = function() {
    var clip = this._head;
    while (clip) {
      var nextClip = clip.next;
      clip.prev = clip.next = clip.animation = null;
      clip = nextClip;
    }
    this._head = this._tail = null;
  };
  Animation2.prototype.isFinished = function() {
    return this._head == null;
  };
  Animation2.prototype.animate = function(target, options) {
    options = options || {};
    this.start();
    var animator = new Animator$1(target, options.loop);
    this.addAnimator(animator);
    return animator;
  };
  return Animation2;
}(Eventful$1);
var Animation$1 = Animation;
var TOUCH_CLICK_DELAY = 300;
var globalEventSupported = env$1.domSupported;
var localNativeListenerNames = function() {
  var mouseHandlerNames = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ];
  var touchHandlerNames = [
    "touchstart",
    "touchend",
    "touchmove"
  ];
  var pointerEventNameMap = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  };
  var pointerHandlerNames = map(mouseHandlerNames, function(name) {
    var nm = name.replace("mouse", "pointer");
    return pointerEventNameMap.hasOwnProperty(nm) ? nm : name;
  });
  return {
    mouse: mouseHandlerNames,
    touch: touchHandlerNames,
    pointer: pointerHandlerNames
  };
}();
var globalNativeListenerNames = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
};
var wheelEventSupported = false;
function isPointerFromTouch(event) {
  var pointerType = event.pointerType;
  return pointerType === "pen" || pointerType === "touch";
}
function setTouchTimer(scope) {
  scope.touching = true;
  if (scope.touchTimer != null) {
    clearTimeout(scope.touchTimer);
    scope.touchTimer = null;
  }
  scope.touchTimer = setTimeout(function() {
    scope.touching = false;
    scope.touchTimer = null;
  }, 700);
}
function markTouch(event) {
  event && (event.zrByTouch = true);
}
function normalizeGlobalEvent(instance, event) {
  return normalizeEvent(instance.dom, new FakeGlobalEvent(instance, event), true);
}
function isLocalEl(instance, el) {
  var elTmp = el;
  var isLocal = false;
  while (elTmp && elTmp.nodeType !== 9 && !(isLocal = elTmp.domBelongToZr || elTmp !== el && elTmp === instance.painterRoot)) {
    elTmp = elTmp.parentNode;
  }
  return isLocal;
}
var FakeGlobalEvent = function() {
  function FakeGlobalEvent2(instance, event) {
    this.stopPropagation = noop;
    this.stopImmediatePropagation = noop;
    this.preventDefault = noop;
    this.type = event.type;
    this.target = this.currentTarget = instance.dom;
    this.pointerType = event.pointerType;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }
  return FakeGlobalEvent2;
}();
var localDOMHandlers = {
  mousedown: function(event) {
    event = normalizeEvent(this.dom, event);
    this.__mayPointerCapture = [event.zrX, event.zrY];
    this.trigger("mousedown", event);
  },
  mousemove: function(event) {
    event = normalizeEvent(this.dom, event);
    var downPoint = this.__mayPointerCapture;
    if (downPoint && (event.zrX !== downPoint[0] || event.zrY !== downPoint[1])) {
      this.__togglePointerCapture(true);
    }
    this.trigger("mousemove", event);
  },
  mouseup: function(event) {
    event = normalizeEvent(this.dom, event);
    this.__togglePointerCapture(false);
    this.trigger("mouseup", event);
  },
  mouseout: function(event) {
    event = normalizeEvent(this.dom, event);
    var element = event.toElement || event.relatedTarget;
    if (!isLocalEl(this, element)) {
      if (this.__pointerCapturing) {
        event.zrEventControl = "no_globalout";
      }
      this.trigger("mouseout", event);
    }
  },
  wheel: function(event) {
    wheelEventSupported = true;
    event = normalizeEvent(this.dom, event);
    this.trigger("mousewheel", event);
  },
  mousewheel: function(event) {
    if (wheelEventSupported) {
      return;
    }
    event = normalizeEvent(this.dom, event);
    this.trigger("mousewheel", event);
  },
  touchstart: function(event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.__lastTouchMoment = new Date();
    this.handler.processGesture(event, "start");
    localDOMHandlers.mousemove.call(this, event);
    localDOMHandlers.mousedown.call(this, event);
  },
  touchmove: function(event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.handler.processGesture(event, "change");
    localDOMHandlers.mousemove.call(this, event);
  },
  touchend: function(event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.handler.processGesture(event, "end");
    localDOMHandlers.mouseup.call(this, event);
    if (+new Date() - +this.__lastTouchMoment < TOUCH_CLICK_DELAY) {
      localDOMHandlers.click.call(this, event);
    }
  },
  pointerdown: function(event) {
    localDOMHandlers.mousedown.call(this, event);
  },
  pointermove: function(event) {
    if (!isPointerFromTouch(event)) {
      localDOMHandlers.mousemove.call(this, event);
    }
  },
  pointerup: function(event) {
    localDOMHandlers.mouseup.call(this, event);
  },
  pointerout: function(event) {
    if (!isPointerFromTouch(event)) {
      localDOMHandlers.mouseout.call(this, event);
    }
  }
};
each(["click", "dblclick", "contextmenu"], function(name) {
  localDOMHandlers[name] = function(event) {
    event = normalizeEvent(this.dom, event);
    this.trigger(name, event);
  };
});
var globalDOMHandlers = {
  pointermove: function(event) {
    if (!isPointerFromTouch(event)) {
      globalDOMHandlers.mousemove.call(this, event);
    }
  },
  pointerup: function(event) {
    globalDOMHandlers.mouseup.call(this, event);
  },
  mousemove: function(event) {
    this.trigger("mousemove", event);
  },
  mouseup: function(event) {
    var pointerCaptureReleasing = this.__pointerCapturing;
    this.__togglePointerCapture(false);
    this.trigger("mouseup", event);
    if (pointerCaptureReleasing) {
      event.zrEventControl = "only_globalout";
      this.trigger("mouseout", event);
    }
  }
};
function mountLocalDOMEventListeners(instance, scope) {
  var domHandlers = scope.domHandlers;
  if (env$1.pointerEventsSupported) {
    each(localNativeListenerNames.pointer, function(nativeEventName) {
      mountSingleDOMEventListener(scope, nativeEventName, function(event) {
        domHandlers[nativeEventName].call(instance, event);
      });
    });
  } else {
    if (env$1.touchEventsSupported) {
      each(localNativeListenerNames.touch, function(nativeEventName) {
        mountSingleDOMEventListener(scope, nativeEventName, function(event) {
          domHandlers[nativeEventName].call(instance, event);
          setTouchTimer(scope);
        });
      });
    }
    each(localNativeListenerNames.mouse, function(nativeEventName) {
      mountSingleDOMEventListener(scope, nativeEventName, function(event) {
        event = getNativeEvent(event);
        if (!scope.touching) {
          domHandlers[nativeEventName].call(instance, event);
        }
      });
    });
  }
}
function mountGlobalDOMEventListeners(instance, scope) {
  if (env$1.pointerEventsSupported) {
    each(globalNativeListenerNames.pointer, mount);
  } else if (!env$1.touchEventsSupported) {
    each(globalNativeListenerNames.mouse, mount);
  }
  function mount(nativeEventName) {
    function nativeEventListener(event) {
      event = getNativeEvent(event);
      if (!isLocalEl(instance, event.target)) {
        event = normalizeGlobalEvent(instance, event);
        scope.domHandlers[nativeEventName].call(instance, event);
      }
    }
    mountSingleDOMEventListener(scope, nativeEventName, nativeEventListener, { capture: true });
  }
}
function mountSingleDOMEventListener(scope, nativeEventName, listener, opt) {
  scope.mounted[nativeEventName] = listener;
  scope.listenerOpts[nativeEventName] = opt;
  addEventListener(scope.domTarget, nativeEventName, listener, opt);
}
function unmountDOMEventListeners(scope) {
  var mounted = scope.mounted;
  for (var nativeEventName in mounted) {
    if (mounted.hasOwnProperty(nativeEventName)) {
      removeEventListener(scope.domTarget, nativeEventName, mounted[nativeEventName], scope.listenerOpts[nativeEventName]);
    }
  }
  scope.mounted = {};
}
var DOMHandlerScope = function() {
  function DOMHandlerScope2(domTarget, domHandlers) {
    this.mounted = {};
    this.listenerOpts = {};
    this.touching = false;
    this.domTarget = domTarget;
    this.domHandlers = domHandlers;
  }
  return DOMHandlerScope2;
}();
var HandlerDomProxy = function(_super) {
  __extends(HandlerDomProxy2, _super);
  function HandlerDomProxy2(dom, painterRoot) {
    var _this = _super.call(this) || this;
    _this.__pointerCapturing = false;
    _this.dom = dom;
    _this.painterRoot = painterRoot;
    _this._localHandlerScope = new DOMHandlerScope(dom, localDOMHandlers);
    if (globalEventSupported) {
      _this._globalHandlerScope = new DOMHandlerScope(document, globalDOMHandlers);
    }
    mountLocalDOMEventListeners(_this, _this._localHandlerScope);
    return _this;
  }
  HandlerDomProxy2.prototype.dispose = function() {
    unmountDOMEventListeners(this._localHandlerScope);
    if (globalEventSupported) {
      unmountDOMEventListeners(this._globalHandlerScope);
    }
  };
  HandlerDomProxy2.prototype.setCursor = function(cursorStyle) {
    this.dom.style && (this.dom.style.cursor = cursorStyle || "default");
  };
  HandlerDomProxy2.prototype.__togglePointerCapture = function(isPointerCapturing) {
    this.__mayPointerCapture = null;
    if (globalEventSupported && +this.__pointerCapturing ^ +isPointerCapturing) {
      this.__pointerCapturing = isPointerCapturing;
      var globalHandlerScope = this._globalHandlerScope;
      isPointerCapturing ? mountGlobalDOMEventListeners(this, globalHandlerScope) : unmountDOMEventListeners(globalHandlerScope);
    }
  };
  return HandlerDomProxy2;
}(Eventful$1);
var HandlerProxy = HandlerDomProxy;
var dpr = 1;
if (env$1.hasGlobalWindow) {
  dpr = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1);
}
var devicePixelRatio = dpr;
var DARK_MODE_THRESHOLD = 0.4;
var DARK_LABEL_COLOR = "#333";
var LIGHT_LABEL_COLOR = "#ccc";
var LIGHTER_LABEL_COLOR = "#eee";
function create() {
  return [1, 0, 0, 1, 0, 0];
}
function identity(out2) {
  out2[0] = 1;
  out2[1] = 0;
  out2[2] = 0;
  out2[3] = 1;
  out2[4] = 0;
  out2[5] = 0;
  return out2;
}
function copy(out2, m2) {
  out2[0] = m2[0];
  out2[1] = m2[1];
  out2[2] = m2[2];
  out2[3] = m2[3];
  out2[4] = m2[4];
  out2[5] = m2[5];
  return out2;
}
function mul(out2, m1, m2) {
  var out0 = m1[0] * m2[0] + m1[2] * m2[1];
  var out1 = m1[1] * m2[0] + m1[3] * m2[1];
  var out22 = m1[0] * m2[2] + m1[2] * m2[3];
  var out3 = m1[1] * m2[2] + m1[3] * m2[3];
  var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
  var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
  out2[0] = out0;
  out2[1] = out1;
  out2[2] = out22;
  out2[3] = out3;
  out2[4] = out4;
  out2[5] = out5;
  return out2;
}
function translate(out2, a2, v2) {
  out2[0] = a2[0];
  out2[1] = a2[1];
  out2[2] = a2[2];
  out2[3] = a2[3];
  out2[4] = a2[4] + v2[0];
  out2[5] = a2[5] + v2[1];
  return out2;
}
function rotate(out2, a2, rad) {
  var aa = a2[0];
  var ac = a2[2];
  var atx = a2[4];
  var ab = a2[1];
  var ad = a2[3];
  var aty = a2[5];
  var st2 = Math.sin(rad);
  var ct2 = Math.cos(rad);
  out2[0] = aa * ct2 + ab * st2;
  out2[1] = -aa * st2 + ab * ct2;
  out2[2] = ac * ct2 + ad * st2;
  out2[3] = -ac * st2 + ct2 * ad;
  out2[4] = ct2 * atx + st2 * aty;
  out2[5] = ct2 * aty - st2 * atx;
  return out2;
}
function scale(out2, a2, v2) {
  var vx = v2[0];
  var vy = v2[1];
  out2[0] = a2[0] * vx;
  out2[1] = a2[1] * vy;
  out2[2] = a2[2] * vx;
  out2[3] = a2[3] * vy;
  out2[4] = a2[4] * vx;
  out2[5] = a2[5] * vy;
  return out2;
}
function invert(out2, a2) {
  var aa = a2[0];
  var ac = a2[2];
  var atx = a2[4];
  var ab = a2[1];
  var ad = a2[3];
  var aty = a2[5];
  var det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out2[0] = ad * det;
  out2[1] = -ab * det;
  out2[2] = -ac * det;
  out2[3] = aa * det;
  out2[4] = (ac * aty - ad * atx) * det;
  out2[5] = (ab * atx - aa * aty) * det;
  return out2;
}
var mIdentity = identity;
var EPSILON$1 = 5e-5;
function isNotAroundZero(val) {
  return val > EPSILON$1 || val < -EPSILON$1;
}
var scaleTmp = [];
var tmpTransform = [];
var originTransform = create();
var abs = Math.abs;
var Transformable = function() {
  function Transformable2() {
  }
  Transformable2.prototype.getLocalTransform = function(m2) {
    return Transformable2.getLocalTransform(this, m2);
  };
  Transformable2.prototype.setPosition = function(arr) {
    this.x = arr[0];
    this.y = arr[1];
  };
  Transformable2.prototype.setScale = function(arr) {
    this.scaleX = arr[0];
    this.scaleY = arr[1];
  };
  Transformable2.prototype.setSkew = function(arr) {
    this.skewX = arr[0];
    this.skewY = arr[1];
  };
  Transformable2.prototype.setOrigin = function(arr) {
    this.originX = arr[0];
    this.originY = arr[1];
  };
  Transformable2.prototype.needLocalTransform = function() {
    return isNotAroundZero(this.rotation) || isNotAroundZero(this.x) || isNotAroundZero(this.y) || isNotAroundZero(this.scaleX - 1) || isNotAroundZero(this.scaleY - 1) || isNotAroundZero(this.skewX) || isNotAroundZero(this.skewY);
  };
  Transformable2.prototype.updateTransform = function() {
    var parentTransform = this.parent && this.parent.transform;
    var needLocalTransform = this.needLocalTransform();
    var m2 = this.transform;
    if (!(needLocalTransform || parentTransform)) {
      m2 && mIdentity(m2);
      return;
    }
    m2 = m2 || create();
    if (needLocalTransform) {
      this.getLocalTransform(m2);
    } else {
      mIdentity(m2);
    }
    if (parentTransform) {
      if (needLocalTransform) {
        mul(m2, parentTransform, m2);
      } else {
        copy(m2, parentTransform);
      }
    }
    this.transform = m2;
    this._resolveGlobalScaleRatio(m2);
  };
  Transformable2.prototype._resolveGlobalScaleRatio = function(m2) {
    var globalScaleRatio = this.globalScaleRatio;
    if (globalScaleRatio != null && globalScaleRatio !== 1) {
      this.getGlobalScale(scaleTmp);
      var relX = scaleTmp[0] < 0 ? -1 : 1;
      var relY = scaleTmp[1] < 0 ? -1 : 1;
      var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
      var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
      m2[0] *= sx;
      m2[1] *= sx;
      m2[2] *= sy;
      m2[3] *= sy;
    }
    this.invTransform = this.invTransform || create();
    invert(this.invTransform, m2);
  };
  Transformable2.prototype.getComputedTransform = function() {
    var transformNode = this;
    var ancestors = [];
    while (transformNode) {
      ancestors.push(transformNode);
      transformNode = transformNode.parent;
    }
    while (transformNode = ancestors.pop()) {
      transformNode.updateTransform();
    }
    return this.transform;
  };
  Transformable2.prototype.setLocalTransform = function(m2) {
    if (!m2) {
      return;
    }
    var sx = m2[0] * m2[0] + m2[1] * m2[1];
    var sy = m2[2] * m2[2] + m2[3] * m2[3];
    var rotation = Math.atan2(m2[1], m2[0]);
    var shearX = Math.PI / 2 + rotation - Math.atan2(m2[3], m2[2]);
    sy = Math.sqrt(sy) * Math.cos(shearX);
    sx = Math.sqrt(sx);
    this.skewX = shearX;
    this.skewY = 0;
    this.rotation = -rotation;
    this.x = +m2[4];
    this.y = +m2[5];
    this.scaleX = sx;
    this.scaleY = sy;
    this.originX = 0;
    this.originY = 0;
  };
  Transformable2.prototype.decomposeTransform = function() {
    if (!this.transform) {
      return;
    }
    var parent = this.parent;
    var m2 = this.transform;
    if (parent && parent.transform) {
      mul(tmpTransform, parent.invTransform, m2);
      m2 = tmpTransform;
    }
    var ox = this.originX;
    var oy = this.originY;
    if (ox || oy) {
      originTransform[4] = ox;
      originTransform[5] = oy;
      mul(tmpTransform, m2, originTransform);
      tmpTransform[4] -= ox;
      tmpTransform[5] -= oy;
      m2 = tmpTransform;
    }
    this.setLocalTransform(m2);
  };
  Transformable2.prototype.getGlobalScale = function(out2) {
    var m2 = this.transform;
    out2 = out2 || [];
    if (!m2) {
      out2[0] = 1;
      out2[1] = 1;
      return out2;
    }
    out2[0] = Math.sqrt(m2[0] * m2[0] + m2[1] * m2[1]);
    out2[1] = Math.sqrt(m2[2] * m2[2] + m2[3] * m2[3]);
    if (m2[0] < 0) {
      out2[0] = -out2[0];
    }
    if (m2[3] < 0) {
      out2[1] = -out2[1];
    }
    return out2;
  };
  Transformable2.prototype.transformCoordToLocal = function(x2, y2) {
    var v2 = [x2, y2];
    var invTransform = this.invTransform;
    if (invTransform) {
      applyTransform(v2, v2, invTransform);
    }
    return v2;
  };
  Transformable2.prototype.transformCoordToGlobal = function(x2, y2) {
    var v2 = [x2, y2];
    var transform = this.transform;
    if (transform) {
      applyTransform(v2, v2, transform);
    }
    return v2;
  };
  Transformable2.prototype.getLineScale = function() {
    var m2 = this.transform;
    return m2 && abs(m2[0] - 1) > 1e-10 && abs(m2[3] - 1) > 1e-10 ? Math.sqrt(abs(m2[0] * m2[3] - m2[2] * m2[1])) : 1;
  };
  Transformable2.prototype.copyTransform = function(source2) {
    copyTransform(this, source2);
  };
  Transformable2.getLocalTransform = function(target, m2) {
    m2 = m2 || [];
    var ox = target.originX || 0;
    var oy = target.originY || 0;
    var sx = target.scaleX;
    var sy = target.scaleY;
    var ax = target.anchorX;
    var ay = target.anchorY;
    var rotation = target.rotation || 0;
    var x2 = target.x;
    var y2 = target.y;
    var skewX = target.skewX ? Math.tan(target.skewX) : 0;
    var skewY = target.skewY ? Math.tan(-target.skewY) : 0;
    if (ox || oy || ax || ay) {
      var dx = ox + ax;
      var dy = oy + ay;
      m2[4] = -dx * sx - skewX * dy * sy;
      m2[5] = -dy * sy - skewY * dx * sx;
    } else {
      m2[4] = m2[5] = 0;
    }
    m2[0] = sx;
    m2[3] = sy;
    m2[1] = skewY * sx;
    m2[2] = skewX * sy;
    rotation && rotate(m2, m2, rotation);
    m2[4] += ox + x2;
    m2[5] += oy + y2;
    return m2;
  };
  Transformable2.initDefaultProps = function() {
    var proto = Transformable2.prototype;
    proto.scaleX = proto.scaleY = proto.globalScaleRatio = 1;
    proto.x = proto.y = proto.originX = proto.originY = proto.skewX = proto.skewY = proto.rotation = proto.anchorX = proto.anchorY = 0;
  }();
  return Transformable2;
}();
var TRANSFORMABLE_PROPS = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function copyTransform(target, source2) {
  for (var i2 = 0; i2 < TRANSFORMABLE_PROPS.length; i2++) {
    var propName = TRANSFORMABLE_PROPS[i2];
    target[propName] = source2[propName];
  }
}
var Point = function() {
  function Point2(x2, y2) {
    this.x = x2 || 0;
    this.y = y2 || 0;
  }
  Point2.prototype.copy = function(other) {
    this.x = other.x;
    this.y = other.y;
    return this;
  };
  Point2.prototype.clone = function() {
    return new Point2(this.x, this.y);
  };
  Point2.prototype.set = function(x2, y2) {
    this.x = x2;
    this.y = y2;
    return this;
  };
  Point2.prototype.equal = function(other) {
    return other.x === this.x && other.y === this.y;
  };
  Point2.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  };
  Point2.prototype.scale = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  };
  Point2.prototype.scaleAndAdd = function(other, scalar) {
    this.x += other.x * scalar;
    this.y += other.y * scalar;
  };
  Point2.prototype.sub = function(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  };
  Point2.prototype.dot = function(other) {
    return this.x * other.x + this.y * other.y;
  };
  Point2.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  Point2.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  };
  Point2.prototype.normalize = function() {
    var len2 = this.len();
    this.x /= len2;
    this.y /= len2;
    return this;
  };
  Point2.prototype.distance = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  Point2.prototype.distanceSquare = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return dx * dx + dy * dy;
  };
  Point2.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };
  Point2.prototype.transform = function(m2) {
    if (!m2) {
      return;
    }
    var x2 = this.x;
    var y2 = this.y;
    this.x = m2[0] * x2 + m2[2] * y2 + m2[4];
    this.y = m2[1] * x2 + m2[3] * y2 + m2[5];
    return this;
  };
  Point2.prototype.toArray = function(out2) {
    out2[0] = this.x;
    out2[1] = this.y;
    return out2;
  };
  Point2.prototype.fromArray = function(input) {
    this.x = input[0];
    this.y = input[1];
  };
  Point2.set = function(p2, x2, y2) {
    p2.x = x2;
    p2.y = y2;
  };
  Point2.copy = function(p2, p22) {
    p2.x = p22.x;
    p2.y = p22.y;
  };
  Point2.len = function(p2) {
    return Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  };
  Point2.lenSquare = function(p2) {
    return p2.x * p2.x + p2.y * p2.y;
  };
  Point2.dot = function(p0, p1) {
    return p0.x * p1.x + p0.y * p1.y;
  };
  Point2.add = function(out2, p0, p1) {
    out2.x = p0.x + p1.x;
    out2.y = p0.y + p1.y;
  };
  Point2.sub = function(out2, p0, p1) {
    out2.x = p0.x - p1.x;
    out2.y = p0.y - p1.y;
  };
  Point2.scale = function(out2, p0, scalar) {
    out2.x = p0.x * scalar;
    out2.y = p0.y * scalar;
  };
  Point2.scaleAndAdd = function(out2, p0, p1, scalar) {
    out2.x = p0.x + p1.x * scalar;
    out2.y = p0.y + p1.y * scalar;
  };
  Point2.lerp = function(out2, p0, p1, t2) {
    var onet = 1 - t2;
    out2.x = onet * p0.x + t2 * p1.x;
    out2.y = onet * p0.y + t2 * p1.y;
  };
  return Point2;
}();
var Point$1 = Point;
var mathMin$3 = Math.min;
var mathMax$3 = Math.max;
var lt = new Point$1();
var rb = new Point$1();
var lb = new Point$1();
var rt = new Point$1();
var minTv$1 = new Point$1();
var maxTv$1 = new Point$1();
var BoundingRect = function() {
  function BoundingRect2(x2, y2, width, height) {
    if (width < 0) {
      x2 = x2 + width;
      width = -width;
    }
    if (height < 0) {
      y2 = y2 + height;
      height = -height;
    }
    this.x = x2;
    this.y = y2;
    this.width = width;
    this.height = height;
  }
  BoundingRect2.prototype.union = function(other) {
    var x2 = mathMin$3(other.x, this.x);
    var y2 = mathMin$3(other.y, this.y);
    if (isFinite(this.x) && isFinite(this.width)) {
      this.width = mathMax$3(other.x + other.width, this.x + this.width) - x2;
    } else {
      this.width = other.width;
    }
    if (isFinite(this.y) && isFinite(this.height)) {
      this.height = mathMax$3(other.y + other.height, this.y + this.height) - y2;
    } else {
      this.height = other.height;
    }
    this.x = x2;
    this.y = y2;
  };
  BoundingRect2.prototype.applyTransform = function(m2) {
    BoundingRect2.applyTransform(this, this, m2);
  };
  BoundingRect2.prototype.calculateTransform = function(b2) {
    var a2 = this;
    var sx = b2.width / a2.width;
    var sy = b2.height / a2.height;
    var m2 = create();
    translate(m2, m2, [-a2.x, -a2.y]);
    scale(m2, m2, [sx, sy]);
    translate(m2, m2, [b2.x, b2.y]);
    return m2;
  };
  BoundingRect2.prototype.intersect = function(b2, mtv) {
    if (!b2) {
      return false;
    }
    if (!(b2 instanceof BoundingRect2)) {
      b2 = BoundingRect2.create(b2);
    }
    var a2 = this;
    var ax0 = a2.x;
    var ax1 = a2.x + a2.width;
    var ay0 = a2.y;
    var ay1 = a2.y + a2.height;
    var bx0 = b2.x;
    var bx1 = b2.x + b2.width;
    var by0 = b2.y;
    var by1 = b2.y + b2.height;
    var overlap = !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
    if (mtv) {
      var dMin = Infinity;
      var dMax = 0;
      var d0 = Math.abs(ax1 - bx0);
      var d1 = Math.abs(bx1 - ax0);
      var d2 = Math.abs(ay1 - by0);
      var d3 = Math.abs(by1 - ay0);
      var dx = Math.min(d0, d1);
      var dy = Math.min(d2, d3);
      if (ax1 < bx0 || bx1 < ax0) {
        if (dx > dMax) {
          dMax = dx;
          if (d0 < d1) {
            Point$1.set(maxTv$1, -d0, 0);
          } else {
            Point$1.set(maxTv$1, d1, 0);
          }
        }
      } else {
        if (dx < dMin) {
          dMin = dx;
          if (d0 < d1) {
            Point$1.set(minTv$1, d0, 0);
          } else {
            Point$1.set(minTv$1, -d1, 0);
          }
        }
      }
      if (ay1 < by0 || by1 < ay0) {
        if (dy > dMax) {
          dMax = dy;
          if (d2 < d3) {
            Point$1.set(maxTv$1, 0, -d2);
          } else {
            Point$1.set(maxTv$1, 0, d3);
          }
        }
      } else {
        if (dx < dMin) {
          dMin = dx;
          if (d2 < d3) {
            Point$1.set(minTv$1, 0, d2);
          } else {
            Point$1.set(minTv$1, 0, -d3);
          }
        }
      }
    }
    if (mtv) {
      Point$1.copy(mtv, overlap ? minTv$1 : maxTv$1);
    }
    return overlap;
  };
  BoundingRect2.prototype.contain = function(x2, y2) {
    var rect = this;
    return x2 >= rect.x && x2 <= rect.x + rect.width && y2 >= rect.y && y2 <= rect.y + rect.height;
  };
  BoundingRect2.prototype.clone = function() {
    return new BoundingRect2(this.x, this.y, this.width, this.height);
  };
  BoundingRect2.prototype.copy = function(other) {
    BoundingRect2.copy(this, other);
  };
  BoundingRect2.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  };
  BoundingRect2.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  };
  BoundingRect2.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  };
  BoundingRect2.create = function(rect) {
    return new BoundingRect2(rect.x, rect.y, rect.width, rect.height);
  };
  BoundingRect2.copy = function(target, source2) {
    target.x = source2.x;
    target.y = source2.y;
    target.width = source2.width;
    target.height = source2.height;
  };
  BoundingRect2.applyTransform = function(target, source2, m2) {
    if (!m2) {
      if (target !== source2) {
        BoundingRect2.copy(target, source2);
      }
      return;
    }
    if (m2[1] < 1e-5 && m2[1] > -1e-5 && m2[2] < 1e-5 && m2[2] > -1e-5) {
      var sx = m2[0];
      var sy = m2[3];
      var tx = m2[4];
      var ty = m2[5];
      target.x = source2.x * sx + tx;
      target.y = source2.y * sy + ty;
      target.width = source2.width * sx;
      target.height = source2.height * sy;
      if (target.width < 0) {
        target.x += target.width;
        target.width = -target.width;
      }
      if (target.height < 0) {
        target.y += target.height;
        target.height = -target.height;
      }
      return;
    }
    lt.x = lb.x = source2.x;
    lt.y = rt.y = source2.y;
    rb.x = rt.x = source2.x + source2.width;
    rb.y = lb.y = source2.y + source2.height;
    lt.transform(m2);
    rt.transform(m2);
    rb.transform(m2);
    lb.transform(m2);
    target.x = mathMin$3(lt.x, rb.x, lb.x, rt.x);
    target.y = mathMin$3(lt.y, rb.y, lb.y, rt.y);
    var maxX = mathMax$3(lt.x, rb.x, lb.x, rt.x);
    var maxY = mathMax$3(lt.y, rb.y, lb.y, rt.y);
    target.width = maxX - target.x;
    target.height = maxY - target.y;
  };
  return BoundingRect2;
}();
var BoundingRect$1 = BoundingRect;
var textWidthCache = {};
function getWidth(text, font) {
  font = font || DEFAULT_FONT;
  var cacheOfFont = textWidthCache[font];
  if (!cacheOfFont) {
    cacheOfFont = textWidthCache[font] = new LRU$1(500);
  }
  var width = cacheOfFont.get(text);
  if (width == null) {
    width = platformApi.measureText(text, font).width;
    cacheOfFont.put(text, width);
  }
  return width;
}
function innerGetBoundingRect(text, font, textAlign, textBaseline) {
  var width = getWidth(text, font);
  var height = getLineHeight(font);
  var x2 = adjustTextX(0, width, textAlign);
  var y2 = adjustTextY(0, height, textBaseline);
  var rect = new BoundingRect$1(x2, y2, width, height);
  return rect;
}
function getBoundingRect(text, font, textAlign, textBaseline) {
  var textLines = ((text || "") + "").split("\n");
  var len2 = textLines.length;
  if (len2 === 1) {
    return innerGetBoundingRect(textLines[0], font, textAlign, textBaseline);
  } else {
    var uniondRect = new BoundingRect$1(0, 0, 0, 0);
    for (var i2 = 0; i2 < textLines.length; i2++) {
      var rect = innerGetBoundingRect(textLines[i2], font, textAlign, textBaseline);
      i2 === 0 ? uniondRect.copy(rect) : uniondRect.union(rect);
    }
    return uniondRect;
  }
}
function adjustTextX(x2, width, textAlign) {
  if (textAlign === "right") {
    x2 -= width;
  } else if (textAlign === "center") {
    x2 -= width / 2;
  }
  return x2;
}
function adjustTextY(y2, height, verticalAlign) {
  if (verticalAlign === "middle") {
    y2 -= height / 2;
  } else if (verticalAlign === "bottom") {
    y2 -= height;
  }
  return y2;
}
function getLineHeight(font) {
  return getWidth("\u56FD", font);
}
function parsePercent(value, maxValue) {
  if (typeof value === "string") {
    if (value.lastIndexOf("%") >= 0) {
      return parseFloat(value) / 100 * maxValue;
    }
    return parseFloat(value);
  }
  return value;
}
function calculateTextPosition(out2, opts, rect) {
  var textPosition = opts.position || "inside";
  var distance2 = opts.distance != null ? opts.distance : 5;
  var height = rect.height;
  var width = rect.width;
  var halfHeight = height / 2;
  var x2 = rect.x;
  var y2 = rect.y;
  var textAlign = "left";
  var textVerticalAlign = "top";
  if (textPosition instanceof Array) {
    x2 += parsePercent(textPosition[0], rect.width);
    y2 += parsePercent(textPosition[1], rect.height);
    textAlign = null;
    textVerticalAlign = null;
  } else {
    switch (textPosition) {
      case "left":
        x2 -= distance2;
        y2 += halfHeight;
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "right":
        x2 += distance2 + width;
        y2 += halfHeight;
        textVerticalAlign = "middle";
        break;
      case "top":
        x2 += width / 2;
        y2 -= distance2;
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "bottom":
        x2 += width / 2;
        y2 += height + distance2;
        textAlign = "center";
        break;
      case "inside":
        x2 += width / 2;
        y2 += halfHeight;
        textAlign = "center";
        textVerticalAlign = "middle";
        break;
      case "insideLeft":
        x2 += distance2;
        y2 += halfHeight;
        textVerticalAlign = "middle";
        break;
      case "insideRight":
        x2 += width - distance2;
        y2 += halfHeight;
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "insideTop":
        x2 += width / 2;
        y2 += distance2;
        textAlign = "center";
        break;
      case "insideBottom":
        x2 += width / 2;
        y2 += height - distance2;
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "insideTopLeft":
        x2 += distance2;
        y2 += distance2;
        break;
      case "insideTopRight":
        x2 += width - distance2;
        y2 += distance2;
        textAlign = "right";
        break;
      case "insideBottomLeft":
        x2 += distance2;
        y2 += height - distance2;
        textVerticalAlign = "bottom";
        break;
      case "insideBottomRight":
        x2 += width - distance2;
        y2 += height - distance2;
        textAlign = "right";
        textVerticalAlign = "bottom";
        break;
    }
  }
  out2 = out2 || {};
  out2.x = x2;
  out2.y = y2;
  out2.align = textAlign;
  out2.verticalAlign = textVerticalAlign;
  return out2;
}
var PRESERVED_NORMAL_STATE = "__zr_normal__";
var PRIMARY_STATES_KEYS$1 = TRANSFORMABLE_PROPS.concat(["ignore"]);
var DEFAULT_ANIMATABLE_MAP = reduce(TRANSFORMABLE_PROPS, function(obj, key) {
  obj[key] = true;
  return obj;
}, { ignore: false });
var tmpTextPosCalcRes = {};
var tmpBoundingRect = new BoundingRect$1(0, 0, 0, 0);
var Element$1 = function() {
  function Element2(props) {
    this.id = guid();
    this.animators = [];
    this.currentStates = [];
    this.states = {};
    this._init(props);
  }
  Element2.prototype._init = function(props) {
    this.attr(props);
  };
  Element2.prototype.drift = function(dx, dy, e2) {
    switch (this.draggable) {
      case "horizontal":
        dy = 0;
        break;
      case "vertical":
        dx = 0;
        break;
    }
    var m2 = this.transform;
    if (!m2) {
      m2 = this.transform = [1, 0, 0, 1, 0, 0];
    }
    m2[4] += dx;
    m2[5] += dy;
    this.decomposeTransform();
    this.markRedraw();
  };
  Element2.prototype.beforeUpdate = function() {
  };
  Element2.prototype.afterUpdate = function() {
  };
  Element2.prototype.update = function() {
    this.updateTransform();
    if (this.__dirty) {
      this.updateInnerText();
    }
  };
  Element2.prototype.updateInnerText = function(forceUpdate) {
    var textEl = this._textContent;
    if (textEl && (!textEl.ignore || forceUpdate)) {
      if (!this.textConfig) {
        this.textConfig = {};
      }
      var textConfig = this.textConfig;
      var isLocal = textConfig.local;
      var innerTransformable = textEl.innerTransformable;
      var textAlign = void 0;
      var textVerticalAlign = void 0;
      var textStyleChanged = false;
      innerTransformable.parent = isLocal ? this : null;
      var innerOrigin = false;
      innerTransformable.copyTransform(textEl);
      if (textConfig.position != null) {
        var layoutRect = tmpBoundingRect;
        if (textConfig.layoutRect) {
          layoutRect.copy(textConfig.layoutRect);
        } else {
          layoutRect.copy(this.getBoundingRect());
        }
        if (!isLocal) {
          layoutRect.applyTransform(this.transform);
        }
        if (this.calculateTextPosition) {
          this.calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
        } else {
          calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
        }
        innerTransformable.x = tmpTextPosCalcRes.x;
        innerTransformable.y = tmpTextPosCalcRes.y;
        textAlign = tmpTextPosCalcRes.align;
        textVerticalAlign = tmpTextPosCalcRes.verticalAlign;
        var textOrigin = textConfig.origin;
        if (textOrigin && textConfig.rotation != null) {
          var relOriginX = void 0;
          var relOriginY = void 0;
          if (textOrigin === "center") {
            relOriginX = layoutRect.width * 0.5;
            relOriginY = layoutRect.height * 0.5;
          } else {
            relOriginX = parsePercent(textOrigin[0], layoutRect.width);
            relOriginY = parsePercent(textOrigin[1], layoutRect.height);
          }
          innerOrigin = true;
          innerTransformable.originX = -innerTransformable.x + relOriginX + (isLocal ? 0 : layoutRect.x);
          innerTransformable.originY = -innerTransformable.y + relOriginY + (isLocal ? 0 : layoutRect.y);
        }
      }
      if (textConfig.rotation != null) {
        innerTransformable.rotation = textConfig.rotation;
      }
      var textOffset = textConfig.offset;
      if (textOffset) {
        innerTransformable.x += textOffset[0];
        innerTransformable.y += textOffset[1];
        if (!innerOrigin) {
          innerTransformable.originX = -textOffset[0];
          innerTransformable.originY = -textOffset[1];
        }
      }
      var isInside = textConfig.inside == null ? typeof textConfig.position === "string" && textConfig.position.indexOf("inside") >= 0 : textConfig.inside;
      var innerTextDefaultStyle = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      var textFill = void 0;
      var textStroke = void 0;
      var autoStroke = void 0;
      if (isInside && this.canBeInsideText()) {
        textFill = textConfig.insideFill;
        textStroke = textConfig.insideStroke;
        if (textFill == null || textFill === "auto") {
          textFill = this.getInsideTextFill();
        }
        if (textStroke == null || textStroke === "auto") {
          textStroke = this.getInsideTextStroke(textFill);
          autoStroke = true;
        }
      } else {
        textFill = textConfig.outsideFill;
        textStroke = textConfig.outsideStroke;
        if (textFill == null || textFill === "auto") {
          textFill = this.getOutsideFill();
        }
        if (textStroke == null || textStroke === "auto") {
          textStroke = this.getOutsideStroke(textFill);
          autoStroke = true;
        }
      }
      textFill = textFill || "#000";
      if (textFill !== innerTextDefaultStyle.fill || textStroke !== innerTextDefaultStyle.stroke || autoStroke !== innerTextDefaultStyle.autoStroke || textAlign !== innerTextDefaultStyle.align || textVerticalAlign !== innerTextDefaultStyle.verticalAlign) {
        textStyleChanged = true;
        innerTextDefaultStyle.fill = textFill;
        innerTextDefaultStyle.stroke = textStroke;
        innerTextDefaultStyle.autoStroke = autoStroke;
        innerTextDefaultStyle.align = textAlign;
        innerTextDefaultStyle.verticalAlign = textVerticalAlign;
        textEl.setDefaultTextStyle(innerTextDefaultStyle);
      }
      textEl.__dirty |= REDRAW_BIT;
      if (textStyleChanged) {
        textEl.dirtyStyle(true);
      }
    }
  };
  Element2.prototype.canBeInsideText = function() {
    return true;
  };
  Element2.prototype.getInsideTextFill = function() {
    return "#fff";
  };
  Element2.prototype.getInsideTextStroke = function(textFill) {
    return "#000";
  };
  Element2.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? LIGHT_LABEL_COLOR : DARK_LABEL_COLOR;
  };
  Element2.prototype.getOutsideStroke = function(textFill) {
    var backgroundColor = this.__zr && this.__zr.getBackgroundColor();
    var colorArr = typeof backgroundColor === "string" && parse(backgroundColor);
    if (!colorArr) {
      colorArr = [255, 255, 255, 1];
    }
    var alpha = colorArr[3];
    var isDark = this.__zr.isDarkMode();
    for (var i2 = 0; i2 < 3; i2++) {
      colorArr[i2] = colorArr[i2] * alpha + (isDark ? 0 : 255) * (1 - alpha);
    }
    colorArr[3] = 1;
    return stringify(colorArr, "rgba");
  };
  Element2.prototype.traverse = function(cb, context) {
  };
  Element2.prototype.attrKV = function(key, value) {
    if (key === "textConfig") {
      this.setTextConfig(value);
    } else if (key === "textContent") {
      this.setTextContent(value);
    } else if (key === "clipPath") {
      this.setClipPath(value);
    } else if (key === "extra") {
      this.extra = this.extra || {};
      extend(this.extra, value);
    } else {
      this[key] = value;
    }
  };
  Element2.prototype.hide = function() {
    this.ignore = true;
    this.markRedraw();
  };
  Element2.prototype.show = function() {
    this.ignore = false;
    this.markRedraw();
  };
  Element2.prototype.attr = function(keyOrObj, value) {
    if (typeof keyOrObj === "string") {
      this.attrKV(keyOrObj, value);
    } else if (isObject(keyOrObj)) {
      var obj = keyOrObj;
      var keysArr = keys(obj);
      for (var i2 = 0; i2 < keysArr.length; i2++) {
        var key = keysArr[i2];
        this.attrKV(key, keyOrObj[key]);
      }
    }
    this.markRedraw();
    return this;
  };
  Element2.prototype.saveCurrentToNormalState = function(toState) {
    this._innerSaveToNormal(toState);
    var normalState = this._normalState;
    for (var i2 = 0; i2 < this.animators.length; i2++) {
      var animator = this.animators[i2];
      var fromStateTransition = animator.__fromStateTransition;
      if (animator.getLoop() || fromStateTransition && fromStateTransition !== PRESERVED_NORMAL_STATE) {
        continue;
      }
      var targetName = animator.targetName;
      var target = targetName ? normalState[targetName] : normalState;
      animator.saveTo(target);
    }
  };
  Element2.prototype._innerSaveToNormal = function(toState) {
    var normalState = this._normalState;
    if (!normalState) {
      normalState = this._normalState = {};
    }
    if (toState.textConfig && !normalState.textConfig) {
      normalState.textConfig = this.textConfig;
    }
    this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS$1);
  };
  Element2.prototype._savePrimaryToNormal = function(toState, normalState, primaryKeys) {
    for (var i2 = 0; i2 < primaryKeys.length; i2++) {
      var key = primaryKeys[i2];
      if (toState[key] != null && !(key in normalState)) {
        normalState[key] = this[key];
      }
    }
  };
  Element2.prototype.hasState = function() {
    return this.currentStates.length > 0;
  };
  Element2.prototype.getState = function(name) {
    return this.states[name];
  };
  Element2.prototype.ensureState = function(name) {
    var states = this.states;
    if (!states[name]) {
      states[name] = {};
    }
    return states[name];
  };
  Element2.prototype.clearStates = function(noAnimation) {
    this.useState(PRESERVED_NORMAL_STATE, false, noAnimation);
  };
  Element2.prototype.useState = function(stateName, keepCurrentStates, noAnimation, forceUseHoverLayer) {
    var toNormalState = stateName === PRESERVED_NORMAL_STATE;
    var hasStates = this.hasState();
    if (!hasStates && toNormalState) {
      return;
    }
    var currentStates = this.currentStates;
    var animationCfg = this.stateTransition;
    if (indexOf(currentStates, stateName) >= 0 && (keepCurrentStates || currentStates.length === 1)) {
      return;
    }
    var state;
    if (this.stateProxy && !toNormalState) {
      state = this.stateProxy(stateName);
    }
    if (!state) {
      state = this.states && this.states[stateName];
    }
    if (!state && !toNormalState) {
      logError("State " + stateName + " not exists.");
      return;
    }
    if (!toNormalState) {
      this.saveCurrentToNormalState(state);
    }
    var useHoverLayer = !!(state && state.hoverLayer || forceUseHoverLayer);
    if (useHoverLayer) {
      this._toggleHoverLayerFlag(true);
    }
    this._applyStateObj(stateName, state, this._normalState, keepCurrentStates, !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0, animationCfg);
    var textContent = this._textContent;
    var textGuide = this._textGuide;
    if (textContent) {
      textContent.useState(stateName, keepCurrentStates, noAnimation, useHoverLayer);
    }
    if (textGuide) {
      textGuide.useState(stateName, keepCurrentStates, noAnimation, useHoverLayer);
    }
    if (toNormalState) {
      this.currentStates = [];
      this._normalState = {};
    } else {
      if (!keepCurrentStates) {
        this.currentStates = [stateName];
      } else {
        this.currentStates.push(stateName);
      }
    }
    this._updateAnimationTargets();
    this.markRedraw();
    if (!useHoverLayer && this.__inHover) {
      this._toggleHoverLayerFlag(false);
      this.__dirty &= ~REDRAW_BIT;
    }
    return state;
  };
  Element2.prototype.useStates = function(states, noAnimation, forceUseHoverLayer) {
    if (!states.length) {
      this.clearStates();
    } else {
      var stateObjects = [];
      var currentStates = this.currentStates;
      var len2 = states.length;
      var notChange = len2 === currentStates.length;
      if (notChange) {
        for (var i2 = 0; i2 < len2; i2++) {
          if (states[i2] !== currentStates[i2]) {
            notChange = false;
            break;
          }
        }
      }
      if (notChange) {
        return;
      }
      for (var i2 = 0; i2 < len2; i2++) {
        var stateName = states[i2];
        var stateObj = void 0;
        if (this.stateProxy) {
          stateObj = this.stateProxy(stateName, states);
        }
        if (!stateObj) {
          stateObj = this.states[stateName];
        }
        if (stateObj) {
          stateObjects.push(stateObj);
        }
      }
      var lastStateObj = stateObjects[len2 - 1];
      var useHoverLayer = !!(lastStateObj && lastStateObj.hoverLayer || forceUseHoverLayer);
      if (useHoverLayer) {
        this._toggleHoverLayerFlag(true);
      }
      var mergedState = this._mergeStates(stateObjects);
      var animationCfg = this.stateTransition;
      this.saveCurrentToNormalState(mergedState);
      this._applyStateObj(states.join(","), mergedState, this._normalState, false, !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0, animationCfg);
      var textContent = this._textContent;
      var textGuide = this._textGuide;
      if (textContent) {
        textContent.useStates(states, noAnimation, useHoverLayer);
      }
      if (textGuide) {
        textGuide.useStates(states, noAnimation, useHoverLayer);
      }
      this._updateAnimationTargets();
      this.currentStates = states.slice();
      this.markRedraw();
      if (!useHoverLayer && this.__inHover) {
        this._toggleHoverLayerFlag(false);
        this.__dirty &= ~REDRAW_BIT;
      }
    }
  };
  Element2.prototype._updateAnimationTargets = function() {
    for (var i2 = 0; i2 < this.animators.length; i2++) {
      var animator = this.animators[i2];
      if (animator.targetName) {
        animator.changeTarget(this[animator.targetName]);
      }
    }
  };
  Element2.prototype.removeState = function(state) {
    var idx = indexOf(this.currentStates, state);
    if (idx >= 0) {
      var currentStates = this.currentStates.slice();
      currentStates.splice(idx, 1);
      this.useStates(currentStates);
    }
  };
  Element2.prototype.replaceState = function(oldState, newState, forceAdd) {
    var currentStates = this.currentStates.slice();
    var idx = indexOf(currentStates, oldState);
    var newStateExists = indexOf(currentStates, newState) >= 0;
    if (idx >= 0) {
      if (!newStateExists) {
        currentStates[idx] = newState;
      } else {
        currentStates.splice(idx, 1);
      }
    } else if (forceAdd && !newStateExists) {
      currentStates.push(newState);
    }
    this.useStates(currentStates);
  };
  Element2.prototype.toggleState = function(state, enable) {
    if (enable) {
      this.useState(state, true);
    } else {
      this.removeState(state);
    }
  };
  Element2.prototype._mergeStates = function(states) {
    var mergedState = {};
    var mergedTextConfig;
    for (var i2 = 0; i2 < states.length; i2++) {
      var state = states[i2];
      extend(mergedState, state);
      if (state.textConfig) {
        mergedTextConfig = mergedTextConfig || {};
        extend(mergedTextConfig, state.textConfig);
      }
    }
    if (mergedTextConfig) {
      mergedState.textConfig = mergedTextConfig;
    }
    return mergedState;
  };
  Element2.prototype._applyStateObj = function(stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
    var needsRestoreToNormal = !(state && keepCurrentStates);
    if (state && state.textConfig) {
      this.textConfig = extend({}, keepCurrentStates ? this.textConfig : normalState.textConfig);
      extend(this.textConfig, state.textConfig);
    } else if (needsRestoreToNormal) {
      if (normalState.textConfig) {
        this.textConfig = normalState.textConfig;
      }
    }
    var transitionTarget = {};
    var hasTransition = false;
    for (var i2 = 0; i2 < PRIMARY_STATES_KEYS$1.length; i2++) {
      var key = PRIMARY_STATES_KEYS$1[i2];
      var propNeedsTransition = transition && DEFAULT_ANIMATABLE_MAP[key];
      if (state && state[key] != null) {
        if (propNeedsTransition) {
          hasTransition = true;
          transitionTarget[key] = state[key];
        } else {
          this[key] = state[key];
        }
      } else if (needsRestoreToNormal) {
        if (normalState[key] != null) {
          if (propNeedsTransition) {
            hasTransition = true;
            transitionTarget[key] = normalState[key];
          } else {
            this[key] = normalState[key];
          }
        }
      }
    }
    if (!transition) {
      for (var i2 = 0; i2 < this.animators.length; i2++) {
        var animator = this.animators[i2];
        var targetName = animator.targetName;
        if (!animator.getLoop()) {
          animator.__changeFinalValue(targetName ? (state || normalState)[targetName] : state || normalState);
        }
      }
    }
    if (hasTransition) {
      this._transitionState(stateName, transitionTarget, animationCfg);
    }
  };
  Element2.prototype._attachComponent = function(componentEl) {
    if (componentEl.__zr && !componentEl.__hostTarget) {
      return;
    }
    if (componentEl === this) {
      return;
    }
    var zr = this.__zr;
    if (zr) {
      componentEl.addSelfToZr(zr);
    }
    componentEl.__zr = zr;
    componentEl.__hostTarget = this;
  };
  Element2.prototype._detachComponent = function(componentEl) {
    if (componentEl.__zr) {
      componentEl.removeSelfFromZr(componentEl.__zr);
    }
    componentEl.__zr = null;
    componentEl.__hostTarget = null;
  };
  Element2.prototype.getClipPath = function() {
    return this._clipPath;
  };
  Element2.prototype.setClipPath = function(clipPath) {
    if (this._clipPath && this._clipPath !== clipPath) {
      this.removeClipPath();
    }
    this._attachComponent(clipPath);
    this._clipPath = clipPath;
    this.markRedraw();
  };
  Element2.prototype.removeClipPath = function() {
    var clipPath = this._clipPath;
    if (clipPath) {
      this._detachComponent(clipPath);
      this._clipPath = null;
      this.markRedraw();
    }
  };
  Element2.prototype.getTextContent = function() {
    return this._textContent;
  };
  Element2.prototype.setTextContent = function(textEl) {
    var previousTextContent = this._textContent;
    if (previousTextContent === textEl) {
      return;
    }
    if (previousTextContent && previousTextContent !== textEl) {
      this.removeTextContent();
    }
    textEl.innerTransformable = new Transformable();
    this._attachComponent(textEl);
    this._textContent = textEl;
    this.markRedraw();
  };
  Element2.prototype.setTextConfig = function(cfg) {
    if (!this.textConfig) {
      this.textConfig = {};
    }
    extend(this.textConfig, cfg);
    this.markRedraw();
  };
  Element2.prototype.removeTextConfig = function() {
    this.textConfig = null;
    this.markRedraw();
  };
  Element2.prototype.removeTextContent = function() {
    var textEl = this._textContent;
    if (textEl) {
      textEl.innerTransformable = null;
      this._detachComponent(textEl);
      this._textContent = null;
      this._innerTextDefaultStyle = null;
      this.markRedraw();
    }
  };
  Element2.prototype.getTextGuideLine = function() {
    return this._textGuide;
  };
  Element2.prototype.setTextGuideLine = function(guideLine) {
    if (this._textGuide && this._textGuide !== guideLine) {
      this.removeTextGuideLine();
    }
    this._attachComponent(guideLine);
    this._textGuide = guideLine;
    this.markRedraw();
  };
  Element2.prototype.removeTextGuideLine = function() {
    var textGuide = this._textGuide;
    if (textGuide) {
      this._detachComponent(textGuide);
      this._textGuide = null;
      this.markRedraw();
    }
  };
  Element2.prototype.markRedraw = function() {
    this.__dirty |= REDRAW_BIT;
    var zr = this.__zr;
    if (zr) {
      if (this.__inHover) {
        zr.refreshHover();
      } else {
        zr.refresh();
      }
    }
    if (this.__hostTarget) {
      this.__hostTarget.markRedraw();
    }
  };
  Element2.prototype.dirty = function() {
    this.markRedraw();
  };
  Element2.prototype._toggleHoverLayerFlag = function(inHover) {
    this.__inHover = inHover;
    var textContent = this._textContent;
    var textGuide = this._textGuide;
    if (textContent) {
      textContent.__inHover = inHover;
    }
    if (textGuide) {
      textGuide.__inHover = inHover;
    }
  };
  Element2.prototype.addSelfToZr = function(zr) {
    if (this.__zr === zr) {
      return;
    }
    this.__zr = zr;
    var animators = this.animators;
    if (animators) {
      for (var i2 = 0; i2 < animators.length; i2++) {
        zr.animation.addAnimator(animators[i2]);
      }
    }
    if (this._clipPath) {
      this._clipPath.addSelfToZr(zr);
    }
    if (this._textContent) {
      this._textContent.addSelfToZr(zr);
    }
    if (this._textGuide) {
      this._textGuide.addSelfToZr(zr);
    }
  };
  Element2.prototype.removeSelfFromZr = function(zr) {
    if (!this.__zr) {
      return;
    }
    this.__zr = null;
    var animators = this.animators;
    if (animators) {
      for (var i2 = 0; i2 < animators.length; i2++) {
        zr.animation.removeAnimator(animators[i2]);
      }
    }
    if (this._clipPath) {
      this._clipPath.removeSelfFromZr(zr);
    }
    if (this._textContent) {
      this._textContent.removeSelfFromZr(zr);
    }
    if (this._textGuide) {
      this._textGuide.removeSelfFromZr(zr);
    }
  };
  Element2.prototype.animate = function(key, loop, allowDiscreteAnimation) {
    var target = key ? this[key] : this;
    var animator = new Animator$1(target, loop, allowDiscreteAnimation);
    key && (animator.targetName = key);
    this.addAnimator(animator, key);
    return animator;
  };
  Element2.prototype.addAnimator = function(animator, key) {
    var zr = this.__zr;
    var el = this;
    animator.during(function() {
      el.updateDuringAnimation(key);
    }).done(function() {
      var animators = el.animators;
      var idx = indexOf(animators, animator);
      if (idx >= 0) {
        animators.splice(idx, 1);
      }
    });
    this.animators.push(animator);
    if (zr) {
      zr.animation.addAnimator(animator);
    }
    zr && zr.wakeUp();
  };
  Element2.prototype.updateDuringAnimation = function(key) {
    this.markRedraw();
  };
  Element2.prototype.stopAnimation = function(scope, forwardToLast) {
    var animators = this.animators;
    var len2 = animators.length;
    var leftAnimators = [];
    for (var i2 = 0; i2 < len2; i2++) {
      var animator = animators[i2];
      if (!scope || scope === animator.scope) {
        animator.stop(forwardToLast);
      } else {
        leftAnimators.push(animator);
      }
    }
    this.animators = leftAnimators;
    return this;
  };
  Element2.prototype.animateTo = function(target, cfg, animationProps) {
    animateTo(this, target, cfg, animationProps);
  };
  Element2.prototype.animateFrom = function(target, cfg, animationProps) {
    animateTo(this, target, cfg, animationProps, true);
  };
  Element2.prototype._transitionState = function(stateName, target, cfg, animationProps) {
    var animators = animateTo(this, target, cfg, animationProps);
    for (var i2 = 0; i2 < animators.length; i2++) {
      animators[i2].__fromStateTransition = stateName;
    }
  };
  Element2.prototype.getBoundingRect = function() {
    return null;
  };
  Element2.prototype.getPaintRect = function() {
    return null;
  };
  Element2.initDefaultProps = function() {
    var elProto = Element2.prototype;
    elProto.type = "element";
    elProto.name = "";
    elProto.ignore = elProto.silent = elProto.isGroup = elProto.draggable = elProto.dragging = elProto.ignoreClip = elProto.__inHover = false;
    elProto.__dirty = REDRAW_BIT;
    function createLegacyProperty(key, privateKey, xKey, yKey) {
      Object.defineProperty(elProto, key, {
        get: function() {
          if (!this[privateKey]) {
            var pos = this[privateKey] = [];
            enhanceArray(this, pos);
          }
          return this[privateKey];
        },
        set: function(pos) {
          this[xKey] = pos[0];
          this[yKey] = pos[1];
          this[privateKey] = pos;
          enhanceArray(this, pos);
        }
      });
      function enhanceArray(self2, pos) {
        Object.defineProperty(pos, 0, {
          get: function() {
            return self2[xKey];
          },
          set: function(val) {
            self2[xKey] = val;
          }
        });
        Object.defineProperty(pos, 1, {
          get: function() {
            return self2[yKey];
          },
          set: function(val) {
            self2[yKey] = val;
          }
        });
      }
    }
    if (Object.defineProperty) {
      createLegacyProperty("position", "_legacyPos", "x", "y");
      createLegacyProperty("scale", "_legacyScale", "scaleX", "scaleY");
      createLegacyProperty("origin", "_legacyOrigin", "originX", "originY");
    }
  }();
  return Element2;
}();
mixin(Element$1, Eventful$1);
mixin(Element$1, Transformable);
function animateTo(animatable, target, cfg, animationProps, reverse2) {
  cfg = cfg || {};
  var animators = [];
  animateToShallow(animatable, "", animatable, target, cfg, animationProps, animators, reverse2);
  var finishCount = animators.length;
  var doneHappened = false;
  var cfgDone = cfg.done;
  var cfgAborted = cfg.aborted;
  var doneCb = function() {
    doneHappened = true;
    finishCount--;
    if (finishCount <= 0) {
      doneHappened ? cfgDone && cfgDone() : cfgAborted && cfgAborted();
    }
  };
  var abortedCb = function() {
    finishCount--;
    if (finishCount <= 0) {
      doneHappened ? cfgDone && cfgDone() : cfgAborted && cfgAborted();
    }
  };
  if (!finishCount) {
    cfgDone && cfgDone();
  }
  if (animators.length > 0 && cfg.during) {
    animators[0].during(function(target2, percent) {
      cfg.during(percent);
    });
  }
  for (var i2 = 0; i2 < animators.length; i2++) {
    var animator = animators[i2];
    if (doneCb) {
      animator.done(doneCb);
    }
    if (abortedCb) {
      animator.aborted(abortedCb);
    }
    if (cfg.force) {
      animator.duration(cfg.duration);
    }
    animator.start(cfg.easing);
  }
  return animators;
}
function copyArrShallow(source2, target, len2) {
  for (var i2 = 0; i2 < len2; i2++) {
    source2[i2] = target[i2];
  }
}
function is2DArray(value) {
  return isArrayLike(value[0]);
}
function copyValue(target, source2, key) {
  if (isArrayLike(source2[key])) {
    if (!isArrayLike(target[key])) {
      target[key] = [];
    }
    if (isTypedArray(source2[key])) {
      var len2 = source2[key].length;
      if (target[key].length !== len2) {
        target[key] = new source2[key].constructor(len2);
        copyArrShallow(target[key], source2[key], len2);
      }
    } else {
      var sourceArr = source2[key];
      var targetArr = target[key];
      var len0 = sourceArr.length;
      if (is2DArray(sourceArr)) {
        var len1 = sourceArr[0].length;
        for (var i2 = 0; i2 < len0; i2++) {
          if (!targetArr[i2]) {
            targetArr[i2] = Array.prototype.slice.call(sourceArr[i2]);
          } else {
            copyArrShallow(targetArr[i2], sourceArr[i2], len1);
          }
        }
      } else {
        copyArrShallow(targetArr, sourceArr, len0);
      }
      targetArr.length = sourceArr.length;
    }
  } else {
    target[key] = source2[key];
  }
}
function isValueSame(val1, val2) {
  return val1 === val2 || isArrayLike(val1) && isArrayLike(val2) && is1DArraySame(val1, val2);
}
function is1DArraySame(arr0, arr1) {
  var len2 = arr0.length;
  if (len2 !== arr1.length) {
    return false;
  }
  for (var i2 = 0; i2 < len2; i2++) {
    if (arr0[i2] !== arr1[i2]) {
      return false;
    }
  }
  return true;
}
function animateToShallow(animatable, topKey, animateObj, target, cfg, animationProps, animators, reverse2) {
  var targetKeys = keys(target);
  var duration = cfg.duration;
  var delay = cfg.delay;
  var additive = cfg.additive;
  var setToFinal = cfg.setToFinal;
  var animateAll = !isObject(animationProps);
  var existsAnimators = animatable.animators;
  var animationKeys = [];
  for (var k = 0; k < targetKeys.length; k++) {
    var innerKey = targetKeys[k];
    var targetVal = target[innerKey];
    if (targetVal != null && animateObj[innerKey] != null && (animateAll || animationProps[innerKey])) {
      if (isObject(targetVal) && !isArrayLike(targetVal) && !isGradientObject(targetVal)) {
        if (topKey) {
          if (!reverse2) {
            animateObj[innerKey] = targetVal;
            animatable.updateDuringAnimation(topKey);
          }
          continue;
        }
        animateToShallow(animatable, innerKey, animateObj[innerKey], targetVal, cfg, animationProps && animationProps[innerKey], animators, reverse2);
      } else {
        animationKeys.push(innerKey);
      }
    } else if (!reverse2) {
      animateObj[innerKey] = targetVal;
      animatable.updateDuringAnimation(topKey);
      animationKeys.push(innerKey);
    }
  }
  var keyLen = animationKeys.length;
  if (!additive && keyLen) {
    for (var i2 = 0; i2 < existsAnimators.length; i2++) {
      var animator = existsAnimators[i2];
      if (animator.targetName === topKey) {
        var allAborted = animator.stopTracks(animationKeys);
        if (allAborted) {
          var idx = indexOf(existsAnimators, animator);
          existsAnimators.splice(idx, 1);
        }
      }
    }
  }
  if (!cfg.force) {
    animationKeys = filter(animationKeys, function(key) {
      return !isValueSame(target[key], animateObj[key]);
    });
    keyLen = animationKeys.length;
  }
  if (keyLen > 0 || cfg.force && !animators.length) {
    var revertedSource = void 0;
    var reversedTarget = void 0;
    var sourceClone = void 0;
    if (reverse2) {
      reversedTarget = {};
      if (setToFinal) {
        revertedSource = {};
      }
      for (var i2 = 0; i2 < keyLen; i2++) {
        var innerKey = animationKeys[i2];
        reversedTarget[innerKey] = animateObj[innerKey];
        if (setToFinal) {
          revertedSource[innerKey] = target[innerKey];
        } else {
          animateObj[innerKey] = target[innerKey];
        }
      }
    } else if (setToFinal) {
      sourceClone = {};
      for (var i2 = 0; i2 < keyLen; i2++) {
        var innerKey = animationKeys[i2];
        sourceClone[innerKey] = cloneValue(animateObj[innerKey]);
        copyValue(animateObj, target, innerKey);
      }
    }
    var animator = new Animator$1(animateObj, false, false, additive ? filter(existsAnimators, function(animator2) {
      return animator2.targetName === topKey;
    }) : null);
    animator.targetName = topKey;
    if (cfg.scope) {
      animator.scope = cfg.scope;
    }
    if (setToFinal && revertedSource) {
      animator.whenWithKeys(0, revertedSource, animationKeys);
    }
    if (sourceClone) {
      animator.whenWithKeys(0, sourceClone, animationKeys);
    }
    animator.whenWithKeys(duration == null ? 500 : duration, reverse2 ? reversedTarget : target, animationKeys).delay(delay || 0);
    animatable.addAnimator(animator, topKey);
    animators.push(animator);
  }
}
var Element$2 = Element$1;
var Group = function(_super) {
  __extends(Group2, _super);
  function Group2(opts) {
    var _this = _super.call(this) || this;
    _this.isGroup = true;
    _this._children = [];
    _this.attr(opts);
    return _this;
  }
  Group2.prototype.childrenRef = function() {
    return this._children;
  };
  Group2.prototype.children = function() {
    return this._children.slice();
  };
  Group2.prototype.childAt = function(idx) {
    return this._children[idx];
  };
  Group2.prototype.childOfName = function(name) {
    var children = this._children;
    for (var i2 = 0; i2 < children.length; i2++) {
      if (children[i2].name === name) {
        return children[i2];
      }
    }
  };
  Group2.prototype.childCount = function() {
    return this._children.length;
  };
  Group2.prototype.add = function(child) {
    if (child) {
      if (child !== this && child.parent !== this) {
        this._children.push(child);
        this._doAdd(child);
      }
    }
    return this;
  };
  Group2.prototype.addBefore = function(child, nextSibling) {
    if (child && child !== this && child.parent !== this && nextSibling && nextSibling.parent === this) {
      var children = this._children;
      var idx = children.indexOf(nextSibling);
      if (idx >= 0) {
        children.splice(idx, 0, child);
        this._doAdd(child);
      }
    }
    return this;
  };
  Group2.prototype.replace = function(oldChild, newChild) {
    var idx = indexOf(this._children, oldChild);
    if (idx >= 0) {
      this.replaceAt(newChild, idx);
    }
    return this;
  };
  Group2.prototype.replaceAt = function(child, index) {
    var children = this._children;
    var old = children[index];
    if (child && child !== this && child.parent !== this && child !== old) {
      children[index] = child;
      old.parent = null;
      var zr = this.__zr;
      if (zr) {
        old.removeSelfFromZr(zr);
      }
      this._doAdd(child);
    }
    return this;
  };
  Group2.prototype._doAdd = function(child) {
    if (child.parent) {
      child.parent.remove(child);
    }
    child.parent = this;
    var zr = this.__zr;
    if (zr && zr !== child.__zr) {
      child.addSelfToZr(zr);
    }
    zr && zr.refresh();
  };
  Group2.prototype.remove = function(child) {
    var zr = this.__zr;
    var children = this._children;
    var idx = indexOf(children, child);
    if (idx < 0) {
      return this;
    }
    children.splice(idx, 1);
    child.parent = null;
    if (zr) {
      child.removeSelfFromZr(zr);
    }
    zr && zr.refresh();
    return this;
  };
  Group2.prototype.removeAll = function() {
    var children = this._children;
    var zr = this.__zr;
    for (var i2 = 0; i2 < children.length; i2++) {
      var child = children[i2];
      if (zr) {
        child.removeSelfFromZr(zr);
      }
      child.parent = null;
    }
    children.length = 0;
    return this;
  };
  Group2.prototype.eachChild = function(cb, context) {
    var children = this._children;
    for (var i2 = 0; i2 < children.length; i2++) {
      var child = children[i2];
      cb.call(context, child, i2);
    }
    return this;
  };
  Group2.prototype.traverse = function(cb, context) {
    for (var i2 = 0; i2 < this._children.length; i2++) {
      var child = this._children[i2];
      var stopped = cb.call(context, child);
      if (child.isGroup && !stopped) {
        child.traverse(cb, context);
      }
    }
    return this;
  };
  Group2.prototype.addSelfToZr = function(zr) {
    _super.prototype.addSelfToZr.call(this, zr);
    for (var i2 = 0; i2 < this._children.length; i2++) {
      var child = this._children[i2];
      child.addSelfToZr(zr);
    }
  };
  Group2.prototype.removeSelfFromZr = function(zr) {
    _super.prototype.removeSelfFromZr.call(this, zr);
    for (var i2 = 0; i2 < this._children.length; i2++) {
      var child = this._children[i2];
      child.removeSelfFromZr(zr);
    }
  };
  Group2.prototype.getBoundingRect = function(includeChildren) {
    var tmpRect2 = new BoundingRect$1(0, 0, 0, 0);
    var children = includeChildren || this._children;
    var tmpMat = [];
    var rect = null;
    for (var i2 = 0; i2 < children.length; i2++) {
      var child = children[i2];
      if (child.ignore || child.invisible) {
        continue;
      }
      var childRect = child.getBoundingRect();
      var transform = child.getLocalTransform(tmpMat);
      if (transform) {
        BoundingRect$1.applyTransform(tmpRect2, childRect, transform);
        rect = rect || tmpRect2.clone();
        rect.union(tmpRect2);
      } else {
        rect = rect || childRect.clone();
        rect.union(childRect);
      }
    }
    return rect || tmpRect2;
  };
  return Group2;
}(Element$2);
Group.prototype.type = "group";
var Group$1 = Group;
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var painterCtors = {};
var instances = {};
function delInstance(id) {
  delete instances[id];
}
function isDarkMode(backgroundColor) {
  if (!backgroundColor) {
    return false;
  }
  if (typeof backgroundColor === "string") {
    return lum(backgroundColor, 1) < DARK_MODE_THRESHOLD;
  } else if (backgroundColor.colorStops) {
    var colorStops = backgroundColor.colorStops;
    var totalLum = 0;
    var len2 = colorStops.length;
    for (var i2 = 0; i2 < len2; i2++) {
      totalLum += lum(colorStops[i2].color, 1);
    }
    totalLum /= len2;
    return totalLum < DARK_MODE_THRESHOLD;
  }
  return false;
}
var ZRender = function() {
  function ZRender2(id, dom, opts) {
    var _this = this;
    this._sleepAfterStill = 10;
    this._stillFrameAccum = 0;
    this._needsRefresh = true;
    this._needsRefreshHover = true;
    this._darkMode = false;
    opts = opts || {};
    this.dom = dom;
    this.id = id;
    var storage = new Storage$1();
    var rendererType = opts.renderer || "canvas";
    if (!painterCtors[rendererType]) {
      rendererType = keys(painterCtors)[0];
    }
    opts.useDirtyRect = opts.useDirtyRect == null ? false : opts.useDirtyRect;
    var painter = new painterCtors[rendererType](dom, storage, opts, id);
    var ssrMode = opts.ssr || painter.ssrOnly;
    this.storage = storage;
    this.painter = painter;
    var handerProxy = !env$1.node && !env$1.worker && !ssrMode ? new HandlerProxy(painter.getViewportRoot(), painter.root) : null;
    this.handler = new Handler$1(storage, painter, handerProxy, painter.root);
    this.animation = new Animation$1({
      stage: {
        update: ssrMode ? null : function() {
          return _this._flush(true);
        }
      }
    });
    if (!ssrMode) {
      this.animation.start();
    }
  }
  ZRender2.prototype.add = function(el) {
    if (!el) {
      return;
    }
    this.storage.addRoot(el);
    el.addSelfToZr(this);
    this.refresh();
  };
  ZRender2.prototype.remove = function(el) {
    if (!el) {
      return;
    }
    this.storage.delRoot(el);
    el.removeSelfFromZr(this);
    this.refresh();
  };
  ZRender2.prototype.configLayer = function(zLevel, config) {
    if (this.painter.configLayer) {
      this.painter.configLayer(zLevel, config);
    }
    this.refresh();
  };
  ZRender2.prototype.setBackgroundColor = function(backgroundColor) {
    if (this.painter.setBackgroundColor) {
      this.painter.setBackgroundColor(backgroundColor);
    }
    this.refresh();
    this._backgroundColor = backgroundColor;
    this._darkMode = isDarkMode(backgroundColor);
  };
  ZRender2.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  };
  ZRender2.prototype.setDarkMode = function(darkMode) {
    this._darkMode = darkMode;
  };
  ZRender2.prototype.isDarkMode = function() {
    return this._darkMode;
  };
  ZRender2.prototype.refreshImmediately = function(fromInside) {
    if (!fromInside) {
      this.animation.update(true);
    }
    this._needsRefresh = false;
    this.painter.refresh();
    this._needsRefresh = false;
  };
  ZRender2.prototype.refresh = function() {
    this._needsRefresh = true;
    this.animation.start();
  };
  ZRender2.prototype.flush = function() {
    this._flush(false);
  };
  ZRender2.prototype._flush = function(fromInside) {
    var triggerRendered;
    var start2 = getTime();
    if (this._needsRefresh) {
      triggerRendered = true;
      this.refreshImmediately(fromInside);
    }
    if (this._needsRefreshHover) {
      triggerRendered = true;
      this.refreshHoverImmediately();
    }
    var end2 = getTime();
    if (triggerRendered) {
      this._stillFrameAccum = 0;
      this.trigger("rendered", {
        elapsedTime: end2 - start2
      });
    } else if (this._sleepAfterStill > 0) {
      this._stillFrameAccum++;
      if (this._stillFrameAccum > this._sleepAfterStill) {
        this.animation.stop();
      }
    }
  };
  ZRender2.prototype.setSleepAfterStill = function(stillFramesCount) {
    this._sleepAfterStill = stillFramesCount;
  };
  ZRender2.prototype.wakeUp = function() {
    this.animation.start();
    this._stillFrameAccum = 0;
  };
  ZRender2.prototype.refreshHover = function() {
    this._needsRefreshHover = true;
  };
  ZRender2.prototype.refreshHoverImmediately = function() {
    this._needsRefreshHover = false;
    if (this.painter.refreshHover && this.painter.getType() === "canvas") {
      this.painter.refreshHover();
    }
  };
  ZRender2.prototype.resize = function(opts) {
    opts = opts || {};
    this.painter.resize(opts.width, opts.height);
    this.handler.resize();
  };
  ZRender2.prototype.clearAnimation = function() {
    this.animation.clear();
  };
  ZRender2.prototype.getWidth = function() {
    return this.painter.getWidth();
  };
  ZRender2.prototype.getHeight = function() {
    return this.painter.getHeight();
  };
  ZRender2.prototype.setCursorStyle = function(cursorStyle) {
    this.handler.setCursorStyle(cursorStyle);
  };
  ZRender2.prototype.findHover = function(x2, y2) {
    return this.handler.findHover(x2, y2);
  };
  ZRender2.prototype.on = function(eventName, eventHandler, context) {
    this.handler.on(eventName, eventHandler, context);
    return this;
  };
  ZRender2.prototype.off = function(eventName, eventHandler) {
    this.handler.off(eventName, eventHandler);
  };
  ZRender2.prototype.trigger = function(eventName, event) {
    this.handler.trigger(eventName, event);
  };
  ZRender2.prototype.clear = function() {
    var roots2 = this.storage.getRoots();
    for (var i2 = 0; i2 < roots2.length; i2++) {
      if (roots2[i2] instanceof Group$1) {
        roots2[i2].removeSelfFromZr(this);
      }
    }
    this.storage.delAllRoots();
    this.painter.clear();
  };
  ZRender2.prototype.dispose = function() {
    this.animation.stop();
    this.clear();
    this.storage.dispose();
    this.painter.dispose();
    this.handler.dispose();
    this.animation = this.storage = this.painter = this.handler = null;
    delInstance(this.id);
  };
  return ZRender2;
}();
function init(dom, opts) {
  var zr = new ZRender(guid(), dom, opts);
  instances[zr.id] = zr;
  return zr;
}
function registerPainter(name, Ctor) {
  painterCtors[name] = Ctor;
}
var globalImageCache = new LRU$1(50);
function findExistImage(newImageOrSrc) {
  if (typeof newImageOrSrc === "string") {
    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    return cachedImgObj && cachedImgObj.image;
  } else {
    return newImageOrSrc;
  }
}
function createOrUpdateImage(newImageOrSrc, image, hostEl, onload, cbPayload) {
  if (!newImageOrSrc) {
    return image;
  } else if (typeof newImageOrSrc === "string") {
    if (image && image.__zrImageSrc === newImageOrSrc || !hostEl) {
      return image;
    }
    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    var pendingWrap = { hostEl, cb: onload, cbPayload };
    if (cachedImgObj) {
      image = cachedImgObj.image;
      !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
    } else {
      var image_1 = platformApi.loadImage(newImageOrSrc, imageOnLoad, imageOnLoad);
      image_1.__zrImageSrc = newImageOrSrc;
      globalImageCache.put(newImageOrSrc, image_1.__cachedImgObj = {
        image: image_1,
        pending: [pendingWrap]
      });
    }
    return image;
  } else {
    return newImageOrSrc;
  }
}
function imageOnLoad() {
  var cachedImgObj = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var i2 = 0; i2 < cachedImgObj.pending.length; i2++) {
    var pendingWrap = cachedImgObj.pending[i2];
    var cb = pendingWrap.cb;
    cb && cb(this, pendingWrap.cbPayload);
    pendingWrap.hostEl.dirty();
  }
  cachedImgObj.pending.length = 0;
}
function isImageReady(image) {
  return image && image.width && image.height;
}
var STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function truncateText(text, containerWidth, font, ellipsis, options) {
  if (!containerWidth) {
    return "";
  }
  var textLines = (text + "").split("\n");
  options = prepareTruncateOptions(containerWidth, font, ellipsis, options);
  for (var i2 = 0, len2 = textLines.length; i2 < len2; i2++) {
    textLines[i2] = truncateSingleLine(textLines[i2], options);
  }
  return textLines.join("\n");
}
function prepareTruncateOptions(containerWidth, font, ellipsis, options) {
  options = options || {};
  var preparedOpts = extend({}, options);
  preparedOpts.font = font;
  ellipsis = retrieve2(ellipsis, "...");
  preparedOpts.maxIterations = retrieve2(options.maxIterations, 2);
  var minChar = preparedOpts.minChar = retrieve2(options.minChar, 0);
  preparedOpts.cnCharWidth = getWidth("\u56FD", font);
  var ascCharWidth = preparedOpts.ascCharWidth = getWidth("a", font);
  preparedOpts.placeholder = retrieve2(options.placeholder, "");
  var contentWidth = containerWidth = Math.max(0, containerWidth - 1);
  for (var i2 = 0; i2 < minChar && contentWidth >= ascCharWidth; i2++) {
    contentWidth -= ascCharWidth;
  }
  var ellipsisWidth = getWidth(ellipsis, font);
  if (ellipsisWidth > contentWidth) {
    ellipsis = "";
    ellipsisWidth = 0;
  }
  contentWidth = containerWidth - ellipsisWidth;
  preparedOpts.ellipsis = ellipsis;
  preparedOpts.ellipsisWidth = ellipsisWidth;
  preparedOpts.contentWidth = contentWidth;
  preparedOpts.containerWidth = containerWidth;
  return preparedOpts;
}
function truncateSingleLine(textLine, options) {
  var containerWidth = options.containerWidth;
  var font = options.font;
  var contentWidth = options.contentWidth;
  if (!containerWidth) {
    return "";
  }
  var lineWidth = getWidth(textLine, font);
  if (lineWidth <= containerWidth) {
    return textLine;
  }
  for (var j = 0; ; j++) {
    if (lineWidth <= contentWidth || j >= options.maxIterations) {
      textLine += options.ellipsis;
      break;
    }
    var subLength = j === 0 ? estimateLength(textLine, contentWidth, options.ascCharWidth, options.cnCharWidth) : lineWidth > 0 ? Math.floor(textLine.length * contentWidth / lineWidth) : 0;
    textLine = textLine.substr(0, subLength);
    lineWidth = getWidth(textLine, font);
  }
  if (textLine === "") {
    textLine = options.placeholder;
  }
  return textLine;
}
function estimateLength(text, contentWidth, ascCharWidth, cnCharWidth) {
  var width = 0;
  var i2 = 0;
  for (var len2 = text.length; i2 < len2 && width < contentWidth; i2++) {
    var charCode = text.charCodeAt(i2);
    width += 0 <= charCode && charCode <= 127 ? ascCharWidth : cnCharWidth;
  }
  return i2;
}
function parsePlainText(text, style) {
  text != null && (text += "");
  var overflow = style.overflow;
  var padding = style.padding;
  var font = style.font;
  var truncate = overflow === "truncate";
  var calculatedLineHeight = getLineHeight(font);
  var lineHeight = retrieve2(style.lineHeight, calculatedLineHeight);
  var bgColorDrawn = !!style.backgroundColor;
  var truncateLineOverflow = style.lineOverflow === "truncate";
  var width = style.width;
  var lines;
  if (width != null && (overflow === "break" || overflow === "breakAll")) {
    lines = text ? wrapText(text, style.font, width, overflow === "breakAll", 0).lines : [];
  } else {
    lines = text ? text.split("\n") : [];
  }
  var contentHeight = lines.length * lineHeight;
  var height = retrieve2(style.height, contentHeight);
  if (contentHeight > height && truncateLineOverflow) {
    var lineCount = Math.floor(height / lineHeight);
    lines = lines.slice(0, lineCount);
  }
  if (text && truncate && width != null) {
    var options = prepareTruncateOptions(width, font, style.ellipsis, {
      minChar: style.truncateMinChar,
      placeholder: style.placeholder
    });
    for (var i2 = 0; i2 < lines.length; i2++) {
      lines[i2] = truncateSingleLine(lines[i2], options);
    }
  }
  var outerHeight = height;
  var contentWidth = 0;
  for (var i2 = 0; i2 < lines.length; i2++) {
    contentWidth = Math.max(getWidth(lines[i2], font), contentWidth);
  }
  if (width == null) {
    width = contentWidth;
  }
  var outerWidth = contentWidth;
  if (padding) {
    outerHeight += padding[0] + padding[2];
    outerWidth += padding[1] + padding[3];
    width += padding[1] + padding[3];
  }
  if (bgColorDrawn) {
    outerWidth = width;
  }
  return {
    lines,
    height,
    outerWidth,
    outerHeight,
    lineHeight,
    calculatedLineHeight,
    contentWidth,
    contentHeight,
    width
  };
}
var RichTextToken = function() {
  function RichTextToken2() {
  }
  return RichTextToken2;
}();
var RichTextLine = function() {
  function RichTextLine2(tokens) {
    this.tokens = [];
    if (tokens) {
      this.tokens = tokens;
    }
  }
  return RichTextLine2;
}();
var RichTextContentBlock = function() {
  function RichTextContentBlock2() {
    this.width = 0;
    this.height = 0;
    this.contentWidth = 0;
    this.contentHeight = 0;
    this.outerWidth = 0;
    this.outerHeight = 0;
    this.lines = [];
  }
  return RichTextContentBlock2;
}();
function parseRichText(text, style) {
  var contentBlock = new RichTextContentBlock();
  text != null && (text += "");
  if (!text) {
    return contentBlock;
  }
  var topWidth = style.width;
  var topHeight = style.height;
  var overflow = style.overflow;
  var wrapInfo = (overflow === "break" || overflow === "breakAll") && topWidth != null ? { width: topWidth, accumWidth: 0, breakAll: overflow === "breakAll" } : null;
  var lastIndex = STYLE_REG.lastIndex = 0;
  var result;
  while ((result = STYLE_REG.exec(text)) != null) {
    var matchedIndex = result.index;
    if (matchedIndex > lastIndex) {
      pushTokens(contentBlock, text.substring(lastIndex, matchedIndex), style, wrapInfo);
    }
    pushTokens(contentBlock, result[2], style, wrapInfo, result[1]);
    lastIndex = STYLE_REG.lastIndex;
  }
  if (lastIndex < text.length) {
    pushTokens(contentBlock, text.substring(lastIndex, text.length), style, wrapInfo);
  }
  var pendingList = [];
  var calculatedHeight = 0;
  var calculatedWidth = 0;
  var stlPadding = style.padding;
  var truncate = overflow === "truncate";
  var truncateLine = style.lineOverflow === "truncate";
  function finishLine(line2, lineWidth2, lineHeight2) {
    line2.width = lineWidth2;
    line2.lineHeight = lineHeight2;
    calculatedHeight += lineHeight2;
    calculatedWidth = Math.max(calculatedWidth, lineWidth2);
  }
  outer:
    for (var i2 = 0; i2 < contentBlock.lines.length; i2++) {
      var line = contentBlock.lines[i2];
      var lineHeight = 0;
      var lineWidth = 0;
      for (var j = 0; j < line.tokens.length; j++) {
        var token = line.tokens[j];
        var tokenStyle = token.styleName && style.rich[token.styleName] || {};
        var textPadding = token.textPadding = tokenStyle.padding;
        var paddingH = textPadding ? textPadding[1] + textPadding[3] : 0;
        var font = token.font = tokenStyle.font || style.font;
        token.contentHeight = getLineHeight(font);
        var tokenHeight = retrieve2(tokenStyle.height, token.contentHeight);
        token.innerHeight = tokenHeight;
        textPadding && (tokenHeight += textPadding[0] + textPadding[2]);
        token.height = tokenHeight;
        token.lineHeight = retrieve3(tokenStyle.lineHeight, style.lineHeight, tokenHeight);
        token.align = tokenStyle && tokenStyle.align || style.align;
        token.verticalAlign = tokenStyle && tokenStyle.verticalAlign || "middle";
        if (truncateLine && topHeight != null && calculatedHeight + token.lineHeight > topHeight) {
          if (j > 0) {
            line.tokens = line.tokens.slice(0, j);
            finishLine(line, lineWidth, lineHeight);
            contentBlock.lines = contentBlock.lines.slice(0, i2 + 1);
          } else {
            contentBlock.lines = contentBlock.lines.slice(0, i2);
          }
          break outer;
        }
        var styleTokenWidth = tokenStyle.width;
        var tokenWidthNotSpecified = styleTokenWidth == null || styleTokenWidth === "auto";
        if (typeof styleTokenWidth === "string" && styleTokenWidth.charAt(styleTokenWidth.length - 1) === "%") {
          token.percentWidth = styleTokenWidth;
          pendingList.push(token);
          token.contentWidth = getWidth(token.text, font);
        } else {
          if (tokenWidthNotSpecified) {
            var textBackgroundColor = tokenStyle.backgroundColor;
            var bgImg = textBackgroundColor && textBackgroundColor.image;
            if (bgImg) {
              bgImg = findExistImage(bgImg);
              if (isImageReady(bgImg)) {
                token.width = Math.max(token.width, bgImg.width * tokenHeight / bgImg.height);
              }
            }
          }
          var remainTruncWidth = truncate && topWidth != null ? topWidth - lineWidth : null;
          if (remainTruncWidth != null && remainTruncWidth < token.width) {
            if (!tokenWidthNotSpecified || remainTruncWidth < paddingH) {
              token.text = "";
              token.width = token.contentWidth = 0;
            } else {
              token.text = truncateText(token.text, remainTruncWidth - paddingH, font, style.ellipsis, { minChar: style.truncateMinChar });
              token.width = token.contentWidth = getWidth(token.text, font);
            }
          } else {
            token.contentWidth = getWidth(token.text, font);
          }
        }
        token.width += paddingH;
        lineWidth += token.width;
        tokenStyle && (lineHeight = Math.max(lineHeight, token.lineHeight));
      }
      finishLine(line, lineWidth, lineHeight);
    }
  contentBlock.outerWidth = contentBlock.width = retrieve2(topWidth, calculatedWidth);
  contentBlock.outerHeight = contentBlock.height = retrieve2(topHeight, calculatedHeight);
  contentBlock.contentHeight = calculatedHeight;
  contentBlock.contentWidth = calculatedWidth;
  if (stlPadding) {
    contentBlock.outerWidth += stlPadding[1] + stlPadding[3];
    contentBlock.outerHeight += stlPadding[0] + stlPadding[2];
  }
  for (var i2 = 0; i2 < pendingList.length; i2++) {
    var token = pendingList[i2];
    var percentWidth = token.percentWidth;
    token.width = parseInt(percentWidth, 10) / 100 * contentBlock.width;
  }
  return contentBlock;
}
function pushTokens(block, str, style, wrapInfo, styleName) {
  var isEmptyStr = str === "";
  var tokenStyle = styleName && style.rich[styleName] || {};
  var lines = block.lines;
  var font = tokenStyle.font || style.font;
  var newLine = false;
  var strLines;
  var linesWidths;
  if (wrapInfo) {
    var tokenPadding = tokenStyle.padding;
    var tokenPaddingH = tokenPadding ? tokenPadding[1] + tokenPadding[3] : 0;
    if (tokenStyle.width != null && tokenStyle.width !== "auto") {
      var outerWidth_1 = parsePercent(tokenStyle.width, wrapInfo.width) + tokenPaddingH;
      if (lines.length > 0) {
        if (outerWidth_1 + wrapInfo.accumWidth > wrapInfo.width) {
          strLines = str.split("\n");
          newLine = true;
        }
      }
      wrapInfo.accumWidth = outerWidth_1;
    } else {
      var res = wrapText(str, font, wrapInfo.width, wrapInfo.breakAll, wrapInfo.accumWidth);
      wrapInfo.accumWidth = res.accumWidth + tokenPaddingH;
      linesWidths = res.linesWidths;
      strLines = res.lines;
    }
  } else {
    strLines = str.split("\n");
  }
  for (var i2 = 0; i2 < strLines.length; i2++) {
    var text = strLines[i2];
    var token = new RichTextToken();
    token.styleName = styleName;
    token.text = text;
    token.isLineHolder = !text && !isEmptyStr;
    if (typeof tokenStyle.width === "number") {
      token.width = tokenStyle.width;
    } else {
      token.width = linesWidths ? linesWidths[i2] : getWidth(text, font);
    }
    if (!i2 && !newLine) {
      var tokens = (lines[lines.length - 1] || (lines[0] = new RichTextLine())).tokens;
      var tokensLen = tokens.length;
      tokensLen === 1 && tokens[0].isLineHolder ? tokens[0] = token : (text || !tokensLen || isEmptyStr) && tokens.push(token);
    } else {
      lines.push(new RichTextLine([token]));
    }
  }
}
function isLatin(ch) {
  var code = ch.charCodeAt(0);
  return code >= 33 && code <= 383;
}
var breakCharMap = reduce(",&?/;] ".split(""), function(obj, ch) {
  obj[ch] = true;
  return obj;
}, {});
function isWordBreakChar(ch) {
  if (isLatin(ch)) {
    if (breakCharMap[ch]) {
      return true;
    }
    return false;
  }
  return true;
}
function wrapText(text, font, lineWidth, isBreakAll, lastAccumWidth) {
  var lines = [];
  var linesWidths = [];
  var line = "";
  var currentWord = "";
  var currentWordWidth = 0;
  var accumWidth = 0;
  for (var i2 = 0; i2 < text.length; i2++) {
    var ch = text.charAt(i2);
    if (ch === "\n") {
      if (currentWord) {
        line += currentWord;
        accumWidth += currentWordWidth;
      }
      lines.push(line);
      linesWidths.push(accumWidth);
      line = "";
      currentWord = "";
      currentWordWidth = 0;
      accumWidth = 0;
      continue;
    }
    var chWidth = getWidth(ch, font);
    var inWord = isBreakAll ? false : !isWordBreakChar(ch);
    if (!lines.length ? lastAccumWidth + accumWidth + chWidth > lineWidth : accumWidth + chWidth > lineWidth) {
      if (!accumWidth) {
        if (inWord) {
          lines.push(currentWord);
          linesWidths.push(currentWordWidth);
          currentWord = ch;
          currentWordWidth = chWidth;
        } else {
          lines.push(ch);
          linesWidths.push(chWidth);
        }
      } else if (line || currentWord) {
        if (inWord) {
          if (!line) {
            line = currentWord;
            currentWord = "";
            currentWordWidth = 0;
            accumWidth = currentWordWidth;
          }
          lines.push(line);
          linesWidths.push(accumWidth - currentWordWidth);
          currentWord += ch;
          currentWordWidth += chWidth;
          line = "";
          accumWidth = currentWordWidth;
        } else {
          if (currentWord) {
            line += currentWord;
            currentWord = "";
            currentWordWidth = 0;
          }
          lines.push(line);
          linesWidths.push(accumWidth);
          line = ch;
          accumWidth = chWidth;
        }
      }
      continue;
    }
    accumWidth += chWidth;
    if (inWord) {
      currentWord += ch;
      currentWordWidth += chWidth;
    } else {
      if (currentWord) {
        line += currentWord;
        currentWord = "";
        currentWordWidth = 0;
      }
      line += ch;
    }
  }
  if (!lines.length && !line) {
    line = text;
    currentWord = "";
    currentWordWidth = 0;
  }
  if (currentWord) {
    line += currentWord;
  }
  if (line) {
    lines.push(line);
    linesWidths.push(accumWidth);
  }
  if (lines.length === 1) {
    accumWidth += lastAccumWidth;
  }
  return {
    accumWidth,
    lines,
    linesWidths
  };
}
var STYLE_MAGIC_KEY = "__zr_style_" + Math.round(Math.random() * 10);
var DEFAULT_COMMON_STYLE = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
};
var DEFAULT_COMMON_ANIMATION_PROPS = {
  style: {
    shadowBlur: true,
    shadowOffsetX: true,
    shadowOffsetY: true,
    shadowColor: true,
    opacity: true
  }
};
DEFAULT_COMMON_STYLE[STYLE_MAGIC_KEY] = true;
var PRIMARY_STATES_KEYS = ["z", "z2", "invisible"];
var PRIMARY_STATES_KEYS_IN_HOVER_LAYER = ["invisible"];
var Displayable = function(_super) {
  __extends(Displayable2, _super);
  function Displayable2(props) {
    return _super.call(this, props) || this;
  }
  Displayable2.prototype._init = function(props) {
    var keysArr = keys(props);
    for (var i2 = 0; i2 < keysArr.length; i2++) {
      var key = keysArr[i2];
      if (key === "style") {
        this.useStyle(props[key]);
      } else {
        _super.prototype.attrKV.call(this, key, props[key]);
      }
    }
    if (!this.style) {
      this.useStyle({});
    }
  };
  Displayable2.prototype.beforeBrush = function() {
  };
  Displayable2.prototype.afterBrush = function() {
  };
  Displayable2.prototype.innerBeforeBrush = function() {
  };
  Displayable2.prototype.innerAfterBrush = function() {
  };
  Displayable2.prototype.shouldBePainted = function(viewWidth, viewHeight, considerClipPath, considerAncestors) {
    var m2 = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && isDisplayableCulled(this, viewWidth, viewHeight) || m2 && !m2[0] && !m2[3]) {
      return false;
    }
    if (considerClipPath && this.__clipPaths) {
      for (var i2 = 0; i2 < this.__clipPaths.length; ++i2) {
        if (this.__clipPaths[i2].isZeroArea()) {
          return false;
        }
      }
    }
    if (considerAncestors && this.parent) {
      var parent_1 = this.parent;
      while (parent_1) {
        if (parent_1.ignore) {
          return false;
        }
        parent_1 = parent_1.parent;
      }
    }
    return true;
  };
  Displayable2.prototype.contain = function(x2, y2) {
    return this.rectContain(x2, y2);
  };
  Displayable2.prototype.traverse = function(cb, context) {
    cb.call(context, this);
  };
  Displayable2.prototype.rectContain = function(x2, y2) {
    var coord = this.transformCoordToLocal(x2, y2);
    var rect = this.getBoundingRect();
    return rect.contain(coord[0], coord[1]);
  };
  Displayable2.prototype.getPaintRect = function() {
    var rect = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var transform = this.transform;
      var elRect = this.getBoundingRect();
      var style = this.style;
      var shadowSize = style.shadowBlur || 0;
      var shadowOffsetX = style.shadowOffsetX || 0;
      var shadowOffsetY = style.shadowOffsetY || 0;
      rect = this._paintRect || (this._paintRect = new BoundingRect$1(0, 0, 0, 0));
      if (transform) {
        BoundingRect$1.applyTransform(rect, elRect, transform);
      } else {
        rect.copy(elRect);
      }
      if (shadowSize || shadowOffsetX || shadowOffsetY) {
        rect.width += shadowSize * 2 + Math.abs(shadowOffsetX);
        rect.height += shadowSize * 2 + Math.abs(shadowOffsetY);
        rect.x = Math.min(rect.x, rect.x + shadowOffsetX - shadowSize);
        rect.y = Math.min(rect.y, rect.y + shadowOffsetY - shadowSize);
      }
      var tolerance = this.dirtyRectTolerance;
      if (!rect.isZero()) {
        rect.x = Math.floor(rect.x - tolerance);
        rect.y = Math.floor(rect.y - tolerance);
        rect.width = Math.ceil(rect.width + 1 + tolerance * 2);
        rect.height = Math.ceil(rect.height + 1 + tolerance * 2);
      }
    }
    return rect;
  };
  Displayable2.prototype.setPrevPaintRect = function(paintRect) {
    if (paintRect) {
      this._prevPaintRect = this._prevPaintRect || new BoundingRect$1(0, 0, 0, 0);
      this._prevPaintRect.copy(paintRect);
    } else {
      this._prevPaintRect = null;
    }
  };
  Displayable2.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  };
  Displayable2.prototype.animateStyle = function(loop) {
    return this.animate("style", loop);
  };
  Displayable2.prototype.updateDuringAnimation = function(targetKey) {
    if (targetKey === "style") {
      this.dirtyStyle();
    } else {
      this.markRedraw();
    }
  };
  Displayable2.prototype.attrKV = function(key, value) {
    if (key !== "style") {
      _super.prototype.attrKV.call(this, key, value);
    } else {
      if (!this.style) {
        this.useStyle(value);
      } else {
        this.setStyle(value);
      }
    }
  };
  Displayable2.prototype.setStyle = function(keyOrObj, value) {
    if (typeof keyOrObj === "string") {
      this.style[keyOrObj] = value;
    } else {
      extend(this.style, keyOrObj);
    }
    this.dirtyStyle();
    return this;
  };
  Displayable2.prototype.dirtyStyle = function(notRedraw) {
    if (!notRedraw) {
      this.markRedraw();
    }
    this.__dirty |= STYLE_CHANGED_BIT;
    if (this._rect) {
      this._rect = null;
    }
  };
  Displayable2.prototype.dirty = function() {
    this.dirtyStyle();
  };
  Displayable2.prototype.styleChanged = function() {
    return !!(this.__dirty & STYLE_CHANGED_BIT);
  };
  Displayable2.prototype.styleUpdated = function() {
    this.__dirty &= ~STYLE_CHANGED_BIT;
  };
  Displayable2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_COMMON_STYLE, obj);
  };
  Displayable2.prototype.useStyle = function(obj) {
    if (!obj[STYLE_MAGIC_KEY]) {
      obj = this.createStyle(obj);
    }
    if (this.__inHover) {
      this.__hoverStyle = obj;
    } else {
      this.style = obj;
    }
    this.dirtyStyle();
  };
  Displayable2.prototype.isStyleObject = function(obj) {
    return obj[STYLE_MAGIC_KEY];
  };
  Displayable2.prototype._innerSaveToNormal = function(toState) {
    _super.prototype._innerSaveToNormal.call(this, toState);
    var normalState = this._normalState;
    if (toState.style && !normalState.style) {
      normalState.style = this._mergeStyle(this.createStyle(), this.style);
    }
    this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
  };
  Displayable2.prototype._applyStateObj = function(stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
    _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
    var needsRestoreToNormal = !(state && keepCurrentStates);
    var targetStyle;
    if (state && state.style) {
      if (transition) {
        if (keepCurrentStates) {
          targetStyle = state.style;
        } else {
          targetStyle = this._mergeStyle(this.createStyle(), normalState.style);
          this._mergeStyle(targetStyle, state.style);
        }
      } else {
        targetStyle = this._mergeStyle(this.createStyle(), keepCurrentStates ? this.style : normalState.style);
        this._mergeStyle(targetStyle, state.style);
      }
    } else if (needsRestoreToNormal) {
      targetStyle = normalState.style;
    }
    if (targetStyle) {
      if (transition) {
        var sourceStyle = this.style;
        this.style = this.createStyle(needsRestoreToNormal ? {} : sourceStyle);
        if (needsRestoreToNormal) {
          var changedKeys = keys(sourceStyle);
          for (var i2 = 0; i2 < changedKeys.length; i2++) {
            var key = changedKeys[i2];
            if (key in targetStyle) {
              targetStyle[key] = targetStyle[key];
              this.style[key] = sourceStyle[key];
            }
          }
        }
        var targetKeys = keys(targetStyle);
        for (var i2 = 0; i2 < targetKeys.length; i2++) {
          var key = targetKeys[i2];
          this.style[key] = this.style[key];
        }
        this._transitionState(stateName, {
          style: targetStyle
        }, animationCfg, this.getAnimationStyleProps());
      } else {
        this.useStyle(targetStyle);
      }
    }
    var statesKeys = this.__inHover ? PRIMARY_STATES_KEYS_IN_HOVER_LAYER : PRIMARY_STATES_KEYS;
    for (var i2 = 0; i2 < statesKeys.length; i2++) {
      var key = statesKeys[i2];
      if (state && state[key] != null) {
        this[key] = state[key];
      } else if (needsRestoreToNormal) {
        if (normalState[key] != null) {
          this[key] = normalState[key];
        }
      }
    }
  };
  Displayable2.prototype._mergeStates = function(states) {
    var mergedState = _super.prototype._mergeStates.call(this, states);
    var mergedStyle;
    for (var i2 = 0; i2 < states.length; i2++) {
      var state = states[i2];
      if (state.style) {
        mergedStyle = mergedStyle || {};
        this._mergeStyle(mergedStyle, state.style);
      }
    }
    if (mergedStyle) {
      mergedState.style = mergedStyle;
    }
    return mergedState;
  };
  Displayable2.prototype._mergeStyle = function(targetStyle, sourceStyle) {
    extend(targetStyle, sourceStyle);
    return targetStyle;
  };
  Displayable2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_COMMON_ANIMATION_PROPS;
  };
  Displayable2.initDefaultProps = function() {
    var dispProto = Displayable2.prototype;
    dispProto.type = "displayable";
    dispProto.invisible = false;
    dispProto.z = 0;
    dispProto.z2 = 0;
    dispProto.zlevel = 0;
    dispProto.culling = false;
    dispProto.cursor = "pointer";
    dispProto.rectHover = false;
    dispProto.incremental = false;
    dispProto._rect = null;
    dispProto.dirtyRectTolerance = 0;
    dispProto.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT;
  }();
  return Displayable2;
}(Element$2);
var tmpRect = new BoundingRect$1(0, 0, 0, 0);
var viewRect = new BoundingRect$1(0, 0, 0, 0);
function isDisplayableCulled(el, width, height) {
  tmpRect.copy(el.getBoundingRect());
  if (el.transform) {
    tmpRect.applyTransform(el.transform);
  }
  viewRect.width = width;
  viewRect.height = height;
  return !tmpRect.intersect(viewRect);
}
var Displayable$1 = Displayable;
var mathMin$2 = Math.min;
var mathMax$2 = Math.max;
var mathSin$3 = Math.sin;
var mathCos$3 = Math.cos;
var PI2$5 = Math.PI * 2;
var start = create$1();
var end = create$1();
var extremity = create$1();
function fromPoints(points2, min3, max3) {
  if (points2.length === 0) {
    return;
  }
  var p2 = points2[0];
  var left = p2[0];
  var right = p2[0];
  var top = p2[1];
  var bottom = p2[1];
  for (var i2 = 1; i2 < points2.length; i2++) {
    p2 = points2[i2];
    left = mathMin$2(left, p2[0]);
    right = mathMax$2(right, p2[0]);
    top = mathMin$2(top, p2[1]);
    bottom = mathMax$2(bottom, p2[1]);
  }
  min3[0] = left;
  min3[1] = top;
  max3[0] = right;
  max3[1] = bottom;
}
function fromLine(x0, y0, x1, y1, min3, max3) {
  min3[0] = mathMin$2(x0, x1);
  min3[1] = mathMin$2(y0, y1);
  max3[0] = mathMax$2(x0, x1);
  max3[1] = mathMax$2(y0, y1);
}
var xDim = [];
var yDim = [];
function fromCubic(x0, y0, x1, y1, x2, y2, x3, y3, min3, max3) {
  var cubicExtrema$1 = cubicExtrema;
  var cubicAt$1 = cubicAt;
  var n2 = cubicExtrema$1(x0, x1, x2, x3, xDim);
  min3[0] = Infinity;
  min3[1] = Infinity;
  max3[0] = -Infinity;
  max3[1] = -Infinity;
  for (var i2 = 0; i2 < n2; i2++) {
    var x4 = cubicAt$1(x0, x1, x2, x3, xDim[i2]);
    min3[0] = mathMin$2(x4, min3[0]);
    max3[0] = mathMax$2(x4, max3[0]);
  }
  n2 = cubicExtrema$1(y0, y1, y2, y3, yDim);
  for (var i2 = 0; i2 < n2; i2++) {
    var y4 = cubicAt$1(y0, y1, y2, y3, yDim[i2]);
    min3[1] = mathMin$2(y4, min3[1]);
    max3[1] = mathMax$2(y4, max3[1]);
  }
  min3[0] = mathMin$2(x0, min3[0]);
  max3[0] = mathMax$2(x0, max3[0]);
  min3[0] = mathMin$2(x3, min3[0]);
  max3[0] = mathMax$2(x3, max3[0]);
  min3[1] = mathMin$2(y0, min3[1]);
  max3[1] = mathMax$2(y0, max3[1]);
  min3[1] = mathMin$2(y3, min3[1]);
  max3[1] = mathMax$2(y3, max3[1]);
}
function fromQuadratic(x0, y0, x1, y1, x2, y2, min3, max3) {
  var quadraticExtremum$1 = quadraticExtremum;
  var quadraticAt$1 = quadraticAt;
  var tx = mathMax$2(mathMin$2(quadraticExtremum$1(x0, x1, x2), 1), 0);
  var ty = mathMax$2(mathMin$2(quadraticExtremum$1(y0, y1, y2), 1), 0);
  var x3 = quadraticAt$1(x0, x1, x2, tx);
  var y3 = quadraticAt$1(y0, y1, y2, ty);
  min3[0] = mathMin$2(x0, x2, x3);
  min3[1] = mathMin$2(y0, y2, y3);
  max3[0] = mathMax$2(x0, x2, x3);
  max3[1] = mathMax$2(y0, y2, y3);
}
function fromArc(x2, y2, rx, ry, startAngle, endAngle, anticlockwise, min3, max3) {
  var vec2Min = min$1;
  var vec2Max = max$1;
  var diff = Math.abs(startAngle - endAngle);
  if (diff % PI2$5 < 1e-4 && diff > 1e-4) {
    min3[0] = x2 - rx;
    min3[1] = y2 - ry;
    max3[0] = x2 + rx;
    max3[1] = y2 + ry;
    return;
  }
  start[0] = mathCos$3(startAngle) * rx + x2;
  start[1] = mathSin$3(startAngle) * ry + y2;
  end[0] = mathCos$3(endAngle) * rx + x2;
  end[1] = mathSin$3(endAngle) * ry + y2;
  vec2Min(min3, start, end);
  vec2Max(max3, start, end);
  startAngle = startAngle % PI2$5;
  if (startAngle < 0) {
    startAngle = startAngle + PI2$5;
  }
  endAngle = endAngle % PI2$5;
  if (endAngle < 0) {
    endAngle = endAngle + PI2$5;
  }
  if (startAngle > endAngle && !anticlockwise) {
    endAngle += PI2$5;
  } else if (startAngle < endAngle && anticlockwise) {
    startAngle += PI2$5;
  }
  if (anticlockwise) {
    var tmp = endAngle;
    endAngle = startAngle;
    startAngle = tmp;
  }
  for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
    if (angle > startAngle) {
      extremity[0] = mathCos$3(angle) * rx + x2;
      extremity[1] = mathSin$3(angle) * ry + y2;
      vec2Min(min3, extremity, min3);
      vec2Max(max3, extremity, max3);
    }
  }
}
var CMD$3 = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
};
var tmpOutX = [];
var tmpOutY = [];
var min = [];
var max = [];
var min2 = [];
var max2 = [];
var mathMin$1 = Math.min;
var mathMax$1 = Math.max;
var mathCos$2 = Math.cos;
var mathSin$2 = Math.sin;
var mathAbs$1 = Math.abs;
var PI$2 = Math.PI;
var PI2$4 = PI$2 * 2;
var hasTypedArray = typeof Float32Array !== "undefined";
var tmpAngles = [];
function modPI2(radian) {
  var n2 = Math.round(radian / PI$2 * 1e8) / 1e8;
  return n2 % 2 * PI$2;
}
function normalizeArcAngles(angles, anticlockwise) {
  var newStartAngle = modPI2(angles[0]);
  if (newStartAngle < 0) {
    newStartAngle += PI2$4;
  }
  var delta = newStartAngle - angles[0];
  var newEndAngle = angles[1];
  newEndAngle += delta;
  if (!anticlockwise && newEndAngle - newStartAngle >= PI2$4) {
    newEndAngle = newStartAngle + PI2$4;
  } else if (anticlockwise && newStartAngle - newEndAngle >= PI2$4) {
    newEndAngle = newStartAngle - PI2$4;
  } else if (!anticlockwise && newStartAngle > newEndAngle) {
    newEndAngle = newStartAngle + (PI2$4 - modPI2(newStartAngle - newEndAngle));
  } else if (anticlockwise && newStartAngle < newEndAngle) {
    newEndAngle = newStartAngle - (PI2$4 - modPI2(newEndAngle - newStartAngle));
  }
  angles[0] = newStartAngle;
  angles[1] = newEndAngle;
}
var PathProxy = function() {
  function PathProxy2(notSaveData) {
    this.dpr = 1;
    this._xi = 0;
    this._yi = 0;
    this._x0 = 0;
    this._y0 = 0;
    this._len = 0;
    if (notSaveData) {
      this._saveData = false;
    }
    if (this._saveData) {
      this.data = [];
    }
  }
  PathProxy2.prototype.increaseVersion = function() {
    this._version++;
  };
  PathProxy2.prototype.getVersion = function() {
    return this._version;
  };
  PathProxy2.prototype.setScale = function(sx, sy, segmentIgnoreThreshold) {
    segmentIgnoreThreshold = segmentIgnoreThreshold || 0;
    if (segmentIgnoreThreshold > 0) {
      this._ux = mathAbs$1(segmentIgnoreThreshold / devicePixelRatio / sx) || 0;
      this._uy = mathAbs$1(segmentIgnoreThreshold / devicePixelRatio / sy) || 0;
    }
  };
  PathProxy2.prototype.setDPR = function(dpr2) {
    this.dpr = dpr2;
  };
  PathProxy2.prototype.setContext = function(ctx) {
    this._ctx = ctx;
  };
  PathProxy2.prototype.getContext = function() {
    return this._ctx;
  };
  PathProxy2.prototype.beginPath = function() {
    this._ctx && this._ctx.beginPath();
    this.reset();
    return this;
  };
  PathProxy2.prototype.reset = function() {
    if (this._saveData) {
      this._len = 0;
    }
    if (this._pathSegLen) {
      this._pathSegLen = null;
      this._pathLen = 0;
    }
    this._version++;
  };
  PathProxy2.prototype.moveTo = function(x2, y2) {
    this._drawPendingPt();
    this.addData(CMD$3.M, x2, y2);
    this._ctx && this._ctx.moveTo(x2, y2);
    this._x0 = x2;
    this._y0 = y2;
    this._xi = x2;
    this._yi = y2;
    return this;
  };
  PathProxy2.prototype.lineTo = function(x2, y2) {
    var dx = mathAbs$1(x2 - this._xi);
    var dy = mathAbs$1(y2 - this._yi);
    var exceedUnit = dx > this._ux || dy > this._uy;
    this.addData(CMD$3.L, x2, y2);
    if (this._ctx && exceedUnit) {
      this._ctx.lineTo(x2, y2);
    }
    if (exceedUnit) {
      this._xi = x2;
      this._yi = y2;
      this._pendingPtDist = 0;
    } else {
      var d2 = dx * dx + dy * dy;
      if (d2 > this._pendingPtDist) {
        this._pendingPtX = x2;
        this._pendingPtY = y2;
        this._pendingPtDist = d2;
      }
    }
    return this;
  };
  PathProxy2.prototype.bezierCurveTo = function(x1, y1, x2, y2, x3, y3) {
    this._drawPendingPt();
    this.addData(CMD$3.C, x1, y1, x2, y2, x3, y3);
    if (this._ctx) {
      this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    }
    this._xi = x3;
    this._yi = y3;
    return this;
  };
  PathProxy2.prototype.quadraticCurveTo = function(x1, y1, x2, y2) {
    this._drawPendingPt();
    this.addData(CMD$3.Q, x1, y1, x2, y2);
    if (this._ctx) {
      this._ctx.quadraticCurveTo(x1, y1, x2, y2);
    }
    this._xi = x2;
    this._yi = y2;
    return this;
  };
  PathProxy2.prototype.arc = function(cx, cy, r2, startAngle, endAngle, anticlockwise) {
    this._drawPendingPt();
    tmpAngles[0] = startAngle;
    tmpAngles[1] = endAngle;
    normalizeArcAngles(tmpAngles, anticlockwise);
    startAngle = tmpAngles[0];
    endAngle = tmpAngles[1];
    var delta = endAngle - startAngle;
    this.addData(CMD$3.A, cx, cy, r2, r2, startAngle, delta, 0, anticlockwise ? 0 : 1);
    this._ctx && this._ctx.arc(cx, cy, r2, startAngle, endAngle, anticlockwise);
    this._xi = mathCos$2(endAngle) * r2 + cx;
    this._yi = mathSin$2(endAngle) * r2 + cy;
    return this;
  };
  PathProxy2.prototype.arcTo = function(x1, y1, x2, y2, radius) {
    this._drawPendingPt();
    if (this._ctx) {
      this._ctx.arcTo(x1, y1, x2, y2, radius);
    }
    return this;
  };
  PathProxy2.prototype.rect = function(x2, y2, w2, h2) {
    this._drawPendingPt();
    this._ctx && this._ctx.rect(x2, y2, w2, h2);
    this.addData(CMD$3.R, x2, y2, w2, h2);
    return this;
  };
  PathProxy2.prototype.closePath = function() {
    this._drawPendingPt();
    this.addData(CMD$3.Z);
    var ctx = this._ctx;
    var x0 = this._x0;
    var y0 = this._y0;
    if (ctx) {
      ctx.closePath();
    }
    this._xi = x0;
    this._yi = y0;
    return this;
  };
  PathProxy2.prototype.fill = function(ctx) {
    ctx && ctx.fill();
    this.toStatic();
  };
  PathProxy2.prototype.stroke = function(ctx) {
    ctx && ctx.stroke();
    this.toStatic();
  };
  PathProxy2.prototype.len = function() {
    return this._len;
  };
  PathProxy2.prototype.setData = function(data2) {
    var len2 = data2.length;
    if (!(this.data && this.data.length === len2) && hasTypedArray) {
      this.data = new Float32Array(len2);
    }
    for (var i2 = 0; i2 < len2; i2++) {
      this.data[i2] = data2[i2];
    }
    this._len = len2;
  };
  PathProxy2.prototype.appendPath = function(path) {
    if (!(path instanceof Array)) {
      path = [path];
    }
    var len2 = path.length;
    var appendSize = 0;
    var offset = this._len;
    for (var i2 = 0; i2 < len2; i2++) {
      appendSize += path[i2].len();
    }
    if (hasTypedArray && this.data instanceof Float32Array) {
      this.data = new Float32Array(offset + appendSize);
    }
    for (var i2 = 0; i2 < len2; i2++) {
      var appendPathData = path[i2].data;
      for (var k = 0; k < appendPathData.length; k++) {
        this.data[offset++] = appendPathData[k];
      }
    }
    this._len = offset;
  };
  PathProxy2.prototype.addData = function(cmd, a2, b2, c2, d2, e2, f2, g2, h2) {
    if (!this._saveData) {
      return;
    }
    var data2 = this.data;
    if (this._len + arguments.length > data2.length) {
      this._expandData();
      data2 = this.data;
    }
    for (var i2 = 0; i2 < arguments.length; i2++) {
      data2[this._len++] = arguments[i2];
    }
  };
  PathProxy2.prototype._drawPendingPt = function() {
    if (this._pendingPtDist > 0) {
      this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY);
      this._pendingPtDist = 0;
    }
  };
  PathProxy2.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      var newData = [];
      for (var i2 = 0; i2 < this._len; i2++) {
        newData[i2] = this.data[i2];
      }
      this.data = newData;
    }
  };
  PathProxy2.prototype.toStatic = function() {
    if (!this._saveData) {
      return;
    }
    this._drawPendingPt();
    var data2 = this.data;
    if (data2 instanceof Array) {
      data2.length = this._len;
      if (hasTypedArray && this._len > 11) {
        this.data = new Float32Array(data2);
      }
    }
  };
  PathProxy2.prototype.getBoundingRect = function() {
    min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE;
    max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
    var data2 = this.data;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    var i2;
    for (i2 = 0; i2 < this._len; ) {
      var cmd = data2[i2++];
      var isFirst = i2 === 1;
      if (isFirst) {
        xi = data2[i2];
        yi = data2[i2 + 1];
        x0 = xi;
        y0 = yi;
      }
      switch (cmd) {
        case CMD$3.M:
          xi = x0 = data2[i2++];
          yi = y0 = data2[i2++];
          min2[0] = x0;
          min2[1] = y0;
          max2[0] = x0;
          max2[1] = y0;
          break;
        case CMD$3.L:
          fromLine(xi, yi, data2[i2], data2[i2 + 1], min2, max2);
          xi = data2[i2++];
          yi = data2[i2++];
          break;
        case CMD$3.C:
          fromCubic(xi, yi, data2[i2++], data2[i2++], data2[i2++], data2[i2++], data2[i2], data2[i2 + 1], min2, max2);
          xi = data2[i2++];
          yi = data2[i2++];
          break;
        case CMD$3.Q:
          fromQuadratic(xi, yi, data2[i2++], data2[i2++], data2[i2], data2[i2 + 1], min2, max2);
          xi = data2[i2++];
          yi = data2[i2++];
          break;
        case CMD$3.A:
          var cx = data2[i2++];
          var cy = data2[i2++];
          var rx = data2[i2++];
          var ry = data2[i2++];
          var startAngle = data2[i2++];
          var endAngle = data2[i2++] + startAngle;
          i2 += 1;
          var anticlockwise = !data2[i2++];
          if (isFirst) {
            x0 = mathCos$2(startAngle) * rx + cx;
            y0 = mathSin$2(startAngle) * ry + cy;
          }
          fromArc(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min2, max2);
          xi = mathCos$2(endAngle) * rx + cx;
          yi = mathSin$2(endAngle) * ry + cy;
          break;
        case CMD$3.R:
          x0 = xi = data2[i2++];
          y0 = yi = data2[i2++];
          var width = data2[i2++];
          var height = data2[i2++];
          fromLine(x0, y0, x0 + width, y0 + height, min2, max2);
          break;
        case CMD$3.Z:
          xi = x0;
          yi = y0;
          break;
      }
      min$1(min, min, min2);
      max$1(max, max, max2);
    }
    if (i2 === 0) {
      min[0] = min[1] = max[0] = max[1] = 0;
    }
    return new BoundingRect$1(min[0], min[1], max[0] - min[0], max[1] - min[1]);
  };
  PathProxy2.prototype._calculateLength = function() {
    var data2 = this.data;
    var len2 = this._len;
    var ux = this._ux;
    var uy = this._uy;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    if (!this._pathSegLen) {
      this._pathSegLen = [];
    }
    var pathSegLen = this._pathSegLen;
    var pathTotalLen = 0;
    var segCount = 0;
    for (var i2 = 0; i2 < len2; ) {
      var cmd = data2[i2++];
      var isFirst = i2 === 1;
      if (isFirst) {
        xi = data2[i2];
        yi = data2[i2 + 1];
        x0 = xi;
        y0 = yi;
      }
      var l2 = -1;
      switch (cmd) {
        case CMD$3.M:
          xi = x0 = data2[i2++];
          yi = y0 = data2[i2++];
          break;
        case CMD$3.L: {
          var x2 = data2[i2++];
          var y2 = data2[i2++];
          var dx = x2 - xi;
          var dy = y2 - yi;
          if (mathAbs$1(dx) > ux || mathAbs$1(dy) > uy || i2 === len2 - 1) {
            l2 = Math.sqrt(dx * dx + dy * dy);
            xi = x2;
            yi = y2;
          }
          break;
        }
        case CMD$3.C: {
          var x1 = data2[i2++];
          var y1 = data2[i2++];
          var x2 = data2[i2++];
          var y2 = data2[i2++];
          var x3 = data2[i2++];
          var y3 = data2[i2++];
          l2 = cubicLength(xi, yi, x1, y1, x2, y2, x3, y3, 10);
          xi = x3;
          yi = y3;
          break;
        }
        case CMD$3.Q: {
          var x1 = data2[i2++];
          var y1 = data2[i2++];
          var x2 = data2[i2++];
          var y2 = data2[i2++];
          l2 = quadraticLength(xi, yi, x1, y1, x2, y2, 10);
          xi = x2;
          yi = y2;
          break;
        }
        case CMD$3.A:
          var cx = data2[i2++];
          var cy = data2[i2++];
          var rx = data2[i2++];
          var ry = data2[i2++];
          var startAngle = data2[i2++];
          var delta = data2[i2++];
          var endAngle = delta + startAngle;
          i2 += 1;
          !data2[i2++];
          if (isFirst) {
            x0 = mathCos$2(startAngle) * rx + cx;
            y0 = mathSin$2(startAngle) * ry + cy;
          }
          l2 = mathMax$1(rx, ry) * mathMin$1(PI2$4, Math.abs(delta));
          xi = mathCos$2(endAngle) * rx + cx;
          yi = mathSin$2(endAngle) * ry + cy;
          break;
        case CMD$3.R: {
          x0 = xi = data2[i2++];
          y0 = yi = data2[i2++];
          var width = data2[i2++];
          var height = data2[i2++];
          l2 = width * 2 + height * 2;
          break;
        }
        case CMD$3.Z: {
          var dx = x0 - xi;
          var dy = y0 - yi;
          l2 = Math.sqrt(dx * dx + dy * dy);
          xi = x0;
          yi = y0;
          break;
        }
      }
      if (l2 >= 0) {
        pathSegLen[segCount++] = l2;
        pathTotalLen += l2;
      }
    }
    this._pathLen = pathTotalLen;
    return pathTotalLen;
  };
  PathProxy2.prototype.rebuildPath = function(ctx, percent) {
    var d2 = this.data;
    var ux = this._ux;
    var uy = this._uy;
    var len2 = this._len;
    var x0;
    var y0;
    var xi;
    var yi;
    var x2;
    var y2;
    var drawPart = percent < 1;
    var pathSegLen;
    var pathTotalLen;
    var accumLength = 0;
    var segCount = 0;
    var displayedLength;
    var pendingPtDist = 0;
    var pendingPtX;
    var pendingPtY;
    if (drawPart) {
      if (!this._pathSegLen) {
        this._calculateLength();
      }
      pathSegLen = this._pathSegLen;
      pathTotalLen = this._pathLen;
      displayedLength = percent * pathTotalLen;
      if (!displayedLength) {
        return;
      }
    }
    lo:
      for (var i2 = 0; i2 < len2; ) {
        var cmd = d2[i2++];
        var isFirst = i2 === 1;
        if (isFirst) {
          xi = d2[i2];
          yi = d2[i2 + 1];
          x0 = xi;
          y0 = yi;
        }
        if (cmd !== CMD$3.L && pendingPtDist > 0) {
          ctx.lineTo(pendingPtX, pendingPtY);
          pendingPtDist = 0;
        }
        switch (cmd) {
          case CMD$3.M:
            x0 = xi = d2[i2++];
            y0 = yi = d2[i2++];
            ctx.moveTo(xi, yi);
            break;
          case CMD$3.L: {
            x2 = d2[i2++];
            y2 = d2[i2++];
            var dx = mathAbs$1(x2 - xi);
            var dy = mathAbs$1(y2 - yi);
            if (dx > ux || dy > uy) {
              if (drawPart) {
                var l2 = pathSegLen[segCount++];
                if (accumLength + l2 > displayedLength) {
                  var t2 = (displayedLength - accumLength) / l2;
                  ctx.lineTo(xi * (1 - t2) + x2 * t2, yi * (1 - t2) + y2 * t2);
                  break lo;
                }
                accumLength += l2;
              }
              ctx.lineTo(x2, y2);
              xi = x2;
              yi = y2;
              pendingPtDist = 0;
            } else {
              var d22 = dx * dx + dy * dy;
              if (d22 > pendingPtDist) {
                pendingPtX = x2;
                pendingPtY = y2;
                pendingPtDist = d22;
              }
            }
            break;
          }
          case CMD$3.C: {
            var x1 = d2[i2++];
            var y1 = d2[i2++];
            var x22 = d2[i2++];
            var y22 = d2[i2++];
            var x3 = d2[i2++];
            var y3 = d2[i2++];
            if (drawPart) {
              var l2 = pathSegLen[segCount++];
              if (accumLength + l2 > displayedLength) {
                var t2 = (displayedLength - accumLength) / l2;
                cubicSubdivide(xi, x1, x22, x3, t2, tmpOutX);
                cubicSubdivide(yi, y1, y22, y3, t2, tmpOutY);
                ctx.bezierCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2], tmpOutX[3], tmpOutY[3]);
                break lo;
              }
              accumLength += l2;
            }
            ctx.bezierCurveTo(x1, y1, x22, y22, x3, y3);
            xi = x3;
            yi = y3;
            break;
          }
          case CMD$3.Q: {
            var x1 = d2[i2++];
            var y1 = d2[i2++];
            var x22 = d2[i2++];
            var y22 = d2[i2++];
            if (drawPart) {
              var l2 = pathSegLen[segCount++];
              if (accumLength + l2 > displayedLength) {
                var t2 = (displayedLength - accumLength) / l2;
                quadraticSubdivide(xi, x1, x22, t2, tmpOutX);
                quadraticSubdivide(yi, y1, y22, t2, tmpOutY);
                ctx.quadraticCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2]);
                break lo;
              }
              accumLength += l2;
            }
            ctx.quadraticCurveTo(x1, y1, x22, y22);
            xi = x22;
            yi = y22;
            break;
          }
          case CMD$3.A:
            var cx = d2[i2++];
            var cy = d2[i2++];
            var rx = d2[i2++];
            var ry = d2[i2++];
            var startAngle = d2[i2++];
            var delta = d2[i2++];
            var psi = d2[i2++];
            var anticlockwise = !d2[i2++];
            var r2 = rx > ry ? rx : ry;
            var isEllipse = mathAbs$1(rx - ry) > 1e-3;
            var endAngle = startAngle + delta;
            var breakBuild = false;
            if (drawPart) {
              var l2 = pathSegLen[segCount++];
              if (accumLength + l2 > displayedLength) {
                endAngle = startAngle + delta * (displayedLength - accumLength) / l2;
                breakBuild = true;
              }
              accumLength += l2;
            }
            if (isEllipse && ctx.ellipse) {
              ctx.ellipse(cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise);
            } else {
              ctx.arc(cx, cy, r2, startAngle, endAngle, anticlockwise);
            }
            if (breakBuild) {
              break lo;
            }
            if (isFirst) {
              x0 = mathCos$2(startAngle) * rx + cx;
              y0 = mathSin$2(startAngle) * ry + cy;
            }
            xi = mathCos$2(endAngle) * rx + cx;
            yi = mathSin$2(endAngle) * ry + cy;
            break;
          case CMD$3.R:
            x0 = xi = d2[i2];
            y0 = yi = d2[i2 + 1];
            x2 = d2[i2++];
            y2 = d2[i2++];
            var width = d2[i2++];
            var height = d2[i2++];
            if (drawPart) {
              var l2 = pathSegLen[segCount++];
              if (accumLength + l2 > displayedLength) {
                var d_1 = displayedLength - accumLength;
                ctx.moveTo(x2, y2);
                ctx.lineTo(x2 + mathMin$1(d_1, width), y2);
                d_1 -= width;
                if (d_1 > 0) {
                  ctx.lineTo(x2 + width, y2 + mathMin$1(d_1, height));
                }
                d_1 -= height;
                if (d_1 > 0) {
                  ctx.lineTo(x2 + mathMax$1(width - d_1, 0), y2 + height);
                }
                d_1 -= width;
                if (d_1 > 0) {
                  ctx.lineTo(x2, y2 + mathMax$1(height - d_1, 0));
                }
                break lo;
              }
              accumLength += l2;
            }
            ctx.rect(x2, y2, width, height);
            break;
          case CMD$3.Z:
            if (drawPart) {
              var l2 = pathSegLen[segCount++];
              if (accumLength + l2 > displayedLength) {
                var t2 = (displayedLength - accumLength) / l2;
                ctx.lineTo(xi * (1 - t2) + x0 * t2, yi * (1 - t2) + y0 * t2);
                break lo;
              }
              accumLength += l2;
            }
            ctx.closePath();
            xi = x0;
            yi = y0;
        }
      }
  };
  PathProxy2.prototype.clone = function() {
    var newProxy = new PathProxy2();
    var data2 = this.data;
    newProxy.data = data2.slice ? data2.slice() : Array.prototype.slice.call(data2);
    newProxy._len = this._len;
    return newProxy;
  };
  PathProxy2.CMD = CMD$3;
  PathProxy2.initDefaultProps = function() {
    var proto = PathProxy2.prototype;
    proto._saveData = true;
    proto._ux = 0;
    proto._uy = 0;
    proto._pendingPtDist = 0;
    proto._version = 0;
  }();
  return PathProxy2;
}();
var PathProxy$1 = PathProxy;
function containStroke$4(x0, y0, x1, y1, lineWidth, x2, y2) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  var _a = 0;
  var _b = x0;
  if (y2 > y0 + _l && y2 > y1 + _l || y2 < y0 - _l && y2 < y1 - _l || x2 > x0 + _l && x2 > x1 + _l || x2 < x0 - _l && x2 < x1 - _l) {
    return false;
  }
  if (x0 !== x1) {
    _a = (y0 - y1) / (x0 - x1);
    _b = (x0 * y1 - x1 * y0) / (x0 - x1);
  } else {
    return Math.abs(x2 - x0) <= _l / 2;
  }
  var tmp = _a * x2 - y2 + _b;
  var _s = tmp * tmp / (_a * _a + 1);
  return _s <= _l / 2 * _l / 2;
}
function containStroke$3(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x4, y4) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  if (y4 > y0 + _l && y4 > y1 + _l && y4 > y2 + _l && y4 > y3 + _l || y4 < y0 - _l && y4 < y1 - _l && y4 < y2 - _l && y4 < y3 - _l || x4 > x0 + _l && x4 > x1 + _l && x4 > x2 + _l && x4 > x3 + _l || x4 < x0 - _l && x4 < x1 - _l && x4 < x2 - _l && x4 < x3 - _l) {
    return false;
  }
  var d2 = cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, null);
  return d2 <= _l / 2;
}
function containStroke$2(x0, y0, x1, y1, x2, y2, lineWidth, x3, y3) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  if (y3 > y0 + _l && y3 > y1 + _l && y3 > y2 + _l || y3 < y0 - _l && y3 < y1 - _l && y3 < y2 - _l || x3 > x0 + _l && x3 > x1 + _l && x3 > x2 + _l || x3 < x0 - _l && x3 < x1 - _l && x3 < x2 - _l) {
    return false;
  }
  var d2 = quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, null);
  return d2 <= _l / 2;
}
var PI2$3 = Math.PI * 2;
function normalizeRadian(angle) {
  angle %= PI2$3;
  if (angle < 0) {
    angle += PI2$3;
  }
  return angle;
}
var PI2$2 = Math.PI * 2;
function containStroke$1(cx, cy, r2, startAngle, endAngle, anticlockwise, lineWidth, x2, y2) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  x2 -= cx;
  y2 -= cy;
  var d2 = Math.sqrt(x2 * x2 + y2 * y2);
  if (d2 - _l > r2 || d2 + _l < r2) {
    return false;
  }
  if (Math.abs(startAngle - endAngle) % PI2$2 < 1e-4) {
    return true;
  }
  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = normalizeRadian(endAngle);
    endAngle = normalizeRadian(tmp);
  } else {
    startAngle = normalizeRadian(startAngle);
    endAngle = normalizeRadian(endAngle);
  }
  if (startAngle > endAngle) {
    endAngle += PI2$2;
  }
  var angle = Math.atan2(y2, x2);
  if (angle < 0) {
    angle += PI2$2;
  }
  return angle >= startAngle && angle <= endAngle || angle + PI2$2 >= startAngle && angle + PI2$2 <= endAngle;
}
function windingLine(x0, y0, x1, y1, x2, y2) {
  if (y2 > y0 && y2 > y1 || y2 < y0 && y2 < y1) {
    return 0;
  }
  if (y1 === y0) {
    return 0;
  }
  var t2 = (y2 - y0) / (y1 - y0);
  var dir = y1 < y0 ? 1 : -1;
  if (t2 === 1 || t2 === 0) {
    dir = y1 < y0 ? 0.5 : -0.5;
  }
  var x_ = t2 * (x1 - x0) + x0;
  return x_ === x2 ? Infinity : x_ > x2 ? dir : 0;
}
var CMD$2 = PathProxy$1.CMD;
var PI2$1 = Math.PI * 2;
var EPSILON = 1e-4;
function isAroundEqual(a2, b2) {
  return Math.abs(a2 - b2) < EPSILON;
}
var roots = [-1, -1, -1];
var extrema = [-1, -1];
function swapExtrema() {
  var tmp = extrema[0];
  extrema[0] = extrema[1];
  extrema[1] = tmp;
}
function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x4, y4) {
  if (y4 > y0 && y4 > y1 && y4 > y2 && y4 > y3 || y4 < y0 && y4 < y1 && y4 < y2 && y4 < y3) {
    return 0;
  }
  var nRoots = cubicRootAt(y0, y1, y2, y3, y4, roots);
  if (nRoots === 0) {
    return 0;
  } else {
    var w2 = 0;
    var nExtrema = -1;
    var y0_ = void 0;
    var y1_ = void 0;
    for (var i2 = 0; i2 < nRoots; i2++) {
      var t2 = roots[i2];
      var unit = t2 === 0 || t2 === 1 ? 0.5 : 1;
      var x_ = cubicAt(x0, x1, x2, x3, t2);
      if (x_ < x4) {
        continue;
      }
      if (nExtrema < 0) {
        nExtrema = cubicExtrema(y0, y1, y2, y3, extrema);
        if (extrema[1] < extrema[0] && nExtrema > 1) {
          swapExtrema();
        }
        y0_ = cubicAt(y0, y1, y2, y3, extrema[0]);
        if (nExtrema > 1) {
          y1_ = cubicAt(y0, y1, y2, y3, extrema[1]);
        }
      }
      if (nExtrema === 2) {
        if (t2 < extrema[0]) {
          w2 += y0_ < y0 ? unit : -unit;
        } else if (t2 < extrema[1]) {
          w2 += y1_ < y0_ ? unit : -unit;
        } else {
          w2 += y3 < y1_ ? unit : -unit;
        }
      } else {
        if (t2 < extrema[0]) {
          w2 += y0_ < y0 ? unit : -unit;
        } else {
          w2 += y3 < y0_ ? unit : -unit;
        }
      }
    }
    return w2;
  }
}
function windingQuadratic(x0, y0, x1, y1, x2, y2, x3, y3) {
  if (y3 > y0 && y3 > y1 && y3 > y2 || y3 < y0 && y3 < y1 && y3 < y2) {
    return 0;
  }
  var nRoots = quadraticRootAt(y0, y1, y2, y3, roots);
  if (nRoots === 0) {
    return 0;
  } else {
    var t2 = quadraticExtremum(y0, y1, y2);
    if (t2 >= 0 && t2 <= 1) {
      var w2 = 0;
      var y_ = quadraticAt(y0, y1, y2, t2);
      for (var i2 = 0; i2 < nRoots; i2++) {
        var unit = roots[i2] === 0 || roots[i2] === 1 ? 0.5 : 1;
        var x_ = quadraticAt(x0, x1, x2, roots[i2]);
        if (x_ < x3) {
          continue;
        }
        if (roots[i2] < t2) {
          w2 += y_ < y0 ? unit : -unit;
        } else {
          w2 += y2 < y_ ? unit : -unit;
        }
      }
      return w2;
    } else {
      var unit = roots[0] === 0 || roots[0] === 1 ? 0.5 : 1;
      var x_ = quadraticAt(x0, x1, x2, roots[0]);
      if (x_ < x3) {
        return 0;
      }
      return y2 < y0 ? unit : -unit;
    }
  }
}
function windingArc(cx, cy, r2, startAngle, endAngle, anticlockwise, x2, y2) {
  y2 -= cy;
  if (y2 > r2 || y2 < -r2) {
    return 0;
  }
  var tmp = Math.sqrt(r2 * r2 - y2 * y2);
  roots[0] = -tmp;
  roots[1] = tmp;
  var dTheta = Math.abs(startAngle - endAngle);
  if (dTheta < 1e-4) {
    return 0;
  }
  if (dTheta >= PI2$1 - 1e-4) {
    startAngle = 0;
    endAngle = PI2$1;
    var dir = anticlockwise ? 1 : -1;
    if (x2 >= roots[0] + cx && x2 <= roots[1] + cx) {
      return dir;
    } else {
      return 0;
    }
  }
  if (startAngle > endAngle) {
    var tmp_1 = startAngle;
    startAngle = endAngle;
    endAngle = tmp_1;
  }
  if (startAngle < 0) {
    startAngle += PI2$1;
    endAngle += PI2$1;
  }
  var w2 = 0;
  for (var i2 = 0; i2 < 2; i2++) {
    var x_ = roots[i2];
    if (x_ + cx > x2) {
      var angle = Math.atan2(y2, x_);
      var dir = anticlockwise ? 1 : -1;
      if (angle < 0) {
        angle = PI2$1 + angle;
      }
      if (angle >= startAngle && angle <= endAngle || angle + PI2$1 >= startAngle && angle + PI2$1 <= endAngle) {
        if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
          dir = -dir;
        }
        w2 += dir;
      }
    }
  }
  return w2;
}
function containPath(path, lineWidth, isStroke, x2, y2) {
  var data2 = path.data;
  var len2 = path.len();
  var w2 = 0;
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;
  var x1;
  var y1;
  for (var i2 = 0; i2 < len2; ) {
    var cmd = data2[i2++];
    var isFirst = i2 === 1;
    if (cmd === CMD$2.M && i2 > 1) {
      if (!isStroke) {
        w2 += windingLine(xi, yi, x0, y0, x2, y2);
      }
    }
    if (isFirst) {
      xi = data2[i2];
      yi = data2[i2 + 1];
      x0 = xi;
      y0 = yi;
    }
    switch (cmd) {
      case CMD$2.M:
        x0 = data2[i2++];
        y0 = data2[i2++];
        xi = x0;
        yi = y0;
        break;
      case CMD$2.L:
        if (isStroke) {
          if (containStroke$4(xi, yi, data2[i2], data2[i2 + 1], lineWidth, x2, y2)) {
            return true;
          }
        } else {
          w2 += windingLine(xi, yi, data2[i2], data2[i2 + 1], x2, y2) || 0;
        }
        xi = data2[i2++];
        yi = data2[i2++];
        break;
      case CMD$2.C:
        if (isStroke) {
          if (containStroke$3(xi, yi, data2[i2++], data2[i2++], data2[i2++], data2[i2++], data2[i2], data2[i2 + 1], lineWidth, x2, y2)) {
            return true;
          }
        } else {
          w2 += windingCubic(xi, yi, data2[i2++], data2[i2++], data2[i2++], data2[i2++], data2[i2], data2[i2 + 1], x2, y2) || 0;
        }
        xi = data2[i2++];
        yi = data2[i2++];
        break;
      case CMD$2.Q:
        if (isStroke) {
          if (containStroke$2(xi, yi, data2[i2++], data2[i2++], data2[i2], data2[i2 + 1], lineWidth, x2, y2)) {
            return true;
          }
        } else {
          w2 += windingQuadratic(xi, yi, data2[i2++], data2[i2++], data2[i2], data2[i2 + 1], x2, y2) || 0;
        }
        xi = data2[i2++];
        yi = data2[i2++];
        break;
      case CMD$2.A:
        var cx = data2[i2++];
        var cy = data2[i2++];
        var rx = data2[i2++];
        var ry = data2[i2++];
        var theta = data2[i2++];
        var dTheta = data2[i2++];
        i2 += 1;
        var anticlockwise = !!(1 - data2[i2++]);
        x1 = Math.cos(theta) * rx + cx;
        y1 = Math.sin(theta) * ry + cy;
        if (!isFirst) {
          w2 += windingLine(xi, yi, x1, y1, x2, y2);
        } else {
          x0 = x1;
          y0 = y1;
        }
        var _x = (x2 - cx) * ry / rx + cx;
        if (isStroke) {
          if (containStroke$1(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y2)) {
            return true;
          }
        } else {
          w2 += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y2);
        }
        xi = Math.cos(theta + dTheta) * rx + cx;
        yi = Math.sin(theta + dTheta) * ry + cy;
        break;
      case CMD$2.R:
        x0 = xi = data2[i2++];
        y0 = yi = data2[i2++];
        var width = data2[i2++];
        var height = data2[i2++];
        x1 = x0 + width;
        y1 = y0 + height;
        if (isStroke) {
          if (containStroke$4(x0, y0, x1, y0, lineWidth, x2, y2) || containStroke$4(x1, y0, x1, y1, lineWidth, x2, y2) || containStroke$4(x1, y1, x0, y1, lineWidth, x2, y2) || containStroke$4(x0, y1, x0, y0, lineWidth, x2, y2)) {
            return true;
          }
        } else {
          w2 += windingLine(x1, y0, x1, y1, x2, y2);
          w2 += windingLine(x0, y1, x0, y0, x2, y2);
        }
        break;
      case CMD$2.Z:
        if (isStroke) {
          if (containStroke$4(xi, yi, x0, y0, lineWidth, x2, y2)) {
            return true;
          }
        } else {
          w2 += windingLine(xi, yi, x0, y0, x2, y2);
        }
        xi = x0;
        yi = y0;
        break;
    }
  }
  if (!isStroke && !isAroundEqual(yi, y0)) {
    w2 += windingLine(xi, yi, x0, y0, x2, y2) || 0;
  }
  return w2 !== 0;
}
function contain(pathProxy, x2, y2) {
  return containPath(pathProxy, 0, false, x2, y2);
}
function containStroke(pathProxy, lineWidth, x2, y2) {
  return containPath(pathProxy, lineWidth, true, x2, y2);
}
var DEFAULT_PATH_STYLE = defaults({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: false,
  strokeFirst: false
}, DEFAULT_COMMON_STYLE);
var DEFAULT_PATH_ANIMATION_PROPS = {
  style: defaults({
    fill: true,
    stroke: true,
    strokePercent: true,
    fillOpacity: true,
    strokeOpacity: true,
    lineDashOffset: true,
    lineWidth: true,
    miterLimit: true
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};
var pathCopyParams = TRANSFORMABLE_PROPS.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]);
var Path = function(_super) {
  __extends(Path2, _super);
  function Path2(opts) {
    return _super.call(this, opts) || this;
  }
  Path2.prototype.update = function() {
    var _this = this;
    _super.prototype.update.call(this);
    var style = this.style;
    if (style.decal) {
      var decalEl = this._decalEl = this._decalEl || new Path2();
      if (decalEl.buildPath === Path2.prototype.buildPath) {
        decalEl.buildPath = function(ctx) {
          _this.buildPath(ctx, _this.shape);
        };
      }
      decalEl.silent = true;
      var decalElStyle = decalEl.style;
      for (var key in style) {
        if (decalElStyle[key] !== style[key]) {
          decalElStyle[key] = style[key];
        }
      }
      decalElStyle.fill = style.fill ? style.decal : null;
      decalElStyle.decal = null;
      decalElStyle.shadowColor = null;
      style.strokeFirst && (decalElStyle.stroke = null);
      for (var i2 = 0; i2 < pathCopyParams.length; ++i2) {
        decalEl[pathCopyParams[i2]] = this[pathCopyParams[i2]];
      }
      decalEl.__dirty |= REDRAW_BIT;
    } else if (this._decalEl) {
      this._decalEl = null;
    }
  };
  Path2.prototype.getDecalElement = function() {
    return this._decalEl;
  };
  Path2.prototype._init = function(props) {
    var keysArr = keys(props);
    this.shape = this.getDefaultShape();
    var defaultStyle = this.getDefaultStyle();
    if (defaultStyle) {
      this.useStyle(defaultStyle);
    }
    for (var i2 = 0; i2 < keysArr.length; i2++) {
      var key = keysArr[i2];
      var value = props[key];
      if (key === "style") {
        if (!this.style) {
          this.useStyle(value);
        } else {
          extend(this.style, value);
        }
      } else if (key === "shape") {
        extend(this.shape, value);
      } else {
        _super.prototype.attrKV.call(this, key, value);
      }
    }
    if (!this.style) {
      this.useStyle({});
    }
  };
  Path2.prototype.getDefaultStyle = function() {
    return null;
  };
  Path2.prototype.getDefaultShape = function() {
    return {};
  };
  Path2.prototype.canBeInsideText = function() {
    return this.hasFill();
  };
  Path2.prototype.getInsideTextFill = function() {
    var pathFill = this.style.fill;
    if (pathFill !== "none") {
      if (isString(pathFill)) {
        var fillLum = lum(pathFill, 0);
        if (fillLum > 0.5) {
          return DARK_LABEL_COLOR;
        } else if (fillLum > 0.2) {
          return LIGHTER_LABEL_COLOR;
        }
        return LIGHT_LABEL_COLOR;
      } else if (pathFill) {
        return LIGHT_LABEL_COLOR;
      }
    }
    return DARK_LABEL_COLOR;
  };
  Path2.prototype.getInsideTextStroke = function(textFill) {
    var pathFill = this.style.fill;
    if (isString(pathFill)) {
      var zr = this.__zr;
      var isDarkMode2 = !!(zr && zr.isDarkMode());
      var isDarkLabel = lum(textFill, 0) < DARK_MODE_THRESHOLD;
      if (isDarkMode2 === isDarkLabel) {
        return pathFill;
      }
    }
  };
  Path2.prototype.buildPath = function(ctx, shapeCfg, inBatch) {
  };
  Path2.prototype.pathUpdated = function() {
    this.__dirty &= ~SHAPE_CHANGED_BIT;
  };
  Path2.prototype.getUpdatedPathProxy = function(inBatch) {
    !this.path && this.createPathProxy();
    this.path.beginPath();
    this.buildPath(this.path, this.shape, inBatch);
    return this.path;
  };
  Path2.prototype.createPathProxy = function() {
    this.path = new PathProxy$1(false);
  };
  Path2.prototype.hasStroke = function() {
    var style = this.style;
    var stroke = style.stroke;
    return !(stroke == null || stroke === "none" || !(style.lineWidth > 0));
  };
  Path2.prototype.hasFill = function() {
    var style = this.style;
    var fill = style.fill;
    return fill != null && fill !== "none";
  };
  Path2.prototype.getBoundingRect = function() {
    var rect = this._rect;
    var style = this.style;
    var needsUpdateRect = !rect;
    if (needsUpdateRect) {
      var firstInvoke = false;
      if (!this.path) {
        firstInvoke = true;
        this.createPathProxy();
      }
      var path = this.path;
      if (firstInvoke || this.__dirty & SHAPE_CHANGED_BIT) {
        path.beginPath();
        this.buildPath(path, this.shape, false);
        this.pathUpdated();
      }
      rect = path.getBoundingRect();
    }
    this._rect = rect;
    if (this.hasStroke() && this.path && this.path.len() > 0) {
      var rectStroke = this._rectStroke || (this._rectStroke = rect.clone());
      if (this.__dirty || needsUpdateRect) {
        rectStroke.copy(rect);
        var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
        var w2 = style.lineWidth;
        if (!this.hasFill()) {
          var strokeContainThreshold = this.strokeContainThreshold;
          w2 = Math.max(w2, strokeContainThreshold == null ? 4 : strokeContainThreshold);
        }
        if (lineScale > 1e-10) {
          rectStroke.width += w2 / lineScale;
          rectStroke.height += w2 / lineScale;
          rectStroke.x -= w2 / lineScale / 2;
          rectStroke.y -= w2 / lineScale / 2;
        }
      }
      return rectStroke;
    }
    return rect;
  };
  Path2.prototype.contain = function(x2, y2) {
    var localPos = this.transformCoordToLocal(x2, y2);
    var rect = this.getBoundingRect();
    var style = this.style;
    x2 = localPos[0];
    y2 = localPos[1];
    if (rect.contain(x2, y2)) {
      var pathProxy = this.path;
      if (this.hasStroke()) {
        var lineWidth = style.lineWidth;
        var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
        if (lineScale > 1e-10) {
          if (!this.hasFill()) {
            lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
          }
          if (containStroke(pathProxy, lineWidth / lineScale, x2, y2)) {
            return true;
          }
        }
      }
      if (this.hasFill()) {
        return contain(pathProxy, x2, y2);
      }
    }
    return false;
  };
  Path2.prototype.dirtyShape = function() {
    this.__dirty |= SHAPE_CHANGED_BIT;
    if (this._rect) {
      this._rect = null;
    }
    if (this._decalEl) {
      this._decalEl.dirtyShape();
    }
    this.markRedraw();
  };
  Path2.prototype.dirty = function() {
    this.dirtyStyle();
    this.dirtyShape();
  };
  Path2.prototype.animateShape = function(loop) {
    return this.animate("shape", loop);
  };
  Path2.prototype.updateDuringAnimation = function(targetKey) {
    if (targetKey === "style") {
      this.dirtyStyle();
    } else if (targetKey === "shape") {
      this.dirtyShape();
    } else {
      this.markRedraw();
    }
  };
  Path2.prototype.attrKV = function(key, value) {
    if (key === "shape") {
      this.setShape(value);
    } else {
      _super.prototype.attrKV.call(this, key, value);
    }
  };
  Path2.prototype.setShape = function(keyOrObj, value) {
    var shape = this.shape;
    if (!shape) {
      shape = this.shape = {};
    }
    if (typeof keyOrObj === "string") {
      shape[keyOrObj] = value;
    } else {
      extend(shape, keyOrObj);
    }
    this.dirtyShape();
    return this;
  };
  Path2.prototype.shapeChanged = function() {
    return !!(this.__dirty & SHAPE_CHANGED_BIT);
  };
  Path2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_PATH_STYLE, obj);
  };
  Path2.prototype._innerSaveToNormal = function(toState) {
    _super.prototype._innerSaveToNormal.call(this, toState);
    var normalState = this._normalState;
    if (toState.shape && !normalState.shape) {
      normalState.shape = extend({}, this.shape);
    }
  };
  Path2.prototype._applyStateObj = function(stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
    _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
    var needsRestoreToNormal = !(state && keepCurrentStates);
    var targetShape;
    if (state && state.shape) {
      if (transition) {
        if (keepCurrentStates) {
          targetShape = state.shape;
        } else {
          targetShape = extend({}, normalState.shape);
          extend(targetShape, state.shape);
        }
      } else {
        targetShape = extend({}, keepCurrentStates ? this.shape : normalState.shape);
        extend(targetShape, state.shape);
      }
    } else if (needsRestoreToNormal) {
      targetShape = normalState.shape;
    }
    if (targetShape) {
      if (transition) {
        this.shape = extend({}, this.shape);
        var targetShapePrimaryProps = {};
        var shapeKeys = keys(targetShape);
        for (var i2 = 0; i2 < shapeKeys.length; i2++) {
          var key = shapeKeys[i2];
          if (typeof targetShape[key] === "object") {
            this.shape[key] = targetShape[key];
          } else {
            targetShapePrimaryProps[key] = targetShape[key];
          }
        }
        this._transitionState(stateName, {
          shape: targetShapePrimaryProps
        }, animationCfg);
      } else {
        this.shape = targetShape;
        this.dirtyShape();
      }
    }
  };
  Path2.prototype._mergeStates = function(states) {
    var mergedState = _super.prototype._mergeStates.call(this, states);
    var mergedShape;
    for (var i2 = 0; i2 < states.length; i2++) {
      var state = states[i2];
      if (state.shape) {
        mergedShape = mergedShape || {};
        this._mergeStyle(mergedShape, state.shape);
      }
    }
    if (mergedShape) {
      mergedState.shape = mergedShape;
    }
    return mergedState;
  };
  Path2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_PATH_ANIMATION_PROPS;
  };
  Path2.prototype.isZeroArea = function() {
    return false;
  };
  Path2.extend = function(defaultProps) {
    var Sub = function(_super2) {
      __extends(Sub2, _super2);
      function Sub2(opts) {
        var _this = _super2.call(this, opts) || this;
        defaultProps.init && defaultProps.init.call(_this, opts);
        return _this;
      }
      Sub2.prototype.getDefaultStyle = function() {
        return clone$2(defaultProps.style);
      };
      Sub2.prototype.getDefaultShape = function() {
        return clone$2(defaultProps.shape);
      };
      return Sub2;
    }(Path2);
    for (var key in defaultProps) {
      if (typeof defaultProps[key] === "function") {
        Sub.prototype[key] = defaultProps[key];
      }
    }
    return Sub;
  };
  Path2.initDefaultProps = function() {
    var pathProto = Path2.prototype;
    pathProto.type = "path";
    pathProto.strokeContainThreshold = 5;
    pathProto.segmentIgnoreThreshold = 0;
    pathProto.subPixelOptimize = false;
    pathProto.autoBatch = false;
    pathProto.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT | SHAPE_CHANGED_BIT;
  }();
  return Path2;
}(Displayable$1);
var Path$1 = Path;
var DEFAULT_TSPAN_STYLE = defaults({
  strokeFirst: true,
  font: DEFAULT_FONT,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, DEFAULT_PATH_STYLE);
var TSpan = function(_super) {
  __extends(TSpan2, _super);
  function TSpan2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TSpan2.prototype.hasStroke = function() {
    var style = this.style;
    var stroke = style.stroke;
    return stroke != null && stroke !== "none" && style.lineWidth > 0;
  };
  TSpan2.prototype.hasFill = function() {
    var style = this.style;
    var fill = style.fill;
    return fill != null && fill !== "none";
  };
  TSpan2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_TSPAN_STYLE, obj);
  };
  TSpan2.prototype.setBoundingRect = function(rect) {
    this._rect = rect;
  };
  TSpan2.prototype.getBoundingRect = function() {
    var style = this.style;
    if (!this._rect) {
      var text = style.text;
      text != null ? text += "" : text = "";
      var rect = getBoundingRect(text, style.font, style.textAlign, style.textBaseline);
      rect.x += style.x || 0;
      rect.y += style.y || 0;
      if (this.hasStroke()) {
        var w2 = style.lineWidth;
        rect.x -= w2 / 2;
        rect.y -= w2 / 2;
        rect.width += w2;
        rect.height += w2;
      }
      this._rect = rect;
    }
    return this._rect;
  };
  TSpan2.initDefaultProps = function() {
    var tspanProto = TSpan2.prototype;
    tspanProto.dirtyRectTolerance = 10;
  }();
  return TSpan2;
}(Displayable$1);
TSpan.prototype.type = "tspan";
var TSpan$1 = TSpan;
var DEFAULT_IMAGE_STYLE = defaults({
  x: 0,
  y: 0
}, DEFAULT_COMMON_STYLE);
var DEFAULT_IMAGE_ANIMATION_PROPS = {
  style: defaults({
    x: true,
    y: true,
    width: true,
    height: true,
    sx: true,
    sy: true,
    sWidth: true,
    sHeight: true
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};
function isImageLike(source2) {
  return !!(source2 && typeof source2 !== "string" && source2.width && source2.height);
}
var ZRImage = function(_super) {
  __extends(ZRImage2, _super);
  function ZRImage2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ZRImage2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_IMAGE_STYLE, obj);
  };
  ZRImage2.prototype._getSize = function(dim) {
    var style = this.style;
    var size = style[dim];
    if (size != null) {
      return size;
    }
    var imageSource = isImageLike(style.image) ? style.image : this.__image;
    if (!imageSource) {
      return 0;
    }
    var otherDim = dim === "width" ? "height" : "width";
    var otherDimSize = style[otherDim];
    if (otherDimSize == null) {
      return imageSource[dim];
    } else {
      return imageSource[dim] / imageSource[otherDim] * otherDimSize;
    }
  };
  ZRImage2.prototype.getWidth = function() {
    return this._getSize("width");
  };
  ZRImage2.prototype.getHeight = function() {
    return this._getSize("height");
  };
  ZRImage2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_IMAGE_ANIMATION_PROPS;
  };
  ZRImage2.prototype.getBoundingRect = function() {
    var style = this.style;
    if (!this._rect) {
      this._rect = new BoundingRect$1(style.x || 0, style.y || 0, this.getWidth(), this.getHeight());
    }
    return this._rect;
  };
  return ZRImage2;
}(Displayable$1);
ZRImage.prototype.type = "image";
var ZRImage$1 = ZRImage;
function buildPath$2(ctx, shape) {
  var x2 = shape.x;
  var y2 = shape.y;
  var width = shape.width;
  var height = shape.height;
  var r2 = shape.r;
  var r1;
  var r22;
  var r3;
  var r4;
  if (width < 0) {
    x2 = x2 + width;
    width = -width;
  }
  if (height < 0) {
    y2 = y2 + height;
    height = -height;
  }
  if (typeof r2 === "number") {
    r1 = r22 = r3 = r4 = r2;
  } else if (r2 instanceof Array) {
    if (r2.length === 1) {
      r1 = r22 = r3 = r4 = r2[0];
    } else if (r2.length === 2) {
      r1 = r3 = r2[0];
      r22 = r4 = r2[1];
    } else if (r2.length === 3) {
      r1 = r2[0];
      r22 = r4 = r2[1];
      r3 = r2[2];
    } else {
      r1 = r2[0];
      r22 = r2[1];
      r3 = r2[2];
      r4 = r2[3];
    }
  } else {
    r1 = r22 = r3 = r4 = 0;
  }
  var total;
  if (r1 + r22 > width) {
    total = r1 + r22;
    r1 *= width / total;
    r22 *= width / total;
  }
  if (r3 + r4 > width) {
    total = r3 + r4;
    r3 *= width / total;
    r4 *= width / total;
  }
  if (r22 + r3 > height) {
    total = r22 + r3;
    r22 *= height / total;
    r3 *= height / total;
  }
  if (r1 + r4 > height) {
    total = r1 + r4;
    r1 *= height / total;
    r4 *= height / total;
  }
  ctx.moveTo(x2 + r1, y2);
  ctx.lineTo(x2 + width - r22, y2);
  r22 !== 0 && ctx.arc(x2 + width - r22, y2 + r22, r22, -Math.PI / 2, 0);
  ctx.lineTo(x2 + width, y2 + height - r3);
  r3 !== 0 && ctx.arc(x2 + width - r3, y2 + height - r3, r3, 0, Math.PI / 2);
  ctx.lineTo(x2 + r4, y2 + height);
  r4 !== 0 && ctx.arc(x2 + r4, y2 + height - r4, r4, Math.PI / 2, Math.PI);
  ctx.lineTo(x2, y2 + r1);
  r1 !== 0 && ctx.arc(x2 + r1, y2 + r1, r1, Math.PI, Math.PI * 1.5);
}
var round = Math.round;
function subPixelOptimizeLine(outputShape, inputShape, style) {
  if (!inputShape) {
    return;
  }
  var x1 = inputShape.x1;
  var x2 = inputShape.x2;
  var y1 = inputShape.y1;
  var y2 = inputShape.y2;
  outputShape.x1 = x1;
  outputShape.x2 = x2;
  outputShape.y1 = y1;
  outputShape.y2 = y2;
  var lineWidth = style && style.lineWidth;
  if (!lineWidth) {
    return outputShape;
  }
  if (round(x1 * 2) === round(x2 * 2)) {
    outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
  }
  if (round(y1 * 2) === round(y2 * 2)) {
    outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
  }
  return outputShape;
}
function subPixelOptimizeRect(outputShape, inputShape, style) {
  if (!inputShape) {
    return;
  }
  var originX = inputShape.x;
  var originY = inputShape.y;
  var originWidth = inputShape.width;
  var originHeight = inputShape.height;
  outputShape.x = originX;
  outputShape.y = originY;
  outputShape.width = originWidth;
  outputShape.height = originHeight;
  var lineWidth = style && style.lineWidth;
  if (!lineWidth) {
    return outputShape;
  }
  outputShape.x = subPixelOptimize(originX, lineWidth, true);
  outputShape.y = subPixelOptimize(originY, lineWidth, true);
  outputShape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
  outputShape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);
  return outputShape;
}
function subPixelOptimize(position, lineWidth, positiveOrNegative) {
  if (!lineWidth) {
    return position;
  }
  var doubledPosition = round(position * 2);
  return (doubledPosition + round(lineWidth)) % 2 === 0 ? doubledPosition / 2 : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
}
var RectShape = function() {
  function RectShape2() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
  return RectShape2;
}();
var subPixelOptimizeOutputShape$1 = {};
var Rect = function(_super) {
  __extends(Rect2, _super);
  function Rect2(opts) {
    return _super.call(this, opts) || this;
  }
  Rect2.prototype.getDefaultShape = function() {
    return new RectShape();
  };
  Rect2.prototype.buildPath = function(ctx, shape) {
    var x2;
    var y2;
    var width;
    var height;
    if (this.subPixelOptimize) {
      var optimizedShape = subPixelOptimizeRect(subPixelOptimizeOutputShape$1, shape, this.style);
      x2 = optimizedShape.x;
      y2 = optimizedShape.y;
      width = optimizedShape.width;
      height = optimizedShape.height;
      optimizedShape.r = shape.r;
      shape = optimizedShape;
    } else {
      x2 = shape.x;
      y2 = shape.y;
      width = shape.width;
      height = shape.height;
    }
    if (!shape.r) {
      ctx.rect(x2, y2, width, height);
    } else {
      buildPath$2(ctx, shape);
    }
  };
  Rect2.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  };
  return Rect2;
}(Path$1);
Rect.prototype.type = "rect";
var Rect$1 = Rect;
var DEFAULT_RICH_TEXT_COLOR = {
  fill: "#000"
};
var DEFAULT_STROKE_LINE_WIDTH = 2;
var DEFAULT_TEXT_ANIMATION_PROPS = {
  style: defaults({
    fill: true,
    stroke: true,
    fillOpacity: true,
    strokeOpacity: true,
    lineWidth: true,
    fontSize: true,
    lineHeight: true,
    width: true,
    height: true,
    textShadowColor: true,
    textShadowBlur: true,
    textShadowOffsetX: true,
    textShadowOffsetY: true,
    backgroundColor: true,
    padding: true,
    borderColor: true,
    borderWidth: true,
    borderRadius: true
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};
var ZRText = function(_super) {
  __extends(ZRText2, _super);
  function ZRText2(opts) {
    var _this = _super.call(this) || this;
    _this.type = "text";
    _this._children = [];
    _this._defaultStyle = DEFAULT_RICH_TEXT_COLOR;
    _this.attr(opts);
    return _this;
  }
  ZRText2.prototype.childrenRef = function() {
    return this._children;
  };
  ZRText2.prototype.update = function() {
    _super.prototype.update.call(this);
    if (this.styleChanged()) {
      this._updateSubTexts();
    }
    for (var i2 = 0; i2 < this._children.length; i2++) {
      var child = this._children[i2];
      child.zlevel = this.zlevel;
      child.z = this.z;
      child.z2 = this.z2;
      child.culling = this.culling;
      child.cursor = this.cursor;
      child.invisible = this.invisible;
    }
  };
  ZRText2.prototype.updateTransform = function() {
    var innerTransformable = this.innerTransformable;
    if (innerTransformable) {
      innerTransformable.updateTransform();
      if (innerTransformable.transform) {
        this.transform = innerTransformable.transform;
      }
    } else {
      _super.prototype.updateTransform.call(this);
    }
  };
  ZRText2.prototype.getLocalTransform = function(m2) {
    var innerTransformable = this.innerTransformable;
    return innerTransformable ? innerTransformable.getLocalTransform(m2) : _super.prototype.getLocalTransform.call(this, m2);
  };
  ZRText2.prototype.getComputedTransform = function() {
    if (this.__hostTarget) {
      this.__hostTarget.getComputedTransform();
      this.__hostTarget.updateInnerText(true);
    }
    return _super.prototype.getComputedTransform.call(this);
  };
  ZRText2.prototype._updateSubTexts = function() {
    this._childCursor = 0;
    normalizeTextStyle(this.style);
    this.style.rich ? this._updateRichTexts() : this._updatePlainTexts();
    this._children.length = this._childCursor;
    this.styleUpdated();
  };
  ZRText2.prototype.addSelfToZr = function(zr) {
    _super.prototype.addSelfToZr.call(this, zr);
    for (var i2 = 0; i2 < this._children.length; i2++) {
      this._children[i2].__zr = zr;
    }
  };
  ZRText2.prototype.removeSelfFromZr = function(zr) {
    _super.prototype.removeSelfFromZr.call(this, zr);
    for (var i2 = 0; i2 < this._children.length; i2++) {
      this._children[i2].__zr = null;
    }
  };
  ZRText2.prototype.getBoundingRect = function() {
    if (this.styleChanged()) {
      this._updateSubTexts();
    }
    if (!this._rect) {
      var tmpRect2 = new BoundingRect$1(0, 0, 0, 0);
      var children = this._children;
      var tmpMat = [];
      var rect = null;
      for (var i2 = 0; i2 < children.length; i2++) {
        var child = children[i2];
        var childRect = child.getBoundingRect();
        var transform = child.getLocalTransform(tmpMat);
        if (transform) {
          tmpRect2.copy(childRect);
          tmpRect2.applyTransform(transform);
          rect = rect || tmpRect2.clone();
          rect.union(tmpRect2);
        } else {
          rect = rect || childRect.clone();
          rect.union(childRect);
        }
      }
      this._rect = rect || tmpRect2;
    }
    return this._rect;
  };
  ZRText2.prototype.setDefaultTextStyle = function(defaultTextStyle) {
    this._defaultStyle = defaultTextStyle || DEFAULT_RICH_TEXT_COLOR;
  };
  ZRText2.prototype.setTextContent = function(textContent) {
  };
  ZRText2.prototype._mergeStyle = function(targetStyle, sourceStyle) {
    if (!sourceStyle) {
      return targetStyle;
    }
    var sourceRich = sourceStyle.rich;
    var targetRich = targetStyle.rich || sourceRich && {};
    extend(targetStyle, sourceStyle);
    if (sourceRich && targetRich) {
      this._mergeRich(targetRich, sourceRich);
      targetStyle.rich = targetRich;
    } else if (targetRich) {
      targetStyle.rich = targetRich;
    }
    return targetStyle;
  };
  ZRText2.prototype._mergeRich = function(targetRich, sourceRich) {
    var richNames = keys(sourceRich);
    for (var i2 = 0; i2 < richNames.length; i2++) {
      var richName = richNames[i2];
      targetRich[richName] = targetRich[richName] || {};
      extend(targetRich[richName], sourceRich[richName]);
    }
  };
  ZRText2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_TEXT_ANIMATION_PROPS;
  };
  ZRText2.prototype._getOrCreateChild = function(Ctor) {
    var child = this._children[this._childCursor];
    if (!child || !(child instanceof Ctor)) {
      child = new Ctor();
    }
    this._children[this._childCursor++] = child;
    child.__zr = this.__zr;
    child.parent = this;
    return child;
  };
  ZRText2.prototype._updatePlainTexts = function() {
    var style = this.style;
    var textFont = style.font || DEFAULT_FONT;
    var textPadding = style.padding;
    var text = getStyleText(style);
    var contentBlock = parsePlainText(text, style);
    var needDrawBg = needDrawBackground(style);
    var bgColorDrawn = !!style.backgroundColor;
    var outerHeight = contentBlock.outerHeight;
    var outerWidth = contentBlock.outerWidth;
    var contentWidth = contentBlock.contentWidth;
    var textLines = contentBlock.lines;
    var lineHeight = contentBlock.lineHeight;
    var defaultStyle = this._defaultStyle;
    var baseX = style.x || 0;
    var baseY = style.y || 0;
    var textAlign = style.align || defaultStyle.align || "left";
    var verticalAlign = style.verticalAlign || defaultStyle.verticalAlign || "top";
    var textX = baseX;
    var textY = adjustTextY(baseY, contentBlock.contentHeight, verticalAlign);
    if (needDrawBg || textPadding) {
      var boxX = adjustTextX(baseX, outerWidth, textAlign);
      var boxY = adjustTextY(baseY, outerHeight, verticalAlign);
      needDrawBg && this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
    }
    textY += lineHeight / 2;
    if (textPadding) {
      textX = getTextXForPadding(baseX, textAlign, textPadding);
      if (verticalAlign === "top") {
        textY += textPadding[0];
      } else if (verticalAlign === "bottom") {
        textY -= textPadding[2];
      }
    }
    var defaultLineWidth = 0;
    var useDefaultFill = false;
    var textFill = getFill("fill" in style ? style.fill : (useDefaultFill = true, defaultStyle.fill));
    var textStroke = getStroke("stroke" in style ? style.stroke : !bgColorDrawn && (!defaultStyle.autoStroke || useDefaultFill) ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, defaultStyle.stroke) : null);
    var hasShadow = style.textShadowBlur > 0;
    var fixedBoundingRect = style.width != null && (style.overflow === "truncate" || style.overflow === "break" || style.overflow === "breakAll");
    var calculatedLineHeight = contentBlock.calculatedLineHeight;
    for (var i2 = 0; i2 < textLines.length; i2++) {
      var el = this._getOrCreateChild(TSpan$1);
      var subElStyle = el.createStyle();
      el.useStyle(subElStyle);
      subElStyle.text = textLines[i2];
      subElStyle.x = textX;
      subElStyle.y = textY;
      if (textAlign) {
        subElStyle.textAlign = textAlign;
      }
      subElStyle.textBaseline = "middle";
      subElStyle.opacity = style.opacity;
      subElStyle.strokeFirst = true;
      if (hasShadow) {
        subElStyle.shadowBlur = style.textShadowBlur || 0;
        subElStyle.shadowColor = style.textShadowColor || "transparent";
        subElStyle.shadowOffsetX = style.textShadowOffsetX || 0;
        subElStyle.shadowOffsetY = style.textShadowOffsetY || 0;
      }
      subElStyle.stroke = textStroke;
      subElStyle.fill = textFill;
      if (textStroke) {
        subElStyle.lineWidth = style.lineWidth || defaultLineWidth;
        subElStyle.lineDash = style.lineDash;
        subElStyle.lineDashOffset = style.lineDashOffset || 0;
      }
      subElStyle.font = textFont;
      setSeparateFont(subElStyle, style);
      textY += lineHeight;
      if (fixedBoundingRect) {
        el.setBoundingRect(new BoundingRect$1(adjustTextX(subElStyle.x, style.width, subElStyle.textAlign), adjustTextY(subElStyle.y, calculatedLineHeight, subElStyle.textBaseline), contentWidth, calculatedLineHeight));
      }
    }
  };
  ZRText2.prototype._updateRichTexts = function() {
    var style = this.style;
    var text = getStyleText(style);
    var contentBlock = parseRichText(text, style);
    var contentWidth = contentBlock.width;
    var outerWidth = contentBlock.outerWidth;
    var outerHeight = contentBlock.outerHeight;
    var textPadding = style.padding;
    var baseX = style.x || 0;
    var baseY = style.y || 0;
    var defaultStyle = this._defaultStyle;
    var textAlign = style.align || defaultStyle.align;
    var verticalAlign = style.verticalAlign || defaultStyle.verticalAlign;
    var boxX = adjustTextX(baseX, outerWidth, textAlign);
    var boxY = adjustTextY(baseY, outerHeight, verticalAlign);
    var xLeft = boxX;
    var lineTop = boxY;
    if (textPadding) {
      xLeft += textPadding[3];
      lineTop += textPadding[0];
    }
    var xRight = xLeft + contentWidth;
    if (needDrawBackground(style)) {
      this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
    }
    var bgColorDrawn = !!style.backgroundColor;
    for (var i2 = 0; i2 < contentBlock.lines.length; i2++) {
      var line = contentBlock.lines[i2];
      var tokens = line.tokens;
      var tokenCount = tokens.length;
      var lineHeight = line.lineHeight;
      var remainedWidth = line.width;
      var leftIndex = 0;
      var lineXLeft = xLeft;
      var lineXRight = xRight;
      var rightIndex = tokenCount - 1;
      var token = void 0;
      while (leftIndex < tokenCount && (token = tokens[leftIndex], !token.align || token.align === "left")) {
        this._placeToken(token, style, lineHeight, lineTop, lineXLeft, "left", bgColorDrawn);
        remainedWidth -= token.width;
        lineXLeft += token.width;
        leftIndex++;
      }
      while (rightIndex >= 0 && (token = tokens[rightIndex], token.align === "right")) {
        this._placeToken(token, style, lineHeight, lineTop, lineXRight, "right", bgColorDrawn);
        remainedWidth -= token.width;
        lineXRight -= token.width;
        rightIndex--;
      }
      lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - remainedWidth) / 2;
      while (leftIndex <= rightIndex) {
        token = tokens[leftIndex];
        this._placeToken(token, style, lineHeight, lineTop, lineXLeft + token.width / 2, "center", bgColorDrawn);
        lineXLeft += token.width;
        leftIndex++;
      }
      lineTop += lineHeight;
    }
  };
  ZRText2.prototype._placeToken = function(token, style, lineHeight, lineTop, x2, textAlign, parentBgColorDrawn) {
    var tokenStyle = style.rich[token.styleName] || {};
    tokenStyle.text = token.text;
    var verticalAlign = token.verticalAlign;
    var y2 = lineTop + lineHeight / 2;
    if (verticalAlign === "top") {
      y2 = lineTop + token.height / 2;
    } else if (verticalAlign === "bottom") {
      y2 = lineTop + lineHeight - token.height / 2;
    }
    var needDrawBg = !token.isLineHolder && needDrawBackground(tokenStyle);
    needDrawBg && this._renderBackground(tokenStyle, style, textAlign === "right" ? x2 - token.width : textAlign === "center" ? x2 - token.width / 2 : x2, y2 - token.height / 2, token.width, token.height);
    var bgColorDrawn = !!tokenStyle.backgroundColor;
    var textPadding = token.textPadding;
    if (textPadding) {
      x2 = getTextXForPadding(x2, textAlign, textPadding);
      y2 -= token.height / 2 - textPadding[0] - token.innerHeight / 2;
    }
    var el = this._getOrCreateChild(TSpan$1);
    var subElStyle = el.createStyle();
    el.useStyle(subElStyle);
    var defaultStyle = this._defaultStyle;
    var useDefaultFill = false;
    var defaultLineWidth = 0;
    var textFill = getFill("fill" in tokenStyle ? tokenStyle.fill : "fill" in style ? style.fill : (useDefaultFill = true, defaultStyle.fill));
    var textStroke = getStroke("stroke" in tokenStyle ? tokenStyle.stroke : "stroke" in style ? style.stroke : !bgColorDrawn && !parentBgColorDrawn && (!defaultStyle.autoStroke || useDefaultFill) ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, defaultStyle.stroke) : null);
    var hasShadow = tokenStyle.textShadowBlur > 0 || style.textShadowBlur > 0;
    subElStyle.text = token.text;
    subElStyle.x = x2;
    subElStyle.y = y2;
    if (hasShadow) {
      subElStyle.shadowBlur = tokenStyle.textShadowBlur || style.textShadowBlur || 0;
      subElStyle.shadowColor = tokenStyle.textShadowColor || style.textShadowColor || "transparent";
      subElStyle.shadowOffsetX = tokenStyle.textShadowOffsetX || style.textShadowOffsetX || 0;
      subElStyle.shadowOffsetY = tokenStyle.textShadowOffsetY || style.textShadowOffsetY || 0;
    }
    subElStyle.textAlign = textAlign;
    subElStyle.textBaseline = "middle";
    subElStyle.font = token.font || DEFAULT_FONT;
    subElStyle.opacity = retrieve3(tokenStyle.opacity, style.opacity, 1);
    setSeparateFont(subElStyle, tokenStyle);
    if (textStroke) {
      subElStyle.lineWidth = retrieve3(tokenStyle.lineWidth, style.lineWidth, defaultLineWidth);
      subElStyle.lineDash = retrieve2(tokenStyle.lineDash, style.lineDash);
      subElStyle.lineDashOffset = style.lineDashOffset || 0;
      subElStyle.stroke = textStroke;
    }
    if (textFill) {
      subElStyle.fill = textFill;
    }
    var textWidth = token.contentWidth;
    var textHeight = token.contentHeight;
    el.setBoundingRect(new BoundingRect$1(adjustTextX(subElStyle.x, textWidth, subElStyle.textAlign), adjustTextY(subElStyle.y, textHeight, subElStyle.textBaseline), textWidth, textHeight));
  };
  ZRText2.prototype._renderBackground = function(style, topStyle, x2, y2, width, height) {
    var textBackgroundColor = style.backgroundColor;
    var textBorderWidth = style.borderWidth;
    var textBorderColor = style.borderColor;
    var isImageBg = textBackgroundColor && textBackgroundColor.image;
    var isPlainOrGradientBg = textBackgroundColor && !isImageBg;
    var textBorderRadius = style.borderRadius;
    var self2 = this;
    var rectEl;
    var imgEl;
    if (isPlainOrGradientBg || style.lineHeight || textBorderWidth && textBorderColor) {
      rectEl = this._getOrCreateChild(Rect$1);
      rectEl.useStyle(rectEl.createStyle());
      rectEl.style.fill = null;
      var rectShape = rectEl.shape;
      rectShape.x = x2;
      rectShape.y = y2;
      rectShape.width = width;
      rectShape.height = height;
      rectShape.r = textBorderRadius;
      rectEl.dirtyShape();
    }
    if (isPlainOrGradientBg) {
      var rectStyle = rectEl.style;
      rectStyle.fill = textBackgroundColor || null;
      rectStyle.fillOpacity = retrieve2(style.fillOpacity, 1);
    } else if (isImageBg) {
      imgEl = this._getOrCreateChild(ZRImage$1);
      imgEl.onload = function() {
        self2.dirtyStyle();
      };
      var imgStyle = imgEl.style;
      imgStyle.image = textBackgroundColor.image;
      imgStyle.x = x2;
      imgStyle.y = y2;
      imgStyle.width = width;
      imgStyle.height = height;
    }
    if (textBorderWidth && textBorderColor) {
      var rectStyle = rectEl.style;
      rectStyle.lineWidth = textBorderWidth;
      rectStyle.stroke = textBorderColor;
      rectStyle.strokeOpacity = retrieve2(style.strokeOpacity, 1);
      rectStyle.lineDash = style.borderDash;
      rectStyle.lineDashOffset = style.borderDashOffset || 0;
      rectEl.strokeContainThreshold = 0;
      if (rectEl.hasFill() && rectEl.hasStroke()) {
        rectStyle.strokeFirst = true;
        rectStyle.lineWidth *= 2;
      }
    }
    var commonStyle = (rectEl || imgEl).style;
    commonStyle.shadowBlur = style.shadowBlur || 0;
    commonStyle.shadowColor = style.shadowColor || "transparent";
    commonStyle.shadowOffsetX = style.shadowOffsetX || 0;
    commonStyle.shadowOffsetY = style.shadowOffsetY || 0;
    commonStyle.opacity = retrieve3(style.opacity, topStyle.opacity, 1);
  };
  ZRText2.makeFont = function(style) {
    var font = "";
    if (hasSeparateFont(style)) {
      font = [
        style.fontStyle,
        style.fontWeight,
        parseFontSize(style.fontSize),
        style.fontFamily || "sans-serif"
      ].join(" ");
    }
    return font && trim(font) || style.textFont || style.font;
  };
  return ZRText2;
}(Displayable$1);
var VALID_TEXT_ALIGN = { left: true, right: 1, center: 1 };
var VALID_TEXT_VERTICAL_ALIGN = { top: 1, bottom: 1, middle: 1 };
var FONT_PARTS = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function parseFontSize(fontSize) {
  if (typeof fontSize === "string" && (fontSize.indexOf("px") !== -1 || fontSize.indexOf("rem") !== -1 || fontSize.indexOf("em") !== -1)) {
    return fontSize;
  } else if (!isNaN(+fontSize)) {
    return fontSize + "px";
  } else {
    return DEFAULT_FONT_SIZE + "px";
  }
}
function setSeparateFont(targetStyle, sourceStyle) {
  for (var i2 = 0; i2 < FONT_PARTS.length; i2++) {
    var fontProp = FONT_PARTS[i2];
    var val = sourceStyle[fontProp];
    if (val != null) {
      targetStyle[fontProp] = val;
    }
  }
}
function hasSeparateFont(style) {
  return style.fontSize != null || style.fontFamily || style.fontWeight;
}
function normalizeTextStyle(style) {
  normalizeStyle(style);
  each(style.rich, normalizeStyle);
  return style;
}
function normalizeStyle(style) {
  if (style) {
    style.font = ZRText.makeFont(style);
    var textAlign = style.align;
    textAlign === "middle" && (textAlign = "center");
    style.align = textAlign == null || VALID_TEXT_ALIGN[textAlign] ? textAlign : "left";
    var verticalAlign = style.verticalAlign;
    verticalAlign === "center" && (verticalAlign = "middle");
    style.verticalAlign = verticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[verticalAlign] ? verticalAlign : "top";
    var textPadding = style.padding;
    if (textPadding) {
      style.padding = normalizeCssArray(style.padding);
    }
  }
}
function getStroke(stroke, lineWidth) {
  return stroke == null || lineWidth <= 0 || stroke === "transparent" || stroke === "none" ? null : stroke.image || stroke.colorStops ? "#000" : stroke;
}
function getFill(fill) {
  return fill == null || fill === "none" ? null : fill.image || fill.colorStops ? "#000" : fill;
}
function getTextXForPadding(x2, textAlign, textPadding) {
  return textAlign === "right" ? x2 - textPadding[1] : textAlign === "center" ? x2 + textPadding[3] / 2 - textPadding[1] / 2 : x2 + textPadding[3];
}
function getStyleText(style) {
  var text = style.text;
  text != null && (text += "");
  return text;
}
function needDrawBackground(style) {
  return !!(style.backgroundColor || style.lineHeight || style.borderWidth && style.borderColor);
}
var ZRText$1 = ZRText;
var CMD$1 = PathProxy$1.CMD;
var points = [[], [], []];
var mathSqrt$2 = Math.sqrt;
var mathAtan2 = Math.atan2;
function transformPath(path, m2) {
  if (!m2) {
    return;
  }
  var data2 = path.data;
  var len2 = path.len();
  var cmd;
  var nPoint;
  var i2;
  var j;
  var k;
  var p2;
  var M2 = CMD$1.M;
  var C2 = CMD$1.C;
  var L2 = CMD$1.L;
  var R2 = CMD$1.R;
  var A2 = CMD$1.A;
  var Q2 = CMD$1.Q;
  for (i2 = 0, j = 0; i2 < len2; ) {
    cmd = data2[i2++];
    j = i2;
    nPoint = 0;
    switch (cmd) {
      case M2:
        nPoint = 1;
        break;
      case L2:
        nPoint = 1;
        break;
      case C2:
        nPoint = 3;
        break;
      case Q2:
        nPoint = 2;
        break;
      case A2:
        var x2 = m2[4];
        var y2 = m2[5];
        var sx = mathSqrt$2(m2[0] * m2[0] + m2[1] * m2[1]);
        var sy = mathSqrt$2(m2[2] * m2[2] + m2[3] * m2[3]);
        var angle = mathAtan2(-m2[1] / sy, m2[0] / sx);
        data2[i2] *= sx;
        data2[i2++] += x2;
        data2[i2] *= sy;
        data2[i2++] += y2;
        data2[i2++] *= sx;
        data2[i2++] *= sy;
        data2[i2++] += angle;
        data2[i2++] += angle;
        i2 += 2;
        j = i2;
        break;
      case R2:
        p2[0] = data2[i2++];
        p2[1] = data2[i2++];
        applyTransform(p2, p2, m2);
        data2[j++] = p2[0];
        data2[j++] = p2[1];
        p2[0] += data2[i2++];
        p2[1] += data2[i2++];
        applyTransform(p2, p2, m2);
        data2[j++] = p2[0];
        data2[j++] = p2[1];
    }
    for (k = 0; k < nPoint; k++) {
      var p_1 = points[k];
      p_1[0] = data2[i2++];
      p_1[1] = data2[i2++];
      applyTransform(p_1, p_1, m2);
      data2[j++] = p_1[0];
      data2[j++] = p_1[1];
    }
  }
  path.increaseVersion();
}
var mathSqrt$1 = Math.sqrt;
var mathSin$1 = Math.sin;
var mathCos$1 = Math.cos;
var PI$1 = Math.PI;
function vMag(v2) {
  return Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
}
function vRatio(u2, v2) {
  return (u2[0] * v2[0] + u2[1] * v2[1]) / (vMag(u2) * vMag(v2));
}
function vAngle(u2, v2) {
  return (u2[0] * v2[1] < u2[1] * v2[0] ? -1 : 1) * Math.acos(vRatio(u2, v2));
}
function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path) {
  var psi = psiDeg * (PI$1 / 180);
  var xp = mathCos$1(psi) * (x1 - x2) / 2 + mathSin$1(psi) * (y1 - y2) / 2;
  var yp = -1 * mathSin$1(psi) * (x1 - x2) / 2 + mathCos$1(psi) * (y1 - y2) / 2;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
  if (lambda > 1) {
    rx *= mathSqrt$1(lambda);
    ry *= mathSqrt$1(lambda);
  }
  var f2 = (fa === fs ? -1 : 1) * mathSqrt$1((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp))) || 0;
  var cxp = f2 * rx * yp / ry;
  var cyp = f2 * -ry * xp / rx;
  var cx = (x1 + x2) / 2 + mathCos$1(psi) * cxp - mathSin$1(psi) * cyp;
  var cy = (y1 + y2) / 2 + mathSin$1(psi) * cxp + mathCos$1(psi) * cyp;
  var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
  var u2 = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v2 = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var dTheta = vAngle(u2, v2);
  if (vRatio(u2, v2) <= -1) {
    dTheta = PI$1;
  }
  if (vRatio(u2, v2) >= 1) {
    dTheta = 0;
  }
  if (dTheta < 0) {
    var n2 = Math.round(dTheta / PI$1 * 1e6) / 1e6;
    dTheta = PI$1 * 2 + n2 % 2 * PI$1;
  }
  path.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs);
}
var commandReg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig;
var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function createPathProxyFromString(data2) {
  var path = new PathProxy$1();
  if (!data2) {
    return path;
  }
  var cpx = 0;
  var cpy = 0;
  var subpathX = cpx;
  var subpathY = cpy;
  var prevCmd;
  var CMD2 = PathProxy$1.CMD;
  var cmdList = data2.match(commandReg);
  if (!cmdList) {
    return path;
  }
  for (var l2 = 0; l2 < cmdList.length; l2++) {
    var cmdText = cmdList[l2];
    var cmdStr = cmdText.charAt(0);
    var cmd = void 0;
    var p2 = cmdText.match(numberReg) || [];
    var pLen = p2.length;
    for (var i2 = 0; i2 < pLen; i2++) {
      p2[i2] = parseFloat(p2[i2]);
    }
    var off = 0;
    while (off < pLen) {
      var ctlPtx = void 0;
      var ctlPty = void 0;
      var rx = void 0;
      var ry = void 0;
      var psi = void 0;
      var fa = void 0;
      var fs = void 0;
      var x1 = cpx;
      var y1 = cpy;
      var len2 = void 0;
      var pathData = void 0;
      switch (cmdStr) {
        case "l":
          cpx += p2[off++];
          cpy += p2[off++];
          cmd = CMD2.L;
          path.addData(cmd, cpx, cpy);
          break;
        case "L":
          cpx = p2[off++];
          cpy = p2[off++];
          cmd = CMD2.L;
          path.addData(cmd, cpx, cpy);
          break;
        case "m":
          cpx += p2[off++];
          cpy += p2[off++];
          cmd = CMD2.M;
          path.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = "l";
          break;
        case "M":
          cpx = p2[off++];
          cpy = p2[off++];
          cmd = CMD2.M;
          path.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = "L";
          break;
        case "h":
          cpx += p2[off++];
          cmd = CMD2.L;
          path.addData(cmd, cpx, cpy);
          break;
        case "H":
          cpx = p2[off++];
          cmd = CMD2.L;
          path.addData(cmd, cpx, cpy);
          break;
        case "v":
          cpy += p2[off++];
          cmd = CMD2.L;
          path.addData(cmd, cpx, cpy);
          break;
        case "V":
          cpy = p2[off++];
          cmd = CMD2.L;
          path.addData(cmd, cpx, cpy);
          break;
        case "C":
          cmd = CMD2.C;
          path.addData(cmd, p2[off++], p2[off++], p2[off++], p2[off++], p2[off++], p2[off++]);
          cpx = p2[off - 2];
          cpy = p2[off - 1];
          break;
        case "c":
          cmd = CMD2.C;
          path.addData(cmd, p2[off++] + cpx, p2[off++] + cpy, p2[off++] + cpx, p2[off++] + cpy, p2[off++] + cpx, p2[off++] + cpy);
          cpx += p2[off - 2];
          cpy += p2[off - 1];
          break;
        case "S":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path.len();
          pathData = path.data;
          if (prevCmd === CMD2.C) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cmd = CMD2.C;
          x1 = p2[off++];
          y1 = p2[off++];
          cpx = p2[off++];
          cpy = p2[off++];
          path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;
        case "s":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path.len();
          pathData = path.data;
          if (prevCmd === CMD2.C) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cmd = CMD2.C;
          x1 = cpx + p2[off++];
          y1 = cpy + p2[off++];
          cpx += p2[off++];
          cpy += p2[off++];
          path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;
        case "Q":
          x1 = p2[off++];
          y1 = p2[off++];
          cpx = p2[off++];
          cpy = p2[off++];
          cmd = CMD2.Q;
          path.addData(cmd, x1, y1, cpx, cpy);
          break;
        case "q":
          x1 = p2[off++] + cpx;
          y1 = p2[off++] + cpy;
          cpx += p2[off++];
          cpy += p2[off++];
          cmd = CMD2.Q;
          path.addData(cmd, x1, y1, cpx, cpy);
          break;
        case "T":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path.len();
          pathData = path.data;
          if (prevCmd === CMD2.Q) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cpx = p2[off++];
          cpy = p2[off++];
          cmd = CMD2.Q;
          path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;
        case "t":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path.len();
          pathData = path.data;
          if (prevCmd === CMD2.Q) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cpx += p2[off++];
          cpy += p2[off++];
          cmd = CMD2.Q;
          path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;
        case "A":
          rx = p2[off++];
          ry = p2[off++];
          psi = p2[off++];
          fa = p2[off++];
          fs = p2[off++];
          x1 = cpx, y1 = cpy;
          cpx = p2[off++];
          cpy = p2[off++];
          cmd = CMD2.A;
          processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
          break;
        case "a":
          rx = p2[off++];
          ry = p2[off++];
          psi = p2[off++];
          fa = p2[off++];
          fs = p2[off++];
          x1 = cpx, y1 = cpy;
          cpx += p2[off++];
          cpy += p2[off++];
          cmd = CMD2.A;
          processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
          break;
      }
    }
    if (cmdStr === "z" || cmdStr === "Z") {
      cmd = CMD2.Z;
      path.addData(cmd);
      cpx = subpathX;
      cpy = subpathY;
    }
    prevCmd = cmd;
  }
  path.toStatic();
  return path;
}
var SVGPath = function(_super) {
  __extends(SVGPath2, _super);
  function SVGPath2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  SVGPath2.prototype.applyTransform = function(m2) {
  };
  return SVGPath2;
}(Path$1);
function isPathProxy(path) {
  return path.setData != null;
}
function createPathOptions(str, opts) {
  var pathProxy = createPathProxyFromString(str);
  var innerOpts = extend({}, opts);
  innerOpts.buildPath = function(path) {
    if (isPathProxy(path)) {
      path.setData(pathProxy.data);
      var ctx = path.getContext();
      if (ctx) {
        path.rebuildPath(ctx, 1);
      }
    } else {
      var ctx = path;
      pathProxy.rebuildPath(ctx, 1);
    }
  };
  innerOpts.applyTransform = function(m2) {
    transformPath(pathProxy, m2);
    this.dirtyShape();
  };
  return innerOpts;
}
function createFromString(str, opts) {
  return new SVGPath(createPathOptions(str, opts));
}
function extendFromString(str, defaultOpts) {
  var innerOpts = createPathOptions(str, defaultOpts);
  var Sub = function(_super) {
    __extends(Sub2, _super);
    function Sub2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.applyTransform = innerOpts.applyTransform;
      _this.buildPath = innerOpts.buildPath;
      return _this;
    }
    return Sub2;
  }(SVGPath);
  return Sub;
}
function mergePath(pathEls, opts) {
  var pathList = [];
  var len2 = pathEls.length;
  for (var i2 = 0; i2 < len2; i2++) {
    var pathEl = pathEls[i2];
    pathList.push(pathEl.getUpdatedPathProxy(true));
  }
  var pathBundle = new Path$1(opts);
  pathBundle.createPathProxy();
  pathBundle.buildPath = function(path) {
    if (isPathProxy(path)) {
      path.appendPath(pathList);
      var ctx = path.getContext();
      if (ctx) {
        path.rebuildPath(ctx, 1);
      }
    }
  };
  return pathBundle;
}
function clonePath(sourcePath, opts) {
  opts = opts || {};
  var path = new Path$1();
  if (sourcePath.shape) {
    path.setShape(sourcePath.shape);
  }
  path.setStyle(sourcePath.style);
  if (opts.bakeTransform) {
    transformPath(path.path, sourcePath.getComputedTransform());
  } else {
    if (opts.toLocal) {
      path.setLocalTransform(sourcePath.getComputedTransform());
    } else {
      path.copyTransform(sourcePath);
    }
  }
  path.buildPath = sourcePath.buildPath;
  path.applyTransform = path.applyTransform;
  path.z = sourcePath.z;
  path.z2 = sourcePath.z2;
  path.zlevel = sourcePath.zlevel;
  return path;
}
var CircleShape = function() {
  function CircleShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
  }
  return CircleShape2;
}();
var Circle = function(_super) {
  __extends(Circle2, _super);
  function Circle2(opts) {
    return _super.call(this, opts) || this;
  }
  Circle2.prototype.getDefaultShape = function() {
    return new CircleShape();
  };
  Circle2.prototype.buildPath = function(ctx, shape) {
    ctx.moveTo(shape.cx + shape.r, shape.cy);
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
  };
  return Circle2;
}(Path$1);
Circle.prototype.type = "circle";
var Circle$1 = Circle;
var EllipseShape = function() {
  function EllipseShape2() {
    this.cx = 0;
    this.cy = 0;
    this.rx = 0;
    this.ry = 0;
  }
  return EllipseShape2;
}();
var Ellipse = function(_super) {
  __extends(Ellipse2, _super);
  function Ellipse2(opts) {
    return _super.call(this, opts) || this;
  }
  Ellipse2.prototype.getDefaultShape = function() {
    return new EllipseShape();
  };
  Ellipse2.prototype.buildPath = function(ctx, shape) {
    var k = 0.5522848;
    var x2 = shape.cx;
    var y2 = shape.cy;
    var a2 = shape.rx;
    var b2 = shape.ry;
    var ox = a2 * k;
    var oy = b2 * k;
    ctx.moveTo(x2 - a2, y2);
    ctx.bezierCurveTo(x2 - a2, y2 - oy, x2 - ox, y2 - b2, x2, y2 - b2);
    ctx.bezierCurveTo(x2 + ox, y2 - b2, x2 + a2, y2 - oy, x2 + a2, y2);
    ctx.bezierCurveTo(x2 + a2, y2 + oy, x2 + ox, y2 + b2, x2, y2 + b2);
    ctx.bezierCurveTo(x2 - ox, y2 + b2, x2 - a2, y2 + oy, x2 - a2, y2);
    ctx.closePath();
  };
  return Ellipse2;
}(Path$1);
Ellipse.prototype.type = "ellipse";
var Ellipse$1 = Ellipse;
var PI = Math.PI;
var PI2 = PI * 2;
var mathSin = Math.sin;
var mathCos = Math.cos;
var mathACos = Math.acos;
var mathATan2 = Math.atan2;
var mathAbs = Math.abs;
var mathSqrt = Math.sqrt;
var mathMax = Math.max;
var mathMin = Math.min;
var e = 1e-4;
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var dx10 = x1 - x0;
  var dy10 = y1 - y0;
  var dx32 = x3 - x2;
  var dy32 = y3 - y2;
  var t2 = dy32 * dx10 - dx32 * dy10;
  if (t2 * t2 < e) {
    return;
  }
  t2 = (dx32 * (y0 - y2) - dy32 * (x0 - x2)) / t2;
  return [x0 + t2 * dx10, y0 + t2 * dy10];
}
function computeCornerTangents(x0, y0, x1, y1, radius, cr, clockwise) {
  var x01 = x0 - x1;
  var y01 = y0 - y1;
  var lo = (clockwise ? cr : -cr) / mathSqrt(x01 * x01 + y01 * y01);
  var ox = lo * y01;
  var oy = -lo * x01;
  var x11 = x0 + ox;
  var y11 = y0 + oy;
  var x10 = x1 + ox;
  var y10 = y1 + oy;
  var x00 = (x11 + x10) / 2;
  var y00 = (y11 + y10) / 2;
  var dx = x10 - x11;
  var dy = y10 - y11;
  var d2 = dx * dx + dy * dy;
  var r2 = radius - cr;
  var s2 = x11 * y10 - x10 * y11;
  var d3 = (dy < 0 ? -1 : 1) * mathSqrt(mathMax(0, r2 * r2 * d2 - s2 * s2));
  var cx0 = (s2 * dy - dx * d3) / d2;
  var cy0 = (-s2 * dx - dy * d3) / d2;
  var cx1 = (s2 * dy + dx * d3) / d2;
  var cy1 = (-s2 * dx + dy * d3) / d2;
  var dx0 = cx0 - x00;
  var dy0 = cy0 - y00;
  var dx1 = cx1 - x00;
  var dy1 = cy1 - y00;
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) {
    cx0 = cx1;
    cy0 = cy1;
  }
  return {
    cx: cx0,
    cy: cy0,
    x0: -ox,
    y0: -oy,
    x1: cx0 * (radius / r2 - 1),
    y1: cy0 * (radius / r2 - 1)
  };
}
function normalizeCornerRadius(cr) {
  var arr;
  if (isArray(cr)) {
    var len2 = cr.length;
    if (!len2) {
      return cr;
    }
    if (len2 === 1) {
      arr = [cr[0], cr[0], 0, 0];
    } else if (len2 === 2) {
      arr = [cr[0], cr[0], cr[1], cr[1]];
    } else if (len2 === 3) {
      arr = cr.concat(cr[2]);
    } else {
      arr = cr;
    }
  } else {
    arr = [cr, cr, cr, cr];
  }
  return arr;
}
function buildPath$1(ctx, shape) {
  var _a;
  var radius = mathMax(shape.r, 0);
  var innerRadius = mathMax(shape.r0 || 0, 0);
  var hasRadius = radius > 0;
  var hasInnerRadius = innerRadius > 0;
  if (!hasRadius && !hasInnerRadius) {
    return;
  }
  if (!hasRadius) {
    radius = innerRadius;
    innerRadius = 0;
  }
  if (innerRadius > radius) {
    var tmp = radius;
    radius = innerRadius;
    innerRadius = tmp;
  }
  var startAngle = shape.startAngle, endAngle = shape.endAngle;
  if (isNaN(startAngle) || isNaN(endAngle)) {
    return;
  }
  var cx = shape.cx, cy = shape.cy;
  var clockwise = !!shape.clockwise;
  var arc = mathAbs(endAngle - startAngle);
  var mod = arc > PI2 && arc % PI2;
  mod > e && (arc = mod);
  if (!(radius > e)) {
    ctx.moveTo(cx, cy);
  } else if (arc > PI2 - e) {
    ctx.moveTo(cx + radius * mathCos(startAngle), cy + radius * mathSin(startAngle));
    ctx.arc(cx, cy, radius, startAngle, endAngle, !clockwise);
    if (innerRadius > e) {
      ctx.moveTo(cx + innerRadius * mathCos(endAngle), cy + innerRadius * mathSin(endAngle));
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, clockwise);
    }
  } else {
    var icrStart = void 0;
    var icrEnd = void 0;
    var ocrStart = void 0;
    var ocrEnd = void 0;
    var ocrs = void 0;
    var ocre = void 0;
    var icrs = void 0;
    var icre = void 0;
    var ocrMax = void 0;
    var icrMax = void 0;
    var limitedOcrMax = void 0;
    var limitedIcrMax = void 0;
    var xre = void 0;
    var yre = void 0;
    var xirs = void 0;
    var yirs = void 0;
    var xrs = radius * mathCos(startAngle);
    var yrs = radius * mathSin(startAngle);
    var xire = innerRadius * mathCos(endAngle);
    var yire = innerRadius * mathSin(endAngle);
    var hasArc = arc > e;
    if (hasArc) {
      var cornerRadius = shape.cornerRadius;
      if (cornerRadius) {
        _a = normalizeCornerRadius(cornerRadius), icrStart = _a[0], icrEnd = _a[1], ocrStart = _a[2], ocrEnd = _a[3];
      }
      var halfRd = mathAbs(radius - innerRadius) / 2;
      ocrs = mathMin(halfRd, ocrStart);
      ocre = mathMin(halfRd, ocrEnd);
      icrs = mathMin(halfRd, icrStart);
      icre = mathMin(halfRd, icrEnd);
      limitedOcrMax = ocrMax = mathMax(ocrs, ocre);
      limitedIcrMax = icrMax = mathMax(icrs, icre);
      if (ocrMax > e || icrMax > e) {
        xre = radius * mathCos(endAngle);
        yre = radius * mathSin(endAngle);
        xirs = innerRadius * mathCos(startAngle);
        yirs = innerRadius * mathSin(startAngle);
        if (arc < PI) {
          var it_1 = intersect(xrs, yrs, xirs, yirs, xre, yre, xire, yire);
          if (it_1) {
            var x0 = xrs - it_1[0];
            var y0 = yrs - it_1[1];
            var x1 = xre - it_1[0];
            var y1 = yre - it_1[1];
            var a2 = 1 / mathSin(mathACos((x0 * x1 + y0 * y1) / (mathSqrt(x0 * x0 + y0 * y0) * mathSqrt(x1 * x1 + y1 * y1))) / 2);
            var b2 = mathSqrt(it_1[0] * it_1[0] + it_1[1] * it_1[1]);
            limitedOcrMax = mathMin(ocrMax, (radius - b2) / (a2 + 1));
            limitedIcrMax = mathMin(icrMax, (innerRadius - b2) / (a2 - 1));
          }
        }
      }
    }
    if (!hasArc) {
      ctx.moveTo(cx + xrs, cy + yrs);
    } else if (limitedOcrMax > e) {
      var crStart = mathMin(ocrStart, limitedOcrMax);
      var crEnd = mathMin(ocrEnd, limitedOcrMax);
      var ct0 = computeCornerTangents(xirs, yirs, xrs, yrs, radius, crStart, clockwise);
      var ct1 = computeCornerTangents(xre, yre, xire, yire, radius, crEnd, clockwise);
      ctx.moveTo(cx + ct0.cx + ct0.x0, cy + ct0.cy + ct0.y0);
      if (limitedOcrMax < ocrMax && crStart === crEnd) {
        ctx.arc(cx + ct0.cx, cy + ct0.cy, limitedOcrMax, mathATan2(ct0.y0, ct0.x0), mathATan2(ct1.y0, ct1.x0), !clockwise);
      } else {
        crStart > 0 && ctx.arc(cx + ct0.cx, cy + ct0.cy, crStart, mathATan2(ct0.y0, ct0.x0), mathATan2(ct0.y1, ct0.x1), !clockwise);
        ctx.arc(cx, cy, radius, mathATan2(ct0.cy + ct0.y1, ct0.cx + ct0.x1), mathATan2(ct1.cy + ct1.y1, ct1.cx + ct1.x1), !clockwise);
        crEnd > 0 && ctx.arc(cx + ct1.cx, cy + ct1.cy, crEnd, mathATan2(ct1.y1, ct1.x1), mathATan2(ct1.y0, ct1.x0), !clockwise);
      }
    } else {
      ctx.moveTo(cx + xrs, cy + yrs);
      ctx.arc(cx, cy, radius, startAngle, endAngle, !clockwise);
    }
    if (!(innerRadius > e) || !hasArc) {
      ctx.lineTo(cx + xire, cy + yire);
    } else if (limitedIcrMax > e) {
      var crStart = mathMin(icrStart, limitedIcrMax);
      var crEnd = mathMin(icrEnd, limitedIcrMax);
      var ct0 = computeCornerTangents(xire, yire, xre, yre, innerRadius, -crEnd, clockwise);
      var ct1 = computeCornerTangents(xrs, yrs, xirs, yirs, innerRadius, -crStart, clockwise);
      ctx.lineTo(cx + ct0.cx + ct0.x0, cy + ct0.cy + ct0.y0);
      if (limitedIcrMax < icrMax && crStart === crEnd) {
        ctx.arc(cx + ct0.cx, cy + ct0.cy, limitedIcrMax, mathATan2(ct0.y0, ct0.x0), mathATan2(ct1.y0, ct1.x0), !clockwise);
      } else {
        crEnd > 0 && ctx.arc(cx + ct0.cx, cy + ct0.cy, crEnd, mathATan2(ct0.y0, ct0.x0), mathATan2(ct0.y1, ct0.x1), !clockwise);
        ctx.arc(cx, cy, innerRadius, mathATan2(ct0.cy + ct0.y1, ct0.cx + ct0.x1), mathATan2(ct1.cy + ct1.y1, ct1.cx + ct1.x1), clockwise);
        crStart > 0 && ctx.arc(cx + ct1.cx, cy + ct1.cy, crStart, mathATan2(ct1.y1, ct1.x1), mathATan2(ct1.y0, ct1.x0), !clockwise);
      }
    } else {
      ctx.lineTo(cx + xire, cy + yire);
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, clockwise);
    }
  }
  ctx.closePath();
}
var SectorShape = function() {
  function SectorShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r0 = 0;
    this.r = 0;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.clockwise = true;
    this.cornerRadius = 0;
  }
  return SectorShape2;
}();
var Sector = function(_super) {
  __extends(Sector2, _super);
  function Sector2(opts) {
    return _super.call(this, opts) || this;
  }
  Sector2.prototype.getDefaultShape = function() {
    return new SectorShape();
  };
  Sector2.prototype.buildPath = function(ctx, shape) {
    buildPath$1(ctx, shape);
  };
  Sector2.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  };
  return Sector2;
}(Path$1);
Sector.prototype.type = "sector";
var Sector$1 = Sector;
var RingShape = function() {
  function RingShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
    this.r0 = 0;
  }
  return RingShape2;
}();
var Ring = function(_super) {
  __extends(Ring2, _super);
  function Ring2(opts) {
    return _super.call(this, opts) || this;
  }
  Ring2.prototype.getDefaultShape = function() {
    return new RingShape();
  };
  Ring2.prototype.buildPath = function(ctx, shape) {
    var x2 = shape.cx;
    var y2 = shape.cy;
    var PI22 = Math.PI * 2;
    ctx.moveTo(x2 + shape.r, y2);
    ctx.arc(x2, y2, shape.r, 0, PI22, false);
    ctx.moveTo(x2 + shape.r0, y2);
    ctx.arc(x2, y2, shape.r0, 0, PI22, true);
  };
  return Ring2;
}(Path$1);
Ring.prototype.type = "ring";
var Ring$1 = Ring;
function smoothBezier(points2, smooth, isLoop, constraint) {
  var cps = [];
  var v2 = [];
  var v1 = [];
  var v22 = [];
  var prevPoint;
  var nextPoint;
  var min3;
  var max3;
  if (constraint) {
    min3 = [Infinity, Infinity];
    max3 = [-Infinity, -Infinity];
    for (var i2 = 0, len2 = points2.length; i2 < len2; i2++) {
      min$1(min3, min3, points2[i2]);
      max$1(max3, max3, points2[i2]);
    }
    min$1(min3, min3, constraint[0]);
    max$1(max3, max3, constraint[1]);
  }
  for (var i2 = 0, len2 = points2.length; i2 < len2; i2++) {
    var point = points2[i2];
    if (isLoop) {
      prevPoint = points2[i2 ? i2 - 1 : len2 - 1];
      nextPoint = points2[(i2 + 1) % len2];
    } else {
      if (i2 === 0 || i2 === len2 - 1) {
        cps.push(clone$1(points2[i2]));
        continue;
      } else {
        prevPoint = points2[i2 - 1];
        nextPoint = points2[i2 + 1];
      }
    }
    sub(v2, nextPoint, prevPoint);
    scale$1(v2, v2, smooth);
    var d0 = distance(point, prevPoint);
    var d1 = distance(point, nextPoint);
    var sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }
    scale$1(v1, v2, -d0);
    scale$1(v22, v2, d1);
    var cp0 = add([], point, v1);
    var cp1 = add([], point, v22);
    if (constraint) {
      max$1(cp0, cp0, min3);
      min$1(cp0, cp0, max3);
      max$1(cp1, cp1, min3);
      min$1(cp1, cp1, max3);
    }
    cps.push(cp0);
    cps.push(cp1);
  }
  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
}
function buildPath(ctx, shape, closePath) {
  var smooth = shape.smooth;
  var points2 = shape.points;
  if (points2 && points2.length >= 2) {
    if (smooth) {
      var controlPoints = smoothBezier(points2, smooth, closePath, shape.smoothConstraint);
      ctx.moveTo(points2[0][0], points2[0][1]);
      var len2 = points2.length;
      for (var i2 = 0; i2 < (closePath ? len2 : len2 - 1); i2++) {
        var cp1 = controlPoints[i2 * 2];
        var cp2 = controlPoints[i2 * 2 + 1];
        var p2 = points2[(i2 + 1) % len2];
        ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
      }
    } else {
      ctx.moveTo(points2[0][0], points2[0][1]);
      for (var i2 = 1, l2 = points2.length; i2 < l2; i2++) {
        ctx.lineTo(points2[i2][0], points2[i2][1]);
      }
    }
    closePath && ctx.closePath();
  }
}
var PolygonShape = function() {
  function PolygonShape2() {
    this.points = null;
    this.smooth = 0;
    this.smoothConstraint = null;
  }
  return PolygonShape2;
}();
var Polygon = function(_super) {
  __extends(Polygon2, _super);
  function Polygon2(opts) {
    return _super.call(this, opts) || this;
  }
  Polygon2.prototype.getDefaultShape = function() {
    return new PolygonShape();
  };
  Polygon2.prototype.buildPath = function(ctx, shape) {
    buildPath(ctx, shape, true);
  };
  return Polygon2;
}(Path$1);
Polygon.prototype.type = "polygon";
var Polygon$1 = Polygon;
var PolylineShape = function() {
  function PolylineShape2() {
    this.points = null;
    this.percent = 1;
    this.smooth = 0;
    this.smoothConstraint = null;
  }
  return PolylineShape2;
}();
var Polyline = function(_super) {
  __extends(Polyline2, _super);
  function Polyline2(opts) {
    return _super.call(this, opts) || this;
  }
  Polyline2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  Polyline2.prototype.getDefaultShape = function() {
    return new PolylineShape();
  };
  Polyline2.prototype.buildPath = function(ctx, shape) {
    buildPath(ctx, shape, false);
  };
  return Polyline2;
}(Path$1);
Polyline.prototype.type = "polyline";
var Polyline$1 = Polyline;
var subPixelOptimizeOutputShape = {};
var LineShape = function() {
  function LineShape2() {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.percent = 1;
  }
  return LineShape2;
}();
var Line = function(_super) {
  __extends(Line2, _super);
  function Line2(opts) {
    return _super.call(this, opts) || this;
  }
  Line2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  Line2.prototype.getDefaultShape = function() {
    return new LineShape();
  };
  Line2.prototype.buildPath = function(ctx, shape) {
    var x1;
    var y1;
    var x2;
    var y2;
    if (this.subPixelOptimize) {
      var optimizedShape = subPixelOptimizeLine(subPixelOptimizeOutputShape, shape, this.style);
      x1 = optimizedShape.x1;
      y1 = optimizedShape.y1;
      x2 = optimizedShape.x2;
      y2 = optimizedShape.y2;
    } else {
      x1 = shape.x1;
      y1 = shape.y1;
      x2 = shape.x2;
      y2 = shape.y2;
    }
    var percent = shape.percent;
    if (percent === 0) {
      return;
    }
    ctx.moveTo(x1, y1);
    if (percent < 1) {
      x2 = x1 * (1 - percent) + x2 * percent;
      y2 = y1 * (1 - percent) + y2 * percent;
    }
    ctx.lineTo(x2, y2);
  };
  Line2.prototype.pointAt = function(p2) {
    var shape = this.shape;
    return [
      shape.x1 * (1 - p2) + shape.x2 * p2,
      shape.y1 * (1 - p2) + shape.y2 * p2
    ];
  };
  return Line2;
}(Path$1);
Line.prototype.type = "line";
var Line$1 = Line;
var out = [];
var BezierCurveShape = function() {
  function BezierCurveShape2() {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.cpx1 = 0;
    this.cpy1 = 0;
    this.percent = 1;
  }
  return BezierCurveShape2;
}();
function someVectorAt(shape, t2, isTangent) {
  var cpx2 = shape.cpx2;
  var cpy2 = shape.cpy2;
  if (cpx2 != null || cpy2 != null) {
    return [
      (isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t2),
      (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t2)
    ];
  } else {
    return [
      (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t2),
      (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t2)
    ];
  }
}
var BezierCurve = function(_super) {
  __extends(BezierCurve2, _super);
  function BezierCurve2(opts) {
    return _super.call(this, opts) || this;
  }
  BezierCurve2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  BezierCurve2.prototype.getDefaultShape = function() {
    return new BezierCurveShape();
  };
  BezierCurve2.prototype.buildPath = function(ctx, shape) {
    var x1 = shape.x1;
    var y1 = shape.y1;
    var x2 = shape.x2;
    var y2 = shape.y2;
    var cpx1 = shape.cpx1;
    var cpy1 = shape.cpy1;
    var cpx2 = shape.cpx2;
    var cpy2 = shape.cpy2;
    var percent = shape.percent;
    if (percent === 0) {
      return;
    }
    ctx.moveTo(x1, y1);
    if (cpx2 == null || cpy2 == null) {
      if (percent < 1) {
        quadraticSubdivide(x1, cpx1, x2, percent, out);
        cpx1 = out[1];
        x2 = out[2];
        quadraticSubdivide(y1, cpy1, y2, percent, out);
        cpy1 = out[1];
        y2 = out[2];
      }
      ctx.quadraticCurveTo(cpx1, cpy1, x2, y2);
    } else {
      if (percent < 1) {
        cubicSubdivide(x1, cpx1, cpx2, x2, percent, out);
        cpx1 = out[1];
        cpx2 = out[2];
        x2 = out[3];
        cubicSubdivide(y1, cpy1, cpy2, y2, percent, out);
        cpy1 = out[1];
        cpy2 = out[2];
        y2 = out[3];
      }
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }
  };
  BezierCurve2.prototype.pointAt = function(t2) {
    return someVectorAt(this.shape, t2, false);
  };
  BezierCurve2.prototype.tangentAt = function(t2) {
    var p2 = someVectorAt(this.shape, t2, true);
    return normalize(p2, p2);
  };
  return BezierCurve2;
}(Path$1);
BezierCurve.prototype.type = "bezier-curve";
var BezierCurve$1 = BezierCurve;
var ArcShape = function() {
  function ArcShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.clockwise = true;
  }
  return ArcShape2;
}();
var Arc = function(_super) {
  __extends(Arc2, _super);
  function Arc2(opts) {
    return _super.call(this, opts) || this;
  }
  Arc2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  Arc2.prototype.getDefaultShape = function() {
    return new ArcShape();
  };
  Arc2.prototype.buildPath = function(ctx, shape) {
    var x2 = shape.cx;
    var y2 = shape.cy;
    var r2 = Math.max(shape.r, 0);
    var startAngle = shape.startAngle;
    var endAngle = shape.endAngle;
    var clockwise = shape.clockwise;
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    ctx.moveTo(unitX * r2 + x2, unitY * r2 + y2);
    ctx.arc(x2, y2, r2, startAngle, endAngle, !clockwise);
  };
  return Arc2;
}(Path$1);
Arc.prototype.type = "arc";
var Arc$1 = Arc;
var CompoundPath = function(_super) {
  __extends(CompoundPath2, _super);
  function CompoundPath2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = "compound";
    return _this;
  }
  CompoundPath2.prototype._updatePathDirty = function() {
    var paths = this.shape.paths;
    var dirtyPath = this.shapeChanged();
    for (var i2 = 0; i2 < paths.length; i2++) {
      dirtyPath = dirtyPath || paths[i2].shapeChanged();
    }
    if (dirtyPath) {
      this.dirtyShape();
    }
  };
  CompoundPath2.prototype.beforeBrush = function() {
    this._updatePathDirty();
    var paths = this.shape.paths || [];
    var scale2 = this.getGlobalScale();
    for (var i2 = 0; i2 < paths.length; i2++) {
      if (!paths[i2].path) {
        paths[i2].createPathProxy();
      }
      paths[i2].path.setScale(scale2[0], scale2[1], paths[i2].segmentIgnoreThreshold);
    }
  };
  CompoundPath2.prototype.buildPath = function(ctx, shape) {
    var paths = shape.paths || [];
    for (var i2 = 0; i2 < paths.length; i2++) {
      paths[i2].buildPath(ctx, paths[i2].shape, true);
    }
  };
  CompoundPath2.prototype.afterBrush = function() {
    var paths = this.shape.paths || [];
    for (var i2 = 0; i2 < paths.length; i2++) {
      paths[i2].pathUpdated();
    }
  };
  CompoundPath2.prototype.getBoundingRect = function() {
    this._updatePathDirty.call(this);
    return Path$1.prototype.getBoundingRect.call(this);
  };
  return CompoundPath2;
}(Path$1);
var CompoundPath$1 = CompoundPath;
var Gradient = function() {
  function Gradient2(colorStops) {
    this.colorStops = colorStops || [];
  }
  Gradient2.prototype.addColorStop = function(offset, color) {
    this.colorStops.push({
      offset,
      color
    });
  };
  return Gradient2;
}();
var Gradient$1 = Gradient;
var LinearGradient = function(_super) {
  __extends(LinearGradient2, _super);
  function LinearGradient2(x2, y2, x22, y22, colorStops, globalCoord) {
    var _this = _super.call(this, colorStops) || this;
    _this.x = x2 == null ? 0 : x2;
    _this.y = y2 == null ? 0 : y2;
    _this.x2 = x22 == null ? 1 : x22;
    _this.y2 = y22 == null ? 0 : y22;
    _this.type = "linear";
    _this.global = globalCoord || false;
    return _this;
  }
  return LinearGradient2;
}(Gradient$1);
var LinearGradient$1 = LinearGradient;
var RadialGradient = function(_super) {
  __extends(RadialGradient2, _super);
  function RadialGradient2(x2, y2, r2, colorStops, globalCoord) {
    var _this = _super.call(this, colorStops) || this;
    _this.x = x2 == null ? 0.5 : x2;
    _this.y = y2 == null ? 0.5 : y2;
    _this.r = r2 == null ? 0.5 : r2;
    _this.type = "radial";
    _this.global = globalCoord || false;
    return _this;
  }
  return RadialGradient2;
}(Gradient$1);
var RadialGradient$1 = RadialGradient;
var extent = [0, 0];
var extent2 = [0, 0];
var minTv = new Point$1();
var maxTv = new Point$1();
var OrientedBoundingRect = function() {
  function OrientedBoundingRect2(rect, transform) {
    this._corners = [];
    this._axes = [];
    this._origin = [0, 0];
    for (var i2 = 0; i2 < 4; i2++) {
      this._corners[i2] = new Point$1();
    }
    for (var i2 = 0; i2 < 2; i2++) {
      this._axes[i2] = new Point$1();
    }
    if (rect) {
      this.fromBoundingRect(rect, transform);
    }
  }
  OrientedBoundingRect2.prototype.fromBoundingRect = function(rect, transform) {
    var corners = this._corners;
    var axes = this._axes;
    var x2 = rect.x;
    var y2 = rect.y;
    var x22 = x2 + rect.width;
    var y22 = y2 + rect.height;
    corners[0].set(x2, y2);
    corners[1].set(x22, y2);
    corners[2].set(x22, y22);
    corners[3].set(x2, y22);
    if (transform) {
      for (var i2 = 0; i2 < 4; i2++) {
        corners[i2].transform(transform);
      }
    }
    Point$1.sub(axes[0], corners[1], corners[0]);
    Point$1.sub(axes[1], corners[3], corners[0]);
    axes[0].normalize();
    axes[1].normalize();
    for (var i2 = 0; i2 < 2; i2++) {
      this._origin[i2] = axes[i2].dot(corners[0]);
    }
  };
  OrientedBoundingRect2.prototype.intersect = function(other, mtv) {
    var overlapped = true;
    var noMtv = !mtv;
    minTv.set(Infinity, Infinity);
    maxTv.set(0, 0);
    if (!this._intersectCheckOneSide(this, other, minTv, maxTv, noMtv, 1)) {
      overlapped = false;
      if (noMtv) {
        return overlapped;
      }
    }
    if (!this._intersectCheckOneSide(other, this, minTv, maxTv, noMtv, -1)) {
      overlapped = false;
      if (noMtv) {
        return overlapped;
      }
    }
    if (!noMtv) {
      Point$1.copy(mtv, overlapped ? minTv : maxTv);
    }
    return overlapped;
  };
  OrientedBoundingRect2.prototype._intersectCheckOneSide = function(self2, other, minTv2, maxTv2, noMtv, inverse) {
    var overlapped = true;
    for (var i2 = 0; i2 < 2; i2++) {
      var axis = this._axes[i2];
      this._getProjMinMaxOnAxis(i2, self2._corners, extent);
      this._getProjMinMaxOnAxis(i2, other._corners, extent2);
      if (extent[1] < extent2[0] || extent[0] > extent2[1]) {
        overlapped = false;
        if (noMtv) {
          return overlapped;
        }
        var dist0 = Math.abs(extent2[0] - extent[1]);
        var dist1 = Math.abs(extent[0] - extent2[1]);
        if (Math.min(dist0, dist1) > maxTv2.len()) {
          if (dist0 < dist1) {
            Point$1.scale(maxTv2, axis, -dist0 * inverse);
          } else {
            Point$1.scale(maxTv2, axis, dist1 * inverse);
          }
        }
      } else if (minTv2) {
        var dist0 = Math.abs(extent2[0] - extent[1]);
        var dist1 = Math.abs(extent[0] - extent2[1]);
        if (Math.min(dist0, dist1) < minTv2.len()) {
          if (dist0 < dist1) {
            Point$1.scale(minTv2, axis, dist0 * inverse);
          } else {
            Point$1.scale(minTv2, axis, -dist1 * inverse);
          }
        }
      }
    }
    return overlapped;
  };
  OrientedBoundingRect2.prototype._getProjMinMaxOnAxis = function(dim, corners, out2) {
    var axis = this._axes[dim];
    var origin = this._origin;
    var proj = corners[0].dot(axis) + origin[dim];
    var min3 = proj;
    var max3 = proj;
    for (var i2 = 1; i2 < corners.length; i2++) {
      var proj_1 = corners[i2].dot(axis) + origin[dim];
      min3 = Math.min(proj_1, min3);
      max3 = Math.max(proj_1, max3);
    }
    out2[0] = min3;
    out2[1] = max3;
  };
  return OrientedBoundingRect2;
}();
var OrientedBoundingRect$1 = OrientedBoundingRect;
var m = [];
var IncrementalDisplayable = function(_super) {
  __extends(IncrementalDisplayable2, _super);
  function IncrementalDisplayable2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.notClear = true;
    _this.incremental = true;
    _this._displayables = [];
    _this._temporaryDisplayables = [];
    _this._cursor = 0;
    return _this;
  }
  IncrementalDisplayable2.prototype.traverse = function(cb, context) {
    cb.call(context, this);
  };
  IncrementalDisplayable2.prototype.useStyle = function() {
    this.style = {};
  };
  IncrementalDisplayable2.prototype.getCursor = function() {
    return this._cursor;
  };
  IncrementalDisplayable2.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  };
  IncrementalDisplayable2.prototype.clearDisplaybles = function() {
    this._displayables = [];
    this._temporaryDisplayables = [];
    this._cursor = 0;
    this.markRedraw();
    this.notClear = false;
  };
  IncrementalDisplayable2.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  };
  IncrementalDisplayable2.prototype.addDisplayable = function(displayable, notPersistent) {
    if (notPersistent) {
      this._temporaryDisplayables.push(displayable);
    } else {
      this._displayables.push(displayable);
    }
    this.markRedraw();
  };
  IncrementalDisplayable2.prototype.addDisplayables = function(displayables, notPersistent) {
    notPersistent = notPersistent || false;
    for (var i2 = 0; i2 < displayables.length; i2++) {
      this.addDisplayable(displayables[i2], notPersistent);
    }
  };
  IncrementalDisplayable2.prototype.getDisplayables = function() {
    return this._displayables;
  };
  IncrementalDisplayable2.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  };
  IncrementalDisplayable2.prototype.eachPendingDisplayable = function(cb) {
    for (var i2 = this._cursor; i2 < this._displayables.length; i2++) {
      cb && cb(this._displayables[i2]);
    }
    for (var i2 = 0; i2 < this._temporaryDisplayables.length; i2++) {
      cb && cb(this._temporaryDisplayables[i2]);
    }
  };
  IncrementalDisplayable2.prototype.update = function() {
    this.updateTransform();
    for (var i2 = this._cursor; i2 < this._displayables.length; i2++) {
      var displayable = this._displayables[i2];
      displayable.parent = this;
      displayable.update();
      displayable.parent = null;
    }
    for (var i2 = 0; i2 < this._temporaryDisplayables.length; i2++) {
      var displayable = this._temporaryDisplayables[i2];
      displayable.parent = this;
      displayable.update();
      displayable.parent = null;
    }
  };
  IncrementalDisplayable2.prototype.getBoundingRect = function() {
    if (!this._rect) {
      var rect = new BoundingRect$1(Infinity, Infinity, -Infinity, -Infinity);
      for (var i2 = 0; i2 < this._displayables.length; i2++) {
        var displayable = this._displayables[i2];
        var childRect = displayable.getBoundingRect().clone();
        if (displayable.needLocalTransform()) {
          childRect.applyTransform(displayable.getLocalTransform(m));
        }
        rect.union(childRect);
      }
      this._rect = rect;
    }
    return this._rect;
  };
  IncrementalDisplayable2.prototype.contain = function(x2, y2) {
    var localPos = this.transformCoordToLocal(x2, y2);
    var rect = this.getBoundingRect();
    if (rect.contain(localPos[0], localPos[1])) {
      for (var i2 = 0; i2 < this._displayables.length; i2++) {
        var displayable = this._displayables[i2];
        if (displayable.contain(x2, y2)) {
          return true;
        }
      }
    }
    return false;
  };
  return IncrementalDisplayable2;
}(Displayable$1);
var IncrementalDisplayable$1 = IncrementalDisplayable;
var wmUniqueIndex = Math.round(Math.random() * 9);
var supportDefineProperty = typeof Object.defineProperty === "function";
var WeakMap = function() {
  function WeakMap2() {
    this._id = "__ec_inner_" + wmUniqueIndex++;
  }
  WeakMap2.prototype.get = function(key) {
    return this._guard(key)[this._id];
  };
  WeakMap2.prototype.set = function(key, value) {
    var target = this._guard(key);
    if (supportDefineProperty) {
      Object.defineProperty(target, this._id, {
        value,
        enumerable: false,
        configurable: true
      });
    } else {
      target[this._id] = value;
    }
    return this;
  };
  WeakMap2.prototype["delete"] = function(key) {
    if (this.has(key)) {
      delete this._guard(key)[this._id];
      return true;
    }
    return false;
  };
  WeakMap2.prototype.has = function(key) {
    return !!this._guard(key)[this._id];
  };
  WeakMap2.prototype._guard = function(key) {
    if (key !== Object(key)) {
      throw TypeError("Value of WeakMap is not a non-null object.");
    }
    return key;
  };
  return WeakMap2;
}();
var WeakMap$1 = WeakMap;
function createLinearGradient(ctx, obj, rect) {
  var x2 = obj.x == null ? 0 : obj.x;
  var x22 = obj.x2 == null ? 1 : obj.x2;
  var y2 = obj.y == null ? 0 : obj.y;
  var y22 = obj.y2 == null ? 0 : obj.y2;
  if (!obj.global) {
    x2 = x2 * rect.width + rect.x;
    x22 = x22 * rect.width + rect.x;
    y2 = y2 * rect.height + rect.y;
    y22 = y22 * rect.height + rect.y;
  }
  x2 = isNaN(x2) ? 0 : x2;
  x22 = isNaN(x22) ? 1 : x22;
  y2 = isNaN(y2) ? 0 : y2;
  y22 = isNaN(y22) ? 0 : y22;
  var canvasGradient = ctx.createLinearGradient(x2, y2, x22, y22);
  return canvasGradient;
}
function createRadialGradient(ctx, obj, rect) {
  var width = rect.width;
  var height = rect.height;
  var min3 = Math.min(width, height);
  var x2 = obj.x == null ? 0.5 : obj.x;
  var y2 = obj.y == null ? 0.5 : obj.y;
  var r2 = obj.r == null ? 0.5 : obj.r;
  if (!obj.global) {
    x2 = x2 * width + rect.x;
    y2 = y2 * height + rect.y;
    r2 = r2 * min3;
  }
  var canvasGradient = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
  return canvasGradient;
}
function getCanvasGradient(ctx, obj, rect) {
  var canvasGradient = obj.type === "radial" ? createRadialGradient(ctx, obj, rect) : createLinearGradient(ctx, obj, rect);
  var colorStops = obj.colorStops;
  for (var i2 = 0; i2 < colorStops.length; i2++) {
    canvasGradient.addColorStop(colorStops[i2].offset, colorStops[i2].color);
  }
  return canvasGradient;
}
function isClipPathChanged(clipPaths, prevClipPaths) {
  if (clipPaths === prevClipPaths || !clipPaths && !prevClipPaths) {
    return false;
  }
  if (!clipPaths || !prevClipPaths || clipPaths.length !== prevClipPaths.length) {
    return true;
  }
  for (var i2 = 0; i2 < clipPaths.length; i2++) {
    if (clipPaths[i2] !== prevClipPaths[i2]) {
      return true;
    }
  }
  return false;
}
function parseInt10(val) {
  return parseInt(val, 10);
}
function getSize(root2, whIdx, opts) {
  var wh = ["width", "height"][whIdx];
  var cwh = ["clientWidth", "clientHeight"][whIdx];
  var plt = ["paddingLeft", "paddingTop"][whIdx];
  var prb = ["paddingRight", "paddingBottom"][whIdx];
  if (opts[wh] != null && opts[wh] !== "auto") {
    return parseFloat(opts[wh]);
  }
  var stl = document.defaultView.getComputedStyle(root2);
  return (root2[cwh] || parseInt10(stl[wh]) || parseInt10(root2.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0;
}
function normalizeLineDash(lineType, lineWidth) {
  if (!lineType || lineType === "solid" || !(lineWidth > 0)) {
    return null;
  }
  return lineType === "dashed" ? [4 * lineWidth, 2 * lineWidth] : lineType === "dotted" ? [lineWidth] : isNumber(lineType) ? [lineType] : isArray(lineType) ? lineType : null;
}
function getLineDash(el) {
  var style = el.style;
  var lineDash = style.lineDash && style.lineWidth > 0 && normalizeLineDash(style.lineDash, style.lineWidth);
  var lineDashOffset = style.lineDashOffset;
  if (lineDash) {
    var lineScale_1 = style.strokeNoScale && el.getLineScale ? el.getLineScale() : 1;
    if (lineScale_1 && lineScale_1 !== 1) {
      lineDash = map(lineDash, function(rawVal) {
        return rawVal / lineScale_1;
      });
      lineDashOffset /= lineScale_1;
    }
  }
  return [lineDash, lineDashOffset];
}
var pathProxyForDraw = new PathProxy$1(true);
function styleHasStroke(style) {
  var stroke = style.stroke;
  return !(stroke == null || stroke === "none" || !(style.lineWidth > 0));
}
function isValidStrokeFillStyle(strokeOrFill) {
  return typeof strokeOrFill === "string" && strokeOrFill !== "none";
}
function styleHasFill(style) {
  var fill = style.fill;
  return fill != null && fill !== "none";
}
function doFillPath(ctx, style) {
  if (style.fillOpacity != null && style.fillOpacity !== 1) {
    var originalGlobalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = style.fillOpacity * style.opacity;
    ctx.fill();
    ctx.globalAlpha = originalGlobalAlpha;
  } else {
    ctx.fill();
  }
}
function doStrokePath(ctx, style) {
  if (style.strokeOpacity != null && style.strokeOpacity !== 1) {
    var originalGlobalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = style.strokeOpacity * style.opacity;
    ctx.stroke();
    ctx.globalAlpha = originalGlobalAlpha;
  } else {
    ctx.stroke();
  }
}
function createCanvasPattern(ctx, pattern4, el) {
  var image = createOrUpdateImage(pattern4.image, pattern4.__image, el);
  if (isImageReady(image)) {
    var canvasPattern = ctx.createPattern(image, pattern4.repeat || "repeat");
    if (typeof DOMMatrix === "function" && canvasPattern && canvasPattern.setTransform) {
      var matrix = new DOMMatrix();
      matrix.translateSelf(pattern4.x || 0, pattern4.y || 0);
      matrix.rotateSelf(0, 0, (pattern4.rotation || 0) * RADIAN_TO_DEGREE);
      matrix.scaleSelf(pattern4.scaleX || 1, pattern4.scaleY || 1);
      canvasPattern.setTransform(matrix);
    }
    return canvasPattern;
  }
}
function brushPath(ctx, el, style, inBatch) {
  var _a;
  var hasStroke = styleHasStroke(style);
  var hasFill = styleHasFill(style);
  var strokePercent = style.strokePercent;
  var strokePart = strokePercent < 1;
  var firstDraw = !el.path;
  if ((!el.silent || strokePart) && firstDraw) {
    el.createPathProxy();
  }
  var path = el.path || pathProxyForDraw;
  var dirtyFlag = el.__dirty;
  if (!inBatch) {
    var fill = style.fill;
    var stroke = style.stroke;
    var hasFillGradient = hasFill && !!fill.colorStops;
    var hasStrokeGradient = hasStroke && !!stroke.colorStops;
    var hasFillPattern = hasFill && !!fill.image;
    var hasStrokePattern = hasStroke && !!stroke.image;
    var fillGradient = void 0;
    var strokeGradient = void 0;
    var fillPattern = void 0;
    var strokePattern = void 0;
    var rect = void 0;
    if (hasFillGradient || hasStrokeGradient) {
      rect = el.getBoundingRect();
    }
    if (hasFillGradient) {
      fillGradient = dirtyFlag ? getCanvasGradient(ctx, fill, rect) : el.__canvasFillGradient;
      el.__canvasFillGradient = fillGradient;
    }
    if (hasStrokeGradient) {
      strokeGradient = dirtyFlag ? getCanvasGradient(ctx, stroke, rect) : el.__canvasStrokeGradient;
      el.__canvasStrokeGradient = strokeGradient;
    }
    if (hasFillPattern) {
      fillPattern = dirtyFlag || !el.__canvasFillPattern ? createCanvasPattern(ctx, fill, el) : el.__canvasFillPattern;
      el.__canvasFillPattern = fillPattern;
    }
    if (hasStrokePattern) {
      strokePattern = dirtyFlag || !el.__canvasStrokePattern ? createCanvasPattern(ctx, stroke, el) : el.__canvasStrokePattern;
      el.__canvasStrokePattern = fillPattern;
    }
    if (hasFillGradient) {
      ctx.fillStyle = fillGradient;
    } else if (hasFillPattern) {
      if (fillPattern) {
        ctx.fillStyle = fillPattern;
      } else {
        hasFill = false;
      }
    }
    if (hasStrokeGradient) {
      ctx.strokeStyle = strokeGradient;
    } else if (hasStrokePattern) {
      if (strokePattern) {
        ctx.strokeStyle = strokePattern;
      } else {
        hasStroke = false;
      }
    }
  }
  var scale2 = el.getGlobalScale();
  path.setScale(scale2[0], scale2[1], el.segmentIgnoreThreshold);
  var lineDash;
  var lineDashOffset;
  if (ctx.setLineDash && style.lineDash) {
    _a = getLineDash(el), lineDash = _a[0], lineDashOffset = _a[1];
  }
  var needsRebuild = true;
  if (firstDraw || dirtyFlag & SHAPE_CHANGED_BIT) {
    path.setDPR(ctx.dpr);
    if (strokePart) {
      path.setContext(null);
    } else {
      path.setContext(ctx);
      needsRebuild = false;
    }
    path.reset();
    el.buildPath(path, el.shape, inBatch);
    path.toStatic();
    el.pathUpdated();
  }
  if (needsRebuild) {
    path.rebuildPath(ctx, strokePart ? strokePercent : 1);
  }
  if (lineDash) {
    ctx.setLineDash(lineDash);
    ctx.lineDashOffset = lineDashOffset;
  }
  if (!inBatch) {
    if (style.strokeFirst) {
      if (hasStroke) {
        doStrokePath(ctx, style);
      }
      if (hasFill) {
        doFillPath(ctx, style);
      }
    } else {
      if (hasFill) {
        doFillPath(ctx, style);
      }
      if (hasStroke) {
        doStrokePath(ctx, style);
      }
    }
  }
  if (lineDash) {
    ctx.setLineDash([]);
  }
}
function brushImage(ctx, el, style) {
  var image = el.__image = createOrUpdateImage(style.image, el.__image, el, el.onload);
  if (!image || !isImageReady(image)) {
    return;
  }
  var x2 = style.x || 0;
  var y2 = style.y || 0;
  var width = el.getWidth();
  var height = el.getHeight();
  var aspect = image.width / image.height;
  if (width == null && height != null) {
    width = height * aspect;
  } else if (height == null && width != null) {
    height = width / aspect;
  } else if (width == null && height == null) {
    width = image.width;
    height = image.height;
  }
  if (style.sWidth && style.sHeight) {
    var sx = style.sx || 0;
    var sy = style.sy || 0;
    ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x2, y2, width, height);
  } else if (style.sx && style.sy) {
    var sx = style.sx;
    var sy = style.sy;
    var sWidth = width - sx;
    var sHeight = height - sy;
    ctx.drawImage(image, sx, sy, sWidth, sHeight, x2, y2, width, height);
  } else {
    ctx.drawImage(image, x2, y2, width, height);
  }
}
function brushText(ctx, el, style) {
  var _a;
  var text = style.text;
  text != null && (text += "");
  if (text) {
    ctx.font = style.font || DEFAULT_FONT;
    ctx.textAlign = style.textAlign;
    ctx.textBaseline = style.textBaseline;
    var lineDash = void 0;
    var lineDashOffset = void 0;
    if (ctx.setLineDash && style.lineDash) {
      _a = getLineDash(el), lineDash = _a[0], lineDashOffset = _a[1];
    }
    if (lineDash) {
      ctx.setLineDash(lineDash);
      ctx.lineDashOffset = lineDashOffset;
    }
    if (style.strokeFirst) {
      if (styleHasStroke(style)) {
        ctx.strokeText(text, style.x, style.y);
      }
      if (styleHasFill(style)) {
        ctx.fillText(text, style.x, style.y);
      }
    } else {
      if (styleHasFill(style)) {
        ctx.fillText(text, style.x, style.y);
      }
      if (styleHasStroke(style)) {
        ctx.strokeText(text, style.x, style.y);
      }
    }
    if (lineDash) {
      ctx.setLineDash([]);
    }
  }
}
var SHADOW_NUMBER_PROPS = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"];
var STROKE_PROPS = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function bindCommonProps(ctx, style, prevStyle, forceSetAll, scope) {
  var styleChanged = false;
  if (!forceSetAll) {
    prevStyle = prevStyle || {};
    if (style === prevStyle) {
      return false;
    }
  }
  if (forceSetAll || style.opacity !== prevStyle.opacity) {
    flushPathDrawn(ctx, scope);
    styleChanged = true;
    var opacity = Math.max(Math.min(style.opacity, 1), 0);
    ctx.globalAlpha = isNaN(opacity) ? DEFAULT_COMMON_STYLE.opacity : opacity;
  }
  if (forceSetAll || style.blend !== prevStyle.blend) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    ctx.globalCompositeOperation = style.blend || DEFAULT_COMMON_STYLE.blend;
  }
  for (var i2 = 0; i2 < SHADOW_NUMBER_PROPS.length; i2++) {
    var propName = SHADOW_NUMBER_PROPS[i2];
    if (forceSetAll || style[propName] !== prevStyle[propName]) {
      if (!styleChanged) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
      }
      ctx[propName] = ctx.dpr * (style[propName] || 0);
    }
  }
  if (forceSetAll || style.shadowColor !== prevStyle.shadowColor) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    ctx.shadowColor = style.shadowColor || DEFAULT_COMMON_STYLE.shadowColor;
  }
  return styleChanged;
}
function bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetAll, scope) {
  var style = getStyle(el, scope.inHover);
  var prevStyle = forceSetAll ? null : prevEl && getStyle(prevEl, scope.inHover) || {};
  if (style === prevStyle) {
    return false;
  }
  var styleChanged = bindCommonProps(ctx, style, prevStyle, forceSetAll, scope);
  if (forceSetAll || style.fill !== prevStyle.fill) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    isValidStrokeFillStyle(style.fill) && (ctx.fillStyle = style.fill);
  }
  if (forceSetAll || style.stroke !== prevStyle.stroke) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    isValidStrokeFillStyle(style.stroke) && (ctx.strokeStyle = style.stroke);
  }
  if (forceSetAll || style.opacity !== prevStyle.opacity) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
  }
  if (el.hasStroke()) {
    var lineWidth = style.lineWidth;
    var newLineWidth = lineWidth / (style.strokeNoScale && el.getLineScale ? el.getLineScale() : 1);
    if (ctx.lineWidth !== newLineWidth) {
      if (!styleChanged) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
      }
      ctx.lineWidth = newLineWidth;
    }
  }
  for (var i2 = 0; i2 < STROKE_PROPS.length; i2++) {
    var prop = STROKE_PROPS[i2];
    var propName = prop[0];
    if (forceSetAll || style[propName] !== prevStyle[propName]) {
      if (!styleChanged) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
      }
      ctx[propName] = style[propName] || prop[1];
    }
  }
  return styleChanged;
}
function bindImageStyle(ctx, el, prevEl, forceSetAll, scope) {
  return bindCommonProps(ctx, getStyle(el, scope.inHover), prevEl && getStyle(prevEl, scope.inHover), forceSetAll, scope);
}
function setContextTransform(ctx, el) {
  var m2 = el.transform;
  var dpr2 = ctx.dpr || 1;
  if (m2) {
    ctx.setTransform(dpr2 * m2[0], dpr2 * m2[1], dpr2 * m2[2], dpr2 * m2[3], dpr2 * m2[4], dpr2 * m2[5]);
  } else {
    ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);
  }
}
function updateClipStatus(clipPaths, ctx, scope) {
  var allClipped = false;
  for (var i2 = 0; i2 < clipPaths.length; i2++) {
    var clipPath = clipPaths[i2];
    allClipped = allClipped || clipPath.isZeroArea();
    setContextTransform(ctx, clipPath);
    ctx.beginPath();
    clipPath.buildPath(ctx, clipPath.shape);
    ctx.clip();
  }
  scope.allClipped = allClipped;
}
function isTransformChanged(m0, m1) {
  if (m0 && m1) {
    return m0[0] !== m1[0] || m0[1] !== m1[1] || m0[2] !== m1[2] || m0[3] !== m1[3] || m0[4] !== m1[4] || m0[5] !== m1[5];
  } else if (!m0 && !m1) {
    return false;
  }
  return true;
}
var DRAW_TYPE_PATH = 1;
var DRAW_TYPE_IMAGE = 2;
var DRAW_TYPE_TEXT = 3;
var DRAW_TYPE_INCREMENTAL = 4;
function canPathBatch(style) {
  var hasFill = styleHasFill(style);
  var hasStroke = styleHasStroke(style);
  return !(style.lineDash || !(+hasFill ^ +hasStroke) || hasFill && typeof style.fill !== "string" || hasStroke && typeof style.stroke !== "string" || style.strokePercent < 1 || style.strokeOpacity < 1 || style.fillOpacity < 1);
}
function flushPathDrawn(ctx, scope) {
  scope.batchFill && ctx.fill();
  scope.batchStroke && ctx.stroke();
  scope.batchFill = "";
  scope.batchStroke = "";
}
function getStyle(el, inHover) {
  return inHover ? el.__hoverStyle || el.style : el.style;
}
function brushSingle(ctx, el) {
  brush(ctx, el, { inHover: false, viewWidth: 0, viewHeight: 0 }, true);
}
function brush(ctx, el, scope, isLast) {
  var m2 = el.transform;
  if (!el.shouldBePainted(scope.viewWidth, scope.viewHeight, false, false)) {
    el.__dirty &= ~REDRAW_BIT;
    el.__isRendered = false;
    return;
  }
  var clipPaths = el.__clipPaths;
  var prevElClipPaths = scope.prevElClipPaths;
  var forceSetTransform = false;
  var forceSetStyle = false;
  if (!prevElClipPaths || isClipPathChanged(clipPaths, prevElClipPaths)) {
    if (prevElClipPaths && prevElClipPaths.length) {
      flushPathDrawn(ctx, scope);
      ctx.restore();
      forceSetStyle = forceSetTransform = true;
      scope.prevElClipPaths = null;
      scope.allClipped = false;
      scope.prevEl = null;
    }
    if (clipPaths && clipPaths.length) {
      flushPathDrawn(ctx, scope);
      ctx.save();
      updateClipStatus(clipPaths, ctx, scope);
      forceSetTransform = true;
    }
    scope.prevElClipPaths = clipPaths;
  }
  if (scope.allClipped) {
    el.__isRendered = false;
    return;
  }
  el.beforeBrush && el.beforeBrush();
  el.innerBeforeBrush();
  var prevEl = scope.prevEl;
  if (!prevEl) {
    forceSetStyle = forceSetTransform = true;
  }
  var canBatchPath = el instanceof Path$1 && el.autoBatch && canPathBatch(el.style);
  if (forceSetTransform || isTransformChanged(m2, prevEl.transform)) {
    flushPathDrawn(ctx, scope);
    setContextTransform(ctx, el);
  } else if (!canBatchPath) {
    flushPathDrawn(ctx, scope);
  }
  var style = getStyle(el, scope.inHover);
  if (el instanceof Path$1) {
    if (scope.lastDrawType !== DRAW_TYPE_PATH) {
      forceSetStyle = true;
      scope.lastDrawType = DRAW_TYPE_PATH;
    }
    bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
    if (!canBatchPath || !scope.batchFill && !scope.batchStroke) {
      ctx.beginPath();
    }
    brushPath(ctx, el, style, canBatchPath);
    if (canBatchPath) {
      scope.batchFill = style.fill || "";
      scope.batchStroke = style.stroke || "";
    }
  } else {
    if (el instanceof TSpan$1) {
      if (scope.lastDrawType !== DRAW_TYPE_TEXT) {
        forceSetStyle = true;
        scope.lastDrawType = DRAW_TYPE_TEXT;
      }
      bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
      brushText(ctx, el, style);
    } else if (el instanceof ZRImage$1) {
      if (scope.lastDrawType !== DRAW_TYPE_IMAGE) {
        forceSetStyle = true;
        scope.lastDrawType = DRAW_TYPE_IMAGE;
      }
      bindImageStyle(ctx, el, prevEl, forceSetStyle, scope);
      brushImage(ctx, el, style);
    } else if (el.getTemporalDisplayables) {
      if (scope.lastDrawType !== DRAW_TYPE_INCREMENTAL) {
        forceSetStyle = true;
        scope.lastDrawType = DRAW_TYPE_INCREMENTAL;
      }
      brushIncremental(ctx, el, scope);
    }
  }
  if (canBatchPath && isLast) {
    flushPathDrawn(ctx, scope);
  }
  el.innerAfterBrush();
  el.afterBrush && el.afterBrush();
  scope.prevEl = el;
  el.__dirty = 0;
  el.__isRendered = true;
}
function brushIncremental(ctx, el, scope) {
  var displayables = el.getDisplayables();
  var temporalDisplayables = el.getTemporalDisplayables();
  ctx.save();
  var innerScope = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: false,
    viewWidth: scope.viewWidth,
    viewHeight: scope.viewHeight,
    inHover: scope.inHover
  };
  var i2;
  var len2;
  for (i2 = el.getCursor(), len2 = displayables.length; i2 < len2; i2++) {
    var displayable = displayables[i2];
    displayable.beforeBrush && displayable.beforeBrush();
    displayable.innerBeforeBrush();
    brush(ctx, displayable, innerScope, i2 === len2 - 1);
    displayable.innerAfterBrush();
    displayable.afterBrush && displayable.afterBrush();
    innerScope.prevEl = displayable;
  }
  for (var i_1 = 0, len_1 = temporalDisplayables.length; i_1 < len_1; i_1++) {
    var displayable = temporalDisplayables[i_1];
    displayable.beforeBrush && displayable.beforeBrush();
    displayable.innerBeforeBrush();
    brush(ctx, displayable, innerScope, i_1 === len_1 - 1);
    displayable.innerAfterBrush();
    displayable.afterBrush && displayable.afterBrush();
    innerScope.prevEl = displayable;
  }
  el.clearTemporalDisplayables();
  el.notClear = true;
  ctx.restore();
}
function createDom(id, painter, dpr2) {
  var newDom = platformApi.createCanvas();
  var width = painter.getWidth();
  var height = painter.getHeight();
  var newDomStyle = newDom.style;
  if (newDomStyle) {
    newDomStyle.position = "absolute";
    newDomStyle.left = "0";
    newDomStyle.top = "0";
    newDomStyle.width = width + "px";
    newDomStyle.height = height + "px";
    newDom.setAttribute("data-zr-dom-id", id);
  }
  newDom.width = width * dpr2;
  newDom.height = height * dpr2;
  return newDom;
}
var Layer = function(_super) {
  __extends(Layer2, _super);
  function Layer2(id, painter, dpr2) {
    var _this = _super.call(this) || this;
    _this.motionBlur = false;
    _this.lastFrameAlpha = 0.7;
    _this.dpr = 1;
    _this.virtual = false;
    _this.config = {};
    _this.incremental = false;
    _this.zlevel = 0;
    _this.maxRepaintRectCount = 5;
    _this.__dirty = true;
    _this.__firstTimePaint = true;
    _this.__used = false;
    _this.__drawIndex = 0;
    _this.__startIndex = 0;
    _this.__endIndex = 0;
    _this.__prevStartIndex = null;
    _this.__prevEndIndex = null;
    var dom;
    dpr2 = dpr2 || devicePixelRatio;
    if (typeof id === "string") {
      dom = createDom(id, painter, dpr2);
    } else if (isObject(id)) {
      dom = id;
      id = dom.id;
    }
    _this.id = id;
    _this.dom = dom;
    var domStyle = dom.style;
    if (domStyle) {
      disableUserSelect(dom);
      dom.onselectstart = function() {
        return false;
      };
      domStyle.padding = "0";
      domStyle.margin = "0";
      domStyle.borderWidth = "0";
    }
    _this.painter = painter;
    _this.dpr = dpr2;
    return _this;
  }
  Layer2.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  };
  Layer2.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex;
    this.__prevEndIndex = this.__endIndex;
  };
  Layer2.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d");
    this.ctx.dpr = this.dpr;
  };
  Layer2.prototype.setUnpainted = function() {
    this.__firstTimePaint = true;
  };
  Layer2.prototype.createBackBuffer = function() {
    var dpr2 = this.dpr;
    this.domBack = createDom("back-" + this.id, this.painter, dpr2);
    this.ctxBack = this.domBack.getContext("2d");
    if (dpr2 !== 1) {
      this.ctxBack.scale(dpr2, dpr2);
    }
  };
  Layer2.prototype.createRepaintRects = function(displayList, prevList, viewWidth, viewHeight) {
    if (this.__firstTimePaint) {
      this.__firstTimePaint = false;
      return null;
    }
    var mergedRepaintRects = [];
    var maxRepaintRectCount = this.maxRepaintRectCount;
    var full = false;
    var pendingRect = new BoundingRect$1(0, 0, 0, 0);
    function addRectToMergePool(rect) {
      if (!rect.isFinite() || rect.isZero()) {
        return;
      }
      if (mergedRepaintRects.length === 0) {
        var boundingRect = new BoundingRect$1(0, 0, 0, 0);
        boundingRect.copy(rect);
        mergedRepaintRects.push(boundingRect);
      } else {
        var isMerged = false;
        var minDeltaArea = Infinity;
        var bestRectToMergeIdx = 0;
        for (var i3 = 0; i3 < mergedRepaintRects.length; ++i3) {
          var mergedRect = mergedRepaintRects[i3];
          if (mergedRect.intersect(rect)) {
            var pendingRect_1 = new BoundingRect$1(0, 0, 0, 0);
            pendingRect_1.copy(mergedRect);
            pendingRect_1.union(rect);
            mergedRepaintRects[i3] = pendingRect_1;
            isMerged = true;
            break;
          } else if (full) {
            pendingRect.copy(rect);
            pendingRect.union(mergedRect);
            var aArea = rect.width * rect.height;
            var bArea = mergedRect.width * mergedRect.height;
            var pendingArea = pendingRect.width * pendingRect.height;
            var deltaArea = pendingArea - aArea - bArea;
            if (deltaArea < minDeltaArea) {
              minDeltaArea = deltaArea;
              bestRectToMergeIdx = i3;
            }
          }
        }
        if (full) {
          mergedRepaintRects[bestRectToMergeIdx].union(rect);
          isMerged = true;
        }
        if (!isMerged) {
          var boundingRect = new BoundingRect$1(0, 0, 0, 0);
          boundingRect.copy(rect);
          mergedRepaintRects.push(boundingRect);
        }
        if (!full) {
          full = mergedRepaintRects.length >= maxRepaintRectCount;
        }
      }
    }
    for (var i2 = this.__startIndex; i2 < this.__endIndex; ++i2) {
      var el = displayList[i2];
      if (el) {
        var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
        var prevRect = el.__isRendered && (el.__dirty & REDRAW_BIT || !shouldPaint) ? el.getPrevPaintRect() : null;
        if (prevRect) {
          addRectToMergePool(prevRect);
        }
        var curRect = shouldPaint && (el.__dirty & REDRAW_BIT || !el.__isRendered) ? el.getPaintRect() : null;
        if (curRect) {
          addRectToMergePool(curRect);
        }
      }
    }
    for (var i2 = this.__prevStartIndex; i2 < this.__prevEndIndex; ++i2) {
      var el = prevList[i2];
      var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
      if (el && (!shouldPaint || !el.__zr) && el.__isRendered) {
        var prevRect = el.getPrevPaintRect();
        if (prevRect) {
          addRectToMergePool(prevRect);
        }
      }
    }
    var hasIntersections;
    do {
      hasIntersections = false;
      for (var i2 = 0; i2 < mergedRepaintRects.length; ) {
        if (mergedRepaintRects[i2].isZero()) {
          mergedRepaintRects.splice(i2, 1);
          continue;
        }
        for (var j = i2 + 1; j < mergedRepaintRects.length; ) {
          if (mergedRepaintRects[i2].intersect(mergedRepaintRects[j])) {
            hasIntersections = true;
            mergedRepaintRects[i2].union(mergedRepaintRects[j]);
            mergedRepaintRects.splice(j, 1);
          } else {
            j++;
          }
        }
        i2++;
      }
    } while (hasIntersections);
    this._paintRects = mergedRepaintRects;
    return mergedRepaintRects;
  };
  Layer2.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  };
  Layer2.prototype.resize = function(width, height) {
    var dpr2 = this.dpr;
    var dom = this.dom;
    var domStyle = dom.style;
    var domBack = this.domBack;
    if (domStyle) {
      domStyle.width = width + "px";
      domStyle.height = height + "px";
    }
    dom.width = width * dpr2;
    dom.height = height * dpr2;
    if (domBack) {
      domBack.width = width * dpr2;
      domBack.height = height * dpr2;
      if (dpr2 !== 1) {
        this.ctxBack.scale(dpr2, dpr2);
      }
    }
  };
  Layer2.prototype.clear = function(clearAll, clearColor, repaintRects) {
    var dom = this.dom;
    var ctx = this.ctx;
    var width = dom.width;
    var height = dom.height;
    clearColor = clearColor || this.clearColor;
    var haveMotionBLur = this.motionBlur && !clearAll;
    var lastFrameAlpha = this.lastFrameAlpha;
    var dpr2 = this.dpr;
    var self2 = this;
    if (haveMotionBLur) {
      if (!this.domBack) {
        this.createBackBuffer();
      }
      this.ctxBack.globalCompositeOperation = "copy";
      this.ctxBack.drawImage(dom, 0, 0, width / dpr2, height / dpr2);
    }
    var domBack = this.domBack;
    function doClear(x2, y2, width2, height2) {
      ctx.clearRect(x2, y2, width2, height2);
      if (clearColor && clearColor !== "transparent") {
        var clearColorGradientOrPattern = void 0;
        if (isGradientObject(clearColor)) {
          clearColorGradientOrPattern = clearColor.__canvasGradient || getCanvasGradient(ctx, clearColor, {
            x: 0,
            y: 0,
            width: width2,
            height: height2
          });
          clearColor.__canvasGradient = clearColorGradientOrPattern;
        } else if (isImagePatternObject(clearColor)) {
          clearColorGradientOrPattern = createCanvasPattern(ctx, clearColor, {
            dirty: function() {
              self2.setUnpainted();
              self2.__painter.refresh();
            }
          });
        }
        ctx.save();
        ctx.fillStyle = clearColorGradientOrPattern || clearColor;
        ctx.fillRect(x2, y2, width2, height2);
        ctx.restore();
      }
      if (haveMotionBLur) {
        ctx.save();
        ctx.globalAlpha = lastFrameAlpha;
        ctx.drawImage(domBack, x2, y2, width2, height2);
        ctx.restore();
      }
    }
    if (!repaintRects || haveMotionBLur) {
      doClear(0, 0, width, height);
    } else if (repaintRects.length) {
      each(repaintRects, function(rect) {
        doClear(rect.x * dpr2, rect.y * dpr2, rect.width * dpr2, rect.height * dpr2);
      });
    }
  };
  return Layer2;
}(Eventful$1);
var Layer$1 = Layer;
var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 1e-3;
function isLayerValid(layer) {
  if (!layer) {
    return false;
  }
  if (layer.__builtin__) {
    return true;
  }
  if (typeof layer.resize !== "function" || typeof layer.refresh !== "function") {
    return false;
  }
  return true;
}
function createRoot(width, height) {
  var domRoot = document.createElement("div");
  domRoot.style.cssText = [
    "position:relative",
    "width:" + width + "px",
    "height:" + height + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";";
  return domRoot;
}
var CanvasPainter = function() {
  function CanvasPainter2(root2, storage, opts, id) {
    this.type = "canvas";
    this._zlevelList = [];
    this._prevDisplayList = [];
    this._layers = {};
    this._layerConfig = {};
    this._needsManuallyCompositing = false;
    this.type = "canvas";
    var singleCanvas = !root2.nodeName || root2.nodeName.toUpperCase() === "CANVAS";
    this._opts = opts = extend({}, opts || {});
    this.dpr = opts.devicePixelRatio || devicePixelRatio;
    this._singleCanvas = singleCanvas;
    this.root = root2;
    var rootStyle = root2.style;
    if (rootStyle) {
      disableUserSelect(root2);
      root2.innerHTML = "";
    }
    this.storage = storage;
    var zlevelList = this._zlevelList;
    this._prevDisplayList = [];
    var layers = this._layers;
    if (!singleCanvas) {
      this._width = getSize(root2, 0, opts);
      this._height = getSize(root2, 1, opts);
      var domRoot = this._domRoot = createRoot(this._width, this._height);
      root2.appendChild(domRoot);
    } else {
      var rootCanvas = root2;
      var width = rootCanvas.width;
      var height = rootCanvas.height;
      if (opts.width != null) {
        width = opts.width;
      }
      if (opts.height != null) {
        height = opts.height;
      }
      this.dpr = opts.devicePixelRatio || 1;
      rootCanvas.width = width * this.dpr;
      rootCanvas.height = height * this.dpr;
      this._width = width;
      this._height = height;
      var mainLayer = new Layer$1(rootCanvas, this, this.dpr);
      mainLayer.__builtin__ = true;
      mainLayer.initContext();
      layers[CANVAS_ZLEVEL] = mainLayer;
      mainLayer.zlevel = CANVAS_ZLEVEL;
      zlevelList.push(CANVAS_ZLEVEL);
      this._domRoot = root2;
    }
  }
  CanvasPainter2.prototype.getType = function() {
    return "canvas";
  };
  CanvasPainter2.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  };
  CanvasPainter2.prototype.getViewportRoot = function() {
    return this._domRoot;
  };
  CanvasPainter2.prototype.getViewportRootOffset = function() {
    var viewportRoot = this.getViewportRoot();
    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  };
  CanvasPainter2.prototype.refresh = function(paintAll) {
    var list = this.storage.getDisplayList(true);
    var prevList = this._prevDisplayList;
    var zlevelList = this._zlevelList;
    this._redrawId = Math.random();
    this._paintList(list, prevList, paintAll, this._redrawId);
    for (var i2 = 0; i2 < zlevelList.length; i2++) {
      var z = zlevelList[i2];
      var layer = this._layers[z];
      if (!layer.__builtin__ && layer.refresh) {
        var clearColor = i2 === 0 ? this._backgroundColor : null;
        layer.refresh(clearColor);
      }
    }
    if (this._opts.useDirtyRect) {
      this._prevDisplayList = list.slice();
    }
    return this;
  };
  CanvasPainter2.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(false));
  };
  CanvasPainter2.prototype._paintHoverList = function(list) {
    var len2 = list.length;
    var hoverLayer = this._hoverlayer;
    hoverLayer && hoverLayer.clear();
    if (!len2) {
      return;
    }
    var scope = {
      inHover: true,
      viewWidth: this._width,
      viewHeight: this._height
    };
    var ctx;
    for (var i2 = 0; i2 < len2; i2++) {
      var el = list[i2];
      if (el.__inHover) {
        if (!hoverLayer) {
          hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
        }
        if (!ctx) {
          ctx = hoverLayer.ctx;
          ctx.save();
        }
        brush(ctx, el, scope, i2 === len2 - 1);
      }
    }
    if (ctx) {
      ctx.restore();
    }
  };
  CanvasPainter2.prototype.getHoverLayer = function() {
    return this.getLayer(HOVER_LAYER_ZLEVEL);
  };
  CanvasPainter2.prototype.paintOne = function(ctx, el) {
    brushSingle(ctx, el);
  };
  CanvasPainter2.prototype._paintList = function(list, prevList, paintAll, redrawId) {
    if (this._redrawId !== redrawId) {
      return;
    }
    paintAll = paintAll || false;
    this._updateLayerStatus(list);
    var _a = this._doPaintList(list, prevList, paintAll), finished = _a.finished, needsRefreshHover = _a.needsRefreshHover;
    if (this._needsManuallyCompositing) {
      this._compositeManually();
    }
    if (needsRefreshHover) {
      this._paintHoverList(list);
    }
    if (!finished) {
      var self_1 = this;
      requestAnimationFrame$2(function() {
        self_1._paintList(list, prevList, paintAll, redrawId);
      });
    } else {
      this.eachLayer(function(layer) {
        layer.afterBrush && layer.afterBrush();
      });
    }
  };
  CanvasPainter2.prototype._compositeManually = function() {
    var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
    var width = this._domRoot.width;
    var height = this._domRoot.height;
    ctx.clearRect(0, 0, width, height);
    this.eachBuiltinLayer(function(layer) {
      if (layer.virtual) {
        ctx.drawImage(layer.dom, 0, 0, width, height);
      }
    });
  };
  CanvasPainter2.prototype._doPaintList = function(list, prevList, paintAll) {
    var _this = this;
    var layerList = [];
    var useDirtyRect = this._opts.useDirtyRect;
    for (var zi = 0; zi < this._zlevelList.length; zi++) {
      var zlevel = this._zlevelList[zi];
      var layer = this._layers[zlevel];
      if (layer.__builtin__ && layer !== this._hoverlayer && (layer.__dirty || paintAll)) {
        layerList.push(layer);
      }
    }
    var finished = true;
    var needsRefreshHover = false;
    var _loop_1 = function(k2) {
      var layer2 = layerList[k2];
      var ctx = layer2.ctx;
      var repaintRects = useDirtyRect && layer2.createRepaintRects(list, prevList, this_1._width, this_1._height);
      var start2 = paintAll ? layer2.__startIndex : layer2.__drawIndex;
      var useTimer = !paintAll && layer2.incremental && Date.now;
      var startTime = useTimer && Date.now();
      var clearColor = layer2.zlevel === this_1._zlevelList[0] ? this_1._backgroundColor : null;
      if (layer2.__startIndex === layer2.__endIndex) {
        layer2.clear(false, clearColor, repaintRects);
      } else if (start2 === layer2.__startIndex) {
        var firstEl = list[start2];
        if (!firstEl.incremental || !firstEl.notClear || paintAll) {
          layer2.clear(false, clearColor, repaintRects);
        }
      }
      if (start2 === -1) {
        console.error("For some unknown reason. drawIndex is -1");
        start2 = layer2.__startIndex;
      }
      var i2;
      var repaint = function(repaintRect) {
        var scope = {
          inHover: false,
          allClipped: false,
          prevEl: null,
          viewWidth: _this._width,
          viewHeight: _this._height
        };
        for (i2 = start2; i2 < layer2.__endIndex; i2++) {
          var el = list[i2];
          if (el.__inHover) {
            needsRefreshHover = true;
          }
          _this._doPaintEl(el, layer2, useDirtyRect, repaintRect, scope, i2 === layer2.__endIndex - 1);
          if (useTimer) {
            var dTime = Date.now() - startTime;
            if (dTime > 15) {
              break;
            }
          }
        }
        if (scope.prevElClipPaths) {
          ctx.restore();
        }
      };
      if (repaintRects) {
        if (repaintRects.length === 0) {
          i2 = layer2.__endIndex;
        } else {
          var dpr2 = this_1.dpr;
          for (var r2 = 0; r2 < repaintRects.length; ++r2) {
            var rect = repaintRects[r2];
            ctx.save();
            ctx.beginPath();
            ctx.rect(rect.x * dpr2, rect.y * dpr2, rect.width * dpr2, rect.height * dpr2);
            ctx.clip();
            repaint(rect);
            ctx.restore();
          }
        }
      } else {
        ctx.save();
        repaint();
        ctx.restore();
      }
      layer2.__drawIndex = i2;
      if (layer2.__drawIndex < layer2.__endIndex) {
        finished = false;
      }
    };
    var this_1 = this;
    for (var k = 0; k < layerList.length; k++) {
      _loop_1(k);
    }
    if (env$1.wxa) {
      each(this._layers, function(layer2) {
        if (layer2 && layer2.ctx && layer2.ctx.draw) {
          layer2.ctx.draw();
        }
      });
    }
    return {
      finished,
      needsRefreshHover
    };
  };
  CanvasPainter2.prototype._doPaintEl = function(el, currentLayer, useDirtyRect, repaintRect, scope, isLast) {
    var ctx = currentLayer.ctx;
    if (useDirtyRect) {
      var paintRect = el.getPaintRect();
      if (!repaintRect || paintRect && paintRect.intersect(repaintRect)) {
        brush(ctx, el, scope, isLast);
        el.setPrevPaintRect(paintRect);
      }
    } else {
      brush(ctx, el, scope, isLast);
    }
  };
  CanvasPainter2.prototype.getLayer = function(zlevel, virtual) {
    if (this._singleCanvas && !this._needsManuallyCompositing) {
      zlevel = CANVAS_ZLEVEL;
    }
    var layer = this._layers[zlevel];
    if (!layer) {
      layer = new Layer$1("zr_" + zlevel, this, this.dpr);
      layer.zlevel = zlevel;
      layer.__builtin__ = true;
      if (this._layerConfig[zlevel]) {
        merge(layer, this._layerConfig[zlevel], true);
      } else if (this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC]) {
        merge(layer, this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC], true);
      }
      if (virtual) {
        layer.virtual = virtual;
      }
      this.insertLayer(zlevel, layer);
      layer.initContext();
    }
    return layer;
  };
  CanvasPainter2.prototype.insertLayer = function(zlevel, layer) {
    var layersMap = this._layers;
    var zlevelList = this._zlevelList;
    var len2 = zlevelList.length;
    var domRoot = this._domRoot;
    var prevLayer = null;
    var i2 = -1;
    if (layersMap[zlevel]) {
      return;
    }
    if (!isLayerValid(layer)) {
      return;
    }
    if (len2 > 0 && zlevel > zlevelList[0]) {
      for (i2 = 0; i2 < len2 - 1; i2++) {
        if (zlevelList[i2] < zlevel && zlevelList[i2 + 1] > zlevel) {
          break;
        }
      }
      prevLayer = layersMap[zlevelList[i2]];
    }
    zlevelList.splice(i2 + 1, 0, zlevel);
    layersMap[zlevel] = layer;
    if (!layer.virtual) {
      if (prevLayer) {
        var prevDom = prevLayer.dom;
        if (prevDom.nextSibling) {
          domRoot.insertBefore(layer.dom, prevDom.nextSibling);
        } else {
          domRoot.appendChild(layer.dom);
        }
      } else {
        if (domRoot.firstChild) {
          domRoot.insertBefore(layer.dom, domRoot.firstChild);
        } else {
          domRoot.appendChild(layer.dom);
        }
      }
    }
    layer.__painter = this;
  };
  CanvasPainter2.prototype.eachLayer = function(cb, context) {
    var zlevelList = this._zlevelList;
    for (var i2 = 0; i2 < zlevelList.length; i2++) {
      var z = zlevelList[i2];
      cb.call(context, this._layers[z], z);
    }
  };
  CanvasPainter2.prototype.eachBuiltinLayer = function(cb, context) {
    var zlevelList = this._zlevelList;
    for (var i2 = 0; i2 < zlevelList.length; i2++) {
      var z = zlevelList[i2];
      var layer = this._layers[z];
      if (layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  };
  CanvasPainter2.prototype.eachOtherLayer = function(cb, context) {
    var zlevelList = this._zlevelList;
    for (var i2 = 0; i2 < zlevelList.length; i2++) {
      var z = zlevelList[i2];
      var layer = this._layers[z];
      if (!layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  };
  CanvasPainter2.prototype.getLayers = function() {
    return this._layers;
  };
  CanvasPainter2.prototype._updateLayerStatus = function(list) {
    this.eachBuiltinLayer(function(layer2, z) {
      layer2.__dirty = layer2.__used = false;
    });
    function updatePrevLayer(idx) {
      if (prevLayer) {
        if (prevLayer.__endIndex !== idx) {
          prevLayer.__dirty = true;
        }
        prevLayer.__endIndex = idx;
      }
    }
    if (this._singleCanvas) {
      for (var i_1 = 1; i_1 < list.length; i_1++) {
        var el = list[i_1];
        if (el.zlevel !== list[i_1 - 1].zlevel || el.incremental) {
          this._needsManuallyCompositing = true;
          break;
        }
      }
    }
    var prevLayer = null;
    var incrementalLayerCount = 0;
    var prevZlevel;
    var i2;
    for (i2 = 0; i2 < list.length; i2++) {
      var el = list[i2];
      var zlevel = el.zlevel;
      var layer = void 0;
      if (prevZlevel !== zlevel) {
        prevZlevel = zlevel;
        incrementalLayerCount = 0;
      }
      if (el.incremental) {
        layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
        layer.incremental = true;
        incrementalLayerCount = 1;
      } else {
        layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
      }
      if (!layer.__builtin__) {
        logError("ZLevel " + zlevel + " has been used by unkown layer " + layer.id);
      }
      if (layer !== prevLayer) {
        layer.__used = true;
        if (layer.__startIndex !== i2) {
          layer.__dirty = true;
        }
        layer.__startIndex = i2;
        if (!layer.incremental) {
          layer.__drawIndex = i2;
        } else {
          layer.__drawIndex = -1;
        }
        updatePrevLayer(i2);
        prevLayer = layer;
      }
      if (el.__dirty & REDRAW_BIT && !el.__inHover) {
        layer.__dirty = true;
        if (layer.incremental && layer.__drawIndex < 0) {
          layer.__drawIndex = i2;
        }
      }
    }
    updatePrevLayer(i2);
    this.eachBuiltinLayer(function(layer2, z) {
      if (!layer2.__used && layer2.getElementCount() > 0) {
        layer2.__dirty = true;
        layer2.__startIndex = layer2.__endIndex = layer2.__drawIndex = 0;
      }
      if (layer2.__dirty && layer2.__drawIndex < 0) {
        layer2.__drawIndex = layer2.__startIndex;
      }
    });
  };
  CanvasPainter2.prototype.clear = function() {
    this.eachBuiltinLayer(this._clearLayer);
    return this;
  };
  CanvasPainter2.prototype._clearLayer = function(layer) {
    layer.clear();
  };
  CanvasPainter2.prototype.setBackgroundColor = function(backgroundColor) {
    this._backgroundColor = backgroundColor;
    each(this._layers, function(layer) {
      layer.setUnpainted();
    });
  };
  CanvasPainter2.prototype.configLayer = function(zlevel, config) {
    if (config) {
      var layerConfig = this._layerConfig;
      if (!layerConfig[zlevel]) {
        layerConfig[zlevel] = config;
      } else {
        merge(layerConfig[zlevel], config, true);
      }
      for (var i2 = 0; i2 < this._zlevelList.length; i2++) {
        var _zlevel = this._zlevelList[i2];
        if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
          var layer = this._layers[_zlevel];
          merge(layer, layerConfig[zlevel], true);
        }
      }
    }
  };
  CanvasPainter2.prototype.delLayer = function(zlevel) {
    var layers = this._layers;
    var zlevelList = this._zlevelList;
    var layer = layers[zlevel];
    if (!layer) {
      return;
    }
    layer.dom.parentNode.removeChild(layer.dom);
    delete layers[zlevel];
    zlevelList.splice(indexOf(zlevelList, zlevel), 1);
  };
  CanvasPainter2.prototype.resize = function(width, height) {
    if (!this._domRoot.style) {
      if (width == null || height == null) {
        return;
      }
      this._width = width;
      this._height = height;
      this.getLayer(CANVAS_ZLEVEL).resize(width, height);
    } else {
      var domRoot = this._domRoot;
      domRoot.style.display = "none";
      var opts = this._opts;
      var root2 = this.root;
      width != null && (opts.width = width);
      height != null && (opts.height = height);
      width = getSize(root2, 0, opts);
      height = getSize(root2, 1, opts);
      domRoot.style.display = "";
      if (this._width !== width || height !== this._height) {
        domRoot.style.width = width + "px";
        domRoot.style.height = height + "px";
        for (var id in this._layers) {
          if (this._layers.hasOwnProperty(id)) {
            this._layers[id].resize(width, height);
          }
        }
        this.refresh(true);
      }
      this._width = width;
      this._height = height;
    }
    return this;
  };
  CanvasPainter2.prototype.clearLayer = function(zlevel) {
    var layer = this._layers[zlevel];
    if (layer) {
      layer.clear();
    }
  };
  CanvasPainter2.prototype.dispose = function() {
    this.root.innerHTML = "";
    this.root = this.storage = this._domRoot = this._layers = null;
  };
  CanvasPainter2.prototype.getRenderedCanvas = function(opts) {
    opts = opts || {};
    if (this._singleCanvas && !this._compositeManually) {
      return this._layers[CANVAS_ZLEVEL].dom;
    }
    var imageLayer = new Layer$1("image", this, opts.pixelRatio || this.dpr);
    imageLayer.initContext();
    imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);
    var ctx = imageLayer.ctx;
    if (opts.pixelRatio <= this.dpr) {
      this.refresh();
      var width_1 = imageLayer.dom.width;
      var height_1 = imageLayer.dom.height;
      this.eachLayer(function(layer) {
        if (layer.__builtin__) {
          ctx.drawImage(layer.dom, 0, 0, width_1, height_1);
        } else if (layer.renderToCanvas) {
          ctx.save();
          layer.renderToCanvas(ctx);
          ctx.restore();
        }
      });
    } else {
      var scope = {
        inHover: false,
        viewWidth: this._width,
        viewHeight: this._height
      };
      var displayList = this.storage.getDisplayList(true);
      for (var i2 = 0, len2 = displayList.length; i2 < len2; i2++) {
        var el = displayList[i2];
        brush(ctx, el, scope, i2 === len2 - 1);
      }
    }
    return imageLayer.dom;
  };
  CanvasPainter2.prototype.getWidth = function() {
    return this._width;
  };
  CanvasPainter2.prototype.getHeight = function() {
    return this._height;
  };
  return CanvasPainter2;
}();
var CanvasPainter$1 = CanvasPainter;
var CMD = PathProxy$1.CMD;
function aroundEqual(a2, b2) {
  return Math.abs(a2 - b2) < 1e-5;
}
function pathToBezierCurves(path) {
  var data2 = path.data;
  var len2 = path.len();
  var bezierArrayGroups = [];
  var currentSubpath;
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;
  function createNewSubpath(x3, y3) {
    if (currentSubpath && currentSubpath.length > 2) {
      bezierArrayGroups.push(currentSubpath);
    }
    currentSubpath = [x3, y3];
  }
  function addLine(x02, y02, x12, y12) {
    if (!(aroundEqual(x02, x12) && aroundEqual(y02, y12))) {
      currentSubpath.push(x02, y02, x12, y12, x12, y12);
    }
  }
  function addArc(startAngle2, endAngle2, cx2, cy2, rx2, ry2) {
    var delta = Math.abs(endAngle2 - startAngle2);
    var len3 = Math.tan(delta / 4) * 4 / 3;
    var dir = endAngle2 < startAngle2 ? -1 : 1;
    var c1 = Math.cos(startAngle2);
    var s1 = Math.sin(startAngle2);
    var c2 = Math.cos(endAngle2);
    var s2 = Math.sin(endAngle2);
    var x12 = c1 * rx2 + cx2;
    var y12 = s1 * ry2 + cy2;
    var x4 = c2 * rx2 + cx2;
    var y4 = s2 * ry2 + cy2;
    var hx = rx2 * len3 * dir;
    var hy = ry2 * len3 * dir;
    currentSubpath.push(x12 - hx * s1, y12 + hy * c1, x4 + hx * s2, y4 - hy * c2, x4, y4);
  }
  var x1;
  var y1;
  var x2;
  var y2;
  for (var i2 = 0; i2 < len2; ) {
    var cmd = data2[i2++];
    var isFirst = i2 === 1;
    if (isFirst) {
      xi = data2[i2];
      yi = data2[i2 + 1];
      x0 = xi;
      y0 = yi;
      if (cmd === CMD.L || cmd === CMD.C || cmd === CMD.Q) {
        currentSubpath = [x0, y0];
      }
    }
    switch (cmd) {
      case CMD.M:
        xi = x0 = data2[i2++];
        yi = y0 = data2[i2++];
        createNewSubpath(x0, y0);
        break;
      case CMD.L:
        x1 = data2[i2++];
        y1 = data2[i2++];
        addLine(xi, yi, x1, y1);
        xi = x1;
        yi = y1;
        break;
      case CMD.C:
        currentSubpath.push(data2[i2++], data2[i2++], data2[i2++], data2[i2++], xi = data2[i2++], yi = data2[i2++]);
        break;
      case CMD.Q:
        x1 = data2[i2++];
        y1 = data2[i2++];
        x2 = data2[i2++];
        y2 = data2[i2++];
        currentSubpath.push(xi + 2 / 3 * (x1 - xi), yi + 2 / 3 * (y1 - yi), x2 + 2 / 3 * (x1 - x2), y2 + 2 / 3 * (y1 - y2), x2, y2);
        xi = x2;
        yi = y2;
        break;
      case CMD.A:
        var cx = data2[i2++];
        var cy = data2[i2++];
        var rx = data2[i2++];
        var ry = data2[i2++];
        var startAngle = data2[i2++];
        var endAngle = data2[i2++] + startAngle;
        i2 += 1;
        var anticlockwise = !data2[i2++];
        x1 = Math.cos(startAngle) * rx + cx;
        y1 = Math.sin(startAngle) * ry + cy;
        if (isFirst) {
          x0 = x1;
          y0 = y1;
          createNewSubpath(x0, y0);
        } else {
          addLine(xi, yi, x1, y1);
        }
        xi = Math.cos(endAngle) * rx + cx;
        yi = Math.sin(endAngle) * ry + cy;
        var step = (anticlockwise ? -1 : 1) * Math.PI / 2;
        for (var angle = startAngle; anticlockwise ? angle > endAngle : angle < endAngle; angle += step) {
          var nextAngle = anticlockwise ? Math.max(angle + step, endAngle) : Math.min(angle + step, endAngle);
          addArc(angle, nextAngle, cx, cy, rx, ry);
        }
        break;
      case CMD.R:
        x0 = xi = data2[i2++];
        y0 = yi = data2[i2++];
        x1 = x0 + data2[i2++];
        y1 = y0 + data2[i2++];
        createNewSubpath(x1, y0);
        addLine(x1, y0, x1, y1);
        addLine(x1, y1, x0, y1);
        addLine(x0, y1, x0, y0);
        addLine(x0, y0, x1, y0);
        break;
      case CMD.Z:
        currentSubpath && addLine(xi, yi, x0, y0);
        xi = x0;
        yi = y0;
        break;
    }
  }
  if (currentSubpath && currentSubpath.length > 2) {
    bezierArrayGroups.push(currentSubpath);
  }
  return bezierArrayGroups;
}
function adpativeBezier(x0, y0, x1, y1, x2, y2, x3, y3, out2, scale2) {
  if (aroundEqual(x0, x1) && aroundEqual(y0, y1) && aroundEqual(x2, x3) && aroundEqual(y2, y3)) {
    out2.push(x3, y3);
    return;
  }
  var PIXEL_DISTANCE = 2 / scale2;
  var PIXEL_DISTANCE_SQR = PIXEL_DISTANCE * PIXEL_DISTANCE;
  var dx = x3 - x0;
  var dy = y3 - y0;
  var d2 = Math.sqrt(dx * dx + dy * dy);
  dx /= d2;
  dy /= d2;
  var dx1 = x1 - x0;
  var dy1 = y1 - y0;
  var dx2 = x2 - x3;
  var dy2 = y2 - y3;
  var cp1LenSqr = dx1 * dx1 + dy1 * dy1;
  var cp2LenSqr = dx2 * dx2 + dy2 * dy2;
  if (cp1LenSqr < PIXEL_DISTANCE_SQR && cp2LenSqr < PIXEL_DISTANCE_SQR) {
    out2.push(x3, y3);
    return;
  }
  var projLen1 = dx * dx1 + dy * dy1;
  var projLen2 = -dx * dx2 - dy * dy2;
  var d1Sqr = cp1LenSqr - projLen1 * projLen1;
  var d2Sqr = cp2LenSqr - projLen2 * projLen2;
  if (d1Sqr < PIXEL_DISTANCE_SQR && projLen1 >= 0 && d2Sqr < PIXEL_DISTANCE_SQR && projLen2 >= 0) {
    out2.push(x3, y3);
    return;
  }
  var tmpSegX = [];
  var tmpSegY = [];
  cubicSubdivide(x0, x1, x2, x3, 0.5, tmpSegX);
  cubicSubdivide(y0, y1, y2, y3, 0.5, tmpSegY);
  adpativeBezier(tmpSegX[0], tmpSegY[0], tmpSegX[1], tmpSegY[1], tmpSegX[2], tmpSegY[2], tmpSegX[3], tmpSegY[3], out2, scale2);
  adpativeBezier(tmpSegX[4], tmpSegY[4], tmpSegX[5], tmpSegY[5], tmpSegX[6], tmpSegY[6], tmpSegX[7], tmpSegY[7], out2, scale2);
}
function pathToPolygons(path, scale2) {
  var bezierArrayGroups = pathToBezierCurves(path);
  var polygons = [];
  scale2 = scale2 || 1;
  for (var i2 = 0; i2 < bezierArrayGroups.length; i2++) {
    var beziers = bezierArrayGroups[i2];
    var polygon = [];
    var x0 = beziers[0];
    var y0 = beziers[1];
    polygon.push(x0, y0);
    for (var k = 2; k < beziers.length; ) {
      var x1 = beziers[k++];
      var y1 = beziers[k++];
      var x2 = beziers[k++];
      var y2 = beziers[k++];
      var x3 = beziers[k++];
      var y3 = beziers[k++];
      adpativeBezier(x0, y0, x1, y1, x2, y2, x3, y3, polygon, scale2);
      x0 = x3;
      y0 = y3;
    }
    polygons.push(polygon);
  }
  return polygons;
}
function getDividingGrids(dimSize, rowDim, count) {
  var rowSize = dimSize[rowDim];
  var columnSize = dimSize[1 - rowDim];
  var ratio = Math.abs(rowSize / columnSize);
  var rowCount = Math.ceil(Math.sqrt(ratio * count));
  var columnCount = Math.floor(count / rowCount);
  if (columnCount === 0) {
    columnCount = 1;
    rowCount = count;
  }
  var grids = [];
  for (var i2 = 0; i2 < rowCount; i2++) {
    grids.push(columnCount);
  }
  var currentCount = rowCount * columnCount;
  var remained = count - currentCount;
  if (remained > 0) {
    for (var i2 = 0; i2 < remained; i2++) {
      grids[i2 % rowCount] += 1;
    }
  }
  return grids;
}
function divideSector(sectorShape, count, outShapes) {
  var r0 = sectorShape.r0;
  var r2 = sectorShape.r;
  var startAngle = sectorShape.startAngle;
  var endAngle = sectorShape.endAngle;
  var angle = Math.abs(endAngle - startAngle);
  var arcLen = angle * r2;
  var deltaR = r2 - r0;
  var isAngleRow = arcLen > Math.abs(deltaR);
  var grids = getDividingGrids([arcLen, deltaR], isAngleRow ? 0 : 1, count);
  var rowSize = (isAngleRow ? angle : deltaR) / grids.length;
  for (var row = 0; row < grids.length; row++) {
    var columnSize = (isAngleRow ? deltaR : angle) / grids[row];
    for (var column = 0; column < grids[row]; column++) {
      var newShape = {};
      if (isAngleRow) {
        newShape.startAngle = startAngle + rowSize * row;
        newShape.endAngle = startAngle + rowSize * (row + 1);
        newShape.r0 = r0 + columnSize * column;
        newShape.r = r0 + columnSize * (column + 1);
      } else {
        newShape.startAngle = startAngle + columnSize * column;
        newShape.endAngle = startAngle + columnSize * (column + 1);
        newShape.r0 = r0 + rowSize * row;
        newShape.r = r0 + rowSize * (row + 1);
      }
      newShape.clockwise = sectorShape.clockwise;
      newShape.cx = sectorShape.cx;
      newShape.cy = sectorShape.cy;
      outShapes.push(newShape);
    }
  }
}
function divideRect(rectShape, count, outShapes) {
  var width = rectShape.width;
  var height = rectShape.height;
  var isHorizontalRow = width > height;
  var grids = getDividingGrids([width, height], isHorizontalRow ? 0 : 1, count);
  var rowSizeDim = isHorizontalRow ? "width" : "height";
  var columnSizeDim = isHorizontalRow ? "height" : "width";
  var rowDim = isHorizontalRow ? "x" : "y";
  var columnDim = isHorizontalRow ? "y" : "x";
  var rowSize = rectShape[rowSizeDim] / grids.length;
  for (var row = 0; row < grids.length; row++) {
    var columnSize = rectShape[columnSizeDim] / grids[row];
    for (var column = 0; column < grids[row]; column++) {
      var newShape = {};
      newShape[rowDim] = row * rowSize;
      newShape[columnDim] = column * columnSize;
      newShape[rowSizeDim] = rowSize;
      newShape[columnSizeDim] = columnSize;
      newShape.x += rectShape.x;
      newShape.y += rectShape.y;
      outShapes.push(newShape);
    }
  }
}
function crossProduct2d(x1, y1, x2, y2) {
  return x1 * y2 - x2 * y1;
}
function lineLineIntersect(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
  var mx = a2x - a1x;
  var my = a2y - a1y;
  var nx = b2x - b1x;
  var ny = b2y - b1y;
  var nmCrossProduct = crossProduct2d(nx, ny, mx, my);
  if (Math.abs(nmCrossProduct) < 1e-6) {
    return null;
  }
  var b1a1x = a1x - b1x;
  var b1a1y = a1y - b1y;
  var p2 = crossProduct2d(b1a1x, b1a1y, nx, ny) / nmCrossProduct;
  if (p2 < 0 || p2 > 1) {
    return null;
  }
  return new Point$1(p2 * mx + a1x, p2 * my + a1y);
}
function projPtOnLine(pt2, lineA, lineB) {
  var dir = new Point$1();
  Point$1.sub(dir, lineB, lineA);
  dir.normalize();
  var dir2 = new Point$1();
  Point$1.sub(dir2, pt2, lineA);
  var len2 = dir2.dot(dir);
  return len2;
}
function addToPoly(poly, pt2) {
  var last = poly[poly.length - 1];
  if (last && last[0] === pt2[0] && last[1] === pt2[1]) {
    return;
  }
  poly.push(pt2);
}
function splitPolygonByLine(points2, lineA, lineB) {
  var len2 = points2.length;
  var intersections = [];
  for (var i2 = 0; i2 < len2; i2++) {
    var p0 = points2[i2];
    var p1 = points2[(i2 + 1) % len2];
    var intersectionPt = lineLineIntersect(p0[0], p0[1], p1[0], p1[1], lineA.x, lineA.y, lineB.x, lineB.y);
    if (intersectionPt) {
      intersections.push({
        projPt: projPtOnLine(intersectionPt, lineA, lineB),
        pt: intersectionPt,
        idx: i2
      });
    }
  }
  if (intersections.length < 2) {
    return [{ points: points2 }, { points: points2 }];
  }
  intersections.sort(function(a2, b2) {
    return a2.projPt - b2.projPt;
  });
  var splitPt0 = intersections[0];
  var splitPt1 = intersections[intersections.length - 1];
  if (splitPt1.idx < splitPt0.idx) {
    var tmp = splitPt0;
    splitPt0 = splitPt1;
    splitPt1 = tmp;
  }
  var splitPt0Arr = [splitPt0.pt.x, splitPt0.pt.y];
  var splitPt1Arr = [splitPt1.pt.x, splitPt1.pt.y];
  var newPolyA = [splitPt0Arr];
  var newPolyB = [splitPt1Arr];
  for (var i2 = splitPt0.idx + 1; i2 <= splitPt1.idx; i2++) {
    addToPoly(newPolyA, points2[i2].slice());
  }
  addToPoly(newPolyA, splitPt1Arr);
  addToPoly(newPolyA, splitPt0Arr);
  for (var i2 = splitPt1.idx + 1; i2 <= splitPt0.idx + len2; i2++) {
    addToPoly(newPolyB, points2[i2 % len2].slice());
  }
  addToPoly(newPolyB, splitPt0Arr);
  addToPoly(newPolyB, splitPt1Arr);
  return [{
    points: newPolyA
  }, {
    points: newPolyB
  }];
}
function binaryDividePolygon(polygonShape) {
  var points2 = polygonShape.points;
  var min3 = [];
  var max3 = [];
  fromPoints(points2, min3, max3);
  var boundingRect = new BoundingRect$1(min3[0], min3[1], max3[0] - min3[0], max3[1] - min3[1]);
  var width = boundingRect.width;
  var height = boundingRect.height;
  var x2 = boundingRect.x;
  var y2 = boundingRect.y;
  var pt0 = new Point$1();
  var pt1 = new Point$1();
  if (width > height) {
    pt0.x = pt1.x = x2 + width / 2;
    pt0.y = y2;
    pt1.y = y2 + height;
  } else {
    pt0.y = pt1.y = y2 + height / 2;
    pt0.x = x2;
    pt1.x = x2 + width;
  }
  return splitPolygonByLine(points2, pt0, pt1);
}
function binaryDivideRecursive(divider, shape, count, out2) {
  if (count === 1) {
    out2.push(shape);
  } else {
    var mid = Math.floor(count / 2);
    var sub2 = divider(shape);
    binaryDivideRecursive(divider, sub2[0], mid, out2);
    binaryDivideRecursive(divider, sub2[1], count - mid, out2);
  }
  return out2;
}
function clone(path, count) {
  var paths = [];
  for (var i2 = 0; i2 < count; i2++) {
    paths.push(clonePath(path));
  }
  return paths;
}
function copyPathProps(source2, target) {
  target.setStyle(source2.style);
  target.z = source2.z;
  target.z2 = source2.z2;
  target.zlevel = source2.zlevel;
}
function polygonConvert(points2) {
  var out2 = [];
  for (var i2 = 0; i2 < points2.length; ) {
    out2.push([points2[i2++], points2[i2++]]);
  }
  return out2;
}
function split(path, count) {
  var outShapes = [];
  var shape = path.shape;
  var OutShapeCtor;
  switch (path.type) {
    case "rect":
      divideRect(shape, count, outShapes);
      OutShapeCtor = Rect$1;
      break;
    case "sector":
      divideSector(shape, count, outShapes);
      OutShapeCtor = Sector$1;
      break;
    case "circle":
      divideSector({
        r0: 0,
        r: shape.r,
        startAngle: 0,
        endAngle: Math.PI * 2,
        cx: shape.cx,
        cy: shape.cy
      }, count, outShapes);
      OutShapeCtor = Sector$1;
      break;
    default:
      var m2 = path.getComputedTransform();
      var scale2 = m2 ? Math.sqrt(Math.max(m2[0] * m2[0] + m2[1] * m2[1], m2[2] * m2[2] + m2[3] * m2[3])) : 1;
      var polygons = map(pathToPolygons(path.getUpdatedPathProxy(), scale2), function(poly) {
        return polygonConvert(poly);
      });
      var polygonCount = polygons.length;
      if (polygonCount === 0) {
        binaryDivideRecursive(binaryDividePolygon, {
          points: polygons[0]
        }, count, outShapes);
      } else if (polygonCount === count) {
        for (var i2 = 0; i2 < polygonCount; i2++) {
          outShapes.push({
            points: polygons[i2]
          });
        }
      } else {
        var totalArea_1 = 0;
        var items = map(polygons, function(poly) {
          var min3 = [];
          var max3 = [];
          fromPoints(poly, min3, max3);
          var area = (max3[1] - min3[1]) * (max3[0] - min3[0]);
          totalArea_1 += area;
          return { poly, area };
        });
        items.sort(function(a2, b2) {
          return b2.area - a2.area;
        });
        var left = count;
        for (var i2 = 0; i2 < polygonCount; i2++) {
          var item = items[i2];
          if (left <= 0) {
            break;
          }
          var selfCount = i2 === polygonCount - 1 ? left : Math.ceil(item.area / totalArea_1 * count);
          if (selfCount < 0) {
            continue;
          }
          binaryDivideRecursive(binaryDividePolygon, {
            points: item.poly
          }, selfCount, outShapes);
          left -= selfCount;
        }
      }
      OutShapeCtor = Polygon$1;
      break;
  }
  if (!OutShapeCtor) {
    return clone(path, count);
  }
  var out2 = [];
  for (var i2 = 0; i2 < outShapes.length; i2++) {
    var subPath = new OutShapeCtor();
    subPath.setShape(outShapes[i2]);
    copyPathProps(path, subPath);
    out2.push(subPath);
  }
  return out2;
}
function alignSubpath(subpath1, subpath2) {
  var len1 = subpath1.length;
  var len2 = subpath2.length;
  if (len1 === len2) {
    return [subpath1, subpath2];
  }
  var tmpSegX = [];
  var tmpSegY = [];
  var shorterPath = len1 < len2 ? subpath1 : subpath2;
  var shorterLen = Math.min(len1, len2);
  var diff = Math.abs(len2 - len1) / 6;
  var shorterBezierCount = (shorterLen - 2) / 6;
  var eachCurveSubDivCount = Math.ceil(diff / shorterBezierCount) + 1;
  var newSubpath = [shorterPath[0], shorterPath[1]];
  var remained = diff;
  for (var i2 = 2; i2 < shorterLen; ) {
    var x0 = shorterPath[i2 - 2];
    var y0 = shorterPath[i2 - 1];
    var x1 = shorterPath[i2++];
    var y1 = shorterPath[i2++];
    var x2 = shorterPath[i2++];
    var y2 = shorterPath[i2++];
    var x3 = shorterPath[i2++];
    var y3 = shorterPath[i2++];
    if (remained <= 0) {
      newSubpath.push(x1, y1, x2, y2, x3, y3);
      continue;
    }
    var actualSubDivCount = Math.min(remained, eachCurveSubDivCount - 1) + 1;
    for (var k = 1; k <= actualSubDivCount; k++) {
      var p2 = k / actualSubDivCount;
      cubicSubdivide(x0, x1, x2, x3, p2, tmpSegX);
      cubicSubdivide(y0, y1, y2, y3, p2, tmpSegY);
      x0 = tmpSegX[3];
      y0 = tmpSegY[3];
      newSubpath.push(tmpSegX[1], tmpSegY[1], tmpSegX[2], tmpSegY[2], x0, y0);
      x1 = tmpSegX[5];
      y1 = tmpSegY[5];
      x2 = tmpSegX[6];
      y2 = tmpSegY[6];
    }
    remained -= actualSubDivCount - 1;
  }
  return shorterPath === subpath1 ? [newSubpath, subpath2] : [subpath1, newSubpath];
}
function createSubpath(lastSubpathSubpath, otherSubpath) {
  var len2 = lastSubpathSubpath.length;
  var lastX = lastSubpathSubpath[len2 - 2];
  var lastY = lastSubpathSubpath[len2 - 1];
  var newSubpath = [];
  for (var i2 = 0; i2 < otherSubpath.length; ) {
    newSubpath[i2++] = lastX;
    newSubpath[i2++] = lastY;
  }
  return newSubpath;
}
function alignBezierCurves(array1, array22) {
  var _a;
  var lastSubpath1;
  var lastSubpath2;
  var newArray1 = [];
  var newArray2 = [];
  for (var i2 = 0; i2 < Math.max(array1.length, array22.length); i2++) {
    var subpath1 = array1[i2];
    var subpath2 = array22[i2];
    var newSubpath1 = void 0;
    var newSubpath2 = void 0;
    if (!subpath1) {
      newSubpath1 = createSubpath(lastSubpath1 || subpath2, subpath2);
      newSubpath2 = subpath2;
    } else if (!subpath2) {
      newSubpath2 = createSubpath(lastSubpath2 || subpath1, subpath1);
      newSubpath1 = subpath1;
    } else {
      _a = alignSubpath(subpath1, subpath2), newSubpath1 = _a[0], newSubpath2 = _a[1];
      lastSubpath1 = newSubpath1;
      lastSubpath2 = newSubpath2;
    }
    newArray1.push(newSubpath1);
    newArray2.push(newSubpath2);
  }
  return [newArray1, newArray2];
}
function centroid(array4) {
  var signedArea = 0;
  var cx = 0;
  var cy = 0;
  var len2 = array4.length;
  for (var i2 = 0, j = len2 - 2; i2 < len2; j = i2, i2 += 2) {
    var x0 = array4[j];
    var y0 = array4[j + 1];
    var x1 = array4[i2];
    var y1 = array4[i2 + 1];
    var a2 = x0 * y1 - x1 * y0;
    signedArea += a2;
    cx += (x0 + x1) * a2;
    cy += (y0 + y1) * a2;
  }
  if (signedArea === 0) {
    return [array4[0] || 0, array4[1] || 0];
  }
  return [cx / signedArea / 3, cy / signedArea / 3, signedArea];
}
function findBestRingOffset(fromSubBeziers, toSubBeziers, fromCp, toCp) {
  var bezierCount = (fromSubBeziers.length - 2) / 6;
  var bestScore = Infinity;
  var bestOffset = 0;
  var len2 = fromSubBeziers.length;
  var len22 = len2 - 2;
  for (var offset = 0; offset < bezierCount; offset++) {
    var cursorOffset = offset * 6;
    var score = 0;
    for (var k = 0; k < len2; k += 2) {
      var idx = k === 0 ? cursorOffset : (cursorOffset + k - 2) % len22 + 2;
      var x0 = fromSubBeziers[idx] - fromCp[0];
      var y0 = fromSubBeziers[idx + 1] - fromCp[1];
      var x1 = toSubBeziers[k] - toCp[0];
      var y1 = toSubBeziers[k + 1] - toCp[1];
      var dx = x1 - x0;
      var dy = y1 - y0;
      score += dx * dx + dy * dy;
    }
    if (score < bestScore) {
      bestScore = score;
      bestOffset = offset;
    }
  }
  return bestOffset;
}
function reverse(array4) {
  var newArr = [];
  var len2 = array4.length;
  for (var i2 = 0; i2 < len2; i2 += 2) {
    newArr[i2] = array4[len2 - i2 - 2];
    newArr[i2 + 1] = array4[len2 - i2 - 1];
  }
  return newArr;
}
function findBestMorphingRotation(fromArr, toArr, searchAngleIteration, searchAngleRange) {
  var result = [];
  var fromNeedsReverse;
  for (var i2 = 0; i2 < fromArr.length; i2++) {
    var fromSubpathBezier = fromArr[i2];
    var toSubpathBezier = toArr[i2];
    var fromCp = centroid(fromSubpathBezier);
    var toCp = centroid(toSubpathBezier);
    if (fromNeedsReverse == null) {
      fromNeedsReverse = fromCp[2] < 0 !== toCp[2] < 0;
    }
    var newFromSubpathBezier = [];
    var newToSubpathBezier = [];
    var bestAngle = 0;
    var bestScore = Infinity;
    var tmpArr = [];
    var len2 = fromSubpathBezier.length;
    if (fromNeedsReverse) {
      fromSubpathBezier = reverse(fromSubpathBezier);
    }
    var offset = findBestRingOffset(fromSubpathBezier, toSubpathBezier, fromCp, toCp) * 6;
    var len22 = len2 - 2;
    for (var k = 0; k < len22; k += 2) {
      var idx = (offset + k) % len22 + 2;
      newFromSubpathBezier[k + 2] = fromSubpathBezier[idx] - fromCp[0];
      newFromSubpathBezier[k + 3] = fromSubpathBezier[idx + 1] - fromCp[1];
    }
    newFromSubpathBezier[0] = fromSubpathBezier[offset] - fromCp[0];
    newFromSubpathBezier[1] = fromSubpathBezier[offset + 1] - fromCp[1];
    if (searchAngleIteration > 0) {
      var step = searchAngleRange / searchAngleIteration;
      for (var angle = -searchAngleRange / 2; angle <= searchAngleRange / 2; angle += step) {
        var sa = Math.sin(angle);
        var ca = Math.cos(angle);
        var score = 0;
        for (var k = 0; k < fromSubpathBezier.length; k += 2) {
          var x0 = newFromSubpathBezier[k];
          var y0 = newFromSubpathBezier[k + 1];
          var x1 = toSubpathBezier[k] - toCp[0];
          var y1 = toSubpathBezier[k + 1] - toCp[1];
          var newX1 = x1 * ca - y1 * sa;
          var newY1 = x1 * sa + y1 * ca;
          tmpArr[k] = newX1;
          tmpArr[k + 1] = newY1;
          var dx = newX1 - x0;
          var dy = newY1 - y0;
          score += dx * dx + dy * dy;
        }
        if (score < bestScore) {
          bestScore = score;
          bestAngle = angle;
          for (var m2 = 0; m2 < tmpArr.length; m2++) {
            newToSubpathBezier[m2] = tmpArr[m2];
          }
        }
      }
    } else {
      for (var i_1 = 0; i_1 < len2; i_1 += 2) {
        newToSubpathBezier[i_1] = toSubpathBezier[i_1] - toCp[0];
        newToSubpathBezier[i_1 + 1] = toSubpathBezier[i_1 + 1] - toCp[1];
      }
    }
    result.push({
      from: newFromSubpathBezier,
      to: newToSubpathBezier,
      fromCp,
      toCp,
      rotation: -bestAngle
    });
  }
  return result;
}
function isCombineMorphing(path) {
  return path.__isCombineMorphing;
}
var SAVED_METHOD_PREFIX = "__mOriginal_";
function saveAndModifyMethod(obj, methodName, modifiers) {
  var savedMethodName = SAVED_METHOD_PREFIX + methodName;
  var originalMethod = obj[savedMethodName] || obj[methodName];
  if (!obj[savedMethodName]) {
    obj[savedMethodName] = obj[methodName];
  }
  var replace = modifiers.replace;
  var after = modifiers.after;
  var before = modifiers.before;
  obj[methodName] = function() {
    var args = arguments;
    var res;
    before && before.apply(this, args);
    if (replace) {
      res = replace.apply(this, args);
    } else {
      res = originalMethod.apply(this, args);
    }
    after && after.apply(this, args);
    return res;
  };
}
function restoreMethod(obj, methodName) {
  var savedMethodName = SAVED_METHOD_PREFIX + methodName;
  if (obj[savedMethodName]) {
    obj[methodName] = obj[savedMethodName];
    obj[savedMethodName] = null;
  }
}
function applyTransformOnBeziers(bezierCurves, mm) {
  for (var i2 = 0; i2 < bezierCurves.length; i2++) {
    var subBeziers = bezierCurves[i2];
    for (var k = 0; k < subBeziers.length; ) {
      var x2 = subBeziers[k];
      var y2 = subBeziers[k + 1];
      subBeziers[k++] = mm[0] * x2 + mm[2] * y2 + mm[4];
      subBeziers[k++] = mm[1] * x2 + mm[3] * y2 + mm[5];
    }
  }
}
function prepareMorphPath(fromPath, toPath) {
  var fromPathProxy = fromPath.getUpdatedPathProxy();
  var toPathProxy = toPath.getUpdatedPathProxy();
  var _a = alignBezierCurves(pathToBezierCurves(fromPathProxy), pathToBezierCurves(toPathProxy)), fromBezierCurves = _a[0], toBezierCurves = _a[1];
  var fromPathTransform = fromPath.getComputedTransform();
  var toPathTransform = toPath.getComputedTransform();
  function updateIdentityTransform() {
    this.transform = null;
  }
  fromPathTransform && applyTransformOnBeziers(fromBezierCurves, fromPathTransform);
  toPathTransform && applyTransformOnBeziers(toBezierCurves, toPathTransform);
  saveAndModifyMethod(toPath, "updateTransform", { replace: updateIdentityTransform });
  toPath.transform = null;
  var morphingData = findBestMorphingRotation(fromBezierCurves, toBezierCurves, 10, Math.PI);
  var tmpArr = [];
  saveAndModifyMethod(toPath, "buildPath", { replace: function(path) {
    var t2 = toPath.__morphT;
    var onet = 1 - t2;
    var newCp = [];
    for (var i2 = 0; i2 < morphingData.length; i2++) {
      var item = morphingData[i2];
      var from = item.from;
      var to = item.to;
      var angle = item.rotation * t2;
      var fromCp = item.fromCp;
      var toCp = item.toCp;
      var sa = Math.sin(angle);
      var ca = Math.cos(angle);
      lerp$1(newCp, fromCp, toCp, t2);
      for (var m2 = 0; m2 < from.length; m2 += 2) {
        var x0_1 = from[m2];
        var y0_1 = from[m2 + 1];
        var x1 = to[m2];
        var y1 = to[m2 + 1];
        var x2 = x0_1 * onet + x1 * t2;
        var y2 = y0_1 * onet + y1 * t2;
        tmpArr[m2] = x2 * ca - y2 * sa + newCp[0];
        tmpArr[m2 + 1] = x2 * sa + y2 * ca + newCp[1];
      }
      var x0 = tmpArr[0];
      var y0 = tmpArr[1];
      path.moveTo(x0, y0);
      for (var m2 = 2; m2 < from.length; ) {
        var x1 = tmpArr[m2++];
        var y1 = tmpArr[m2++];
        var x22 = tmpArr[m2++];
        var y22 = tmpArr[m2++];
        var x3 = tmpArr[m2++];
        var y3 = tmpArr[m2++];
        if (x0 === x1 && y0 === y1 && x22 === x3 && y22 === y3) {
          path.lineTo(x3, y3);
        } else {
          path.bezierCurveTo(x1, y1, x22, y22, x3, y3);
        }
        x0 = x3;
        y0 = y3;
      }
    }
  } });
}
function morphPath(fromPath, toPath, animationOpts) {
  if (!fromPath || !toPath) {
    return toPath;
  }
  var oldDone = animationOpts.done;
  var oldDuring = animationOpts.during;
  prepareMorphPath(fromPath, toPath);
  toPath.__morphT = 0;
  function restoreToPath() {
    restoreMethod(toPath, "buildPath");
    restoreMethod(toPath, "updateTransform");
    toPath.__morphT = -1;
    toPath.createPathProxy();
    toPath.dirtyShape();
  }
  toPath.animateTo({
    __morphT: 1
  }, defaults({
    during: function(p2) {
      toPath.dirtyShape();
      oldDuring && oldDuring(p2);
    },
    done: function() {
      restoreToPath();
      oldDone && oldDone();
    }
  }, animationOpts));
  return toPath;
}
function hilbert(x2, y2, minX, minY, maxX, maxY) {
  var bits = 16;
  x2 = maxX === minX ? 0 : Math.round(32767 * (x2 - minX) / (maxX - minX));
  y2 = maxY === minY ? 0 : Math.round(32767 * (y2 - minY) / (maxY - minY));
  var d2 = 0;
  var tmp;
  for (var s2 = (1 << bits) / 2; s2 > 0; s2 /= 2) {
    var rx = 0;
    var ry = 0;
    if ((x2 & s2) > 0) {
      rx = 1;
    }
    if ((y2 & s2) > 0) {
      ry = 1;
    }
    d2 += s2 * s2 * (3 * rx ^ ry);
    if (ry === 0) {
      if (rx === 1) {
        x2 = s2 - 1 - x2;
        y2 = s2 - 1 - y2;
      }
      tmp = x2;
      x2 = y2;
      y2 = tmp;
    }
  }
  return d2;
}
function sortPaths(pathList) {
  var xMin = Infinity;
  var yMin = Infinity;
  var xMax = -Infinity;
  var yMax = -Infinity;
  var cps = map(pathList, function(path) {
    var rect = path.getBoundingRect();
    var m2 = path.getComputedTransform();
    var x2 = rect.x + rect.width / 2 + (m2 ? m2[4] : 0);
    var y2 = rect.y + rect.height / 2 + (m2 ? m2[5] : 0);
    xMin = Math.min(x2, xMin);
    yMin = Math.min(y2, yMin);
    xMax = Math.max(x2, xMax);
    yMax = Math.max(y2, yMax);
    return [x2, y2];
  });
  var items = map(cps, function(cp, idx) {
    return {
      cp,
      z: hilbert(cp[0], cp[1], xMin, yMin, xMax, yMax),
      path: pathList[idx]
    };
  });
  return items.sort(function(a2, b2) {
    return a2.z - b2.z;
  }).map(function(item) {
    return item.path;
  });
}
function defaultDividePath(param) {
  return split(param.path, param.count);
}
function createEmptyReturn() {
  return {
    fromIndividuals: [],
    toIndividuals: [],
    count: 0
  };
}
function combineMorph(fromList, toPath, animationOpts) {
  var fromPathList = [];
  function addFromPath(fromList2) {
    for (var i3 = 0; i3 < fromList2.length; i3++) {
      var from2 = fromList2[i3];
      if (isCombineMorphing(from2)) {
        addFromPath(from2.childrenRef());
      } else if (from2 instanceof Path$1) {
        fromPathList.push(from2);
      }
    }
  }
  addFromPath(fromList);
  var separateCount = fromPathList.length;
  if (!separateCount) {
    return createEmptyReturn();
  }
  var dividePath = animationOpts.dividePath || defaultDividePath;
  var toSubPathList = dividePath({
    path: toPath,
    count: separateCount
  });
  if (toSubPathList.length !== separateCount) {
    console.error("Invalid morphing: unmatched splitted path");
    return createEmptyReturn();
  }
  fromPathList = sortPaths(fromPathList);
  toSubPathList = sortPaths(toSubPathList);
  var oldDone = animationOpts.done;
  var oldDuring = animationOpts.during;
  var individualDelay = animationOpts.individualDelay;
  var identityTransform = new Transformable();
  for (var i2 = 0; i2 < separateCount; i2++) {
    var from = fromPathList[i2];
    var to = toSubPathList[i2];
    to.parent = toPath;
    to.copyTransform(identityTransform);
    if (!individualDelay) {
      prepareMorphPath(from, to);
    }
  }
  toPath.__isCombineMorphing = true;
  toPath.childrenRef = function() {
    return toSubPathList;
  };
  function addToSubPathListToZr(zr) {
    for (var i3 = 0; i3 < toSubPathList.length; i3++) {
      toSubPathList[i3].addSelfToZr(zr);
    }
  }
  saveAndModifyMethod(toPath, "addSelfToZr", {
    after: function(zr) {
      addToSubPathListToZr(zr);
    }
  });
  saveAndModifyMethod(toPath, "removeSelfFromZr", {
    after: function(zr) {
      for (var i3 = 0; i3 < toSubPathList.length; i3++) {
        toSubPathList[i3].removeSelfFromZr(zr);
      }
    }
  });
  function restoreToPath() {
    toPath.__isCombineMorphing = false;
    toPath.__morphT = -1;
    toPath.childrenRef = null;
    restoreMethod(toPath, "addSelfToZr");
    restoreMethod(toPath, "removeSelfFromZr");
  }
  var toLen = toSubPathList.length;
  if (individualDelay) {
    var animating_1 = toLen;
    var eachDone = function() {
      animating_1--;
      if (animating_1 === 0) {
        restoreToPath();
        oldDone && oldDone();
      }
    };
    for (var i2 = 0; i2 < toLen; i2++) {
      var indivdualAnimationOpts = individualDelay ? defaults({
        delay: (animationOpts.delay || 0) + individualDelay(i2, toLen, fromPathList[i2], toSubPathList[i2]),
        done: eachDone
      }, animationOpts) : animationOpts;
      morphPath(fromPathList[i2], toSubPathList[i2], indivdualAnimationOpts);
    }
  } else {
    toPath.__morphT = 0;
    toPath.animateTo({
      __morphT: 1
    }, defaults({
      during: function(p2) {
        for (var i3 = 0; i3 < toLen; i3++) {
          var child = toSubPathList[i3];
          child.__morphT = toPath.__morphT;
          child.dirtyShape();
        }
        oldDuring && oldDuring(p2);
      },
      done: function() {
        restoreToPath();
        for (var i3 = 0; i3 < fromList.length; i3++) {
          restoreMethod(fromList[i3], "updateTransform");
        }
        oldDone && oldDone();
      }
    }, animationOpts));
  }
  if (toPath.__zr) {
    addToSubPathListToZr(toPath.__zr);
  }
  return {
    fromIndividuals: fromPathList,
    toIndividuals: toSubPathList,
    count: toLen
  };
}
function separateMorph(fromPath, toPathList, animationOpts) {
  var toLen = toPathList.length;
  var fromPathList = [];
  var dividePath = animationOpts.dividePath || defaultDividePath;
  function addFromPath(fromList) {
    for (var i3 = 0; i3 < fromList.length; i3++) {
      var from = fromList[i3];
      if (isCombineMorphing(from)) {
        addFromPath(from.childrenRef());
      } else if (from instanceof Path$1) {
        fromPathList.push(from);
      }
    }
  }
  if (isCombineMorphing(fromPath)) {
    addFromPath(fromPath.childrenRef());
    var fromLen = fromPathList.length;
    if (fromLen < toLen) {
      var k = 0;
      for (var i2 = fromLen; i2 < toLen; i2++) {
        fromPathList.push(clonePath(fromPathList[k++ % fromLen]));
      }
    }
    fromPathList.length = toLen;
  } else {
    fromPathList = dividePath({ path: fromPath, count: toLen });
    var fromPathTransform = fromPath.getComputedTransform();
    for (var i2 = 0; i2 < fromPathList.length; i2++) {
      fromPathList[i2].setLocalTransform(fromPathTransform);
    }
    if (fromPathList.length !== toLen) {
      console.error("Invalid morphing: unmatched splitted path");
      return createEmptyReturn();
    }
  }
  fromPathList = sortPaths(fromPathList);
  toPathList = sortPaths(toPathList);
  var individualDelay = animationOpts.individualDelay;
  for (var i2 = 0; i2 < toLen; i2++) {
    var indivdualAnimationOpts = individualDelay ? defaults({
      delay: (animationOpts.delay || 0) + individualDelay(i2, toLen, fromPathList[i2], toPathList[i2])
    }, animationOpts) : animationOpts;
    morphPath(fromPathList[i2], toPathList[i2], indivdualAnimationOpts);
  }
  return {
    fromIndividuals: fromPathList,
    toIndividuals: toPathList,
    count: toPathList.length
  };
}
export { OrientedBoundingRect$1 as $, subPixelOptimize as A, identity as B, mul as C, invert as D, Circle$1 as E, Ellipse$1 as F, Polygon$1 as G, Polyline$1 as H, Rect$1 as I, Line$1 as J, BezierCurve$1 as K, LRU$1 as L, Arc$1 as M, extendFromString as N, Group$1 as O, Path$1 as P, ZRText$1 as Q, Ring$1 as R, Sector$1 as S, Transformable as T, IncrementalDisplayable$1 as U, CompoundPath$1 as V, LinearGradient$1 as W, RadialGradient$1 as X, BoundingRect$1 as Y, ZRImage$1 as Z, __extends as _, indexOf as a, debounce as a$, Point$1 as a0, trim as a1, merge as a2, clone$2 as a3, mixin as a4, normalizeCssArray as a5, curry as a6, isTypedArray as a7, filter as a8, bind2 as a9, fastLerp as aA, stringify as aB, modifyHSL as aC, modifyAlpha as aD, parse as aE, normalize as aF, sub as aG, PathProxy$1 as aH, cubicRootAt as aI, cubicAt as aJ, lerp as aK, find as aL, CanvasPainter$1 as aM, isCombineMorphing as aN, morphPath as aO, combineMorph as aP, separateMorph as aQ, clonePath as aR, Displayable$1 as aS, isNil as aT, get as aU, set as aV, fromPairs as aW, m$3 as aX, N$2 as aY, Ee as aZ, yn as a_, setAsPrimitive as aa, reduce as ab, concatArray as ac, noop as ad, calculateTextPosition as ae, WeakMap$1 as af, platformApi as ag, brushSingle as ah, Eventful$1 as ai, init as aj, sort as ak, slice as al, eqNaN as am, parsePercent as an, registerPainter as ao, getBoundingRect as ap, retrieve as aq, rotate as ar, stop as as, translate as at, create as au, isMiddleOrRightButtonOnMouseUpDown as av, isDom as aw, addEventListener as ax, normalizeEvent as ay, transformLocalCoord as az, assert as b, TinyColor as b0, isEqual$1 as b1, dayjs as b2, W as b3, union$1 as b4, customParseFormat as b5, localeData as b6, throttle as b7, flattenDeep as b8, castArray as b9, advancedFormat as ba, weekOfYear as bb, weekYear as bc, dayOfYear as bd, isSameOrAfter as be, isSameOrBefore as bf, clone$3 as bg, Schema as bh, memoize as bi, memoizeOne as bj, escapeHtml_1 as bk, T$2 as bl, pick$1 as bm, getAugmentedNamespace as bn, commonjsGlobal as bo, getDefaultExportFromCjs as bp, axios as bq, createHashMap as c, isObject as d, each as e, isNumber as f, isStringSafe as g, isArray as h, isString as i, env$1 as j, isFunction as k, inherits as l, map as m, extend as n, isArrayLike as o, keys as p, lift as q, isGradientObject as r, retrieve2 as s, defaults as t, hasOwn as u, applyTransform as v, createFromString as w, mergePath as x, subPixelOptimizeLine as y, subPixelOptimizeRect as z };

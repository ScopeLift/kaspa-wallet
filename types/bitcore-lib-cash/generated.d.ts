// /**
//  * Instantiate an address from an address String or Buffer, a public key or script hash Buffer,
//  * or an instance of {@link PublicKey} or {@link Script}.
//  *
//  * This is an immutable class, and if the first parameter provided to this constructor is an
//  * `Address` instance, the same argument will be returned.
//  *
//  * An address has two key properties: `network` and `type`. The type is either
//  * `Address.PayToPublicKeyHash` (value is the `'pubkeyhash'` string)
//  * or `Address.PayToScriptHash` (the string `'scripthash'`). The network is an instance of {@link Network}.
//  * You can quickly check whether an address is of a given kind by using the methods
//  * `isPayToPublicKeyHash` and `isPayToScriptHash`
//  * @example
//  * ```javascript
//  * // validate that an input field is valid
//  * var error = Address.getValidationError(input, 'testnet');
//  * if (!error) {
//  *   var address = Address(input, 'testnet');
//  * } else {
//  *   // invalid network or checksum (typo?)
//  *   var message = error.messsage;
//  * }
//  *
//  * // get an address from a public key
//  * var address = Address(publicKey, 'testnet').toString();
//  * ```
//  * @param data - The encoded data in various formats
//  * @param network - The network: 'livenet' or 'testnet'
//  * @param [type] - The type of address: 'script' or 'pubkey'
//  */
// declare class Address {
//     constructor(data: any, network: Network | string | number, type?: string);
//     /**
//      * Internal function used to split different kinds of arguments of the constructor
//      * @param data - The encoded data in various formats
//      * @param network - The network: 'livenet' or 'testnet'
//      * @param [type] - The type of address: 'script' or 'pubkey'
//      * @returns An "info" object with "type", "network", and "hashBuffer"
//      */
//     _classifyArguments(data: any, network: Network | string | number, type?: string): any;
//     static PayToPublicKeyHash: any;
//     static PayToScriptHash: any;
//     /**
//      * Deserializes an address serialized through `Address#toObject()`
//      * @param data.hash - the hash that this address encodes
//      * @param data.type - either 'pubkeyhash' or 'scripthash'
//      * @param [data.network] - the name of the network associated
//      */
//     static _transformObject(data: {
//         hash: string;
//         type: string;
//         network?: Network;
//     }): Address;
//     /**
//      * Creates a P2SH address from a set of public keys and a threshold.
//      *
//      * The addresses will be sorted lexicographically, as that is the trend in bitcoin.
//      * To create an address from unsorted public keys, use the {@link Script#buildMultisigOut}
//      * interface.
//      * @param publicKeys - a set of public keys to create an address
//      * @param threshold - the number of signatures needed to release the funds
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      */
//     static createMultisig(publicKeys: any[], threshold: number, network: string | Network): Address;
//     /**
//      * Instantiate an address from a PublicKey instance
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static fromPublicKey(data: PublicKey, network: string | Network): Address;
//     /**
//      * Instantiate an address from a ripemd160 public key hash
//      * @param hash - An instance of buffer of the hash
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static fromPublicKeyHash(hash: Buffer, network: string | Network): Address;
//     /**
//      * Instantiate an address from a ripemd160 script hash
//      * @param hash - An instance of buffer of the hash
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static fromScriptHash(hash: Buffer, network: string | Network): Address;
//     /**
//      * Builds a p2sh address paying to script. This will hash the script and
//      * use that to create the address.
//      * If you want to extract an address associated with a script instead,
//      * see {{Address#fromScript}}
//      * @param script - An instance of Script
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static payingTo(script: Script, network: string | Network): Address;
//     /**
//      * Extract address from a Script. The script must be of one
//      * of the following types: p2pkh input, p2pkh output, p2sh input
//      * or p2sh output.
//      * This will analyze the script and extract address information from it.
//      * If you want to transform any script to a p2sh Address paying
//      * to that script's hash instead, use {{Address#payingTo}}
//      * @param script - An instance of Script
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static fromScript(script: Script, network: string | Network): Address;
//     /**
//      * Instantiate an address from a buffer of the address
//      * @param buffer - An instance of buffer of the address
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @param [type] - The type of address: 'script' or 'pubkey'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static fromBuffer(buffer: Buffer, network: string | Network, type?: string): Address;
//     /**
//      * Instantiate an address from an address string
//      * @param str - An string of the bitcoin address
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @param [type] - The type of address: 'script' or 'pubkey'
//      * @returns A new valid and frozen instance of an Address
//      */
//     static fromString(str: string, network: string | Network, type?: string): Address;
//     /**
//      * Instantiate an address from an Object
//      * @param json - An JSON string or Object with keys: hash, network and type
//      * @returns A new valid instance of an Address
//      */
//     static fromObject(json: string): Address;
//     /**
//      * Will return a validation error if exists
//      * @example
//      * ```javascript
//      * // a network mismatch error
//      * var error = Address.getValidationError('15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2', 'testnet');
//      * ```
//      * @param data - The encoded data
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @param type - The type of address: 'script' or 'pubkey'
//      * @returns The corresponding error message
//      */
//     static getValidationError(data: string, network: string | Network, type: string): null | Error;
//     /**
//      * Will return a boolean if an address is valid
//      * @example
//      * ```javascript
//      * assert(Address.isValid('15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2', 'livenet'));
//      * ```
//      * @param data - The encoded data
//      * @param network - either a Network instance, 'livenet', or 'testnet'
//      * @param type - The type of address: 'script' or 'pubkey'
//      * @returns The corresponding error message
//      */
//     static isValid(data: string, network: string | Network, type: string): boolean;
//     /**
//      * Returns true if an address is of pay to public key hash type
//      * @returns boolean
//      */
//     isPayToPublicKeyHash(): any;
//     /**
//      * Returns true if an address is of pay to script hash type
//      * @returns boolean
//      */
//     isPayToScriptHash(): any;
//     /**
//      * Will return a buffer representation of the address
//      * @returns Bitcoin address buffer
//      */
//     toBuffer(): Buffer;
//     toObject: any;
//     /**
//      * Will return a string formatted for the console
//      * @returns Bitcoin address
//      */
//     inspect(): string;
//     /**
//      * Will return a the base58 (legacy) string representation of the address
//      * @returns Bitcoin address
//      */
//     toLegacyAddress(): string;
//     /**
//      * Will return a cashaddr representation of the address. Always return lower case
//      * Can be converted by the caller to uppercase is needed (still valid).
//      * @returns Bitcoin Cash address
//      */
//     toCashAddress(): string;
//     /**
//      * Will return a string representation of the address (defaults to CashAddr format)
//      */
//     toString: any;
// }

// /**
//  * Instantiate a Block from a Buffer, JSON object, or Object with
//  * the properties of the Block
//  * @param arg - A Buffer, JSON string, or Object
//  */
// declare class Block {
//     constructor(arg: any);
//     /**
//      * @param obj - A plain JavaScript object
//      * @returns - An instance of block
//      */
//     static fromObject(obj: any): Block;
//     /**
//      * @param br - A buffer reader of the block
//      * @returns - An instance of block
//      */
//     static fromBufferReader(br: BufferReader): Block;
//     /**
//      * @param buf - A buffer of the block
//      * @returns - An instance of block
//      */
//     static fromBuffer(buf: Buffer): Block;
//     /**
//      * @param str - str - A hex encoded string of the block
//      * @returns - A hex encoded string of the block
//      */
//     static fromString(str: string): Block;
//     /**
//      * @param data - Raw block binary data or buffer
//      * @returns - An instance of block
//      */
//     static fromRawBlock(data: Binary): Block;
//     toObject: any;
//     /**
//      * @returns - A buffer of the block
//      */
//     toBuffer(): Buffer;
//     /**
//      * @returns - A hex encoded string of the block
//      */
//     toString(): string;
//     /**
//      * @param bw - An existing instance of BufferWriter
//      * @returns - An instance of BufferWriter representation of the Block
//      */
//     toBufferWriter(bw: BufferWriter): BufferWriter;
//     /**
//      * Will iterate through each transaction and return an array of hashes
//      * @returns - An array with transaction hashes
//      */
//     getTransactionHashes(): any[];
//     /**
//      * Will build a merkle tree of all the transactions, ultimately arriving at
//      * a single point, the merkle root.
//      * @returns - An array with each level of the tree after the other.
//      */
//     getMerkleTree(): any[];
//     /**
//      * Calculates the merkleRoot from the transactions.
//      * @returns - A buffer of the merkle root hash
//      */
//     getMerkleRoot(): Buffer;
//     /**
//      * Verifies that the transactions in the block match the header merkle root
//      * @returns - If the merkle roots match
//      */
//     validMerkleRoot(): boolean;
//     /**
//      * @returns - The little endian hash buffer of the header
//      */
//     _getHash(): Buffer;
//     /**
//      * @returns - A string formatted for the console
//      */
//     inspect(): string;
// }

// /**
//  * Instantiate a BlockHeader from a Buffer, JSON object, or Object with
//  * the properties of the BlockHeader
//  * @param undefined - A Buffer, JSON string, or Object
//  */
// declare class BlockHeader {
//     constructor();
//     /**
//      * @param obj - A plain JavaScript object
//      * @returns - An instance of block header
//      */
//     static fromObject(obj: any): BlockHeader;
//     /**
//      * @param data - Raw block binary data or buffer
//      * @returns - An instance of block header
//      */
//     static fromRawBlock(data: Binary): BlockHeader;
//     /**
//      * @param buf - A buffer of the block header
//      * @returns - An instance of block header
//      */
//     static fromBuffer(buf: Buffer): BlockHeader;
//     /**
//      * @param str - A hex encoded buffer of the block header
//      * @returns - An instance of block header
//      */
//     static fromString(str: string): BlockHeader;
//     /**
//      * @param br - A BufferReader of the block header
//      * @returns - An instance of block header
//      */
//     static fromBufferReader(br: BufferReader): BlockHeader;
//     toObject: any;
//     /**
//      * @returns - A Buffer of the BlockHeader
//      */
//     toBuffer(): Buffer;
//     /**
//      * @returns - A hex encoded string of the BlockHeader
//      */
//     toString(): string;
//     /**
//      * @param bw - An existing instance BufferWriter
//      * @returns - An instance of BufferWriter representation of the BlockHeader
//      */
//     toBufferWriter(bw: BufferWriter): BufferWriter;
//     /**
//      * Returns the target difficulty for this block
//      * @returns An instance of BN with the decoded difficulty bits
//      */
//     getTargetDifficulty(bits: number): BN;
//     getDifficulty(): number;
//     /**
//      * @returns - The little endian hash buffer of the header
//      */
//     _getHash(): Buffer;
//     /**
//      * @returns - If timestamp is not too far in the future
//      */
//     validTimestamp(): boolean;
//     /**
//      * @returns - If the proof-of-work hash satisfies the target difficulty
//      */
//     validProofOfWork(): boolean;
//     /**
//      * @returns - A string formatted for the console
//      */
//     inspect(): string;
// }

// /**
//  * Instantiate a MerkleBlock from a Buffer, JSON object, or Object with
//  * the properties of the Block
//  * @param arg - A Buffer, JSON string, or Object representing a MerkleBlock
//  */
// declare class MerkleBlock {
//     constructor(arg: any);
//     header: BlockHeader;
//     numTransactions: number;
//     hashes: String[];
//     flags: Number[];
//     /**
//      * @param buf - MerkleBlock data in a Buffer object
//      * @returns - A MerkleBlock object
//      */
//     static fromBuffer(buf: Buffer): MerkleBlock;
//     /**
//      * @param br - MerkleBlock data in a BufferReader object
//      * @returns - A MerkleBlock object
//      */
//     static fromBufferReader(br: BufferReader): MerkleBlock;
//     /**
//      * @returns - A buffer of the block
//      */
//     toBuffer(): Buffer;
//     /**
//      * @param bw - An existing instance of BufferWriter
//      * @returns - An instance of BufferWriter representation of the MerkleBlock
//      */
//     toBufferWriter(bw: BufferWriter): BufferWriter;
//     toObject: any;
//     /**
//      * Verify that the MerkleBlock is valid
//      * @returns - True/False whether this MerkleBlock is Valid
//      */
//     validMerkleTree(): boolean;
//     /**
//      * Return a list of all the txs hash that match the filter
//      * @returns - txs hash that match the filter
//      */
//     filterdTxsHash(): any[];
//     /**
//      * @param obj - A plain JavaScript object
//      * @returns - An instance of block
//      */
//     static fromObject(obj: any): Block;
// }

// /**
//  * Instantiate a valid secp256k1 Point from the X and Y coordinates.
//  * @param x - The X coordinate
//  * @param y - The Y coordinate
//  */
// declare class Point extends elliptic.curve.point {
//     constructor(x: BN | string, y: BN | string);
//     /**
//      * Instantiate a valid secp256k1 Point from only the X coordinate
//      * @param odd - If the Y coordinate is odd
//      * @param x - The X coordinate
//      * @returns An instance of Point
//      */
//     static fromX(odd: boolean, x: BN | string): Point;
//     /**
//      * Will return a secp256k1 ECDSA base point.
//      * @returns An instance of the base point.
//      */
//     static getG(): Point;
//     /**
//      * Will return the max of range of valid private keys as governed by the secp256k1 ECDSA standard.
//      * @returns A BN instance of the number of points on the curve
//      */
//     static getN(): BN;
//     /**
//      * Will return the X coordinate of the Point
//      * @returns A BN instance of the X coordinate
//      */
//     getX(): BN;
//     /**
//      * Will return the Y coordinate of the Point
//      * @returns A BN instance of the Y coordinate
//      */
//     getY(): BN;
//     /**
//      * Will determine if the point is valid
//      * @param An - instance of Point
//      * @returns An instance of the same Point
//      */
//     validate(An: Point): Point;
// }

// /**
//  * RFC6979 deterministic nonce generation used from https://reviews.bitcoinabc.org/D2501
//  * @returns k
//  */
// declare function nonceFunctionRFC6979(privkeybuf: Buffer, msgbuf: Buffer): BN;

// /**
//  * Represents an instance of an hierarchically derived private key.
//  *
//  * More info on https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
//  */
// declare class HDPrivateKey {
//     constructor(arg: string | Buffer | any);
//     /**
//      * Verifies that a given path is valid.
//      */
//     static isValidPath(arg: string | number, hardened: boolean): boolean;
//     /**
//      * Internal function that splits a string path into a derivation index array.
//      * It will return null if the string path is malformed.
//      * It does not validate if indexes are in bounds.
//      */
//     static _getDerivationIndexes(path: string): any[];
//     /**
//      * WARNING: This method is deprecated. Use deriveChild or deriveNonCompliantChild instead. This is not BIP32 compliant
//      *
//      *
//      * Get a derived child based on a string or number.
//      *
//      * If the first argument is a string, it's parsed as the full path of
//      * derivation. Valid values for this argument include "m" (which returns the
//      * same private key), "m/0/1/40/2'/1000", where the ' quote means a hardened
//      * derivation.
//      *
//      * If the first argument is a number, the child with that index will be
//      * derived. If the second argument is truthy, the hardened version will be
//      * derived. See the example usage for clarification.
//      * @example
//      * ```javascript
//      * var parent = new HDPrivateKey('xprv...');
//      * var child_0_1_2h = parent.derive(0).derive(1).derive(2, true);
//      * var copy_of_child_0_1_2h = parent.derive("m/0/1/2'");
//      * assert(child_0_1_2h.xprivkey === copy_of_child_0_1_2h);
//      * ```
//      */
//     derive(arg: string | number, hardened: boolean): void;
//     /**
//      * WARNING: This method will not be officially supported until v1.0.0.
//      *
//      *
//      * Get a derived child based on a string or number.
//      *
//      * If the first argument is a string, it's parsed as the full path of
//      * derivation. Valid values for this argument include "m" (which returns the
//      * same private key), "m/0/1/40/2'/1000", where the ' quote means a hardened
//      * derivation.
//      *
//      * If the first argument is a number, the child with that index will be
//      * derived. If the second argument is truthy, the hardened version will be
//      * derived. See the example usage for clarification.
//      *
//      * WARNING: The `nonCompliant` option should NOT be used, except for older implementation
//      * that used a derivation strategy that used a non-zero padded private key.
//      * @example
//      * ```javascript
//      * var parent = new HDPrivateKey('xprv...');
//      * var child_0_1_2h = parent.deriveChild(0).deriveChild(1).deriveChild(2, true);
//      * var copy_of_child_0_1_2h = parent.deriveChild("m/0/1/2'");
//      * assert(child_0_1_2h.xprivkey === copy_of_child_0_1_2h);
//      * ```
//      */
//     deriveChild(arg: string | number, hardened: boolean): void;
//     /**
//      * WARNING: This method will not be officially supported until v1.0.0
//      *
//      *
//      * WARNING: If this is a new implementation you should NOT use this method, you should be using
//      * `derive` instead.
//      *
//      * This method is explicitly for use and compatibility with an implementation that
//      * was not compliant with BIP32 regarding the derivation algorithm. The private key
//      * must be 32 bytes hashing, and this implementation will use the non-zero padded
//      * serialization of a private key, such that it's still possible to derive the privateKey
//      * to recover those funds.
//      */
//     deriveNonCompliantChild(arg: string | number, hardened: boolean): void;
//     /**
//      * Verifies that a given serialized private key in base58 with checksum format
//      * is valid.
//      * @param data - the serialized private key
//      * @param network - optional, if present, checks that the
//      *     network provided matches the network serialized.
//      */
//     static isValidSerialized(data: string | Buffer, network: string | Network): boolean;
//     /**
//      * Checks what's the error that causes the validation of a serialized private key
//      * in base58 with checksum to fail.
//      * @param data - the serialized private key
//      * @param network - optional, if present, checks that the
//      *     network provided matches the network serialized.
//      */
//     static getSerializedError(data: string | Buffer, network: string | Network): errors.InvalidArgument | null;
//     /**
//      * Generate a private key from a seed, as described in BIP32
//      * @returns HDPrivateKey
//      */
//     static fromSeed(hexa: string | Buffer, network: any): any;
//     /**
//      * Receives a object with buffers in all the properties and populates the
//      * internal structure
//      * @param [arg.xprivkey] - if set, don't recalculate the base58
//      *      representation
//      * @returns this
//      */
//     _buildFromBuffers(arg: {
//         version: buffer.Buffer;
//         depth: buffer.Buffer;
//         parentFingerPrint: buffer.Buffer;
//         childIndex: buffer.Buffer;
//         chainCode: buffer.Buffer;
//         privateKey: buffer.Buffer;
//         checksum: buffer.Buffer;
//         xprivkey?: string;
//     }): HDPrivateKey;
//     /**
//      * Returns the string representation of this private key (a string starting
//      * with "xprv..."
//      * @returns string
//      */
//     toString(): any;
//     /**
//      * Returns the console representation of this extended private key.
//      * @returns string
//      */
//     inspect(): any;
//     /**
//      * Returns a plain object with a representation of this private key.
//      *
//      * Fields include:<ul>
//      * <li> network: either 'livenet' or 'testnet'
//      * <li> depth: a number ranging from 0 to 255
//      * <li> fingerPrint: a number ranging from 0 to 2^32-1, taken from the hash of the
//      * <li>     associated public key
//      * <li> parentFingerPrint: a number ranging from 0 to 2^32-1, taken from the hash
//      * <li>     of this parent's associated public key or zero.
//      * <li> childIndex: the index from which this child was derived (or zero)
//      * <li> chainCode: an hexa string representing a number used in the derivation
//      * <li> privateKey: the private key associated, in hexa representation
//      * <li> xprivkey: the representation of this extended private key in checksum
//      * <li>     base58 format
//      * <li> checksum: the base58 checksum of xprivkey
//      * </ul>
//      */
//     toObject: any;
//     /**
//      * Build a HDPrivateKey from a buffer
//      */
//     static fromBuffer(arg: Buffer): HDPrivateKey;
//     /**
//      * Returns a buffer representation of the HDPrivateKey
//      */
//     toBuffer(): string;
// }

// /**
//  * The representation of an hierarchically derived public key.
//  *
//  * See https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
//  */
// declare class HDPublicKey {
//     constructor(arg: any | string | Buffer);
//     /**
//      * Verifies that a given path is valid.
//      */
//     static isValidPath(arg: string | number): boolean;
//     /**
//      * WARNING: This method is deprecated. Use deriveChild instead.
//      *
//      *
//      * Get a derivated child based on a string or number.
//      *
//      * If the first argument is a string, it's parsed as the full path of
//      * derivation. Valid values for this argument include "m" (which returns the
//      * same public key), "m/0/1/40/2/1000".
//      *
//      * Note that hardened keys can't be derived from a public extended key.
//      *
//      * If the first argument is a number, the child with that index will be
//      * derived. See the example usage for clarification.
//      * @example
//      * ```javascript
//      * var parent = new HDPublicKey('xpub...');
//      * var child_0_1_2 = parent.derive(0).derive(1).derive(2);
//      * var copy_of_child_0_1_2 = parent.derive("m/0/1/2");
//      * assert(child_0_1_2.xprivkey === copy_of_child_0_1_2);
//      * ```
//      */
//     derive(arg: string | number): void;
//     /**
//      * WARNING: This method will not be officially supported until v1.0.0.
//      *
//      *
//      * Get a derivated child based on a string or number.
//      *
//      * If the first argument is a string, it's parsed as the full path of
//      * derivation. Valid values for this argument include "m" (which returns the
//      * same public key), "m/0/1/40/2/1000".
//      *
//      * Note that hardened keys can't be derived from a public extended key.
//      *
//      * If the first argument is a number, the child with that index will be
//      * derived. See the example usage for clarification.
//      * @example
//      * ```javascript
//      * var parent = new HDPublicKey('xpub...');
//      * var child_0_1_2 = parent.deriveChild(0).deriveChild(1).deriveChild(2);
//      * var copy_of_child_0_1_2 = parent.deriveChild("m/0/1/2");
//      * assert(child_0_1_2.xprivkey === copy_of_child_0_1_2);
//      * ```
//      */
//     deriveChild(arg: string | number): void;
//     /**
//      * Verifies that a given serialized public key in base58 with checksum format
//      * is valid.
//      * @param data - the serialized public key
//      * @param network - optional, if present, checks that the
//      *     network provided matches the network serialized.
//      */
//     static isValidSerialized(data: string | Buffer, network: string | Network): boolean;
//     /**
//      * Checks what's the error that causes the validation of a serialized public key
//      * in base58 with checksum to fail.
//      * @param data - the serialized public key
//      * @param network - optional, if present, checks that the
//      *     network provided matches the network serialized.
//      */
//     static getSerializedError(data: string | Buffer, network: string | Network): errors | null;
//     /**
//      * Receives a object with buffers in all the properties and populates the
//      * internal structure
//      * @param [arg.xpubkey] - if set, don't recalculate the base58
//      *      representation
//      * @returns this
//      */
//     _buildFromBuffers(arg: {
//         version: buffer.Buffer;
//         depth: buffer.Buffer;
//         parentFingerPrint: buffer.Buffer;
//         childIndex: buffer.Buffer;
//         chainCode: buffer.Buffer;
//         publicKey: buffer.Buffer;
//         checksum: buffer.Buffer;
//         xpubkey?: string;
//     }): HDPublicKey;
//     /**
//      * Returns the base58 checked representation of the public key
//      * @returns a string starting with "xpub..." in livenet
//      */
//     toString(): string;
//     /**
//      * Returns the console representation of this extended public key.
//      * @returns string
//      */
//     inspect(): any;
//     /**
//      * Returns a plain JavaScript object with information to reconstruct a key.
//      *
//      * Fields are: <ul>
//      *  <li> network: 'livenet' or 'testnet'
//      *  <li> depth: a number from 0 to 255, the depth to the master extended key
//      *  <li> fingerPrint: a number of 32 bits taken from the hash of the public key
//      *  <li> fingerPrint: a number of 32 bits taken from the hash of this key's
//      *  <li>     parent's public key
//      *  <li> childIndex: index with which this key was derived
//      *  <li> chainCode: string in hexa encoding used for derivation
//      *  <li> publicKey: string, hexa encoded, in compressed key format
//      *  <li> checksum: BufferUtil.integerFromBuffer(this._buffers.checksum),
//      *  <li> xpubkey: the string with the base58 representation of this extended key
//      *  <li> checksum: the base58 checksum of xpubkey
//      * </ul>
//      */
//     toObject: any;
//     /**
//      * Create a HDPublicKey from a buffer argument
//      */
//     static fromBuffer(arg: Buffer): HDPublicKey;
//     /**
//      * Return a buffer representation of the xpubkey
//      */
//     toBuffer(): Buffer;
// }

// /**
//  * A network is merely a map containing values that correspond to version
//  * numbers for each bitcoin network. Currently only supporting "livenet"
//  * (a.k.a. "mainnet") and "testnet".
//  */
// declare class Network {
//     constructor();
// }

// declare namespace Networks {
//     var get: any;
//     var add: any;
//     var remove: any;
//     var enableRegtest: any;
//     var disableRegtest: any;
// }

// /**
//  * Instantiate a PrivateKey from a BN, Buffer and WIF.
//  * @example
//  * ```javascript
//  * // generate a new random key
//  * var key = PrivateKey();
//  *
//  * // get the associated address
//  * var address = key.toAddress();
//  *
//  * // encode into wallet export format
//  * var exported = key.toWIF();
//  *
//  * // instantiate from the exported (and saved) private key
//  * var imported = PrivateKey.fromWIF(exported);
//  * ```
//  * @param data - The encoded data in various formats
//  * @param network - a {@link Network} object, or a string with the network name
//  */
// declare class PrivateKey {
//     constructor(data: string, network: Network | string);
//     /**
//      * Internal helper to instantiate PrivateKey internal `info` object from
//      * different kinds of arguments passed to the constructor.
//      * @param network - a {@link Network} object, or a string with the network name
//      */
//     _classifyArguments(data: any, network: Network | string): any;
//     /**
//      * Instantiate a PrivateKey from a Buffer with the DER or WIF representation
//      */
//     static fromBuffer(arg: Buffer, network: Network): PrivateKey;
//     /**
//      * Instantiate a PrivateKey from a WIF string
//      */
//     static fromString: any;
//     /**
//      * Instantiate a PrivateKey from a plain JavaScript object
//      * @param obj - The output from privateKey.toObject()
//      */
//     static fromObject(obj: any): void;
//     /**
//      * Instantiate a PrivateKey from random bytes
//      * @param [network] - Either "livenet" or "testnet"
//      * @returns A new valid instance of PrivateKey
//      */
//     static fromRandom(network?: string): PrivateKey;
//     /**
//      * Check if there would be any errors when initializing a PrivateKey
//      * @param data - The encoded data in various formats
//      * @param [network] - Either "livenet" or "testnet"
//      * @returns An error if exists
//      */
//     static getValidationError(data: string, network?: string): null | Error;
//     /**
//      * Check if the parameters are valid
//      * @param data - The encoded data in various formats
//      * @param [network] - Either "livenet" or "testnet"
//      * @returns If the private key is would be valid
//      */
//     static isValid(data: string, network?: string): boolean;
//     /**
//      * Will output the PrivateKey encoded as hex string
//      */
//     toString(): string;
//     /**
//      * Will output the PrivateKey to a WIF string
//      * @returns A WIP representation of the private key
//      */
//     toWIF(): string;
//     /**
//      * Will return the private key as a BN instance
//      * @returns A BN instance of the private key
//      */
//     toBigNumber(): BN;
//     /**
//      * Will return the private key as a BN buffer
//      * @returns A buffer of the private key
//      */
//     toBuffer(): Buffer;
//     /**
//      * WARNING: This method will not be officially supported until v1.0.0.
//      *
//      *
//      * Will return the private key as a BN buffer without leading zero padding
//      * @returns A buffer of the private key
//      */
//     toBufferNoPadding(): Buffer;
//     /**
//      * Will return the corresponding public key
//      * @returns A public key generated from the private key
//      */
//     toPublicKey(): PublicKey;
//     /**
//      * Will return an address for the private key
//      * @param [network] - optional parameter specifying
//      * the desired network for the address
//      * @returns An address generated from the private key
//      */
//     toAddress(network?: Network): Address;
//     toObject: any;
//     /**
//      * Will return a string formatted for the console
//      * @returns Private key
//      */
//     inspect(): string;
// }

// /**
//  * Instantiate a PublicKey from a {@link PrivateKey}, {@link Point}, `string`, or `Buffer`.
//  *
//  * There are two internal properties, `network` and `compressed`, that deal with importing
//  * a PublicKey from a PrivateKey in WIF format. More details described on {@link PrivateKey}
//  * @example
//  * ```javascript
//  * // instantiate from a private key
//  * var key = PublicKey(privateKey, true);
//  *
//  * // export to as a DER hex encoded string
//  * var exported = key.toString();
//  *
//  * // import the public key
//  * var imported = PublicKey.fromString(exported);
//  * ```
//  * @param data - The encoded data in various formats
//  * @param extra - additional options
//  * @param [extra.network] - Which network should the address for this public key be for
//  * @param [extra.compressed] - If the public key is compressed
//  */
// declare class PublicKey {
//     constructor(data: string, extra: {
//         network?: Network;
//         compressed?: string;
//     });
//     /**
//      * Internal function to differentiate between arguments passed to the constructor
//      */
//     _classifyArgs(data: any, extra: any): void;
//     /**
//      * Instantiate a PublicKey from a PrivateKey
//      * @param privkey - An instance of PrivateKey
//      * @returns A new valid instance of PublicKey
//      */
//     static fromPrivateKey(privkey: PrivateKey): PublicKey;
//     /**
//      * Instantiate a PublicKey from a Buffer
//      */
//     static fromDER: any;
//     /**
//      * Instantiate a PublicKey from a Point
//      * @param point - A Point instance
//      * @param [compressed] - whether to store this public key as compressed format
//      * @returns A new valid instance of PublicKey
//      */
//     static fromPoint(point: Point, compressed?: boolean): PublicKey;
//     /**
//      * Instantiate a PublicKey from a DER hex encoded string
//      * @param str - A DER hex string
//      * @param [encoding] - The type of string encoding
//      * @returns A new valid instance of PublicKey
//      */
//     static fromString(str: string, encoding?: string): PublicKey;
//     /**
//      * Instantiate a PublicKey from an X Point
//      * @param odd - If the point is above or below the x axis
//      * @param x - The x point
//      * @returns A new valid instance of PublicKey
//      */
//     static fromX(odd: boolean, x: Point): PublicKey;
//     /**
//      * Check if there would be any errors when initializing a PublicKey
//      * @param data - The encoded data in various formats
//      * @returns An error if exists
//      */
//     static getValidationError(data: string): null | Error;
//     /**
//      * Check if the parameters are valid
//      * @param data - The encoded data in various formats
//      * @returns If the public key would be valid
//      */
//     static isValid(data: string): boolean;
//     toObject: any;
//     /**
//      * Will output the PublicKey to a DER Buffer
//      */
//     toBuffer: any;
//     /**
//      * Will return a sha256 + ripemd160 hash of the serialized public key
//      */
//     _getID(): Buffer;
//     /**
//      * Will return an address for the public key
//      * @param network - Which network should the address be for
//      * @returns An address generated from the public key
//      */
//     toAddress(network: string | Network): Address;
//     /**
//      * Will output the PublicKey to a DER encoded hex string
//      * @returns A DER hex encoded string
//      */
//     toString(): string;
//     /**
//      * Will return a string formatted for the console
//      * @returns Public key
//      */
//     inspect(): string;
// }

// /**
//  * Bitcoin transactions contain scripts. Each input has a script called the
//  * scriptSig, and each output has a script called the scriptPubkey. To validate
//  * an input, the input's script is concatenated with the referenced output script,
//  * and the result is executed. If at the end of execution the stack contains a
//  * "true" value, then the transaction is valid.
//  *
//  * The primary way to use this class is via the verify function.
//  * e.g., Interpreter().verify( ... );
//  */
// declare function Interpreter(): void;

// /**
//  * Implemented from bitcoin-abc
//  * https://github.com/Bitcoin-ABC/bitcoin-abc/blob/f8cbc0e2b439aa4030430a7b1ecbdafede0dd072/src/script/bitfield.cpp
//  */
// declare function DecodeBitfield(dummy: any, size: any): void;

// /**
//  * countBits
//  * Implemented from https://github.com/Bitcoin-ABC/bitcoin-abc/blob/f8cbc0e2b439aa4030430a7b1ecbdafede0dd072/src/util/bitmanip.h
//  */
// declare function countBits(v: any): void;

// /**
//  * A bitcoin transaction script. Each transaction's inputs and outputs
//  * has a script that is evaluated to validate it's spending.
//  *
//  * See https://en.bitcoin.it/wiki/Script
//  * @param from - optional data to populate script
//  */
// declare class Script {
//     constructor(from: any | string | Buffer);
//     /**
//      * @returns if this is a pay to pubkey hash output script
//      */
//     isPublicKeyHashOut(): boolean;
//     /**
//      * @returns if this is a pay to public key hash input script
//      */
//     isPublicKeyHashIn(): boolean;
//     /**
//      * @returns if this is a public key output script
//      */
//     isPublicKeyOut(): boolean;
//     /**
//      * @returns if this is a pay to public key input script
//      */
//     isPublicKeyIn(): boolean;
//     /**
//      * @returns if this is a p2sh output script
//      */
//     isScriptHashOut(): boolean;
//     /**
//      * @returns if this is a p2sh input script
//      * Note that these are frequently indistinguishable from pubkeyhashin
//      */
//     isScriptHashIn(): boolean;
//     /**
//      * @returns if this is a mutlsig output script
//      */
//     isMultisigOut(): boolean;
//     /**
//      * @returns if this is a multisig input script
//      */
//     isMultisigIn(): boolean;
//     /**
//      * @returns true if this is a valid standard OP_RETURN output
//      */
//     isDataOut(): boolean;
//     /**
//      * Retrieve the associated data for this script.
//      * In the case of a pay to public key hash or P2SH, return the hash.
//      * In the case of a standard OP_RETURN, return the data
//      */
//     getData(): Buffer;
//     /**
//      * @returns if the script is only composed of data pushing
//      * opcodes or small int opcodes (OP_0, OP_1, ..., OP_16)
//      */
//     isPushOnly(): boolean;
//     /**
//      * @returns The Script type if it is a known form,
//      * or Script.UNKNOWN if it isn't
//      */
//     classify(): any;
//     /**
//      * @returns The Script type if it is a known form,
//      * or Script.UNKNOWN if it isn't
//      */
//     classifyOutput(): any;
//     /**
//      * @returns The Script type if it is a known form,
//      * or Script.UNKNOWN if it isn't
//      */
//     classifyInput(): any;
//     /**
//      * @returns if script is one of the known types
//      */
//     isStandard(): boolean;
//     /**
//      * Adds a script element at the start of the script.
//      * @param obj - a string, number, Opcode, Buffer, or object to add
//      * @returns this script instance
//      */
//     prepend(obj: any): Script;
//     /**
//      * Compares a script with another script
//      */
//     equals(): void;
//     /**
//      * Adds a script element to the end of the script.
//      * @param obj - a string, number, Opcode, Buffer, or object to add
//      * @returns this script instance
//      */
//     add(obj: any): Script;
//     /**
//      * @param publicKeys - list of all public keys controlling the output
//      * @param threshold - amount of required signatures to spend the output
//      * @param [opts] - Several options:
//      *        - noSorting: defaults to false, if true, don't sort the given
//      *                      public keys before creating the script
//      * @returns a new Multisig output script for given public keys,
//      * requiring m of those public keys to spend
//      */
//     static buildMultisigOut(publicKeys: PublicKey[], threshold: number, opts?: any): Script;
//     /**
//      * A new Multisig input script for the given public keys, requiring m of those public keys to spend
//      * @param pubkeys - list of all public keys controlling the output
//      * @param threshold - amount of required signatures to spend the output
//      * @param signatures - and array of signature buffers to append to the script
//      * @param [opts.noSorting] - don't sort the given public keys before creating the script (false by default)
//      * @param [opts.cachedMultisig] - don't recalculate the redeemScript
//      */
//     static buildMultisigIn(pubkeys: PublicKey[], threshold: number, signatures: any[], opts?: {
//         noSorting?: boolean;
//         cachedMultisig?: Script;
//     }): Script;
//     /**
//      * A new P2SH Multisig input script for the given public keys, requiring m of those public keys to spend
//      * @param pubkeys - list of all public keys controlling the output
//      * @param threshold - amount of required signatures to spend the output
//      * @param signatures - and array of signature buffers to append to the script
//      * @param [opts.noSorting] - don't sort the given public keys before creating the script (false by default)
//      * @param [opts.cachedMultisig] - don't recalculate the redeemScript
//      * @param opts.checkBits - bitfield map 1 or 0 to check which signatures to map against public keys for verification in schnorr multisig mode
//      * @param opts.signingMethod - method with which input will be signed "ecdsa" or "schnorr"
//      */
//     static buildP2SHMultisigIn(pubkeys: PublicKey[], threshold: number, signatures: any[], opts?: {
//         noSorting?: boolean;
//         cachedMultisig?: Script;
//         checkBits: Uint8Array;
//         signingMethod: string;
//     }): Script;
//     /**
//      * @param to - destination address or public key
//      * @returns a new pay to public key hash output for the given
//      * address or public key
//      */
//     static buildPublicKeyHashOut(to: Address | PublicKey): Script;
//     /**
//      * @returns a new pay to public key output for the given
//      *  public key
//      */
//     static buildPublicKeyOut(): Script;
//     /**
//      * @param data - the data to embed in the output
//      * @param encoding - the type of encoding of the string
//      * @returns a new OP_RETURN script with data
//      */
//     static buildDataOut(data: string | Buffer, encoding: string): Script;
//     /**
//      * @param script - the redeemScript for the new p2sh output.
//      *    It can also be a p2sh address
//      * @returns new pay to script hash script for given script
//      */
//     static buildScriptHashOut(script: Script | Address): Script;
//     /**
//      * Builds a scriptSig (a script for an input) that signs a public key output script.
//      * @param signature - a Signature object, or the signature in DER canonical encoding
//      * @param [sigtype] - the type of the signature (defaults to SIGHASH_ALL)
//      */
//     static buildPublicKeyIn(signature: Signature | Buffer, sigtype?: number): void;
//     /**
//      * Builds a scriptSig (a script for an input) that signs a public key hash
//      * output script.
//      * @param signature - a Signature object, or the signature in DER canonical encoding
//      * @param [sigtype] - the type of the signature (defaults to SIGHASH_ALL)
//      */
//     static buildPublicKeyHashIn(publicKey: Buffer | string | PublicKey, signature: Signature | Buffer, sigtype?: number): void;
//     /**
//      * @returns an empty script
//      */
//     static empty(): Script;
//     /**
//      * @returns a new pay to script hash script that pays to this script
//      */
//     toScriptHashOut(): Script;
//     /**
//      * @returns an output script built from the address
//      */
//     static fromAddress(): Script;
//     /**
//      * Will return the associated address information object
//      */
//     getAddressInfo(): Address | boolean;
//     /**
//      * @returns the associated address for this script if possible, or false
//      */
//     toAddress(network?: Network): Address | boolean;
//     /**
//      * Analogous to bitcoind's FindAndDelete. Find and delete equivalent chunks,
//      * typically used with push data chunks.  Note that this will find and delete
//      * not just the same data, but the same data with the same push data op as
//      * produced by default. i.e., if a pushdata in a tx does not use the minimal
//      * pushdata op, then when you try to remove the data it is pushing, it will not
//      * be removed, because they do not use the same pushdata op.
//      */
//     findAndDelete(): void;
//     /**
//      * Comes from bitcoind's script interpreter CheckMinimalPush function
//      * @returns if the chunk {i} is the smallest way to push that particular data.
//      */
//     checkMinimalPush(): boolean;
//     /**
//      * Comes from bitcoind's script DecodeOP_N function
//      * @returns numeric value in range of 0 to 16
//      */
//     _decodeOP_N(opcode: number): number;
//     /**
//      * Comes from bitcoind's script GetSigOpCount(boolean) function
//      * @param use - current (true) or pre-version-0.6 (false) logic
//      * @returns number of signature operations required by this script
//      */
//     getSignatureOperationsCount(use: boolean): number;
// }

// declare class MultiSigInput {
//     constructor();
//     static normalizeSignatures(signatures: Buffer[], publicKeys: PublicKey[], transaction: Transaction, inputIndex: Integer, input: Input): TransactionSignature[];
// }

// declare class MultiSigScriptHashInput {
//     constructor();
// }

// /**
//  * Represents a special kind of input of PayToPublicKey kind.
//  */
// declare class PublicKeyInput {
//     constructor();
//     /**
//      * @param transaction - the transaction to be signed
//      * @param privateKey - the private key with which to sign the transaction
//      * @param index - the index of the input in the transaction input vector
//      * @param [sigtype] - the type of signature, defaults to Signature.SIGHASH_ALL
//      * @param signingMethod - the signing method used to sign tx "ecdsa" or "schnorr"
//      * @returns of objects that can be
//      */
//     getSignatures(transaction: Transaction, privateKey: PrivateKey, index: number, sigtype?: number, signingMethod: string): any[];
//     /**
//      * Add the provided signature
//      * @param signingMethod - the method used in signing the tx "ecdsa" or "schnorr"
//      * @returns this, for chaining
//      */
//     addSignature(signature: {
//         publicKey: PublicKey;
//         signature: Signature;
//         sigtype?: number;
//     }, signingMethod: string): PublicKeyInput;
//     /**
//      * Clear the input's signature
//      * @returns this, for chaining
//      */
//     clearSignatures(): PublicKeyHashInput;
//     /**
//      * Query whether the input is signed
//      */
//     isFullySigned(): boolean;
// }

// /**
//  * Represents a special kind of input of PayToPublicKeyHash kind.
//  */
// declare class PublicKeyHashInput {
//     constructor();
//     /**
//      * @param transaction - the transaction to be signed
//      * @param privateKey - the private key with which to sign the transaction
//      * @param index - the index of the input in the transaction input vector
//      * @param [sigtype] - the type of signature, defaults to Signature.SIGHASH_ALL
//      * @param [hashData] - the precalculated hash of the public key associated with the privateKey provided
//      * @param signingMethod - the signing method used to sign tx "ecdsa" or "schnorr"
//      * @returns of objects that can be
//      */
//     getSignatures(transaction: Transaction, privateKey: PrivateKey, index: number, sigtype?: number, hashData?: Buffer, signingMethod: string): any[];
//     /**
//      * Add the provided signature
//      * @param signingMethod - "ecdsa" or "schnorr"
//      * @returns this, for chaining
//      */
//     addSignature(signature: {
//         publicKey: PublicKey;
//         signature: Signature;
//         sigtype?: number;
//     }, signingMethod: string): PublicKeyHashInput;
//     /**
//      * Clear the input's signature
//      * @returns this, for chaining
//      */
//     clearSignatures(): PublicKeyHashInput;
//     /**
//      * Query whether the input is signed
//      */
//     isFullySigned(): boolean;
// }

// declare namespace Signing {
//     /**
//      * Returns a buffer of length 32 bytes with the hash that needs to be signed
//      * for OP_CHECKSIG.
//      */
//     var sighash: any;
//     /**
//      * Create a signature
//      */
//     var sign: any;
//     /**
//      * Verify a signature
//      */
//     var verify: any;
// }

// /**
//  * Wrapper around Signature with fields related to signing a transaction specifically
//  */
// declare class TransactionSignature {
//     constructor(arg: any | string | TransactionSignature);
//     /**
//      * Serializes a transaction to a plain JS object
//      */
//     toObject: any;
//     /**
//      * Builds a TransactionSignature from an object
//      */
//     static fromObject(object: any): TransactionSignature;
// }

// /**
//  * Represents a transaction, a set of inputs and outputs to change ownership of tokens
//  */
// declare class Transaction {
//     constructor(serialized: any);
//     /**
//      * Create a 'shallow' copy of the transaction, by serializing and deserializing
//      * it dropping any additional information that inputs and outputs may have hold
//      */
//     static shallowCopy(transaction: Transaction): Transaction;
//     /**
//      * Retrieve the little endian hash of the transaction (used for serialization)
//      */
//     _getHash(): Buffer;
//     /**
//      * Retrieve a hexa string that can be used with bitcoind's CLI interface
//      * (decoderawtransaction, sendrawtransaction)
//      * @param unsafe - if true, skip all tests. if it's an object,
//      *   it's expected to contain a set of flags to skip certain tests:
//      * * `disableAll`: disable all checks
//      * * `disableLargeFees`: disable checking for fees that are too large
//      * * `disableIsFullySigned`: disable checking if all inputs are fully signed
//      * * `disableDustOutputs`: disable checking if there are no outputs that are dust amounts
//      * * `disableMoreOutputThanInput`: disable checking if the transaction spends more bitcoins than the sum of the input amounts
//      */
//     serialize(unsafe: any | boolean): string;
//     /**
//      * Retrieve a hexa string that can be used with bitcoind's CLI interface
//      * (decoderawtransaction, sendrawtransaction)
//      * @param opts - allows to skip certain tests. {@see Transaction#serialize}
//      */
//     checkedSerialize(opts: any): string;
//     /**
//      * Retrieve a possible error that could appear when trying to serialize and
//      * broadcast this transaction.
//      * @param opts - allows to skip certain tests. {@see Transaction#serialize}
//      */
//     getSerializationError(opts: any): Error;
//     /**
//      * Sets nLockTime so that transaction is not valid until the desired date(a
//      * timestamp in seconds since UNIX epoch is also accepted)
//      * @returns this
//      */
//     lockUntilDate(time: Date | number): Transaction;
//     /**
//      * Sets nLockTime so that transaction is not valid until the desired block
//      * height.
//      * @returns this
//      */
//     lockUntilBlockHeight(height: number): Transaction;
//     /**
//      * Returns a semantic version of the transaction's nLockTime.
//      * @returns If nLockTime is 0, it returns null,
//      *  if it is < 500000000, it returns a block height (number)
//      *  else it returns a Date object.
//      */
//     getLockTime(): number | Date;
//     /**
//      * Add an input to this transaction. This is a high level interface
//      * to add an input, for more control, use @{link Transaction#addInput}.
//      *
//      * Can receive, as output information, the output of bitcoind's `listunspent` command,
//      * and a slightly fancier format recognized by bitcore:
//      *
//      * ```
//      * {
//      *  address: 'mszYqVnqKoQx4jcTdJXxwKAissE3Jbrrc1',
//      *  txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
//      *  outputIndex: 0,
//      *  script: Script.empty(),
//      *  satoshis: 1020000
//      * }
//      * ```
//      * Where `address` can be either a string or a bitcore Address object. The
//      * same is true for `script`, which can be a string or a bitcore Script.
//      *
//      * Beware that this resets all the signatures for inputs (in further versions,
//      * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
//      * @example
//      * ```javascript
//      * var transaction = new Transaction();
//      *
//      * // From a pay to public key hash output from bitcoind's listunspent
//      * transaction.from({'txid': '0000...', vout: 0, amount: 0.1, scriptPubKey: 'OP_DUP ...'});
//      *
//      * // From a pay to public key hash output
//      * transaction.from({'txId': '0000...', outputIndex: 0, satoshis: 1000, script: 'OP_DUP ...'});
//      *
//      * // From a multisig P2SH output
//      * transaction.from({'txId': '0000...', inputIndex: 0, satoshis: 1000, script: '... OP_HASH'},
//      *                  ['03000...', '02000...'], 2);
//      * ```
//      * @param [opts] - Several options:
//      *        - noSorting: defaults to false, if true and is multisig, don't
//      *                      sort the given public keys before creating the script
//      */
//     from(utxo: Transaction~fromObject[] | Transaction~fromObject, pubkeys?: any[], threshold?: number, opts?: any): void;
//     /**
//      * Add an input to this transaction. The input must be an instance of the `Input` class.
//      * It should have information about the Output that it's spending, but if it's not already
//      * set, two additional parameters, `outputScript` and `satoshis` can be provided.
//      * @returns Transaction this, for chaining
//      */
//     addInput(input: Input, outputScript: string | Script, satoshis: number): any;
//     /**
//      * Add an input to this transaction, without checking that the input has information about
//      * the output that it's spending.
//      * @returns Transaction this, for chaining
//      */
//     uncheckedAddInput(input: Input): any;
//     /**
//      * Returns true if the transaction has enough info on all inputs to be correctly validated
//      */
//     hasAllUtxoInfo(): boolean;
//     /**
//      * Manually set the fee for this transaction. Beware that this resets all the signatures
//      * for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
//      * be reset).
//      * @param amount - satoshis to be sent
//      * @returns this, for chaining
//      */
//     fee(amount: number): Transaction;
//     /**
//      * Manually set the fee per KB for this transaction. Beware that this resets all the signatures
//      * for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
//      * be reset).
//      * @param amount - satoshis per KB to be sent
//      * @returns this, for chaining
//      */
//     feePerKb(amount: number): Transaction;
//     /**
//      * Manually set the fee per Byte for this transaction. Beware that this resets all the signatures
//      * for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
//      * be reset).
//      * fee per Byte will be ignored if fee per KB is set
//      * @param amount - satoshis per Byte to be sent
//      * @returns this, for chaining
//      */
//     feePerByte(amount: number): Transaction;
//     /**
//      * Set the change address for this transaction
//      *
//      * Beware that this resets all the signatures for inputs (in further versions,
//      * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
//      * @param address - An address for change to be sent to.
//      * @returns this, for chaining
//      */
//     change(address: Address): Transaction;
//     /**
//      * @returns change output, if it exists
//      */
//     getChangeOutput(): Output;
//     /**
//      * Add an output to the transaction.
//      *
//      * Beware that this resets all the signatures for inputs (in further versions,
//      * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
//      * @param amount - in satoshis
//      * @returns this, for chaining
//      */
//     to(address: string | Address | Transaction~toObject[], amount: number): Transaction;
//     /**
//      * Add an OP_RETURN output to the transaction.
//      *
//      * Beware that this resets all the signatures for inputs (in further versions,
//      * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
//      * @param value - the data to be stored in the OP_RETURN output.
//      *    In case of a string, the UTF-8 representation will be stored
//      * @returns this, for chaining
//      */
//     addData(value: Buffer | string): Transaction;
//     /**
//      * Add an output to the transaction.
//      * @param output - the output to add.
//      * @returns this, for chaining
//      */
//     addOutput(output: Output): Transaction;
//     /**
//      * Remove all outputs from the transaction.
//      * @returns this, for chaining
//      */
//     clearOutputs(): Transaction;
//     /**
//      * Calculates or gets the total output amount in satoshis
//      * @returns the transaction total output amount
//      */
//     _getOutputAmount(): number;
//     /**
//      * Calculates or gets the total input amount in satoshis
//      * @returns the transaction total input amount
//      */
//     _getInputAmount(): number;
//     /**
//      * Calculates the fee of the transaction.
//      *
//      * If there's a fixed fee set, return that.
//      *
//      * If there is no change output set, the fee is the
//      * total value of the outputs minus inputs. Note that
//      * a serialized transaction only specifies the value
//      * of its outputs. (The value of inputs are recorded
//      * in the previous transaction outputs being spent.)
//      * This method therefore raises a "MissingPreviousOutput"
//      * error when called on a serialized transaction.
//      *
//      * If there's no fee set and no change address,
//      * estimate the fee based on size.
//      * @returns fee of this transaction in satoshis
//      */
//     getFee(): number;
//     /**
//      * Estimates fee from serialized transaction size in bytes.
//      */
//     _estimateFee(): void;
//     /**
//      * Sort a transaction's inputs and outputs according to BIP69
//      * @returns this
//      */
//     sort(): Transaction;
//     /**
//      * Randomize this transaction's outputs ordering. The shuffling algorithm is a
//      * version of the Fisher-Yates shuffle, provided by lodash's _.shuffle().
//      * @returns this
//      */
//     shuffleOutputs(): Transaction;
//     /**
//      * Sort this transaction's outputs, according to a given sorting function that
//      * takes an array as argument and returns a new array, with the same elements
//      * but with a different order. The argument function MUST NOT modify the order
//      * of the original array
//      * @returns this
//      */
//     sortOutputs(sortingFunction: (...params: any[]) => any): Transaction;
//     /**
//      * Sort this transaction's inputs, according to a given sorting function that
//      * takes an array as argument and returns a new array, with the same elements
//      * but with a different order.
//      * @returns this
//      */
//     sortInputs(sortingFunction: (...params: any[]) => any): Transaction;
//     /**
//      * Sign the transaction using one or more private keys.
//      *
//      * It tries to sign each input, verifying that the signature will be valid
//      * (matches a public key).
//      * @returns this, for chaining
//      */
//     sign(privateKey: any[] | string | PrivateKey, sigtype: number): Transaction;
//     /**
//      * Add a signature to the transaction
//      * @param signingMethod - "ecdsa" or "schnorr"
//      * @returns this, for chaining
//      */
//     applySignature(signature: {
//         inputIndex: number;
//         sigtype: number;
//         publicKey: PublicKey;
//         signature: Signature;
//     }, signingMethod: string): Transaction;
//     /**
//      * @returns whether the signature is valid for this transaction input
//      */
//     verifySignature(): boolean;
//     /**
//      * Check that a transaction passes basic sanity tests. If not, return a string
//      * describing the error. This function contains the same logic as
//      * CheckTransaction in bitcoin core.
//      */
//     verify(): void;
//     /**
//      * Analogous to bitcoind's IsCoinBase function in transaction.h
//      */
//     isCoinbase(): void;
// }

// declare namespace Transaction {
//     type fromObject = {
//         prevTxId: string;
//         outputIndex: number;
//         script: Buffer | string | Script;
//         satoshis: number;
//     };
//     type toObject = {
//         address: string | Address;
//         satoshis: number;
//     };
// }

// /**
//  * Represents an unspent output information: its script, associated amount and address,
//  * transaction id and output index.
//  * @param data.txid - the previous transaction id
//  * @param [data.txId] - alias for `txid`
//  * @param data.vout - the index in the transaction
//  * @param [data.outputIndex] - alias for `vout`
//  * @param data.scriptPubKey - the script that must be resolved to release the funds
//  * @param data.script - alias for `scriptPubKey`
//  * @param data.amount - amount of bitcoins associated
//  * @param [data.satoshis] - alias for `amount`, but expressed in satoshis (1 BTC = 1e8 satoshis)
//  * @param data.address - the associated address to the script, if provided
//  */
// declare class UnspentOutput {
//     constructor(data: {
//         txid: string;
//         txId?: string;
//         vout: number;
//         outputIndex?: number;
//         scriptPubKey: string | Script;
//         script: string | Script;
//         amount: number;
//         satoshis?: number;
//         address: string | Address;
//     });
//     /**
//      * Provide an informative output when displaying this object in the console
//      * @returns string
//      */
//     inspect(): any;
//     /**
//      * String representation: just "txid:index"
//      * @returns string
//      */
//     toString(): any;
//     /**
//      * Deserialize an UnspentOutput from an object
//      * @returns UnspentOutput
//      */
//     static fromObject(data: any | string): any;
//     /**
//      * Returns a plain object (no prototype or methods) with the associated info for this output
//      */
//     toObject: any;
// }

// /**
//  * Utility for handling and converting bitcoins units. The supported units are
//  * BTC, mBTC, bits (also named uBTC) and satoshis. A unit instance can be created with an
//  * amount and a unit code, or alternatively using static methods like {fromBTC}.
//  * It also allows to be created from a fiat amount and the exchange rate, or
//  * alternatively using the {fromFiat} static method.
//  * You can consult for different representation of a unit instance using it's
//  * {to} method, the fixed unit methods like {toSatoshis} or alternatively using
//  * the unit accessors. It also can be converted to a fiat amount by providing the
//  * corresponding BTC/fiat exchange rate.
//  * @example
//  * ```javascript
//  * var sats = Unit.fromBTC(1.3).toSatoshis();
//  * var mili = Unit.fromBits(1.3).to(Unit.mBTC);
//  * var bits = Unit.fromFiat(1.3, 350).bits;
//  * var btc = new Unit(1.3, Unit.bits).BTC;
//  * ```
//  * @param amount - The amount to be represented
//  * @param code - The unit of the amount or the exchange rate
//  */
// declare class Unit {
//     constructor(amount: number, code: string | number);
//     /**
//      * Returns a Unit instance created from JSON string or object
//      * @param json - JSON with keys: amount and code
//      * @returns A Unit instance
//      */
//     static fromObject(json: string | any): Unit;
//     /**
//      * Returns a Unit instance created from an amount in BTC
//      * @param amount - The amount in BTC
//      * @returns A Unit instance
//      */
//     static fromBTC(amount: number): Unit;
//     /**
//      * Returns a Unit instance created from an amount in mBTC
//      */
//     static fromMillis: any;
//     /**
//      * Returns a Unit instance created from an amount in bits
//      */
//     static fromMicros: any;
//     /**
//      * Returns a Unit instance created from an amount in satoshis
//      * @param amount - The amount in satoshis
//      * @returns A Unit instance
//      */
//     static fromSatoshis(amount: number): Unit;
//     /**
//      * Returns a Unit instance created from a fiat amount and exchange rate.
//      * @param amount - The amount in fiat
//      * @param rate - The exchange rate BTC/fiat
//      * @returns A Unit instance
//      */
//     static fromFiat(amount: number, rate: number): Unit;
//     /**
//      * Returns the value represented in the specified unit
//      * @param code - The unit code or exchange rate
//      * @returns The converted value
//      */
//     to(code: string | number): number;
//     /**
//      * Returns the value represented in BTC
//      * @returns The value converted to BTC
//      */
//     toBTC(): number;
//     /**
//      * Returns the value represented in mBTC
//      */
//     toMillis: any;
//     /**
//      * Returns the value represented in bits
//      */
//     toMicros: any;
//     /**
//      * Returns the value represented in satoshis
//      * @returns The value converted to satoshis
//      */
//     toSatoshis(): number;
//     /**
//      * Returns the value represented in fiat
//      * @param rate - The exchange rate between BTC/currency
//      * @returns The value converted to satoshis
//      */
//     atRate(rate: string): number;
//     /**
//      * Returns a the string representation of the value in satoshis
//      * @returns the value in satoshis
//      */
//     toString(): string;
//     /**
//      * Returns a plain object representation of the Unit
//      */
//     toObject: any;
//     /**
//      * Returns a string formatted for the console
//      * @returns the value in satoshis
//      */
//     inspect(): string;
// }

// /**
//  * Bitcore URI
//  *
//  * Instantiate an URI from a bitcoin URI String or an Object. An URI instance
//  * can be created with a bitcoin uri string or an object. All instances of
//  * URI are valid, the static method isValid allows checking before instantiation.
//  *
//  * All standard parameters can be found as members of the class, the address
//  * is represented using an {Address} instance and the amount is represented in
//  * satoshis. Any other non-standard parameters can be found under the extra member.
//  * @example
//  * ```javascript
//  *
//  * var uri = new URI('bitcoin:12A1MyfXbW6RhdRAZEqofac5jCQQjwEPBu?amount=1.2');
//  * console.log(uri.address, uri.amount);
//  * ```
//  * @param data - A bitcoin URI string or an Object
//  * @param [knownParams] - Required non-standard params
//  */
// declare class URI {
//     constructor(data: string | any, knownParams?: string[]);
//     /**
//      * Instantiate a URI from a String
//      * @param str - JSON string or object of the URI
//      * @returns A new instance of a URI
//      */
//     static fromString(str: string): URI;
//     /**
//      * Instantiate a URI from an Object
//      * @param data - object of the URI
//      * @returns A new instance of a URI
//      */
//     static fromObject(data: any): URI;
//     /**
//      * Check if an bitcoin URI string is valid
//      * @example
//      * ```javascript
//      *
//      * var valid = URI.isValid('bitcoin:12A1MyfXbW6RhdRAZEqofac5jCQQjwEPBu');
//      * // true
//      * ```
//      * @param data - A bitcoin URI string or an Object
//      * @param [knownParams] - Required non-standard params
//      * @returns Result of uri validation
//      */
//     static isValid(data: string | any, knownParams?: string[]): boolean;
//     /**
//      * Convert a bitcoin URI string into a simple object.
//      * @param uri - A bitcoin URI string
//      * @returns An object with the parsed params
//      */
//     static parse(uri: string): any;
//     /**
//      * Internal function to load the URI instance with an object.
//      * @param obj - Object with the information
//      */
//     _fromObject(obj: any): void;
//     /**
//      * Internal function to transform a BTC string amount into satoshis
//      * @param amount - Amount BTC string
//      * @returns Amount represented in satoshis
//      */
//     _parseAmount(amount: string): any;
//     /**
//      * Will return a the string representation of the URI
//      * @returns Bitcoin URI string
//      */
//     toString(): string;
//     /**
//      * Will return a string formatted for the console
//      * @returns Bitcoin URI
//      */
//     inspect(): string;
// }

// /**
//  * Converts an array of integers made up of `from` bits into an
//  * array of integers made up of `to` bits. The output array is
//  * zero-padded if necessary, unless strict mode is true.
//  * Original by Pieter Wuille: https://github.com/sipa/bech32.
//  */
// declare var $: any;

// declare namespace JSUtil {
//     /**
//      * Determines whether a string contains only hexadecimal values
//      */
//     var isHexa: any;
// }

// /**
//  * @param eddsa - instance
//  * @param params - public/private key parameters
//  * @param [params.secret] - secret seed bytes
//  * @param [params.pub] - public key point (aka `A` in eddsa terms)
//  * @param [params.pub] - public key point encoded as bytes
//  */
// declare function KeyPair(eddsa: EDDSA, params: {
//     secret?: Byte[];
//     pub?: Byte[];
//     pub?: Byte[];
// }): void;

// /**
//  * @param eddsa - eddsa instance
//  * @param sig - -
//  * @param [sig.R] - R point as Point or bytes
//  * @param [sig.S] - S scalar as bn or bytes
//  * @param [sig.Rencoded] - R point encoded
//  * @param [sig.Sencoded] - S scalar encoded
//  */
// declare function Signature(eddsa: EDDSA, sig: {
//     R?: Bytes[] | Point;
//     S?: Bytes[] | bn;
//     Rencoded?: Bytes[];
//     Sencoded?: Bytes[];
// }): void;

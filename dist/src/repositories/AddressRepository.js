"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressManager = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const Addresses_1 = __importDefault(require("../entities/Addresses"));
exports.addressManager = dataSource_1.manager.getRepository(Addresses_1.default);
class AddressRepository {
    getAddressByUserIdQuery = (userId) => exports.addressManager
        .createQueryBuilder('addresses')
        .leftJoin('addresses.user', 'user')
        .leftJoinAndSelect('addresses.state', 'state')
        .where('user.id = :id', { id: userId });
    getUserAdresses = (userId) => this.getAddressByUserIdQuery(userId)
        .orderBy({ 'addresses.updated_at': 'DESC' })
        .getMany();
    getUserAddressById = (userId, addressId) => this.getAddressByUserIdQuery(userId)
        .andWhere({
        id: addressId,
    })
        .getOne();
    updateAddressDefaultToFalse = (addressId) => exports.addressManager.update({ id: addressId }, { isDefault: false });
    insertNewAddress = (payload, userId) => exports.addressManager.insert({
        ...payload,
        user: { id: userId },
    });
    deleteAddressById = (addressId) => exports.addressManager
        .createQueryBuilder()
        .delete()
        .where({ id: addressId })
        .execute();
    getAddressWithExactDetailsQueryByUserId = (userId, payload) => {
        let filterAddressQuery = this.getAddressByUserIdQuery(userId).andWhere({
            receiverName: payload.receiverName,
            receiverCountryCode: payload.receiverCountryCode,
            receiverPhoneNumber: payload.receiverPhoneNumber,
            addressLineOne: payload.addressLineOne,
            postcode: payload.postcode,
            city: payload.city,
            state: payload.state,
            country: payload.country,
        });
        if (payload.addressLineTwo === null) {
            filterAddressQuery = filterAddressQuery.andWhere({
                addressLineTwo: (0, typeorm_1.IsNull)(),
            });
        }
        else {
            filterAddressQuery = filterAddressQuery.andWhere({
                addressLineTwo: payload.addressLineTwo,
            });
        }
        return filterAddressQuery;
    };
    getAddressWithExactDetails = (userId, payload) => this.getAddressWithExactDetailsQueryByUserId(userId, payload).getOne();
    getAddressWithExactDetailsExceptSelfByUserId = (userId, payload) => this.getAddressWithExactDetailsQueryByUserId(userId, payload)
        .andWhere({ id: (0, typeorm_1.Not)(payload.addressId) })
        .getOne();
    updateAddressById = (payload) => exports.addressManager.update({ id: payload.addressId }, {
        receiverName: payload.receiverName,
        receiverCountryCode: payload.receiverCountryCode,
        receiverPhoneNumber: payload.receiverPhoneNumber,
        addressLineOne: payload.addressLineOne,
        addressLineTwo: payload.addressLineTwo,
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        isDefault: payload.isDefault,
        tag: payload.tag,
    });
    getAddressById = (addressId) => exports.addressManager.findOne({ where: { id: addressId }, relations: ['state'] });
}
exports.default = AddressRepository;
//# sourceMappingURL=AddressRepository.js.map
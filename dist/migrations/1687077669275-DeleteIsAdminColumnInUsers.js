"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIsAdminColumnInUsers1687077669275 = void 0;
class DeleteIsAdminColumnInUsers1687077669275 {
    async up(queryRunner) {
        await queryRunner.dropColumn('users', 'is_admin');
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.DeleteIsAdminColumnInUsers1687077669275 = DeleteIsAdminColumnInUsers1687077669275;
//# sourceMappingURL=1687077669275-DeleteIsAdminColumnInUsers.js.map
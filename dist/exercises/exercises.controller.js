"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
let ExercisesController = class ExercisesController {
    async getByCategory(muscleGroup, subGroup) {
        return [
            {
                id: 1,
                name: `Exercício Exemplo para ${muscleGroup}`,
                muscleGroup: muscleGroup,
                subGroup: subGroup || 'Geral',
                instructions: 'Executar de forma controlada mantendo a postura correta.',
            }
        ];
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Get)(':muscleGroup'),
    __param(0, (0, common_1.Param)('muscleGroup')),
    __param(1, (0, common_1.Query)('subGroup')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getByCategory", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises')
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map
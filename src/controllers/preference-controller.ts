import { Body, Post, Route, Tags } from "tsoa";
import Preference from "../models/prefence";
import { PreferenceService } from "../services/services";

@Tags("Preferências")
@Route("preferencia")
class PreferenceController {
    @Post()
    async create(@Body() preference: Preference): Promise<void> {
        PreferenceService.create(preference);
    }

}

export default new PreferenceController();
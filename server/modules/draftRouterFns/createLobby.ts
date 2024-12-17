import { Response } from "express";
import { IAUser } from "../../constants/types";

export function createLobby(req: IAUser, res: Response) {
    const userId = req.user.id
    const sqlText = `INSERT INTO "active_draft"`

}

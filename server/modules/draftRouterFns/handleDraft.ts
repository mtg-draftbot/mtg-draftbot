import { IAUser } from "../../constants/types";
import pool from "../pool";
import { NextFunction, Response } from "express";

interface ReqWithPod extends IAUser {
  seat: string | number;
}

// We should only get to this point if the user is in a draft.
export async function handleDraft(req: ReqWithPod, res: Response) {
  // Grab the current draft state.
  // Make sure the seat is a number. Don't need weird JS errors
  const seat = Number(req.seat);
  // const user = req.user;
  const draft = req.params.id;
  const sqlText = `SELECT * FROM "active_draft" WHERE "id" = $1`;
  try {
    const draftStateRes = await pool.query(sqlText, [draft]);
    let draftersPack: number | null = null;
    const responseData = draftStateRes.rows.map((pack, i) => {
      if (Number(pack.currentSeat) === seat) {
        draftersPack = i;
        return pack.availableCards;
      } else {
        return pack.currentSeat;
      }
    });
    if (draftersPack) {
      const cardDataSqlText = `SELECT * FROM "cards" WHERE "id" = $1`;
      const packWithCardData = await Promise.all(
        responseData[draftersPack].map((card: number) => {
          return pool.query(cardDataSqlText, [card]);
        })
      );
      const formattedPackCardData = packWithCardData.map((cardRes) => {
        return cardRes.rows[0];
      });
      responseData[draftersPack] = formattedPackCardData;
      res.send(responseData);
    } else {
      res.send(responseData);
    }
  } catch (error) {
    console.log("error getting current draft state: ", error);
    res.sendStatus(500);
  }
}

// Middleware function to figure out if a user is in a draft.
// Will attach "seat" property onto the req if they are, or
// send an error if they are not.
export async function attachPod(
  req: IAUser,
  res: Response,
  next: NextFunction
) {
  const draft = req.params.id;
  const sqlText = `SELECT * FROM "pods" WHERE "active_draft_id" = $1`;
  try {
    const podRes = await pool.query(sqlText, [draft]);
    const pods = podRes.rows;
    if (pods[0]) {
      for (const key in pods[0]) {
        if ((pods[0][key] = req.user.id)) {
          req["seat"] = key;
          next();
        }
      }
    } else {
      res.sendStatus(410);
    }
  } catch (error) {
    console.log("error getting pod: ", error);
    res.sendStatus(500);
  }
}

"use server";
import { getAllHandler} from "../../handles/handleFetch";

export const getUsersAction = async () => getAllHandler("users/")


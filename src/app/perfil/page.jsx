import { ManageProfile } from "../../../components/profile/manageProfile";
import { createUserController } from "../../../controllers/factory";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function UserProfile() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/login');
    }

    const userController = createUserController();
    const user = await userController.getUserSessionById(session?.user.id);

    return (
        <ManageProfile user={user} /> 
    );
}
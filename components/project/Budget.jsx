import style from "/css/projectDashboard.module.css";
import { format } from "@formkit/tempo";
import { formatNumberToColones } from "/functions/others/moneyFormat";


export default function Budget({ amount, description, date, email }) {
    return (
        <div className={style.budget}>
            <h4>{formatNumberToColones(amount)}</h4>
            <p>{description}</p>
            <p>{format(date, "DD/MM/YYYY HH:mm")}</p>
            <p>{email}</p>
        </div>
    )
}
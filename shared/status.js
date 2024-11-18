import { faPause, faPlay, faClock, faCheckCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export const STATUS_DETAILS = {
    'Pendiente': { className: 'pending', icon: faClock, color: "#FFD700" },
    'En progreso': { className: 'inProgress', icon: faPlay, color: "#FFA500" },
    'Completado': { className: 'completed', icon: faCheckCircle, color: "#32CD32" },
    'En espera': { className: 'onHold', icon: faPause, color: "#FF4500" },
};

export const DEFAULT_STATUS = { className: '', icon: faQuestionCircle };
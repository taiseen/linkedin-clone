import { format, parseISO, isValid } from "date-fns";

const dateFormat = (dateString) => {

    const date = parseISO(dateString);

    return isValid(date) ? format(date, "MMM yyyy") : "Present";
};

export default dateFormat;
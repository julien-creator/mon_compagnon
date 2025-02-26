function FormattedDate({ dateStr }) {
    if (!dateStr) return null;
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateStr).toLocaleDateString("fr-FR", options);
    return <time dateTime={dateStr}>{formattedDate}</time>;
}

export default FormattedDate;
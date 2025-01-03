// utils/dateFormat.js
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);

    return date.toLocaleDateString('en-CA', options); // en-CA gives YYYY-MM-DD format
};

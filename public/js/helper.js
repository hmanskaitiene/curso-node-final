Handlebars.registerHelper('decimal', (number) => {
    return formatDecimal(number);
});

Handlebars.registerHelper('date-human-read', (fecha) => {
    return getFormattedDate(fecha);
});

Handlebars.registerHelper('eq', (field,value) => {
    return field === value;
});
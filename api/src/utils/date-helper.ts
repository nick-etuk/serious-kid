interface ValType {
    padded: string;
}

export function dateHelperFactory() {
    const padZero = (val, len = 2) => `${val}`.padStart(len, `0`);
    const setValues = (date) => {
        let vals = {
            yyyy: { value: date.getFullYear() },
            m: { value: date.getMonth() + 1 },
            d: { value: date.getDate() },
            h: { value: date.getHours() },
            mi: { value: date.getMinutes() },
            s: { value: date.getSeconds() },
            ms: { value: date.getMilliseconds() },
        };
        Object.entries(vals).forEach(
            ([k, val:ValType]) =>
                (val.padded = padZero(val.value, (k === `ms` && 3) || 2))
        );
        return vals;
    };

    return (date) => {
        const dateValues = setValues(date);
        return {
            get paddedValues() {
                return Object.values(dateValues).map((v) => v.padded);
            },
            get cleanValues() {
                return Object.values(dateValues).map((v) => v.value);
            },
            get all() {
                return dateValues;
            },
            get splitDatePadded() {
                const paddedValues = [...this.paddedValues];
                return [
                    paddedValues.splice(0, 3),
                    paddedValues.splice(0, 3),
                    paddedValues.pop(),
                ];
            },
            get splitDate() {
                const cleanValues = [...this.cleanValues];
                return [
                    cleanValues.splice(0, 3),
                    cleanValues.splice(0, 3),
                    cleanValues.pop(),
                ];
            },
            get formatPadded() {
                const [d, t, ms] = this.splitDatePadded;
                return `${d.join(`/`)} ${t.join(`:`)}.${ms}`;
            },
        };
    };
}

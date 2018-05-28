import Range from '../Range/Range';

interface IMonth {
    month: string;
    days: number;
}

const MONTHS: Array<IMonth> = [
    {
        month: 'январь',
        days: 31
    },
    {
        month: 'февраль',
        days: 28
    },
    {
        month: 'март',
        days: 31
    },
    {
        month: 'апрель',
        days: 30
    },
    {
        month: 'май',
        days: 31
    },
    {
        month: 'июнь',
        days: 30
    },
    {
        month: 'июль',
        days: 31
    },
    {
        month: 'август',
        days: 31
    },
    {
        month: 'сентябрь',
        days: 30
    },
    {
        month: 'октябрь',
        days: 31
    },
    {
        month: 'ноябрь',
        days: 30
    },
    {
        month: 'декабрь',
        days: 31
    }
];

export default class Data {
    public static years(start: number = 1997,
                        end: number = +(new Date()).getFullYear(),
                        step: number = 1): Array<string> {
        return Range(start, end, step);
    }

    public static months(): Array<string> {
        const result: Array<string> = [];

        for (const month of MONTHS) {
            result.push(month.month);
        }

        return result;
    }

    public static days(month: string = 'декабрь', year: number = +(new Date()).getFullYear()): Array<string> {
        if (!isNaN(+month)) {
            month = Data.monthNameByDigit(+month);
        }

        for (const element of MONTHS) {
            if (element.month === month) {
                if (month === 'февраль') {
                    return Range(1, year % 4 === 0 ? element.days + 1 : element.days);
                }

                return Range(1, element.days);
            }
        }

        return [''];
    }

    public static monthNameByDigit(digit: number): string {
        if (digit < 1) {
            return 'январь';
        }

        if (digit > 12) {
            return 'декабрь';
        }

        return MONTHS[digit - 1].month;
    }
}

import Component from '../../core/Component.js';
import store from '../../store/store.js';

class Calendar extends Component {
  get currentYear() {
    const { isStartDate, startDatePickerCurrentDate, endDatePickerCurrentDate } = this.props;
    return isStartDate ? startDatePickerCurrentDate.getFullYear() : endDatePickerCurrentDate.getFullYear();
  }

  get currentMonth() {
    const { isStartDate, startDatePickerCurrentDate, endDatePickerCurrentDate } = this.props;
    return isStartDate ? startDatePickerCurrentDate.getMonth() : endDatePickerCurrentDate.getMonth();
  }

  dateDisable(month, date) {
    const { isStartDate, startDate, endDatePickerCurrentDate } = this.props;
    if (isStartDate || startDate === null) return '';

    // 출발일 ~ 출발일+31
    const targetEndDateCurrentDate = new Date(
      endDatePickerCurrentDate.getFullYear(),
      endDatePickerCurrentDate.getMonth() + month,
      date
    );

    const isUnableDate =
      targetEndDateCurrentDate >= startDate &&
      targetEndDateCurrentDate <= new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 31);

    return isUnableDate ? '' : 'unable';
  }

  isStartDate(date) {
    const { startDate, startDatePickerCurrentDate } = this.props;
    if (startDate === null) return '';

    return startDate.getFullYear() === startDatePickerCurrentDate.getFullYear() &&
      startDate.getMonth() === startDatePickerCurrentDate.getMonth() &&
      startDate.getDate() === date
      ? 'start-date'
      : '';
  }

  isEndDate(date) {
    const { endDate, endDatePickerCurrentDate } = this.props;
    if (endDate === null) return '';

    return endDate.getFullYear() === endDatePickerCurrentDate.getFullYear() &&
      endDate.getMonth() === endDatePickerCurrentDate.getMonth() &&
      endDate.getDate() === date
      ? 'end-date'
      : '';
  }

  // TODO: 추가사항 중간 날짜
  // isTripDate(date) {
  //   const { startDate, endDate, startDatePickerCurrentDate, endDatePickerCurrentDate } = this.props;
  //   if (startDate === null || endDate === null) return;

  //   const targetDate = new Date();

  //   return;
  // }

  renderCalendarGridDates() {
    const today = new Date();

    const thisMonthFirstday = new Date(this.currentYear, this.currentMonth, 1).getDay(); // 1
    // 이번달의 마지막의 요일
    const nextMonthLastDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDay();
    // 이번달의 마지막 날
    const thisMonthLastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    // 이전달의 마지막 날
    const prevMonthLastDate = new Date(this.currentYear, this.currentMonth, 0).getDate();

    const prevMonthDates = Array.from({ length: thisMonthFirstday })
      .map((_, index) => prevMonthLastDate - index)
      .reverse();

    const thisMonthDates = Array.from({ length: thisMonthLastDate }).map((_, index) => index + 1);

    const nextMonthDates = Array.from({ length: 6 - nextMonthLastDay }).map((_, index) => index + 1);

    const isCurrentMonth = this.currentYear === today.getFullYear() && this.currentMonth === today.getMonth();

    const prevMonthDatesDOMString = prevMonthDates.map(
      date => `<li class="calendar__dates__item prev-month ${this.dateDisable(-1, date)}">${date}</li>`
    );
    const thisMonthDatesDOMString = thisMonthDates.map(
      date =>
        `<li class="calendar__dates__item ${
          isCurrentMonth && date === today.getDate() ? 'today' : ''
        } ${this.dateDisable(0, date)} ${this.isStartDate(date)} ${this.isEndDate(date)}">${date}</li>`
    );
    const nextMonthDatesDOMString = nextMonthDates.map(
      date => `<li class="calendar__dates__item next-month ${this.dateDisable(1, date)}">${date}</li>`
    );
    return [...prevMonthDatesDOMString, ...thisMonthDatesDOMString, ...nextMonthDatesDOMString].join('');
  }

  render() {
    const { isStartDate, activeStartDateCalendar, activeEndDateCalendar } = this.props;

    const MONTH_NAMES = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const DAY_OF_THE_WEEK_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

    return `
      <div class="calendar ${
        isStartDate ? (activeStartDateCalendar ? '' : 'hide') : activeEndDateCalendar ? '' : 'hide'
      }" id=${isStartDate ? 'calendarStartDate' : 'calendarEndDate'}>
        <div class="calendar__header">
          <strong>${MONTH_NAMES[this.currentMonth]} ${this.currentYear}</strong>
          <button class="calendar__prev__btn prev-month" type="button">이전 달</button>
          <button class="calendar__next__btn next-month" type="button">다음 달</button>
        </div>
        <div class="calendar__contents">
          <ul class="calendar__week__list">
            ${DAY_OF_THE_WEEK_NAMES.map(day => `<li class="calendar__week__item">${day}</li>`).join('')}
          </ul>
          <ul class="calendar__dates__list">
            ${this.renderCalendarGridDates()}
          </ul>
        </div>
      </div>`;
  }

  clickOutOfCalender(e) {
    if (!(e.target.matches('.datePicker') || e.target.closest('.calendar') !== null)) {
      store.state = {
        ...store.state,
        tripSchedule: {
          ...store.state.tripSchedule,
          activeStartDateCalendar: false,
          activeEndDateCalendar: false,
        },
      };
    }
  }

  updateSelectedDate(e) {
    console.log('updateSelectedDate');
    if (!e.target.classList.contains('calendar__dates__item') || e.target.classList.contains('unable')) return;

    const { id } = e.target.closest('.calendar');

    if (id === 'calendarStartDate') {
      const newStartDate = new Date(
        store.state.tripSchedule.startDatePickerCurrentDate.getFullYear(),
        e.target.matches('.prev-month')
          ? store.state.tripSchedule.startDatePickerCurrentDate.getMonth() - 1
          : e.target.matches('.next-month')
          ? store.state.tripSchedule.startDatePickerCurrentDate.getMonth() + 1
          : store.state.tripSchedule.startDatePickerCurrentDate.getMonth(),
        e.target.textContent
      );

      store.state = {
        ...store.state,
        tripSchedule: {
          ...store.state.tripSchedule,
          startDate: newStartDate,
          startDatePickerCurrentDate: newStartDate,
          activeStartDateCalendar: false,
        },
      };
      // 출발일+31일이 도착일보다 작으면 도착일을 출발일+31일로 바꾼다.
      const targetStartDate = new Date(
        store.state.tripSchedule.startDate.getFullYear(),
        store.state.tripSchedule.startDate.getMonth(),
        store.state.tripSchedule.startDate.getDate() + 31
      );
      if (targetStartDate < store.state.tripSchedule?.endDate) {
        store.state.tripSchedule.endDate = targetStartDate;
        store.state = {
          ...store.state,
          tripSchedule: {
            ...store.state.tripSchedule,
            endDate: targetStartDate,
            endDatePickerCurrentDate: targetStartDate,
            activeStartDateCalendar: false,
          },
        };
      }
    } else if (id === 'calendarEndDate') {
      const newEndDate = new Date(
        store.state.tripSchedule.endDatePickerCurrentDate.getFullYear(),
        e.target.matches('.prev-month')
          ? store.state.tripSchedule.endDatePickerCurrentDate.getMonth() - 1
          : e.target.matches('.next-month')
          ? store.state.tripSchedule.endDatePickerCurrentDate.getMonth() + 1
          : store.state.tripSchedule.endDatePickerCurrentDate.getMonth(),
        e.target.textContent
      );

      store.state = {
        ...store.state,
        tripSchedule: {
          ...store.state.tripSchedule,
          endDate: newEndDate,
          endDatePickerCurrentDate: newEndDate,
          activeEndDateCalendar: false,
        },
      };
    }
  }

  updateMonth(e) {
    console.log('updateMonth');
    if (!(e.target.classList.contains('prev-month') || e.target.classList.contains('next-month'))) return;
    const { id } = e.target.closest('.calendar');

    const delta = e.target.matches('.prev-month') ? -1 : 1;

    if (id === 'calendarStartDate') {
      store.state = {
        ...store.state,
        tripSchedule: {
          ...store.state.tripSchedule,
          startDatePickerCurrentDate: new Date(
            store.state.tripSchedule.startDatePickerCurrentDate.getFullYear(),
            store.state.tripSchedule.startDatePickerCurrentDate.getMonth() + 1 * delta
          ),
          activeStartDateCalendar: true,
        },
      };
    } else if (id === 'calendarEndDate') {
      store.state = {
        ...store.state,
        tripSchedule: {
          ...store.state.tripSchedule,
          endDatePickerCurrentDate: new Date(
            store.state.tripSchedule.endDatePickerCurrentDate.getFullYear(),
            store.state.tripSchedule.endDatePickerCurrentDate.getMonth() + 1 * delta
          ),
          activeEndDateCalendar: true,
        },
      };
    }
  }

  // addEventListener() {
  //   return [
  //     { type: 'click', selector: 'window', component: 'Calendar', handler: this.clickOutOfCalender },
  //     { type: 'click', selector: '.calendar__dates__list', handler: this.updateSelectedDate },
  //     { type: 'click', selector: '.calendar', handler: this.updateMonth },
  //   ];
  // }
}

export default Calendar;

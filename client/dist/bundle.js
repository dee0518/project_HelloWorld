/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/App.js":
/*!***************************!*\
  !*** ./client/src/App.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _component_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/index.js */ "./client/src/component/index.js");
/* harmony import */ var _core_router_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/router.js */ "./client/src/core/router.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/store.js */ "./client/src/store/store.js");
/* eslint-disable no-undef */





class App extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const $header = new _component_index_js__WEBPACK_IMPORTED_MODULE_1__.Header().render();
    const $main = (0,_core_router_js__WEBPACK_IMPORTED_MODULE_2__.routes)();
    const $footer = new _component_index_js__WEBPACK_IMPORTED_MODULE_1__.Footer().render();

    return `
      ${$header}
      ${$main}
      ${$footer}
    `;
  }

  async fetchUserInfo(e) {
    // userInfo
    try {
      const userInfo = await axios.post('/userInfo', {});
      _store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"].state = {
        userInfo: { ..._store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"].state.userInfo, ...userInfo.data },
      };
    } catch (e) {}
  }

  addEventListener() {
    return [{ type: 'DOMContentLoaded', selector: 'window', component: 'App', handler: this.fetchUserInfo }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);


/***/ }),

/***/ "./client/src/component/DatePicker/Calendar.js":
/*!*****************************************************!*\
  !*** ./client/src/component/DatePicker/Calendar.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _dateUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");
/* eslint-disable class-methods-use-this */




class Calendar extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get currentYear() {
    const { currentDate } = this.props;
    const _currentDate = typeof currentDate === 'string' ? new Date(currentDate) : currentDate;
    return _currentDate.getFullYear();
  }

  get currentMonth() {
    const { currentDate } = this.props;
    const _currentDate = typeof currentDate === 'string' ? new Date(currentDate) : currentDate;
    return _currentDate.getMonth();
  }

  setDateClass(month, date) {
    let { startDate } = this.props;
    const { endDate, currentDate, unableType, isNot31 } = this.props;

    const _currentDate = typeof currentDate === 'string' ? new Date(currentDate) : currentDate;
    const targetCurrentDate = new Date(_currentDate.getFullYear(), month, date);

    startDate = startDate || new Date();

    let _startDate = startDate;
    let _endDate = endDate;

    if (typeof _startDate === 'string') {
      _startDate = new Date(_startDate);
    }
    if (typeof _endDate === 'string') {
      _endDate = new Date(_endDate);
    }

    const startDateAfter31 = isNot31
      ? _endDate
      : // : new Date(_startDate.getFullYear(), _startDate.getMonth(), _startDate.getDate() + 31);
        (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getMoveDate)(_startDate, 31);

    if (
      _startDate.getFullYear() === targetCurrentDate.getFullYear() &&
      _startDate.getMonth() === targetCurrentDate.getMonth() &&
      _startDate.getDate() === date
    )
      return 'start-date';

    if (
      _endDate !== null &&
      _endDate.getFullYear() === targetCurrentDate.getFullYear() &&
      _endDate.getMonth() === targetCurrentDate.getMonth() &&
      _endDate.getDate() === date
    )
      return 'end-date';

    let isUnableDate = false;

    if (unableType === 'start') {
      isUnableDate = targetCurrentDate < _startDate;
    }
    if (unableType === 'end') {
      isUnableDate = targetCurrentDate > startDateAfter31;
    }
    if (unableType === 'term') {
      isUnableDate = targetCurrentDate <= _startDate || targetCurrentDate >= startDateAfter31;
    }

    return isUnableDate ? 'unable' : '';
  }

  // TODO: 추가사항 중간 날짜
  // isTripDate(date) {
  //   const { isStartDate, startDate, endDate, startDatePickerCurrentDate, endDatePickerCurrentDate } = this.props;
  //   if (startDate === null || endDate === null) return;

  //   if (isStartDate) {
  //     const targetDate = new Date(
  //       startDatePickerCurrentDate.getFullYear(),
  //       startDatePickerCurrentDate.getMonth(),
  //       date
  //     );
  //     return startDate < targetDate && targetDate < endDate ? 'trip-date' : '';
  //   }
  //   const targetDate = new Date(endDatePickerCurrentDate.getFullYear(), endDatePickerCurrentDate.getMonth(), date);
  //   return endDate < targetDate && targetDate < endDate ? 'trip-date' : '';

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
      date =>
        `<li class="calendar__dates__item prev-month ${this.setDateClass(this.currentMonth - 1, date)}">${date}</li>`
    );
    const thisMonthDatesDOMString = thisMonthDates.map(
      date =>
        `<li class="calendar__dates__item ${
          isCurrentMonth && date === today.getDate() ? 'today' : ''
        } ${this.setDateClass(this.currentMonth, date)}">${date}</li>`
    );
    const nextMonthDatesDOMString = nextMonthDates.map(
      date =>
        `<li class="calendar__dates__item next-month ${this.setDateClass(this.currentMonth + 1, date)}">${date}</li>`
    );
    return [...prevMonthDatesDOMString, ...thisMonthDatesDOMString, ...nextMonthDatesDOMString].join('');
  }

  render() {
    const { calendarId, activeCalendar } = this.props;

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
      <div class="calendar ${activeCalendar === calendarId ? '' : 'hide'}" id=${calendarId}>
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
    const {
      localDatePicker: { activeCalendar },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    if (activeCalendar && !(e.target.matches('.datePicker') || e.target.closest('.calendar') !== null)) {
      console.log('clickOutOfCalender');
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localDatePicker: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localDatePicker,
          activeCalendar: '',
        },
      };
    }
  }

  updateSelectedDate(e) {
    if (!e.target.classList.contains('calendar__dates__item') || e.target.classList.contains('unable')) return;
    console.log('updateSelectedDate');

    const {
      localDatePicker: { currentDate, activeCalendar },
      tripSchedule: { startDate, endDate, tripDays, itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    const selectedDate = new Date(
      currentDate.getFullYear(),
      e.target.matches('.prev-month')
        ? currentDate.getMonth() - 1
        : e.target.matches('.next-month')
        ? currentDate.getMonth() + 1
        : currentDate.getMonth(),
      e.target.textContent
    );

    // const _endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 31);
    const endDatePlus31 = (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getMoveDate)(selectedDate, 31);
    const _startDate = (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.convertDateStringToDate)(startDate);
    const _endDate = (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.convertDateStringToDate)(endDate);

    let _itinerary = [];
    let _tripDays = 0;

    // 31일치
    if (_endDate !== null && endDatePlus31 < _endDate) {
      // TODO: cells 정보 살리기

      _itinerary = Array.from({ length: 31 }, (_, i) => ({
        id: i + 1,
        country: '',
        date: (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getMoveDate)(selectedDate, i),
        cells: [],
      })).map(dayPlan => {
        const itineraryIndex = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary.findIndex(
          ({ date }) => (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.convertDateStringToDate)(date).toDateString() === dayPlan.date.toDateString()
        );
        console.log(itineraryIndex);
        return itineraryIndex !== -1
          ? { ...dayPlan, cells: _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary[itineraryIndex].cells }
          : dayPlan;
      });

      console.log(selectedDate);
      console.log(_itinerary);

      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localDatePicker: {
          currentDate: selectedDate,
          activeCalendar: '',
        },
        tripSchedule: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
          [activeCalendar]: selectedDate,
          endDate: endDatePlus31,
          tripDays: 31,
          itinerary: _itinerary,
        },
      };
      // 시작일로 맞추기
    } else if (_endDate !== null && activeCalendar === 'startDate' && selectedDate > _endDate) {
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state,
        localDatePicker: {
          currentDate: selectedDate,
          activeCalendar: '',
        },
        tripSchedule: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
          startDate: selectedDate,
          endDate: selectedDate,
          tripDays: 1,
          itinerary: [
            {
              id: 1,
              country: '',
              date: selectedDate,
              cells: [],
            },
          ],
        },
      };
      // 일반
    } else {
      if (activeCalendar === 'startDate') {
        _tripDays = Math.floor((_endDate - selectedDate) / 86400000) + 1;
        _itinerary = Array.from({ length: _tripDays }, (_, i) => ({
          id: i + 1,
          country: '',
          date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + i),
          cells: [],
        })).map(dayPlan => {
          const itineraryIndex = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary.findIndex(
            ({ date }) => (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.convertDateStringToDate)(date).toDateString() === dayPlan.date.toDateString()
          );

          return itineraryIndex !== -1
            ? { ...dayPlan, cells: _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary[itineraryIndex].cells }
            : dayPlan;
        });
      } else if (activeCalendar === 'endDate') {
        _tripDays = Math.floor((selectedDate - _startDate) / 86400000) + 1;
        _itinerary = Array.from({ length: _tripDays + 1 }, (_, i) => ({
          id: i + 1,
          country: '',
          date: new Date(_startDate.getFullYear(), _startDate.getMonth(), _startDate.getDate() + i),
          cells: [],
        })).map(dayPlan => {
          console.log(dayPlan);
          const itineraryIndex = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary.findIndex(
            ({ date }) => (0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.convertDateStringToDate)(date).toDateString() === dayPlan.date.toDateString()
          );
          console.log(itineraryIndex);
          return itineraryIndex !== -1
            ? { ...dayPlan, cells: _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary[itineraryIndex].cells }
            : dayPlan;
        });
      }

      _itinerary.map(dayPlan => {
        const itineraryIndex = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary.findIndex(({ date }) => date === dayPlan.date);
        console.log(itineraryIndex);
        return itineraryIndex !== -1
          ? { ...dayPlan, cells: _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.itinerary[itineraryIndex].cells }
          : dayPlan;
      });

      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state,
        localDatePicker: {
          currentDate: selectedDate,
          activeCalendar: '',
        },
        tripSchedule: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
          [activeCalendar]: selectedDate,
          tripDays: _tripDays > 0 ? _tripDays : tripDays,
          itinerary: _tripDays > 0 ? _itinerary : itinerary,
        },
      };
    }
    console.log(_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state);
  }

  updateMonth(e) {
    if (!(e.target.classList.contains('prev-month') || e.target.classList.contains('next-month'))) return;
    console.log('updateMonth');

    const {
      // tripSchedule: { startDatePickerCurrentDate, endDatePickerCurrentDate },
      localDatePicker: { currentDate },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    // const { id } = e.target.closest('.calendar');

    const delta = e.target.matches('.prev-month') ? -1 : 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state,
      localDatePicker: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localDatePicker,
        currentDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + delta),
      },
    };
  }

  addEventListener() {
    return [
      { type: 'click', selector: 'window', component: 'Calendar', handler: this.clickOutOfCalender },
      { type: 'click', selector: '.calendar__dates__list', handler: this.updateSelectedDate },
      { type: 'click', selector: '.calendar', handler: this.updateMonth },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calendar);


/***/ }),

/***/ "./client/src/component/DatePicker/CellDatePicker.js":
/*!***********************************************************!*\
  !*** ./client/src/component/DatePicker/CellDatePicker.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _Calendar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calendar.js */ "./client/src/component/DatePicker/Calendar.js");
/* harmony import */ var _dateUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");




class CellDatePicker extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { calendarId, labelContent, inputPlaceholder, date } = this.props;
    const $calendar = new _Calendar_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.props).render();
    return `<div class="time__form__input">
    <label for="${calendarId}">${labelContent}</label>
    <input id="${calendarId}" class="datePicker" type="text" name="date" placeholder="${inputPlaceholder}" value="${(0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getFormattedDate)(
      date
    )}" readOnly/>
    ${$calendar}
  </div>`;
  }

  addEventListener() {
    const { toggle } = this.props;
    return [{ type: 'click', selector: '.time__form__input input', handler: toggle }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CellDatePicker);


/***/ }),

/***/ "./client/src/component/DatePicker/DateInput.js":
/*!******************************************************!*\
  !*** ./client/src/component/DatePicker/DateInput.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _dateUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");
/* eslint-disable class-methods-use-this */




class DateInput extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { inputPlaceholder, inputId, date } = this.props;

    return `
    <input class="newTripDate datePicker" id="${inputId}" type="text" name="${inputId}" placeholder="${inputPlaceholder}" 
    ${date ? `value="${(0,_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getFormattedDate)(date)}"` : ''}" readonly />
    `;
  }

  toggleDatePicker(e) {
    if (!e.target.matches('.datePicker')) return;
    console.log('toggleDatePicker');

    const { id } = e.target;

    // 출발일이 설정 되었을 때에만 도착일 설정
    if (id === 'newTripEndDate' && _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule.startDate === null) return;

    // Date 객체로 변환
    const targetDate =
      e.target?.value.split('-').join(',') === '' ? new Date() : new Date(e.target?.value.split('-').join(','));

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localDatePicker: {
        activeCalendar: e.target.nextElementSibling.id,
        currentDate: targetDate,
      },
    };
  }

  addEventListener() {
    return [{ type: 'click', selector: '.newTrip__popup__form__input', handler: this.toggleDatePicker }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateInput);


/***/ }),

/***/ "./client/src/component/DatePicker/DatePicker.js":
/*!*******************************************************!*\
  !*** ./client/src/component/DatePicker/DatePicker.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./client/src/component/index.js");


// import store from '../../store/store.js';

class DatePicker extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { labelContent, inputId } = this.props;
    const _dateInput = new _index_js__WEBPACK_IMPORTED_MODULE_1__.DateInput(this.props).render();
    const _calendar = new _index_js__WEBPACK_IMPORTED_MODULE_1__.Calendar({ ...this.props, isNot31: false }).render();

    return `
      <div class="newTrip__popup__form__input date__form">
      <label for="${inputId}" class="a11yHidden">${labelContent}</label>
        ${_dateInput}
        ${_calendar}
      </div>`;
  }

  // addEventListener() {
  //   return [{ type: 'click', selector: '.calendar', handler: this.updateMonth }];
  // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePicker);


/***/ }),

/***/ "./client/src/component/DatePicker/dateUtils.js":
/*!******************************************************!*\
  !*** ./client/src/component/DatePicker/dateUtils.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertDateStringToDate": () => (/* binding */ convertDateStringToDate),
/* harmony export */   "getFormattedDate": () => (/* binding */ getFormattedDate),
/* harmony export */   "getFormattedDateMMDDDAY": () => (/* binding */ getFormattedDateMMDDDAY),
/* harmony export */   "getFormattedTime": () => (/* binding */ getFormattedTime),
/* harmony export */   "getMoveDate": () => (/* binding */ getMoveDate)
/* harmony export */ });
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store.js */ "./client/src/store/store.js");


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const convertDateStringToDate = date => (typeof date === 'string' ? new Date(date) : date);

const getFormattedTime = time => (time < 10 ? `0${time}:00` : `${time}:00`);

const getFormattedDate = date => {
  const _date = convertDateStringToDate(date);
  const format = n => (n < 10 ? '0' + n : n + '');
  return `${_date.getFullYear()}-${format(_date.getMonth() + 1)}-${format(_date.getDate())}`;
};

const getFormattedDateMMDDDAY = date => {
  const _date = convertDateStringToDate(date);
  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(_date.getMonth() + 1)}.${format(_date.getDate())} ${days[_date.getDay()]}`;
};

const getMoveDate = (date, digit) => {
  const _date = convertDateStringToDate(date);
  return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate() + digit);
};

// const getNextDate = (date, ) => {
//   const _date = convertDateStringToDate(date);
//   return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate() + 1);
// };




/***/ }),

/***/ "./client/src/component/EditTripPlanner.js":
/*!*************************************************!*\
  !*** ./client/src/component/EditTripPlanner.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TripPlanner/Edit/index.js */ "./client/src/component/TripPlanner/Edit/index.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");




class EditTripPlanner extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      state: {
        userInfo,
        tripSchedule,
        localDatePicker,
        localCommon: { selectedTab },
        tripSchedule: { coverImg, itinerary },
      },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"];

    const $editPlanCover = new _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__.EditPlanCover({ coverImg }).render();
    const $editPlanner = new _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__.EditPlanner({ tripSchedule, localDatePicker }).render();
    const $editTripTab = new _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__.EditTripTab({ selectedTab }).render();
    const $editPlanMap = new _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__.EditPlanMap().render();
    const $editTripStroy = new _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__.EditTripStroy({ userInfo, itinerary }).render();
    const $editTripAdd = new _TripPlanner_Edit_index_js__WEBPACK_IMPORTED_MODULE_1__.EditTripAdd().render();

    return `
      <main class="detail-main">
        ${$editPlanCover}
        <div class="trip-container">
          <div class="trip-main-container">
            ${$editPlanner}
            <div class="trip-itinerary">
              ${$editTripTab}
              <div class="itinerary__container">
                ${selectedTab === 'chart' ? $editPlanMap : $editTripStroy}
              </div>
              ${$editTripAdd}
            </div>
          </div>
        </div>
      </main>
      `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditTripPlanner);


/***/ }),

/***/ "./client/src/component/Footer.js":
/*!****************************************!*\
  !*** ./client/src/component/Footer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");


class Footer extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    return `<footer class="footer">
    <small class="footer__copyright">&copy; HelloWorld. All rights reserved.</small>
  </footer>`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);


/***/ }),

/***/ "./client/src/component/Header.js":
/*!****************************************!*\
  !*** ./client/src/component/Header.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _Header_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header/index.js */ "./client/src/component/Header/index.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _assets_images_HelloWorldLogo_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/images/HelloWorldLogo.svg */ "./client/assets/images/HelloWorldLogo.svg");






class Header extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const path = window.location.pathname;

    const {
      localCommon,
      localNewTripSchedule,
      localDatePicker,
      tripSchedule,
      localCommon: { isShowModal },
      userInfo: { userId: isLogined, nickname, profilePic },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    const newTravelLogModal =
      isShowModal === 'newTripScheduleModal'
        ? new _Header_index_js__WEBPACK_IMPORTED_MODULE_2__.NewTravelLogModal({ localCommon, localNewTripSchedule, localDatePicker, tripSchedule }).render()
        : '';
    const mypageModal = isShowModal === 'myPageModal' ? new _Header_index_js__WEBPACK_IMPORTED_MODULE_2__.MypageModal({ isShowModal, nickname }).render() : '';

    const navList = [
      { href: '/main', content: '여행일지', type: 'main' },
      { href: '#', content: '일정 만들기', type: 'newTripScheduleModal' },
      { href: '/signin', content: '로그인', type: 'signin' },
      {
        href: '#',
        content: `<img class="nav__list__profile-pic" src="${
          profilePic || '/assets/images/users/profileDefault.png'
        }" alt="${nickname}">${mypageModal}`,
        type: 'myPageModal',
      },
    ];

    return `
      <header id="top"  class="header ${path === '/' ? 'intro__header' : ''}">
        <nav class="nav">
          <h1 class="logo">
            <a class="logo__link" href="/">
              <img src="${_assets_images_HelloWorldLogo_svg__WEBPACK_IMPORTED_MODULE_4__["default"]}" alt="HelloWorld" />
            </a>
          </h1>
          <ul class="nav__list">
            ${navList
              .map(({ href, content, type }) => {
                if (path === '/' && href !== '/signin') return '';
                if (isLogined && href === '/signin') return '';
                if (!isLogined && type === 'myPageModal') return '';
                return `<li id="${type}" class="nav__item ${path === href ? 'active' : ''}">
            <a href="${href}" class="nav__item__link">${content}</a>
            </li>`;
              })
              .join('')}
          </ul>
        </nav>
      </header>
      <div class="newTravelLogModal">
        ${newTravelLogModal}
      </div>
    `;
  }

  hideMyPageModal(e) {
    if (_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon.isShowModal !== 'myPageModal' || e.target.closest('#myPageModal')) return;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localCommon: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon,
        isShowModal: '',
      },
    };
  }

  clickNavItem(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__list')) return;

    const path = e.target.closest('a').getAttribute('href');
    const { id } = e.target.closest('li');

    if (path === '#') {
      if (id === 'newTripScheduleModal' && window.location.pathname === '/trip-planner-edit') return;
      if (id === 'newTripScheduleModal' && !_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.userInfo.userId) {
        window.history.pushState({}, 'Signin', window.location.origin + '/signin');
        (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
        return;
      }

      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localCommon: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon,
          isShowModal: id,
        },
      };
    } else {
      window.history.pushState({}, path, window.location.origin + path);
      (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
    }
  }

  async logout(e) {
    try {
      const response = await axios.post('/logout', {});
      if (response.status === 200) {
        _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].clearState();
        window.history.pushState({}, 'main', window.location.origin + '/main');
        (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
      }
    } catch (e) {
      console.error(e);
    }
  }

  addEventListener() {
    return [
      { type: 'click', selector: 'window', component: 'header', handler: this.hideMyPageModal },
      { type: 'click', selector: '.nav__list', handler: this.clickNavItem },
      { type: 'click', selector: '.logout', handler: this.logout },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ "./client/src/component/Header/MypageModal.js":
/*!****************************************************!*\
  !*** ./client/src/component/Header/MypageModal.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");


class MypageModal extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { isShowModal, nickname } = this.props;

    const myPageLink = [
      {
        className: 'mypage',
        href: '/mypage',
        content: '마이페이지 >',
      },
      {
        className: 'logout',
        href: '#',
        content: '로그아웃',
      },
    ];

    return `
    <div class="my-page-modal ${isShowModal === 'myPageModal' ? '' : 'hide'}">
      <ul class="my-page-modal__list">
      <span class="my-page-modal__nickname">${nickname} 님</span>
      ${myPageLink
        .map(
          ({ className, href, content }) => `
        <li class="my-page-modal__item">
          <a href="${href}" class="my-page-modal__link ${className}">${content}</a>
        </li>`
        )
        .join('')}
      </ul>
    </div>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MypageModal);


/***/ }),

/***/ "./client/src/component/Header/NewTravelLogModal.js":
/*!**********************************************************!*\
  !*** ./client/src/component/Header/NewTravelLogModal.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./client/src/component/index.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dom/render.js */ "./client/src/dom/render.js");





class NewTravelLogModal extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      localCommon: { isShowModal },
      localNewTripSchedule: { isFilledAllModalInput, isActiveSelfNumberOfPeopleInputForm },
      tripSchedule: { title, numberOfPeople, startDate, endDate },
    } = this.props;

    // console.log(store.state);
    // console.log(new Date(startDate));
    // console.log(new Date(endDate));

    const startDatePickerProps = {
      ...this.props.tripSchedule,
      ...this.props.localDatePicker,
      inputId: 'newTripStartDate',
      calendarId: 'startDate',
      inputPlaceholder: '출발일',
      labelContent: '출발 날짜',
      date: startDate,
      startDate,
      endDate,
      unableType: 'none',
    };
    const endDatePickerProps = {
      ...this.props.tripSchedule,
      ...this.props.localDatePicker,
      inputId: 'newTripEndDate',
      calendarId: 'endDate',
      inputPlaceholder: '도착일',
      labelContent: '도착 날짜',
      date: endDate,
      startDate,
      endDate,
      unableType: 'term',
    };

    const _datePickerStartDate = new _index_js__WEBPACK_IMPORTED_MODULE_1__.DatePicker(startDatePickerProps).render();
    const _datePickerEndDate = new _index_js__WEBPACK_IMPORTED_MODULE_1__.DatePicker(endDatePickerProps).render();

    const options = [
      { value: '0', content: '여행인원을 선택 해주세요.' },
      { value: '1', content: '1명' },
      { value: '2', content: '2명' },
      { value: '3', content: '3명' },
      { value: '4', content: '4명' },
      { value: '5', content: '5명' },
    ];

    return `
    <!-- 새 일정 만들기 모달 -->
    <div class="dimmed__layer ${isShowModal === 'newTripScheduleModal' ? '' : 'hide'}">
      <div class="modal newTrip__popup">
        <div class="modal__header">
          <div class="modal__header__title">새 일정 만들기</div>
          <button class="modal__header__close__btn" aria-label="닫기"></button>
        </div>
        <form class="newTrip__popup__form">
          <div class="newTrip__popup__form__input">
            <label for="newTripTitle" class="a11yHidden">새 일정 제목</label>
            <input class="newTripTitle" type="text" name="title" placeholder="예 : 5박 6일 하와이 여행" value="${title}" minLength="3" maxLength="50" required/>
          </div>
          ${_datePickerStartDate}
          ${_datePickerEndDate}
          <div class="newTrip__popup__form__select">
            <label for="selectedPeople" class="a11yHidden">인원 수</label>
            <select name="selectedPeople" id="selectedPeople">
              <optgroup>
                ${options
                  .map(
                    ({ value, content }) =>
                      `<option value="${value}" ${numberOfPeople === +value ? 'selected' : ''}>${content}</option>`
                  )
                  .join('')}
                <option value="6" ${numberOfPeople >= 6 ? 'selected' : ''}>직접입력</option>
              </optgroup>
            </select>
          </div>
          <div class="newTrip__popup__form__input self__input__form ${
            isActiveSelfNumberOfPeopleInputForm ? '' : 'hide'
          }">
            <label for="inputPeople" class="a11yHidden">인원 수 입력</label>
            <input class="inputPeople" id="inputPeople" type="number" name="numberOfPeople" placeholder="6명 이상은 직접 입력해주세요." value="${numberOfPeople}"/>
          </div>
          <button class="newTrip__popup__form__submit ${isFilledAllModalInput ? 'active' : ''}" ${
      isFilledAllModalInput ? '' : 'disabled'
    }>새 일정 만들기</button>
        </form>
      </div>
    </div>
    `;
  }

  closeNewTripScheduleModal(e) {
    // console.log('closeNewTripScheduleModal');
    if (
      e.target.matches('.newTravelLogModal .modal__header__close__btn') ||
      e.target.matches('.newTravelLogModal .dimmed__layer')
    )
      _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
        localCommon: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localCommon,
          isShowModal: '',
        },
        localNewTripSchedule: {
          isFilledAllModalInput: false,
          isActiveSelfNumberOfPeopleInputForm: false,
        },
        localDatePicker: {
          activeCalendar: '',
          currentDate: new Date(),
        },
        tripSchedule: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.tripSchedule,
          title: '',
          startDate: null,
          endDate: null,
          numberOfPeople: '',
        },
      };
  }

  inputNewTripScheduleModalValue(e) {
    const { name, value } = e.target;

    // console.log(e.target);
    // console.log(name);
    // console.log(value);

    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
      tripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.tripSchedule,
        [name]: value,
      },
    };
  }

  changeSelfInputForm(e) {
    const isActive = +e.target.value >= 6;

    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
      localNewTripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localNewTripSchedule,
        isActiveSelfNumberOfPeopleInputForm: isActive,
      },
      tripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.tripSchedule,
        numberOfPeople: +e.target.value,
      },
    };
  }

  validateInputFill() {
    const {
      tripSchedule: { title, startDate, endDate },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state;

    const isAllFilled = !!(title && startDate && endDate);
    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
      localNewTripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localNewTripSchedule,
        isFilledAllModalInput: isAllFilled,
      },
    };
  }

  submitTripSchedule(e) {
    e.preventDefault();
    // console.log('submitTripSchedule');

    const inputValues = new FormData(document.querySelector('.newTrip__popup__form'));

    const { title, newTripStartDate, newTripEndDate, numberOfPeople } = Object.fromEntries([...inputValues.entries()]);

    const {
      userInfo: { userId, profilePic, nickname },
      tripSchedule: { startDate, endDate },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state;

    const _tripDays = Math.floor((endDate - startDate) / 86400000) + 1;

    const _itinerary = Array.from({ length: _tripDays }, (_, i) => ({
      id: i + 1,
      country: '',
      date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
      cells: [],
    }));
    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
      localCommon: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localCommon,
        isShowModal: '',
        selectedTab: 'chart',
      },
      tripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.tripSchedule,
        authorId: userId,
        author: nickname,
        authorProfilePic: profilePic,
        title,
        summary: '',
        tripDays: _tripDays,
        startDate: new Date(newTripStartDate), // * Date 객체
        endDate: new Date(newTripEndDate), // * Date 객체
        createdDate: new Date(),
        numberOfPeople,
        coverImg: '',
        content: '',
        isLiked: false,
        likeCount: 0,
        commentCount: 0,
        itinerary: _itinerary,
      },
    };

    // edit 페이지로 이동
    window.history.pushState({}, 'EditTripSchedule', window.location.origin + '/trip-planner-edit');
    (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }

  addEventListener() {
    return [
      { type: 'click', selector: '.dimmed__layer', handler: this.closeNewTripScheduleModal },
      { type: 'change', selector: '.newTripTitle', handler: this.inputNewTripScheduleModalValue },
      { type: 'change', selector: '.inputPeople', handler: this.inputNewTripScheduleModalValue },
      { type: 'change', selector: '.newTrip__popup__form__select', handler: this.changeSelfInputForm },
      { type: 'change', selector: '.newTrip__popup__form', handler: this.validateInputFill },
      { type: 'submit', selector: '.newTrip__popup__form', handler: this.submitTripSchedule },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewTravelLogModal);


/***/ }),

/***/ "./client/src/component/Header/index.js":
/*!**********************************************!*\
  !*** ./client/src/component/Header/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MypageModal": () => (/* reexport safe */ _MypageModal_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "NewTravelLogModal": () => (/* reexport safe */ _NewTravelLogModal_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _NewTravelLogModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewTravelLogModal.js */ "./client/src/component/Header/NewTravelLogModal.js");
/* harmony import */ var _MypageModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MypageModal.js */ "./client/src/component/Header/MypageModal.js");




/***/ }),

/***/ "./client/src/component/Intro.js":
/*!***************************************!*\
  !*** ./client/src/component/Intro.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./client/src/component/index.js");
/* harmony import */ var _assets_videos_MainMovie3_mp4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/videos/MainMovie3.mp4 */ "./client/assets/videos/MainMovie3.mp4");





class Intro extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const $footer = new _index_js__WEBPACK_IMPORTED_MODULE_2__.Footer().render();
    return `<div class="intro">
    <section class="intro__copywriter">
      <h2 class="intro__copywriter__title">
        <span>함께 만드는 여행 계획</span>
        <strong>Hello World</strong>
      </h2>
      <a href="/main" class="intro__copywriter__link">여행일지 둘러보기</a>
      ${$footer}
    </section>
    <section class="intro__service">
      <h2 class="a11yHidden">서비스 이용자 및 여행일지 수, 비디오</h2>
      <div class="intro__service__info">
        <dl>
          <dt>여행일지</dt>
          <dd>93</dd>
        </dl>
        <dl>
          <dt>이용자 수</dt>
          <dd>117,432</dd>
        </dl>
      </div>
      <video autoplay loop muted title="여행 비디오">
        <source src="${_assets_videos_MainMovie3_mp4__WEBPACK_IMPORTED_MODULE_3__["default"]}" />
      </video>
    </section>
  </div>`;
  }

  link(e) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    window.history.pushState({}, path, window.location.origin + path);
    (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  }

  addEventListener() {
    return [{ type: 'click', selector: '.intro__copywriter__link', handler: this.link }];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Intro);


/***/ }),

/***/ "./client/src/component/Itinerary.js":
/*!*******************************************!*\
  !*** ./client/src/component/Itinerary.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./client/src/component/index.js");
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */

// import myMap from './myMap.js';



class Itinerary extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  // formattedDate(date) {
  //   const format = n => (n < 10 ? '0' + n : n + '');
  //   return `${format(date?.getMonth() + 1)}.${format(date?.getDate())}.${format(date?.getDay())}`;
  // }
  init() {
    const { startDate, endDate, itinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule;
    let middleDays = startDate - endDate;
    let id = 1;
    // 기본 셋
    let initSchedule = {
      id,
      country: '',
      date: startDate.getDate(),
      day: startDate.getDay(),
      cells: [],
    };

    if (itinerary.length === 0) {
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        tripSchedule: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
          itinerary: initSchedule,
        },
      };
    }

    if (id < middleDays) id += 1;
  }

  render() {
    const {
      localCommon: { isShowModal },
      localItinerary,
      localNewScheduleCell: {
        selectedScheduleId,
        info: { startTime },
      },
      tripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { currentId, startId, isShowNewScheuleCellBtn } = localItinerary;
    const $newScheduleCellPopup = isShowModal === 'newScheduleCellPopup' ? new _index_js__WEBPACK_IMPORTED_MODULE_2__.NewScheduleCellPopup().render() : '';
    // const _schedule = schedule.filter(sched => sched.id > startId && sched.id <= startId + 3); // 이게 있으면 앞뒤 삭제 버튼이 안 됨..
    // const setSchedule = {
    //   id: startId + 1,
    //   country: '영국',
    //   date: startDate.getDate(),
    //   day: startDate.getDay(),
    //   cells: [],
    // };

    const _schedule = itinerary.filter((_, i) => i >= startId && i < startId + 3);

    const timeList = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00',
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // prettier-ignore
    return `
    <div class="itinerary__container">
      <!-- google map -->
      <div id="googleMap" class="map"></div>
       
      <!-- carousel -->
      <div class="carousel">
        <div class="carousel__days">
        ${
          _schedule.map(sched =>  `
            <div class="carousel__day-index" data-id=${sched.id}>

              <button class="carousel__day-index--add" data-id=${sched.id}></button>Day${sched.id}<span>/</span> ${sched.date.getMonth()+1<10 ? '0'+(sched.date.getMonth()+1) : sched.date.getMonth()+1}.${sched.date.getDate()<10 ? '0'+sched.date.getDate() : (sched.date.getDate())} ${sched.day}

              
              ${currentId === sched.id ? `
                <ul class="carousel__days__add--list">
                  <li class="carousel__days__add--item first-item prev--add--item">앞에 추가</li>
                  <li class="carousel__days__add--item next--add--item">뒤에 추가</li>
                  <li class="carousel__days__add--item delete--item">일정 삭제</li>
                </ul>
              `: ''}
              <div>${sched.country}</div>
            </div>`).join('')
        }
      </div>
      <button class="prev--btn carousel--btn">〈</button>
      <button class="next--btn carousel--btn">〉</button>

      <!--<ul class="carousel__days__add--list" style="display:none">
        <li class="carousel__days__add--item first-item prev--add--item">앞에 추가</li>
        <li class="carousel__days__add--item next--add--item">뒤에 추가</li>
        <li class="carousel__days__add--item delete--item">일정 삭제</li>
      </ul> -->

    </div>

    <!-- time table -->
    <div class="time-table">
      <ul class="time-table__times">
        <li class="time-table__time-item">
          <span class="time-table__time">00:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">01:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">02:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">03:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">04:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">05:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">06:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">07:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">08:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">09:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">10:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">11:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">12:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">13:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">14:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">15:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">16:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">17:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">18:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">19:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">20:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">21:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">22:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">23:00</span>
          <span class="line"></span>
        </li>
        <li class="time-table__time-item">
          <span class="time-table__time">24:00</span>
          <span class="line"></span>
        </li>
      </ul>
      <div class="time-table__day-index">
      ${_schedule.map(sch => {
        const { cells, id } = sch
        const cellStartTimeArr = cells.map(cell => cell.startTime);

        return `
        <ul class="time-table__day-index__blank" data-id="${id}">
          ${timeList.map((timeItem, i, self) => {
            if(i === self.length - 1) return '';

            const idx = cellStartTimeArr.indexOf(timeItem)
            const isInculdedCell = idx !== -1
            let timeGap = 62;

            // 시간에 따른 item 높이 조절
            if(isInculdedCell){
              const cellStartTime = +cells[idx].startTime.slice(0,2)
              const cellEndTime = +cells[idx].endTime.slice(0,2)
              timeGap *= cellEndTime - cellStartTime
            }
            
            // timeItem 시간이 cells의 세부 일정 시작 시간과 같으면 div.itinerary-card를 추가 
            // 세부 일정이 없는 시간이고 mouseover되었으면 button.itinerary-card--add를 추가
            return `<li data-time="${i}">
              ${isInculdedCell ? 
                `<div class="itinerary-card itinerary-card--check ${cells[idx].type}" data-id="${cells[idx].id}" draggable="true" style="height:${timeGap}px;">
                  <div class="itinerary-card-emph"></div>
                  <div class="itinerary-card--check__content">
                    <div class="itinerary-card--check__title">
                      ${cells[idx].location.name}
                    </div>
                    <div class="itinerary-card--check__memo">
                      ${cells[idx].memo}
                    </div>
                  </div>
                </div>` :
                (isShowNewScheuleCellBtn && selectedScheduleId === id && startTime === timeItem ?'<button class="itinerary-card--add">+</button>': '')
                }
            </li>`
          }).join('')}
        </ul>
      `}).join('')}
      </div>
    </div>

    <!-- private & public button -->
    <div class="itinerary-btns">
      <button class="itinerary-btns--private">나만의 일정</button>
      <button class="itinerary-btns--public">다른 사람들에게도 공유하기</button>
      </div>
      
      </div>${$newScheduleCellPopup}`
  }

  nextBtnsController() {
    const { localItinerary, tripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary } = tripSchedule;
    let { startId } = localItinerary;

    if (itinerary.length > 31) {
      alert('더이상 생성하지 맙시다');
      return;
    }
    if (itinerary.length === startId + 3) {
      alert('마지막 입니다.');
      return;
    }
    startId += 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        startId,
      },
    };
  }

  prevBtnsController() {
    const { localItinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    let { startId } = localItinerary;

    if (startId === 0) {
      alert('첫번째 여행일 입니다');
      return;
    }
    startId -= 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        startId,
      },
    };
  }

  buttonHandler(e) {
    const { localItinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    if (e.target.matches('.carousel__day-index--add')) {
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { localItinerary: { ...localItinerary, currentId: +e.target.dataset.id } };
      console.log(_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary);
      return;
    }
    if (!e.target.closest('.carousel__days__add--list')) {
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { localItinerary: { ...localItinerary, currentId: '' } };
    }
  }

  deleteSchedule(e) {
    const {
      localItinerary,
      tripSchedule,
      tripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    if (!e.target.classList.contains('delete--item')) return;

    const restItems = itinerary.filter(sched => sched.id !== +e.target.closest('.carousel__day-index').dataset.id);

    console.log(restItems);
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        currentId: '',
      },
      tripSchedule: {
        ...tripSchedule,
        itinerary: restItems,
      },
    };
  }

  addScheduleBefore(e) {
    if (!e.target.classList.contains('prev--add--item')) return;

    // store.state = {
    //   itinerary: {
    //     schedule: [],
    //     currentId: ''
    //   }
    // }
    const { tripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary } = tripSchedule;
    const id = +e.target.closest('.carousel__day-index').dataset.id;

    const idx = itinerary.findIndex(sched => sched.id === id);

    // 앞에 추가 로직
    const beforeArr = itinerary.filter((_, i) => i < idx); // id = 0
    const afterArr = itinerary.filter((_, i) => i >= idx);
    // const beforeArr = itinerary.slice(0, idx); // id = 0
    // const afterArr = itinerary.slice(idx);

    console.log(id);
    console.log(beforeArr);
    console.log(afterArr);
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary,
        currentId: '',
      },
      tripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
        itinerary: [
          ...beforeArr,
          { id: 5, country: '스페인', date: new Date('2022-08-14'), day: 'Sat', cells: [] },
          ...afterArr,
        ],
      },
    };
  }

  addScheduleAfter(e) {
    console.log('addScheduleAfter');
    if (!e.target.classList.contains('next--add--item')) return;
    const { itinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule;
    const id = +e.target.closest('.carousel__day-index').dataset.id;

    // 뒤에 추가 로직
    // const beforeArr = itinerary.filter((_, i) => i <= id); // id = 0
    // const afterArr = itinerary.filter((_, i) => i > id);

    // index 찾기
    let idx;
    itinerary.forEach((sched, i) => {
      if (sched.id === id) idx = i;
    });
    const beforeArr = itinerary.filter((_, i) => i <= idx); // id = 0
    const afterArr = itinerary.filter((_, i) => i > idx);

    // console.log(e.target.closest('.carousel__day-index'));
    // console.log(id);
    // console.log(beforeArr);
    // console.log(afterArr);
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      tripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
        itinerary: [
          ...beforeArr,
          { id: 5, country: '스페인', date: new Date('2022-08-14'), day: 'Sat', cells: [] },
          ...afterArr,
        ],
      },
      localItinerary: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary,
        currentId: '',
      },
    };
  }

  openNewCellModal() {
    const { localCommon, localItinerary, localNewScheduleCell, tripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { selectedScheduleId, info } = localNewScheduleCell;
    const { itinerary } = tripSchedule;
    const { date } = itinerary.filter(sch => sch.id === selectedScheduleId)[0];

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localCommon: {
        ...localCommon,
        isShowModal: 'newScheduleCellPopup',
      },
      localItinerary: {
        ...localItinerary,
        isShowNewScheuleCellBtn: false,
      },
      localNewScheduleCell: {
        ...localNewScheduleCell,
        info: {
          ...info,
          type: '',
          location: '',
          memo: '',
          todos: [],
        },
      },
      tripSchedule: {
        ...tripSchedule,
        newScheduleCellDate: date,
      },
    };
  }

  mouseoverTimetable(e) {
    if (!e.target.closest('.time-table__day-index__blank') || !e.target.closest('.time-table__day-index__blank li'))
      return;

    const newScheduleId = +e.target.closest('.time-table__day-index__blank').dataset.id;
    const newTime = +e.target.closest('.time-table__day-index__blank li').dataset.time;

    const newStartTime = newTime < 10 ? `0${newTime}:00` : `${newTime}:00`;
    const newEndTime = newTime + 1 < 10 ? `0${newTime + 1}:00` : `${newTime + 1}:00`;
    const { localItinerary, localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const {
      selectedScheduleId,
      info: { startTime },
    } = localNewScheduleCell;

    // console.log('newScheduleId=' + newScheduleId);
    // console.log('selectedScheduleId=' + selectedScheduleId);
    // console.log('startTime=' + startTime);
    // console.log('newStartTime=' + newStartTime);

    if (newScheduleId === selectedScheduleId && startTime === newStartTime) return;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        isShowNewScheuleCellBtn: true,
      },
      localNewScheduleCell: {
        ...localNewScheduleCell,
        selectedScheduleId: newScheduleId,
        info: {
          ...localNewScheduleCell.info,
          startTime: newStartTime,
          endTime: newEndTime,
        },
      },
    };
  }

  mouseoutTimetable(e) {
    // const { localNewScheduleCell, localItinerary } = store.state;
    // store.state = {
    //   localItinerary: {
    //     ...localItinerary,
    //     isShowNewScheuleCellBtn: false,
    //   },
    //   localNewScheduleCell: {
    //     ...localNewScheduleCell,
    //     selectedScheduleId: '',
    //     info: {
    //       ...localNewScheduleCell.info,
    //       startTime: '',
    //       endTime: '',
    //     },
    //   },
    // };
  }

  dragCard(e) {
    const { id } = e.target.closest('.itinerary-card').dataset;
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary,
        dragTarget: +id,
      },
    };
  }

  dragoverCard(e) {
    if (!e.target.closest('.time-table__day-index__blank li')) return;
    e.preventDefault();
  }

  dropCard(e) {
    const {
      localItinerary: { dragTarget },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    if (e.target === dragTarget || !e.target.closest('.time-table__day-index__blank li')) return;

    const {
      localItinerary,
      tripSchedule,
      localNewScheduleCell: { selectedScheduleId },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary } = tripSchedule;

    const dropScheduleId = +e.target.closest('.time-table__day-index__blank').dataset.id;
    const dropTime = +e.target.closest('.time-table__day-index__blank li').dataset.time;

    const _itinerary = itinerary.filter(sch => sch.id === selectedScheduleId)[0].cells;
    let targetItinerary = _itinerary.filter(cell => cell.id === dragTarget)[0];
    let { startTime, endTime } = targetItinerary;

    const targetTimeGap = +endTime.slice(0, 2) - +startTime.slice(0, 2);

    startTime = dropTime < 10 ? `0${dropTime}:00` : `${dropTime}:00`;
    endTime = dropTime + targetTimeGap < 10 ? `0${dropTime + targetTimeGap}:00` : `${dropTime + targetTimeGap}:00`;

    targetItinerary = {
      ...targetItinerary,
      startTime,
      endTime,
    };
    const restSchedule = _itinerary.filter(cell => cell.id !== dragTarget);

    const changeShedule = sch => {
      if (sch.id === selectedScheduleId) {
        return {
          ...sch,
          cells:
            selectedScheduleId === dropScheduleId
              ? sch.cells.map(cell => (cell.id === dragTarget ? targetItinerary : cell))
              : restSchedule,
        };
      }

      if (sch.id === dropScheduleId) {
        return { ...sch, cells: [...sch.cells, targetItinerary] };
      }

      return sch;
    };
    // console.log(dragTarget, selectedScheduleId, dropScheduleId);
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        dragTarget: '',
      },
      tripSchedule: {
        ...tripSchedule,
        itinerary: itinerary.map(sch => changeShedule(sch)),
      },
    };
  }

  addEventListener() {
    return [
      // { type: 'DOMContentLoaded', selector: 'window', component: 'myMap', handler: myMap },
      { type: 'click', selector: '.next--btn', component: 'next--btn', handler: this.nextBtnsController },
      { type: 'click', selector: '.prev--btn', component: 'prev--btn', handler: this.prevBtnsController },
      { type: 'click', selector: '.carousel__day-index--add', handler: this.buttonHandler },
      { type: 'click', selector: '.itinerary-card--add', handler: this.openNewCellModal },
      { type: 'dragstart', selector: '.time-table__day-index__blank li', handler: this.dragCard },
      { type: 'dragover', selector: '.time-table__day-index__blank li', handler: this.dragoverCard },
      { type: 'drop', selector: '.time-table__day-index__blank li', handler: this.dropCard },
      { type: 'mouseover', selector: '.time-table', handler: this.mouseoverTimetable },
      { type: 'mouseout', selector: '.time-table__day-index', handler: this.mouseoutTimetable },
      {
        type: 'click',
        selector: '.carousel__days__add--list',
        component: 'next--add--item',
        handler: this.addScheduleAfter,
      },
      {
        type: 'click',
        selector: '.carousel__days__add--list',
        component: 'prev--add--item',
        handler: this.addScheduleBefore,
      },
      {
        type: 'click',
        selector: '.carousel__days__add--list',
        component: 'delete--item',
        handler: this.deleteSchedule,
      },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Itinerary);


/***/ }),

/***/ "./client/src/component/Main.js":
/*!**************************************!*\
  !*** ./client/src/component/Main.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _Main_MainPost_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main/MainPost.js */ "./client/src/component/Main/MainPost.js");




class Main extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  async init() {
    try {
      const query = window.location.search;

      const mainTripSchedules = await axios.get(`/trip-log${query}`);
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localCommon: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon,
          path: window.location.pathname,
        },
        tripSchedules: [...mainTripSchedules.data],
      };
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      localMain: { selectedCardId },
      tripSchedules,
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    return `
    <div class="main">
    <section class="hot-topic">
      <div class="hot-topic__header">
        <h2 class="hot-topic__title">핫 토픽</h2>
        <ul class="hot-topic__hashtag__list">
          <li class="hot-topic__hashtag__item">#눈</li>
          <li class="hot-topic__hashtag__item">#축제</li>
        </ul>
        <ul class="hot-topic__nav">
          <li class="hot-topic__nav__item"><div class="hot-topic__nav__item__circle checked"></div></li>
          <li class="hot-topic__nav__item"><div class="hot-topic__nav__item__circle"></div></li>
          <li class="hot-topic__nav__item"><div class="hot-topic__nav__item__circle"></div></li>
        </ul>
      </div>
      <div class="hot-topic__body">
        <ul class="hot-topic__list">
          <li class="hot-topic__item">
            <a href="" class="hot-topic__link">
              <div class="hot-topic__item__thumbnail">
                <span class="hot-topic__item__thumbnail__icon">
                  <svg width="29" height="40" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.8805 17.5405C28.4518 18.7412 28.4518 21.1072 26.8805 22.3079L4.8215 39.1641C2.84732 40.6726 -1.84746e-06 39.2649 -1.73885e-06 36.7803L-2.65242e-07 3.06802C-1.56637e-07 0.583446 2.84732 -0.824252 4.8215 0.684298L26.8805 17.5405Z"
                      fill="#EEEEEE" />
                  </svg>
                </span>
                <video
                  class="hot-topic__item__thumbnail__video"
                  src="/assets/videos/videothumbnail2.mp4"
                  autoplay="true"
                  loop="true"
                  muted="true"></video>
              </div>
              <div class="hot-topic__item__detail">
                <h3 class="hot-topic__item__detail__title">인기여행지 1위</h3>
                <p class="hot-topic__item__detail__desc">인기여행지 1위 설명 들어가면 된다아아아아아아아아아</p>
              </div>
            </a>
          </li>
          <li class="hot-topic__item">
            <a href="" class="hot-topic__link">
              <div class="hot-topic__item__thumbnail">
                <span class="hot-topic__item__thumbnail__icon">
                  <svg width="29" height="40" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.8805 17.5405C28.4518 18.7412 28.4518 21.1072 26.8805 22.3079L4.8215 39.1641C2.84732 40.6726 -1.84746e-06 39.2649 -1.73885e-06 36.7803L-2.65242e-07 3.06802C-1.56637e-07 0.583446 2.84732 -0.824252 4.8215 0.684298L26.8805 17.5405Z"
                      fill="#EEEEEE" />
                  </svg>
                </span>
                <video class="hot-topic__item__thumbnail__video" src="/assets/videos/MainMovie1.mp4" autoplay="true" loop="true" muted="true"></video>
              </div>
              <div class="hot-topic__item__detail">
                <h3 class="hot-topic__item__detail__title">인기여행지 1위</h3>
                <p class="hot-topic__item__detail__desc">인기여행지 1위 설명 들어가면 된다아아아아아아아아아</p>
              </div>
            </a>
          </li>
          <li class="hot-topic__item">
            <a href="" class="hot-topic__link">
              <div class="hot-topic__item__thumbnail">
                <span class="hot-topic__item__thumbnail__icon">
                  <svg width="29" height="40" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.8805 17.5405C28.4518 18.7412 28.4518 21.1072 26.8805 22.3079L4.8215 39.1641C2.84732 40.6726 -1.84746e-06 39.2649 -1.73885e-06 36.7803L-2.65242e-07 3.06802C-1.56637e-07 0.583446 2.84732 -0.824252 4.8215 0.684298L26.8805 17.5405Z"
                      fill="#EEEEEE" />
                  </svg>
                </span>
                <video class="hot-topic__item__thumbnail__video" src="/assets/videos/MainMovie5.mp4" autoplay="true" loop="true" muted="true"></video>
              </div>
              <div class="hot-topic__item__detail">
                <h3 class="hot-topic__item__detail__title">인기여행지 1위</h3>
                <p class="hot-topic__item__detail__desc">인기여행지 1위 설명 들어가면 된다아아아아아아아아아</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="travel-log">
      <div class="travel-log__header">
        <h2 class="travel-log__title">여행 일지</h2>
      </div>
      <form action="" class="travel-log__form">
        <select class="travel-log__form__dropdown" name="category" id="cars">
          <option value="title">제목</option>
          <option value="country">국가</option>
          <option value="city">도시</option>
        </select>
        <input class="travel-log__form__input" name="keyword" type="text" placeholder="검색어를 입력해주세요." />
        <button class="travel-log__form__button--submit" type="submit">검색</button>
      </form>
      <div class="travel-log__body">
        <ul class="travel-log__list">
          ${tripSchedules.map(schedule => new _Main_MainPost_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ ...schedule, selectedCardId }).render()).join('')}
        </ul>
      </div>
    </section>
  </div>`;
  }

  chageSearchValue(e) {
    const { name, value } = e.target;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localMain: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localMain,
        [name]: value,
      },
    };
  }

  changeToTripScheduleView(e) {
    if (!e.target.closest('.travel-log__item')) return;
    e.preventDefault();
    const path = e.target.closest('.travel-log__link').getAttribute('href');

    window.history.pushState({}, path, window.location.origin + path);

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localMain: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localMain,
        selectedCardId: e.target.closest('li').id,
      },
    };
  }

  async filterToTripScheduleView(e) {
    e.preventDefault();

    if (!e.target.classList.contains('travel-log__form')) return;

    const {
      localMain: { category, keyword },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    const filteredMainTripSchedules = await axios.get('/trip-log', {
      params: {
        category,
        keyword,
      },
    });

    window.history.pushState(
      {},
      'MainFitler',
      window.location.origin + `/main?category=${category}&keyword=${keyword}`
    );

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      tripSchedules: filteredMainTripSchedules.data,
    };
  }

  addEventListener() {
    return [
      { type: 'change', selector: '.travel-log__form__input', handler: this.chageSearchValue },
      { type: 'change', selector: '.travel-log__form__dropdown', handler: this.chageSearchValue },
      { type: 'click', selector: '.travel-log__item', handler: this.changeToTripScheduleView },
      { type: 'submit', selector: '.travel-log__form', handler: this.filterToTripScheduleView },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);


/***/ }),

/***/ "./client/src/component/Main/MainPost.js":
/*!***********************************************!*\
  !*** ./client/src/component/Main/MainPost.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Component.js */ "./client/src/core/Component.js");


class MainPost extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      tripScheduleId,
      author,
      authorProfilePic,
      title,
      summary,
      coverImg,
      content,
      likeCount,
      commentCount,
      selectedCardId,
    } = this.props;
    return `
    <li class="travel-log__item ${selectedCardId === tripScheduleId ? 'selected' : ''}" id="${tripScheduleId}">
    <a href="${'/trip-planner-view/' + tripScheduleId}" class="travel-log__link">
      <div class="travel-log__item__top-section" style="background-image: url('${coverImg}')">
        <div class="travel-log__item__user-info">
          <img class="travel-log__item__user-info__profile-pic" src="${
            authorProfilePic || '/assets/images/users/profileDefault.png'
          }" alt="${author} 님의 프로필 사진" />
          <span class="travel-log__item__user-info__nickname">${author}</span>
        </div>
        <div class="travel-log__item__main">
          <h3 class="travel-log__item__main__title">${title}</h3>
          <span class="travel-log__item__main__detail">${summary}</span>
        </div>
      </div>
      <div class="travel-log__item__bottom-section">
        <div class="travel-log__item__sub">
          <p class="travel-log__item__sub__detail">
            ${content}
          </p>
        </div>
        <div class="travel-log__item__social">
          <span class="travel-log__item__like">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.75 1C2.67925 1 1 2.86391 1 5.16351C1 7.01984 1.65625 11.4256 8.116 15.8793C8.23171 15.9582 8.36455 16 8.5 16C8.63545 16 8.76829 15.9582 8.884 15.8793C15.3438 11.4256 16 7.01984 16 5.16351C16 2.86391 14.3208 1 12.25 1C10.1792 1 8.5 3.52334 8.5 3.52334C8.5 3.52334 6.82075 1 4.75 1Z"
                fill="white"
                stroke="#9A9A9A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
          <span class="travel-log__item__like__count">${likeCount}</span>
          <span class="travel-log__item__comment">
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.125 0.5H0.875L0.25 1.125V12.375L0.875 13H4V16.125L5.0675 16.5675L8.63375 13H17.125L17.75 12.375V1.125L17.125 0.5ZM16.5 11.75H8.375L7.9325 11.9325L5.25 14.6163V12.375L4.625 11.75H1.5V1.75H16.5V11.75Z"
                fill="#9A9A9A" />
            </svg>
          </span>
          <span class="travel-log__item__comment__count">${commentCount}</span>
        </div>
      </div>
    </a>
  </li>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainPost);


/***/ }),

/***/ "./client/src/component/Mypage.js":
/*!****************************************!*\
  !*** ./client/src/component/Mypage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");


class Mypage extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    return `
      <div class="mypage">
        <section class="profile">
          <div class="profile--pic">
            <div class="profile--pic--edit"></div>
            <img class="profile--pic__img" src="/assets/images/profile4.png" alt="">
          </div>
          <h3 class="profile--nickname">Joonha</h3>
          <h4 class="profile--id">joonhabaak@gmail.com</h4>
          <div class="profile--social">
            <a class="profile--social__post profile--social__button displayNone">내 여행일지<span>21</span></a>
            <a class="profile--social__follower profile--social__button selected ">팔로워<span>128</span></a>
            <a class="profile--social__following profile--social__button ">팔로잉<span>88</span></a>
          </div>
        </section>

        <div class="mypage-main">
          <aside class="side-nav">
            <ul class="side-nav__list">
              <li class="side-nav__item selected">내 여행일지</li>
              <li class="side-nav__item">좋아요한 여행일지</li>
              <li class="side-nav__item">개인정보 수정</li>
            </ul>
          </aside>
          <div class="mypage-main__section">
            <section class="my-travel-log">
              <ul class="my-travel-log__list">
<!-- * profile card component -->
                <li class="my-travel-log__item">
                  <a href="" class="my-travel-log__link">
                    <div class="my-travel-log__item-thumbnail">
                      <img src="/assets/images/myTravelLogThumbnail.png" alt="" class="my-travel-log__item-thumbnail__img">
                    </div>
                    <div class="my-travel-log__item__main">
                      <h3 class="my-travel-log__item__main__title">강릉, 사진 찍기 좋은 숨은 명소 모음</h3>
                      <h4 class="my-travel-log__item__main__subtitle">강릉에 이런 데가 있었어?</h4>
                      <p class="my-travel-log__item__main__desc">강릉도 이제 유명한 여행지가 되었지만 이번에는 요즘 새롭게 떠오르는 숨은 강릉의 명소들을 준비했어! 대중교통으로는 조금 힘들 수도 있으니 오랜만에 엄마랑 같이 오붓한 여행 어때? 엄마 프사도, 내 프사도 바꿀 시기가 왔다구! :D</p>
                      <div class="my-travel-log__item__main__social">
                        <div class="my-travel-log__item__main__like social-icon">
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.75 1C2.67925 1 1 2.86391 1 5.16351C1 7.01984 1.65625 11.4256 8.116 15.8793C8.23171 15.9582 8.36455 16 8.5 16C8.63545 16 8.76829 15.9582 8.884 15.8793C15.3438 11.4256 16 7.01984 16 5.16351C16 2.86391 14.3208 1 12.25 1C10.1792 1 8.5 3.52334 8.5 3.52334C8.5 3.52334 6.82075 1 4.75 1Z" fill="white" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>24</span>
                        </div>
                        <div class="my-travel-log__item__main__comment social-icon">
                          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.125 0.5H0.875L0.25 1.125V12.375L0.875 13H4V16.125L5.0675 16.5675L8.63375 13H17.125L17.75 12.375V1.125L17.125 0.5ZM16.5 11.75H8.375L7.9325 11.9325L5.25 14.6163V12.375L4.625 11.75H1.5V1.75H16.5V11.75Z" fill="#9A9A9A"/>
                          </svg>
                          <span>8</span>
                        </div>
                        <div class="my-travel-log__item__main__view social-icon">조회수: <span>512</span></div>
                      </div>
                    </div>
                    <div class="my-travel-log__item__button">
                      <button class="my-travel-log__item__button-edit">수정</button>
                      <button class="my-travel-log__item__button-delete">삭제</button>
                    </div>
                  </a>
                </li>
                <li class="my-travel-log__item">
                  <a href="" class="my-travel-log__link">
                    <div class="my-travel-log__item-thumbnail">
                      <img src="/assets/images/myTravelLogThumbnail.png" alt="" class="my-travel-log__item-thumbnail__img">
                    </div>
                    <div class="my-travel-log__item__main">
                      <h3 class="my-travel-log__item__main__title">강릉, 사진 찍기 좋은 숨은 명소 모음</h3>
                      <h4 class="my-travel-log__item__main__subtitle">강릉에 이런 데가 있었어?</h4>
                      <p class="my-travel-log__item__main__desc">강릉도 이제 유명한 여행지가 되었지만 이번에는 요즘 새롭게 떠오르는 숨은 강릉의 명소들을 준비했어! 대중교통으로는 조금 힘들 수도 있으니 오랜만에 엄마랑 같이 오붓한 여행 어때? 엄마 프사도, 내 프사도 바꿀 시기가 왔다구! :D</p>
                      <div class="my-travel-log__item__main__social">
                        <div class="my-travel-log__item__main__like social-icon">
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.75 1C2.67925 1 1 2.86391 1 5.16351C1 7.01984 1.65625 11.4256 8.116 15.8793C8.23171 15.9582 8.36455 16 8.5 16C8.63545 16 8.76829 15.9582 8.884 15.8793C15.3438 11.4256 16 7.01984 16 5.16351C16 2.86391 14.3208 1 12.25 1C10.1792 1 8.5 3.52334 8.5 3.52334C8.5 3.52334 6.82075 1 4.75 1Z" fill="white" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>24</span>
                        </div>
                        <div class="my-travel-log__item__main__comment social-icon">
                          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.125 0.5H0.875L0.25 1.125V12.375L0.875 13H4V16.125L5.0675 16.5675L8.63375 13H17.125L17.75 12.375V1.125L17.125 0.5ZM16.5 11.75H8.375L7.9325 11.9325L5.25 14.6163V12.375L4.625 11.75H1.5V1.75H16.5V11.75Z" fill="#9A9A9A"/>
                          </svg>
                          <span>8</span>
                        </div>
                        <div class="my-travel-log__item__main__view social-icon">조회수: <span>512</span></div>
                      </div>
                    </div>
                    <div class="my-travel-log__item__button">
                      <button class="my-travel-log__item__button-edit">수정</button>
                      <button class="my-travel-log__item__button-delete">삭제</button>
                    </div>
                </a>
                </li>
              </ul>
            </section>
            <section class="liked-travel-log">
              <ul class="my-travel-log__list">
                <!-- * profile card component -->
                <li class="my-travel-log__item">
                  <a href="#" class="my-travel-log__link">
                    <div class="my-travel-log__item-thumbnail">
                      <img src="/assets/images/myTravelLogThumbnail.png" alt="" class="my-travel-log__item-thumbnail__img">
                    </div>
                    <div class="my-travel-log__item__main">
                      <h3 class="my-travel-log__item__main__title">강릉, 사진 찍기 좋은 숨은 명소 모음</h3>
                      <h4 class="my-travel-log__item__main__subtitle">강릉에 이런 데가 있었어?</h4>
                      <p class="my-travel-log__item__main__desc">강릉도 이제 유명한 여행지가 되었지만 이번에는 요즘 새롭게 떠오르는 숨은 강릉의 명소들을 준비했어! 대중교통으로는 조금 힘들 수도 있으니 오랜만에 엄마랑 같이 오붓한 여행 어때? 엄마 프사도, 내 프사도 바꿀 시기가 왔다구! :D</p>
                    </div>
                    <div class="my-travel-log__item__button">
                      <button class="my-travel-log__item__button-like">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 4.64835V4.4671C0 2.28273 1.57875 0.419602 3.73125 0.0608521C5.12813 -0.176335 6.60625 0.288039 7.625 1.30835L8 1.68273L8.34688 1.30835C9.39375 0.288039 10.8438 -0.176335 12.2688 0.0608521C14.4219 0.419602 16 2.28273 16 4.4671V4.64835C16 5.94523 15.4625 7.18585 14.5125 8.07023L8.86563 13.3421C8.63125 13.5609 8.32187 13.6827 8 13.6827C7.67812 13.6827 7.36875 13.5609 7.13438 13.3421L1.48719 8.07023C0.538437 7.18585 0 5.94523 0 4.64835Z" fill="#9C5EFF"/>
                        </svg>
                      </button>
                    </div>
                  </a>
                </li>
              </ul>
            </section>
            <section class="profile-info-edit">
              <form class="profile-info-edit__form">
                <div class="profile-info-edit__form__input">
                  <label for="userId">이메일</label>
                  <input id="userId" type="text" name="userId" placeholder="joonhabaak@gmail.com" readonly/>
                </div>
                <div class="profile-info-edit__form__input">
                  <label for="username">이름</label>
                  <input id="username" type="text" name="username" placeholder="Joonha Park"/>
                </div>
                <div class="profile-info-edit__form__input">
                  <label for="nickname">닉네임</label>
                  <input id="nickname" type="text" name="nickname" placeholder="Joonha"/>
                </div>
                <div class="profile-info-edit__form__input">
                  <label for="password">비밀번호</label>
                  <input id="password" type="password" name="password" placeholder="········"/>
                </div>
                <div class="profile-info-edit__form__input">
                  <label for="passwordCheck">비밀번호 확인</label>
                  <input id="passwordCheck" type="password" name="passwordCheck" placeholder="········"/>
                </div>
                <div class="profile-info-edit__form__button">
                  <button class="profile-info-edit__form-cancel">취소</button>
                  <button class="profile-info-edit__form-edit">수정</button>
                </div>
              </form>
            </section>
            <section class="social">
              <ul class="social__list">
                <li class="social__item">
                  <a href="" class="social__link">
                    <div class="profile--pic">
                      <img class="profile--pic__img" src="/assets/images/profile2.png" alt="">
                    </div>
                    <h3 class="profile--nickname">Henderson</h3>
                    <h4 class="profile--id">hendo@gmail.com</h4>
                  </a>
                </li>
                <li class="social__item">
                  <a href="" class="social__link">
                    <div class="profile--pic">
                      <img class="profile--pic__img" src="/assets/images/profile3.png" alt="">
                    </div>
                    <h3 class="profile--nickname">Gomez</h3>
                    <h4 class="profile--id">mexican.taco@gmail.com</h4>
                  </a>
                </li>
                <li class="social__item">
                  <a href="" class="social__link">
                    <div class="profile--pic">
                      <img class="profile--pic__img" src="/assets/images/profile2.png" alt="">
                    </div>
                    <h3 class="profile--nickname">Henderson</h3>
                    <h4 class="profile--id">hendo@gmail.com</h4>
                  </a>
                </li>
                <li class="social__item">
                  <a href="" class="social__link">
                    <div class="profile--pic">
                      <img class="profile--pic__img" src="/assets/images/profile3.png" alt="">
                    </div>
                    <h3 class="profile--nickname">Gomez</h3>
                    <h4 class="profile--id">mexican.taco@gmail.com</h4>
                  </a>
                </li>
                <li class="social__item">
                  <a href="" class="social__link">
                    <div class="profile--pic">
                      <img class="profile--pic__img" src="/assets/images/profile2.png" alt="">
                    </div>
                    <h3 class="profile--nickname">Henderson</h3>
                    <h4 class="profile--id">hendo@gmail.com</h4>
                  </a>
                </li>
                <li class="social__item">
                  <a href="" class="social__link">
                    <div class="profile--pic">
                      <img class="profile--pic__img" src="/assets/images/profile3.png" alt="">
                    </div>
                    <h3 class="profile--nickname">Gomez</h3>
                    <h4 class="profile--id">mexican.taco@gmail.com</h4>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mypage);


/***/ }),

/***/ "./client/src/component/NewScheduleCellPopup.js":
/*!******************************************************!*\
  !*** ./client/src/component/NewScheduleCellPopup.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _DatePicker_CellDatePicker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DatePicker/CellDatePicker.js */ "./client/src/component/DatePicker/CellDatePicker.js");
/* harmony import */ var _DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DatePicker/dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");
/* eslint-disable import/extensions */





// store.state = {
//  localCommon: {
//   isShowModal: '',
// },
// localNewScheduleCell: {
//   selectedItineraryId: '',
//   info: {
//     type: '',
//     startTime: '',
//     endTime: '',
//     location: '',
//     memo: '',
//     todos: [],
//   },
// },
// localDatePicker: {
//   activeCalendar: '',
// },
//  tripShedule: {
//    newSceduleCellDate: Date 객체,
// }
// };

class NewScheduleCellPopup extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { localNewScheduleCell, localDatePicker, tripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { type, startTime, endTime, location, memo, todos } = localNewScheduleCell.info;
    const { newScheduleCellDate, startDate, endDate, itinerary } = tripSchedule;

    const typeList = [
      { id: 'type__accomodation', value: 'accomodation', content: '숙박' },
      { id: 'type__sightseeing', value: 'sightseeing', content: '관광' },
      { id: 'type__transportation', value: 'transportation', content: '교통' },
      { id: 'type__etc', value: 'etc', content: '기타' },
    ];

    // prettier-ignore
    const timeList = [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
      '24:00',
    ];

    const [targetItinerary] = itinerary.filter(sch => {
      const _date = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_3__.convertDateStringToDate)(sch.date);
      const _newScheduleCellDate = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_3__.convertDateStringToDate)(newScheduleCellDate);

      return (
        _date.getFullYear() === _newScheduleCellDate.getFullYear() &&
        _date.getMonth() === _newScheduleCellDate.getMonth() &&
        _date.getDate() === _newScheduleCellDate.getDate()
      );
    });

    const startUnabledTime = this.formatUnableTime(targetItinerary, 0);
    const endUnabledTime = this.formatUnableTime(targetItinerary, 1);

    const $datePicker = new _DatePicker_CellDatePicker_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      ...localDatePicker,
      calendarId: 'newScheduleCellDate',
      inputPlaceholder: 'yyyy-mm-dd',
      labelContent: 'Select a day',
      unableType: 'term',
      date: newScheduleCellDate,
      isNot31: true,
      startDate,
      endDate,
      toggle: this.toggleDatePicker,
    }).render();

    // prettier-ignore
    return `<div class="dimmed__layer newCard">
    <div class="modal newCard__popup">
      <div class="modal__header">
        <div class="modal__header__title">새 스케쥴 추가</div>
        <button class="modal__header__close__btn" aria-label="닫기"></button>
      </div>
      <form class="newCard__popup__form">
        <div class="newCard__popup__form__container type">
          <h3 class="newCard__popup__form__title">타입</h3>
          <ul class="type__list">
          ${typeList.map(({ id, value, content }) => `<li class="type__item">
              <input id="${id}" name="type" type="radio" value="${value}" ${type === value? 'checked': ''}/>
              <label for="${id}">${content}</label>
            </li>`)
            .join('')}
          </ul>
        </div>
        <div class="newCard__popup__form__container time">
          <h3 class="newCard__popup__form__title">시간</h3>
          <div class="time__form">
            ${$datePicker}
            <div class="time__form__select">
              <label for="newCard__startTime">Start with</label>
              <select name="startTime" id="newCard__startTime" value="${startTime}">
                ${timeList.map(time => {
                  const isDisabled = startUnabledTime.includes(+time.slice(0,2));
                  return `<option value="${time}" ${startTime === time? 'selected':''} ${isDisabled? 'disabled': ''}>${time}</option>`
                }).join('')}
              </select>
            </div>
            <div class="time__form__select">
              <label for="newCard__endTime">End with</label>
              <select name="endTime" id="newCard__endTime" value="${endTime}">
                ${timeList.map(time => {
                  const st = +startTime.slice(0, 2)
                  const ct = +time.slice(0,2) 
                  const [unableFromStart] = endUnabledTime.filter(t => st + 1 < t)
                  const isDisabled = ct <= st ||  unableFromStart <= ct;
                  return `<option value="${time}" ${endTime === time? 'selected':''} ${isDisabled? 'disabled': ''}>${time}</option>`
                }).join('')}
              </select>
            </div>
          </div>
        </div>
        <div class="newCard__popup__form__container location">
          <h3 class="newCard__popup__form__title">위치</h3>
          <input type="text" name="location" class="location" autocomplete="off" value="${location.name === undefined ? '': location.name}"/>
        </div>
        <div class="newCard__popup__form__container memo">
          <h3 class="newCard__popup__form__title">메모</h3>
          <div class="memo__container">
            <div class="memo__title">
              <input type="text" class="memo-input" placeholder="메모를 입력해주세요." name="memo" value="${memo}" maxLength="100"/>
              <button class="memo__title__add__todo__btn" type="button" aria-label="todo 추가"></button>
            </div>
            <ul class="memo__todo__list">
            ${todos.map(
                ({ id, todo, completed }) => `<li class="memo__todo__item" data-id="${id}">
                <input type="checkbox" class="todo-chk" name="todo" id="todo${id}" ${completed ? 'checked' : ''}/>
                  <label class="memo__todo__item__chk" for="todo${id}">todo</label>
                  <input type="text" class="todo-input" value="${todo}" name="todo" placeholder="할 일을 적어주세요."/>
                <button class="memo__delete__btn" type="button" aria-label="삭제"></button>
              </li>`).join('')}
            </ul>
          </div>
        </div>
        <button class="newCard__popup__form__submit" ${type !== '' && location !== ''? '': 'disabled'}>완료</button>
      </form>
    </div>
  </div>`;
  }

  formatUnableTime(itinerary, condition) {
    const {
      localNewScheduleCell: { editCellId },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    const unableTime = itinerary.cells
      .map(({ id, startTime, endTime }) => {
        if (editCellId === id) return '';

        const st = +startTime.slice(0, 2);
        const gap = +endTime.slice(0, 2) - st - condition;

        return Array.from({ length: gap }, (_, i) => st + i + condition);
      })
      .flat();

    return [...new Set(unableTime)].sort((a, b) => a - b);
  }

  toggleDatePicker(e) {
    if (!e.target.matches('.newCard__popup .datePicker')) return;
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localDatePicker: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localDatePicker,
        activeCalendar: 'newScheduleCellDate',
      },
    };
  }

  addSchedule(e) {
    e.preventDefault();
    const {
      localCommon,
      localNewScheduleCell,
      localNewScheduleCell: { info, editCellId, selectedItineraryId },
      localDatePicker,
      tripSchedule,
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary, newScheduleCellDate } = tripSchedule;

    const _newScheduleCellDate = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_3__.convertDateStringToDate)(newScheduleCellDate);

    // body의 scroll
    document.body.style.overflow = 'auto';
    const selectedYear = _newScheduleCellDate.getFullYear();
    const selectedMonth = _newScheduleCellDate.getMonth();
    const selectedDate = _newScheduleCellDate.getDate();

    const countryName = info.location.formatted_address.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    const isKorea = /대한민국/.test(countryName);
    const country = isKorea ? '대한민국' : countryName;
    const id = Math.max(...itinerary.map(sche => Math.max(...sche.cells.map(cell => cell.id), 0)), 0) + 1;

    const changeItinerary = iti => {
      // new 일정
      const date = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_3__.convertDateStringToDate)(iti.date);
      console.log(editCellId);
      if (editCellId === -1) {
        return date.getFullYear() === selectedYear &&
          date.getMonth() === selectedMonth &&
          date.getDate() === selectedDate
          ? { ...iti, country, cells: [...iti.cells, { id, ...info, article: {} }] }
          : iti;
      }

      // edit할 경우
      // 같은 날짜에서 정보를 바꾸는 경우
      if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === selectedDate) {
        return iti.id === selectedItineraryId
          ? {
              ...iti,
              cells: iti.cells.map(cell => (cell.id === editCellId ? { ...cell, ...info } : cell)),
            }
          : iti;
      }

      // 날짜가 달라지는 경우
      // 기존 배열에서 filter
      // 새로운 날짜가 일치하는 곳에 배열 추가
      if (iti.id === selectedItineraryId) return { ...iti, cells: iti.cells.filter(cell => cell.id !== editCellId) };
      if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === selectedDate)
        return { ...iti, cells: [...iti.cells, { id: editCellId, ...info, article: {} }] };

      return iti;
    };

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localCommon: { ...localCommon, isShowModal: '' },
      tripSchedule: {
        ...tripSchedule,
        itinerary: itinerary.map(iti => changeItinerary(iti)),
      },
      localNewScheduleCell: {
        ...localNewScheduleCell,
        editCellId: '',
      },
      localDatePicker: {
        ...localDatePicker,
        newScheduleCellDate: null,
      },
    };

    console.log(_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state);
  }

  closeModal(e) {
    if (!e.target.matches('.newCard.dimmed__layer') && !e.target.matches('.newCard .modal__header__close__btn')) return;

    const { localCommon } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    // body의 scroll
    document.body.style.overflow = 'auto';

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localCommon: { ...localCommon, isShowModal: '' },
    };
  }

  changeTypeNTimeNMemo(e) {
    const { name, value } = e.target;
    const { localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { info } = localNewScheduleCell;
    let { endTime } = info;

    if (name === 'startTime') {
      const { formattedTime } = this.props;
      const newTime = +value.slice(0, 2);
      // 새로 선택된 startTime > endTime 면 endTime을 startTime + 1로 설정.
      const isPassed = newTime >= +endTime.slice(0, 2);
      endTime = isPassed ? formattedTime(newTime + 1) : endTime;
    }

    // [name]이 endTime도 될 수 있으므로 가장 뒤에 [name]: value 작성.
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localNewScheduleCell: {
        ...localNewScheduleCell,
        info: {
          ...info,
          endTime,
          [name]: value,
        },
      },
    };
  }

  initAutoComplete(e) {
    // strictBounds: 쿼리가 전송될 때 자동 완성 위젯이 자동 완성 위젯의 경계 내에 있는 장소만 반환해야 함
    /* 
      field 
     -false(기본값)로 설정하면 결과가 경계 내에 포함된 장소로 편향되지만 이에 국한되지는 않습니다.
     -all: 모든 데이터 반환. 
     -addr_address : autocomplete로 나오는 value값.
     -geometry : location, viewport와 같은 google map의 정보.
     -name : 에펠탑과 같은 검색한 장소 결과값.
    */
    /* 
      types
      -반환될 예측 유형
      -establishment : 비즈니스 결과만 반환하도록 장소 자동 완성 서비스에 지시합니다.
    */
    const options = {
      fields: ['adr_address', 'formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: ['establishment'],
    };
    const autocomplete = new google.maps.places.Autocomplete(e.target, options);

    // place_changed는 Google Map API의 이벤트
    autocomplete.addListener('place_changed', () => {
      // 사용자가 선택한 장소.
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        window.alert('검색 된 장소가 없습니다.');
        return;
      }

      const { localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
      const { info } = localNewScheduleCell;

      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localNewScheduleCell: {
          ...localNewScheduleCell,
          info: {
            ...info,
            location: {
              ...place,
              name: e.target.value,
              latLng: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
            },
          },
        },
      };

      document.querySelectorAll('.pac-container').forEach($pac => $pac.remove());
    });
  }

  addTodo() {
    const { localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { info } = localNewScheduleCell;
    const { todos } = info;

    const id = Math.max(...todos.map(todo => todo.id), 0) + 1;
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localNewScheduleCell: {
        ...localNewScheduleCell,
        info: {
          ...info,
          todos: [...todos, { id, todo: '', completed: false }],
        },
      },
    };
  }

  deleteTodo(e) {
    if (!e.target.matches('.memo__delete__btn')) return;

    const { id } = e.target.closest('.memo__todo__item').dataset;
    const { localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { info } = localNewScheduleCell;
    const { todos } = info;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localNewScheduleCell: {
        ...localNewScheduleCell,
        info: {
          ...info,
          todos: todos.filter(todo => todo.id !== +id),
        },
      },
    };
  }

  changeTodo(e) {
    if (!e.target.matches('.todo-input') && !e.target.matches('.todo-chk')) return;

    const { localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { info } = localNewScheduleCell;
    const { todos } = info;
    const { id } = e.target.closest('.memo__todo__item').dataset;
    const { value } = e.target;

    const changedInfo = todo =>
      e.target.matches('.todo-input') ? { ...todo, todo: value } : { ...todo, completed: !todo.completed };

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localNewScheduleCell: {
        ...localNewScheduleCell,
        info: {
          ...info,
          todos: todos.map(todo => (todo.id === +id ? changedInfo(todo) : todo)),
        },
      },
    };
  }

  preventEnterKey(e) {
    if (e.key === 'Enter') e.preventDefault();
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.newCard__popup__form', handler: this.addSchedule },
      { type: 'keydown', selector: '.newCard__popup__form input', handler: this.preventEnterKey },
      { type: 'click', selector: '.dimmed__layer.newCard', handler: this.closeModal },
      { type: 'click', selector: '.newCard .modal__header__close__btn', handler: this.closeModal },
      { type: 'change', selector: '.type__list', handler: this.changeTypeNTimeNMemo.bind(this) },
      {
        type: 'change',
        selector: '.newCard__popup__form__container .time__form__select',
        handler: this.changeTypeNTimeNMemo.bind(this),
      },
      { type: 'click', selector: '.memo__title__add__todo__btn', handler: this.addTodo },
      { type: 'click', selector: '.location', handler: this.initAutoComplete },
      { type: 'change', selector: '.memo-input', handler: this.changeTypeNTimeNMemo.bind(this) },
      { type: 'change', selector: '.memo__todo__list', handler: this.changeTodo },
      { type: 'click', selector: '.memo__todo__list', handler: this.deleteTodo },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewScheduleCellPopup);


/***/ }),

/***/ "./client/src/component/Signin.js":
/*!****************************************!*\
  !*** ./client/src/component/Signin.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/authStore.js */ "./client/src/store/authStore.js");





class Signin extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  init() {
    (0,_store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.initValue)();
    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
      localCommon: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localCommon,
        path: window.location.pathname,
      },
    };
  }

  render() {
    const { email, password, isValid, serverError } = _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.signinSchema;

    return `
    <form class="signin only-signin" novalidate>
      <h2 class="signin__title">log in</h2>
      <div class="input__form">
        <label for="userId">아이디</label>
        <input id="userId" type="text" name="email" value="${
          email.value
        }" placeholder="abc@email.com" autocomplete="off" required />
        <p class="input__form__errorMsg error ${!email.value || email.isValid ? '' : 'show'}">${email.error}</p>
      </div>
      <div class="input__form">
        <label for="password">비밀번호</label>
        <input id="password" type="password" name="password" value="${
          password.value
        }" maxlength="12" placeholder="***" autocomplete="off" required />
        <p class="input__form__errorMsg error ${password.value === '' || password.isValid ? '' : 'show'}">${
      password.error
    }</p>
      </div>
      <p class="signin__errorMsg error ${serverError ? 'show' : ''}">
        ${serverError}
      </p>
      <button class="submit__btn" ${isValid ? '' : 'disabled'}>로그인</button>
      <p class="signin__signup__btn">
        <span>회원이 아니세요?</span>
        <a href="/signup" class="link-signup">회원가입하기</a>
      </p>
    </form>`;
  }

  async fetchSignin(e) {
    if (!e.target.classList.contains('only-signin')) return;

    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const response = await axios.post('/auth/signin', Object.fromEntries([...formData.entries()]));

      window.history.pushState({}, '/main', window.location.origin + '/main');

      _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state,
        userInfo: response.data,
      };
    } catch (e) {
      const errorMsg = e.response.data.error;

      _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.signinSchema.serverError = errorMsg;

      (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
  }

  link(e) {
    e.preventDefault();

    const path = e.target.getAttribute('href');

    window.history.pushState({}, path, window.location.origin + path);

    (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  }

  addEventListener() {
    return [
      { type: 'keyup', selector: '.signin', handler: _.throttle(_store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.validate, 200, { leading: false }) },
      { type: 'submit', selector: '.signin', handler: this.fetchSignin },
      { type: 'click', selector: '.link-signup', handler: this.link },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Signin);


/***/ }),

/***/ "./client/src/component/Signup.js":
/*!****************************************!*\
  !*** ./client/src/component/Signup.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/authStore.js */ "./client/src/store/authStore.js");
/* eslint-disable no-undef */





class Signup extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  init() {
    (0,_store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.initValue)();
    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
      localCommon: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localCommon,
        path: window.location.pathname,
      },
    };
  }

  render() {
    const { email, password, passwordCheck, username, nickname, checked, serverError, isValid } = _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.signupSchema;

    return `
    <form class="signin signup only-signup" novalidate>
      <h2 class="signin__title">sign up</h2>
      <div class="input__form signup__id__form">
        <label for="userId">아이디</label>
        <input id="userId" type="text" name="email" value="${
          email.value
        }" placeholder="abc@email.com" autocomplete="off" required />
        <p class="input__form__errorMsg error ${!email.value || email.isValid ? '' : 'show'}">${email.error}</p>
        <p class="input__form__errorMsg error ${serverError ? 'show' : ''}">${serverError}</p>
      </div>
      <div class="input__form">
      <label for="password">비밀번호</label>
      <input id="password" type="password" name="password" value="${
        password.value
      }" maxlength="12" placeholder="******" autocomplete="off" required />
      <p class="input__form__errorMsg error ${!password.value || password.isValid ? '' : 'show'}">${password.error}</p>
    </div>
    <div class="input__form">
      <label for="passwordCheck">비밀번호 확인</label>
      <input
        id="passwordCheck"
        type="password"
        name="passwordCheck"
        value="${passwordCheck.value}"
        maxlength="12"
        placeholder="******"
        autocomplete="off"
        required />
      <p class="input__form__errorMsg error ${!passwordCheck.value || passwordCheck.isValid ? '' : 'show'}">${
      passwordCheck.error
    }</p>
    </div>
      <div class="input__form">
        <label for="username">이름</label>
        <input id="username" type="text" name="username" value="${
          username.value
        }" maxlength="12" placeholder="둘리" autocomplete="off" required />
        <p class="input__form__errorMsg error ${!username.value || username.isValid ? '' : 'show'}">${
      username.error
    }</p>
      </div>
      <div class="input__form">
        <label for="nickname">닉네임</label>
        <input id="nickname" type="text" name="nickname" value="${
          nickname.value
        }" maxlength="12" placeholder="nickname" autocomplete="off" required />
        <p class="input__form__errorMsg error ${!nickname.value || nickname.isValid ? '' : 'show'}">${
      nickname.error
    }</p>
      </div>
     
      <div class="checkbox__form">
        <input id="privacy" ${checked.privacy ? 'checked' : ''} type="checkbox" name="privacy" required />
        <label for="privacy" >개인 정보 수집에 동의합니다.(필수)</label>
        <a href="#" class="checkbox__form__link">보기</a>
      </div>
      <div class="checkbox__form">
        <input id="term" ${checked.term ? 'checked' : ''} type="checkbox" name="term" required />
        <label for="term">이용약관에 동의합니다.(필수)</label> 
        <a href="#" class="checkbox__form__link">보기</a>
      </div>
      <button class="submit__btn" ${isValid ? '' : 'disabled'}>회원가입</button>
      <button class="signup__back__btn" type="button">뒤로가기</button>
    </form>`;
  }

  async fetchSignup(e) {
    if (!e.target.classList.contains('only-signup')) return;

    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const response = await axios.post('/auth/signup', Object.fromEntries([...formData.entries()]));

      _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state,
        userInfo: response.data,
      };

      window.history.pushState({}, '/main', window.location.origin + '/main');
      (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    } catch (e) {
      const errorMsg = e.response.data.error;
      _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.signupSchema.serverError = errorMsg;

      (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
      document.getElementById('userId').focus();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  backHistory() {
    window.history.back();
  }

  addEventListener() {
    return [
      { type: 'keyup', selector: '.signup', handler: _.throttle(_store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.validate, 200, { leading: false }) },
      { type: 'change', selector: '.checkbox__form', handler: _store_authStore_js__WEBPACK_IMPORTED_MODULE_3__.isChecked },
      { type: 'submit', selector: '.signup', handler: this.fetchSignup },
      { type: 'click', selector: '.signup__back__btn', handler: this.backHistory },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Signup);


/***/ }),

/***/ "./client/src/component/TripPlanner.js":
/*!*********************************************!*\
  !*** ./client/src/component/TripPlanner.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");


class TripPlanner extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    return `
  <main class="detail-main">
  <!-- * cover 사진 및 post 수정 삭제-->
  <div class="cover">
    <div class="cover__inner">
      <div class="cover__content">
        <h2 class="cover__content__title">다낭 갔다왔습니다낭~</h2>
        <p class="cover__content__summary">베트남ㆍ3일</p>
      </div>
      <div class="cover__buttonbox">
      <label for="file">
        <div class="add-cover-btn"><img src="./assets/images/camera.svg" alt="커버사진 추가" /></div>
        <input type="file" name="file" id="file" class="add-cover-input" accept="image/*"/>
      </label>  
        <!--  <button class="edit-btn"><img src="./assets/images/post-edit.svg" alt="글 수정" /></button>
        <button class="remove-btn"><img src="/assets/images/cancel.svg" alt="글 삭제" /></button> -->
      </div>
    </div>
  </div>
  <!-- * sticky용 컨테이너 -->
  <div class="trip-container">
    <!-- * 왼쪽 좋아요, 공유 버튼 -->
    <div class="like-share-btnbox">
      <div class="like-container">
        <button class="like-btn"><img src="/assets/images/heart-nofill.svg" alt="좋아요" /></button>
        <span class="like-degit">68</span>
      </div>
      <button class="share-btn"><img src="/assets/images/share.svg" alt="공유하기" /></button>
    </div>
    <!-- * sticky용 메인 컨테이너 -->
    <div class="trip-main-container">
      <!-- * trip-planner생성 시 -->
      <div class="trip-planner">
        <div class="trip-planner__create">
          <div class="trip-planner__create__title">
            <input class="trip-planner__title" placeholder="어떤 여행인지 간단히 설명해주세요." />
          </div>
          <div class="trip-planner__create__content">
            <textarea class="trip-planner__content" placeholder="당신의 여행 스토리를 남겨보세요."></textarea>
          </div>
          <div class="trip-planner__create__option">
            <div class="trip-date trip-start-date">
              <span class="trip-date__span">여행 시작일</span>
              <button class="trip-date__btn">
                <span>2022-08-14</span>
                <img class="trip-date__btn__img" src="/assets/images/calendar-dark.svg" alt="캘린더" />
              </button>
            </div>
            <div class="trip-date trip-end-date">
              <span class="trip-date__span">여행 도착일</span>
              <button class="trip-date__btn">
                <span>2022-08-18</span>
                <img class="trip-date__btn__img" src="/assets/images/calendar-dark.svg" alt="캘린더" />
              </button>
            </div>
            <div class="trip-people"><input type="number" value="2" max="99" /><span>명</span></div>
          </div>
        </div>
      </div>
      <!-- * 탭 포함 메인 (지도/일정표, 스토리) -->
      <div class="trip-itinerary">
        <!-- * 탭 -->
        <div class="trip-itinerary__tab">
          <div class="trip-itinerary__tab__chart selected">지도/일정표</div>
          <div class="trip-itinerary__tab__story">스토리</div>
        </div>
        <!-- * 지도/일정표 -->
        <!-- start of container -->
      <div class="itinerary__container">
        <!-- google map -->
        <div class="map"></div>
        <!-- carousel -->
        <div class="carousel">
          <div class="carousel__days">
            <div class="carousel__day-index">
              <button class="carousel__day-index--add">+</button>Day1.08.14 Sat
              <div>영국</div>
            </div>
            <div class="carousel__day-index">
              <button class="carousel__day-index--add">+</button>Day2.08.18 Sun
              <div>프랑스</div>
            </div>
            <div class="carousel__day-index">
              <button class="carousel__day-index--add">+</button>Day3.08.25 Mon
              <div>이탈리아</div>
            </div>
            <div class="carousel__day-index">
              <button class="carousel__day-index--add">+</button>Day3.08.30 Mon
              <div>아이슬란드</div>
            </div>
          </div>
          <button class="prev--btn carousel--btn">〈</button>
          <button class="next--btn carousel--btn">〉</button>
          
          <ul class="carousel__days__add--list">
            <li class="carousel__days__add--item first-item">앞에 추가</li>
            <li class="carousel__days__add--item">뒤에 추가</li>
            <li class="carousel__days__add--item">일정 삭제</li>
          </ul>
          

        </div>

        <!-- time table -->
        <div class="time-table">
          <ul class="time-table__times">
            <li class="time-table__time-item">
              <span class="time-table__time">00:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">01:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">02:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">03:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">04:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">05:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">06:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">07:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">08:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">09:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">10:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">11:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">12:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">13:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">14:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">15:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">16:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">17:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">18:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">19:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">20:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">21:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">22:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">23:00</span>
              <span class="line"></span>
            </li>
            <li class="time-table__time-item">
              <span class="time-table__time">24:00</span>
              <span class="line"></span>
            </li>
          </ul>
          <div class="time-table__day-index">
            <ul class="time-table__day-index__blank">
              <li>
                <div class="itinerary-card itinerary-card--check">
                  <div class="itinerary-card-emph"></div>
                  <div class="itinerary-card--check__content">
                    <div class="itinerary-card--check__title">
                      히드로 공항
                    </div>
                    <div class="itinerary-card--check__memo">
                      공항 도착해서 유심칩 찾기
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="itinerary-card">
                  <button class="itinerary-card--add">+</button>
                </div>
              </li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
              <li><div class="itinerary-card"></li>
            </ul>
            <ul class="time-table__day-index__blank">
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
            </ul>
            <ul class="time-table__day-index__blank">
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
              <li>
                <span class="time"></span>
                <span class="line"></span>
              </li>
            </ul>
          </div>
        </div>

        <!-- private & public button -->
        <div class="itinerary-btns">
          <button class="itinerary-btns--private">나만의 일정</button>
          <button class="itinerary-btns--public">다른 사람들에게도 공유하기</button>
        </div>
        
      </div>
      <!-- end of container -->
        <!-- * 스토리 -->
        <div class="trip-story">
          <ul class="trip-story__day-list">
            <li class="trip-story__day-item">
              <div class="trip-story__day-content">
                <h3 class="trip-story__day-content__title">Day 1</h3>
                <p class="trip-story__day-content__summary">2022.08.14(Sun) | 베트남</p>
              </div>
              <article class="trip-article">
                <div class="trip-article__header">
                  <div class="trip-article__header__profile">
                    <img src="/assets/images/profile-mock.png" alt="프로필사진" class="profile-img" />
                  </div>
                  <div class="trip-article__header__content">
                    <p class="trip-article__header__content__place">다낭 국제 공항</p>
                    <p class="trip-article__header__content__time">오후 08:00</p>
                  </div>
                  <div class="trip-article__header__badge">
                    <button class="edit-btn"></button>
                    <button class="remove-btn"></button>
                  </div>
                </div>
                <div class="trip-article__main">
                  <div class="trip-article__main__img-container">
                    <img src="" alt="" />
                  </div>
                  <div class="trip-article__main__content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati autem officia mollitia vel
                    nulla labore placeat debitis, ipsam velit eos molestiae beatae ullam quod exercitationem vero
                    soluta, nihil odio quo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
                    autem officia mollitia vel nulla labore placeat debitis, ipsam velit eos molestiae beatae
                    ullam quod exercitationem vero soluta, nihil odio quo.
                  </div>
                </div>
              </article>
              <article class="trip-article">
                <div class="trip-article__header">
                  <div class="trip-article__header__profile">
                    <img src="/assets/images/profile-mock.png" alt="프로필사진" class="profile-img" />
                  </div>
                  <div class="trip-article__header__content">
                    <p class="trip-article__header__content__place">호이안 마을</p>
                    <p class="trip-article__header__content__time">오후 10:00</p>
                  </div>
                  <div class="trip-article__header__badge">
                    <button class="add-btn">
                      <img src="/assets/images/post-add.svg" alt="포스트 작성" class="add-img" /> 포스트 작성
                    </button>
                  </div>
                </div>
              </article>
            </li>
            <li class="trip-story__day-item">
              <div class="trip-story__day-content">
                <h3 class="trip-story__day-content__title">Day 2</h3>
                <p class="trip-story__day-content__summary">2022.08.15(Mon) | 베트남</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- *댓글 -->
      <div class="comment">
        <h3 class="comment__title">댓글 (25)</h3>
        <div class="comment__container">
          <div class="comment__inputbox">
            <div class="comment__inputbox__profile">
              <img src="/assets/images/profile-mock.png" alt="프로필사진" class="profile-img" />
            </div>
            <div class="comment__inputbox__inputform">
              <label for="comment-input" class="a11yHidden">댓글입력창</label>
              <input type="text" name="comment-input" id="comment-input" placeholder="댓글을 입력해주세요." />
            </div>
            <button class="comment__inputbox__button"></button>
          </div>
          <div class="comment__box">
            <div class="comment__box__contentbox">
              <div class="comment__box__contentbox__profile">
                <img src="/assets/images/profile-mock.png" alt="프로필사진" class="profile-img" />
              </div>
              <div class="comment__box__contentbox__content">
                <p class="comment__box__contentbox__content__username">
                  이름
                  <span class="comment__box__contentbox__content__add-time">작성시간</span>
                </p>
                <p class="comment__box__contentbox__content__main">댓글내용</p>
              </div>
            </div>
            <div class="comment__box__buttonbox">
              <button class="recomment-btn"></button>
              <button class="remove-btn"></button>
            </div>
          </div>
          <div class="comment__inputbox recomment">
            <div class="comment__inputbox__profile">
              <img src="/assets/images/profile-mock.png" alt="프로필사진" class="profile-img" />
            </div>
            <div class="comment__inputbox__inputform">
              <label for="comment-input" class="a11yHidden">댓글입력창</label>
              <input type="text" name="comment-input" id="comment-input" placeholder="댓글을 입력해주세요." />
            </div>
            <button class="comment__inputbox__button"></button>
          </div>
          <div class="comment__box">
            <div class="comment__box__contentbox recomment">
              <div class="comment__box__contentbox__profile">
                <img src="/assets/images/profile-mock.png" alt="프로필사진" class="profile-img" />
              </div>
              <div class="comment__box__contentbox__content">
                <p class="comment__box__contentbox__content__username">
                  이름
                  <span class="comment__box__contentbox__content__add-time">작성시간</span>
                </p>
                <p class="comment__box__contentbox__content__main">댓글내용</p>
              </div>
            </div>
            <div class="comment__box__buttonbox">
              <button class="recomment-btn"></button>
              <button class="remove-btn"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- * 오른쪽 스크롤 네비 -->
    <div class="nav-day">
      <ul class="nav-day__list">
        <li class="nav-day__item active"><a href="">Top</a></li>
        <li class="nav-day__item"><a href="">Day 1</a></li>
        <li class="nav-day__item"><a href="">Day 2</a></li>
        <li class="nav-day__item"><a href="">Day 3</a></li>
        <li class="nav-day__item"><a href="">댓글</a></li>
      </ul>
    </div>
  </div>
</main>
  `;
  }

  renderSelectedContent(e) {
    const $itineraryContainer = document.querySelector('.itinerary__container');

    [...document.querySelector('.trip-itinerary__tab').children].forEach(tab => {
      tab.classList.toggle('selected', e.target === tab);
    });
    if (e.target.classList.contains('trip-itinerary__tab__chart')) {
      $itineraryContainer.innerHTML = `
      ${$viewPlanMap}
      ${$timeTable}
      ${$viewPlanComment}
      `;
    }
    if (e.target.classList.contains('trip-itinerary__tab__story')) {
      document.querySelector('.itinerary__container').style.display = 'none';
      document.querySelector('.comment').style.display = 'block';
      document.querySelector('.trip-story').style.display = 'block';
    }
  }

  checkNumOfWord(e, min, max) {
    const word = e.target.value;
    if (word.length < min || word.length > max) {
      console.log('글자수 맞춰');
    }
  }

  // addEventListener() {
  //   return [
  //     { type: 'change', selector: '.add-cover-input', handler: this.setCoverImg },
  //     { type: 'keydown', selector: '.trip-planner__title', handler: e => this.checkNumOfWord(e, 3, 20) },
  //     { type: 'keydown', selector: '.trip-planner__content', handler: e => this.checkNumOfWord(e, 10, 200) },
  //     { type: 'click', selector: '.trip-itinerary__tab__chart', handler: this.renderSelectedContent },
  //     { type: 'click', selector: '.trip-itinerary__tab__story', handler: this.renderSelectedContent },
  //   ];
  // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TripPlanner);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditPlanCover.js":
/*!****************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditPlanCover.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");



class EditPlanCover extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { coverImg } = this.props;

    return `
    <div class="cover" style="background-image: url('${coverImg}')">
      <div class="cover__inner">
        <div class="cover__buttonbox">
        <label for="file">
          <div class="add-cover-btn"><img src="/assets/images/camera.svg" alt="커버사진 추가" /></div>
          <input type="file" name="file" id="file" class="add-cover-input" accept="image/*" />
        </label>     
        </div>
      </div>
    </div>
    `;
  }

  setCoverImg(e) {
    const uploadFile = [...e.target.files][0]; //* 선택한 파일 객체
    const IMG_URL = URL.createObjectURL(uploadFile); //* 파일 URL 변환

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { tripSchedule: { ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule, coverImg: IMG_URL } };
    // URL.revokeObjectURL(IMG_URL); //* 이미지 사용 후 명시적으로 해제가 필요 (비동기 처리 해야함)
  }

  addEventListener() {
    return [{ type: 'change', selector: '.add-cover-input', handler: this.setCoverImg }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditPlanCover);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditPlanMap.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditPlanMap.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _myMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../myMap.js */ "./client/src/component/myMap.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../index.js */ "./client/src/component/index.js");
/* harmony import */ var _DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../DatePicker/dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */






class Itinerary extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  init() {
    (0,_myMap_js__WEBPACK_IMPORTED_MODULE_2__.initMap)('tripSchedule');
  }

  render() {
    const {
      localCommon: { isShowModal },
      localItinerary: { currentId, startId, isShowNewScheuleCellBtn },
      localNewScheduleCell: {
        selectedItineraryId,
        info: { startTime },
      },
      tripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    // prettier-ignore
    const timeList = [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
      '24:00',
    ];

    const $newScheduleCellPopup =
      isShowModal === 'newScheduleCellPopup'
        ? new _index_js__WEBPACK_IMPORTED_MODULE_3__.NewScheduleCellPopup({ formattedTime: _DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedTime }).render()
        : '';
    const _schedule = itinerary.filter((_, i) => i >= startId && i < startId + 3);

    // prettier-ignore
    return `
      <div id="googleMap" class="map"></div>
      <div class="carousel">
        <div class="carousel__days">
        ${_schedule
          .map(
            sched => `
              <div class="carousel__day-index" data-id=${sched.id}>
                <button class="carousel__day-index--add" data-id=${sched.id}></button>
                Day ${(sched.date - itinerary[0].date) / 86400000 + 1}
                <span>/</span> 
                ${(0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedDateMMDDDAY)(sched.date)}  
                ${currentId === sched.id
                ? `
                <ul class="carousel__days__add--list">
                  <li class="carousel__days__add--item first-item prev--add--item" data-controller="prev">앞에 추가</li>
                  <li class="carousel__days__add--item next--add--item" data-controller="next">뒤에 추가</li>
                  <li class="carousel__days__add--item delete--item" data-controller="delete">일정 삭제</li>
                </ul>
                `
                : ''
                }
              <div>${sched.country}</div>
            </div>`).join('')}
        </div>
        <button class="prev--btn carousel--btn">〈</button>
        <button class="next--btn carousel--btn">〉</button>
      </div>
      <div class="time-table">
        <ul class="time-table__times">
          ${timeList.map(time => `
          <li class="time-table__time-item">
            <span class="time-table__time">${time}</span>
            <span class="line"></span>
          </li>`).join('')}
        </ul>
        <div class="time-table__day-index">
        ${_schedule.map(sched => {
          const { cells, id } = sched;
          const cellTimeFromToArr = cells.map(cell => [+cell.startTime.slice(0, 2), +cell.endTime.slice(0, 2)]);
          
          return `
          <ul class="time-table__day-index__blank" data-id="${id}" 
            style="${_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary.newBgColor === id 
              ? 'background: rgba(200, 200, 200, 0.5);' 
              : ''}">
            ${timeList.map((timeItem, i, self) => {
              if (i === self.length - 1) return '';

              const time = +timeItem.slice(0, 2);
              const idx = cellTimeFromToArr.findIndex(([startTime, endTime]) => startTime <= time && time < endTime);
              const isInculdedCell = idx !== -1;
              const isFirstChildTime = isInculdedCell ? cells[idx].startTime === timeItem : null;
              const isLastChildTime = isInculdedCell
                ? (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedTime)(+cells[idx].endTime.slice(0, 2) - 1) === timeItem : null;
              const liClass = isFirstChildTime && isLastChildTime
                  ? 'first-last' : isFirstChildTime
                  ? 'first' : isLastChildTime
                  ? 'last' : '';
              // timeItem 시간이 cells의 세부 일정 시작 시간과 같으면 div.itinerary-card를 추가
              // 세부 일정이 없는 시간이고 mouseover되었으면 button.itinerary-card--add를 추가
            return `
            <li data-time="${i}" class="${liClass}">
              ${isInculdedCell
                ? `
                <div class="itinerary-card itinerary-card--check ${cells[idx].type}" data-id="${cells[idx].id}" draggable="true">
                  <div class="itinerary-card-emph"></div>
                  ${isFirstChildTime
                    ? `
                    <div class="itinerary-card--check__content">
                      <div class="itinerary-card--check__title">${cells[idx].location.name}</div>
                      <div class="itinerary-card--check__memo">${cells[idx].memo}</div>
                    </div>
                    <button class="itinerary-card--delete" aria-label="일정 삭제"></button>`
                    : ''
                  }
                </div>`
                : isShowNewScheuleCellBtn && selectedItineraryId === id && startTime === timeItem && !isInculdedCell
                  ? '<button class="itinerary-card--add">+</button>'
                  : ''
              }
            </li>`}).join('')}
          </ul>
        `}).join('')}
        </div>
      </div>  
      ${$newScheduleCellPopup}`;
  }

  movePrevItinerary() {
    const { localItinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    let { startId } = localItinerary;

    if (startId === 0) {
      alert('이전 여행 일정이 없습니다.');
      return;
    }
    startId -= 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        startId,
      },
    };
  }

  moveNextItinerary() {
    const {
      localItinerary,
      tripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    let { startId } = localItinerary;

    if (itinerary.length === startId + 3) {
      alert('이후 여행 일정이 없습니다.');
      return;
    }

    startId += 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        startId,
      },
    };
  }

  toggleItineraryPopup(e) {
    if (_store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon.isShowModal !== '') return;

    let currentId = '';

    if (e.target.matches('.carousel__day-index--add')) currentId = +e.target.dataset.id;
    else if (!e.target.closest('.carousel__days__add--list')) currentId = '';

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { localItinerary: { ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary, currentId } };
  }

  editItinerary(e) {
    if (!e.target.closest('.carousel__days__add--list')) return;

    const {
      tripSchedule,
      localItinerary,
      tripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { controller } = e.target.dataset;
    const pointId = +e.target.closest('.carousel__day-index').dataset.id;

    const idx = itinerary.findIndex(sched => sched.id === pointId);
    const endDate = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.convertDateStringToDate)(tripSchedule.endDate);
    const date = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.convertDateStringToDate)(itinerary.find(sched => sched.id === pointId).date);
    const newId = controller === 'delete' ? '' : Math.max(...itinerary.map(iti => iti.id), 0) + 1;

    // endDate, newId 는 delete일 때만 필요없음
    let conditionBefore = '';
    let conditionAfter = '';

    if (controller === 'prev') {
      conditionBefore = (i, idx) => i < idx;
      conditionAfter = (i, idx) => i >= idx;
    }
    if (controller === 'next') {
      conditionBefore = (i, idx) => i <= idx;
      conditionAfter = (i, idx) => i > idx;
    }
    if (controller === 'delete') {
      conditionBefore = (i, idx) => i < idx;
      conditionAfter = (i, idx) => i > idx;
    }

    const beforeArr = itinerary.filter((_, i) => conditionBefore(i, idx));
    const afterArr = itinerary.filter((_, i) => conditionAfter(i, idx));

    const newItinerary = () => {
      if (controller === 'prev') {
        // prettier-ignore
        return [...beforeArr, {
          id: Math.max(...itinerary.map(iti => iti.id), 0) + 1,
          country: '',
          date,
          cells: [],
        },...afterArr.map((arr, i) => ({...arr, date: (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getMoveDate)(date, i + 1) }))];
      }
      if (controller === 'next') {
        // prettier-ignore
        return [...beforeArr,{
            id: newId,
            country: '',
            date: (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getMoveDate)(date, 1),
            cells: [],
          },...afterArr.map((arr, i) => ({ ...arr, date: (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getMoveDate)(date, i + 2) }))];
      }
      if (controller === 'delete') {
        return [...beforeArr, ...afterArr.map((arr, i) => ({ ...arr, date: (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getMoveDate)(date, i) }))];
      }
    };
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        currentId: '',
        newBgColor: newId,
      },
      tripSchedule: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule,
        endDate: controller === 'delete' ? endDate : (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getMoveDate)(endDate, 1),
        itinerary: newItinerary(),
      },
    };
  }

  openCellModal(e) {
    if (e.target.matches('.time-table__day-index__blank .itinerary-card--delete')) return;
    const { localCommon, localNewScheduleCell, localItinerary, localDatePicker, tripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary } = tripSchedule;

    const selectedItineraryId = +e.target.closest('.time-table__day-index__blank').dataset.id;
    const [{ date, cells }] = itinerary.filter(sched => sched.id === selectedItineraryId);
    let editCellId = -1;
    let info = {
      ...localNewScheduleCell.info,
      type: '',
      location: '',
      memo: '',
      todos: [],
    };

    if (!e.target.classList.contains('itinerary-card--add')) {
      editCellId = +e.target.closest('.itinerary-card').dataset.id;
      info = cells.filter(cell => cell.id === editCellId).shift();
    }

    document.body.style.overflow = 'hidden';

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localCommon: {
        ...localCommon,
        isShowModal: 'newScheduleCellPopup',
      },
      localItinerary: {
        ...localItinerary,
        isShowNewScheuleCellBtn: false,
      },
      localDatePicker: {
        ...localDatePicker,
        currentDate: date,
      },
      localNewScheduleCell: {
        ...localNewScheduleCell,
        editCellId,
        selectedItineraryId,
        info,
      },
      tripSchedule: {
        ...tripSchedule,
        newScheduleCellDate: date,
      },
    };
  }

  mouseoverTimetable(e) {
    const { localItinerary, localNewScheduleCell } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    if (
      localItinerary.dragTarget ||
      e.target.closest('.time-table__day-index__blank .itinerary-card') ||
      !e.target.closest('.time-table__day-index__blank li')
    )
      return;

    const { id } = e.target.closest('.time-table__day-index__blank').dataset;
    const { time } = e.target.closest('.time-table__day-index__blank li').dataset;

    const newStartTime = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedTime)(+time);
    const newEndTime = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedTime)(+time + 1);
    const {
      selectedItineraryId,
      info: { startTime },
    } = localNewScheduleCell;

    if (+id === selectedItineraryId && startTime === newStartTime) return;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        isShowNewScheuleCellBtn: true,
      },
      localNewScheduleCell: {
        ...localNewScheduleCell,
        selectedItineraryId: +id,
        info: {
          ...localNewScheduleCell.info,
          startTime: newStartTime,
          endTime: newEndTime,
        },
      },
    };
  }

  mouseoutTimetable(e) {
    const { localCommon, localNewScheduleCell, localItinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    if (localCommon.isShowModal !== '') return;
    if (!localItinerary.isShowNewScheuleCellBtn) return;

    // if (!e.target.matches('.time-table') || e.target.matches('.itinerary-btns') || e.target.matches('.trip-container')) {
    if (
      !(
        e.target.matches('.time-table__day-index__blank li') ||
        e.target.matches('.time-table__day-index__blank li button')
      )
    ) {
      console.log('mouseout');
      // console.log(e.target);
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localItinerary: {
          ...localItinerary,
          isShowNewScheuleCellBtn: false,
        },
        localNewScheduleCell: {
          ...localNewScheduleCell,
          selectedItineraryId: '',
          info: {
            ...localNewScheduleCell.info,
            startTime: '',
            endTime: '',
          },
        },
      };
    }
  }

  deleteCard(e) {
    console.log('deleteCard');
    const {
      tripSchedule,
      tripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { id } = e.target.closest('.itinerary-card').dataset;
    const selectedItineraryId = +e.target.closest('.time-table__day-index__blank').dataset.id;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      tripSchedule: {
        ...tripSchedule,
        itinerary: itinerary.map(sched =>
          sched.id === selectedItineraryId ? { ...sched, cells: sched.cells.filter(cell => cell.id !== +id) } : sched
        ),
      },
    };
  }

  dragCard(e) {
    e.dataTransfer.dropEffect = 'move';
    const selectedItineraryId = +e.target.closest('.time-table__day-index__blank').dataset.id;
    const dragTarget = +e.target.closest('.itinerary-card').dataset.id;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localItinerary,
        dragTarget,
      },
      localNewScheduleCell: {
        ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localNewScheduleCell,
        selectedItineraryId,
      },
    };
  }

  dragoverCard(e) {
    if (!e.target.closest('.time-table__day-index__blank li')) return;
    e.preventDefault();
  }

  dropCard(e) {
    const {
      localItinerary,
      localItinerary: { dragTarget },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    if (e.target === dragTarget || !e.target.closest('.time-table__day-index__blank li')) {
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localItinerary: {
          ...localItinerary,
          dragTarget: '',
        },
      };
      return;
    }

    const {
      tripSchedule,
      localNewScheduleCell: { selectedItineraryId },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary } = tripSchedule;

    const dropScheduleId = +e.target.closest('.time-table__day-index__blank').dataset.id;
    const dropTime = +e.target.closest('.time-table__day-index__blank li').dataset.time;

    const [{ cells }] = itinerary.filter(sched => sched.id === selectedItineraryId);
    const restItinerary = cells.filter(cell => cell.id !== dragTarget);
    let [targetItinerary] = cells.filter(cell => cell.id === dragTarget);
    let { startTime, endTime } = targetItinerary;

    const targetTimeGap = +endTime.slice(0, 2) - +startTime.slice(0, 2);
    endTime = dropTime + targetTimeGap;
    startTime = (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedTime)(dropTime);
    endTime = endTime > 24 ? 24 : (0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_4__.getFormattedTime)(endTime);

    const changeTime = new Array(targetTimeGap).fill(1).map((_, i) => dropTime + i);
    const dropTimes =
      dropScheduleId === selectedItineraryId
        ? restItinerary
        : itinerary.filter(iti => iti.id === dropScheduleId)[0].cells;
    const unableTime = dropTimes.map(cell => [+cell.startTime.slice(0, 2), +cell.endTime.slice(0, 2)]);
    const isAvailable = changeTime
      .map(time => unableTime.findIndex(([start, end]) => start <= time && time < end))
      .filter(val => val !== -1).length;

    // DND로 옮길 수 있는지 확인.
    if (isAvailable) {
      _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
        localItinerary: {
          ...localItinerary,
          dragTarget: '',
        },
      };
      return;
    }

    // 바뀐 itinerary 객체 미리 할당
    targetItinerary = {
      ...targetItinerary,
      startTime,
      endTime,
    };

    // 스케쥴 체인지
    const changeShedule = sched => {
      if (sched.id === selectedItineraryId) {
        return {
          ...sched,
          cells:
            selectedItineraryId === dropScheduleId
              ? sched.cells.map(cell => (cell.id === dragTarget ? targetItinerary : cell))
              : restItinerary,
        };
      }

      if (sched.id === dropScheduleId) {
        return { ...sched, cells: [...sched.cells, targetItinerary] };
      }

      return sched;
    };
    // console.log(dragTarget, selectedItineraryId, dropScheduleId);
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        dragTarget: '',
      },
      tripSchedule: {
        ...tripSchedule,
        itinerary: itinerary.map(sched => changeShedule(sched)),
      },
    };
  }

  addEventListener() {
    return [
      { type: 'click', selector: '.prev--btn', component: 'prev--btn', handler: this.movePrevItinerary },
      { type: 'click', selector: '.next--btn', component: 'next--btn', handler: this.moveNextItinerary },
      { type: 'click', selector: 'window', handler: this.toggleItineraryPopup },
      { type: 'click', selector: '.itinerary-card--add', handler: this.openCellModal },
      { type: 'click', selector: '.itinerary-card', handler: _myMap_js__WEBPACK_IMPORTED_MODULE_2__.moveMapCenter },
      { type: 'dblclick', selector: '.itinerary-card', handler: this.openCellModal },
      { type: 'click', selector: '.itinerary-card--delete', handler: this.deleteCard },
      { type: 'dragstart', selector: '.time-table__day-index__blank li', handler: this.dragCard },
      { type: 'dragover', selector: '.time-table__day-index__blank li', handler: this.dragoverCard },
      { type: 'drop', selector: '.time-table__day-index__blank li', handler: this.dropCard.bind(this) },
      { type: 'mouseover', selector: '.time-table', handler: this.mouseoverTimetable.bind(this) },
      { type: 'mouseout', selector: 'window', handler: this.mouseoutTimetable },
      {
        type: 'click',
        selector: '.carousel__days__add--list',
        handler: this.editItinerary,
      },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Itinerary);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditPlanner.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditPlanner.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _DatePicker_DatePicker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DatePicker/DatePicker.js */ "./client/src/component/DatePicker/DatePicker.js");




class EditPlanner extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      tripSchedule,
      localDatePicker,
      tripSchedule: { title, content, startDate, endDate, numberOfPeople },
    } = this.props;

    const startDatePickerProps = {
      ...tripSchedule,
      ...localDatePicker,
      inputId: 'newTripStartDate',
      calendarId: 'startDate',
      inputPlaceholder: '출발일',
      labelContent: '출발 날짜',
      date: startDate,
      startDate,
      endDate,
      unableType: 'none',
    };
    const endDatePickerProps = {
      ...tripSchedule,
      ...localDatePicker,
      inputId: 'newTripEndDate',
      calendarId: 'endDate',
      inputPlaceholder: '도착일',
      labelContent: '도착 날짜',
      date: endDate,
      startDate,
      endDate,
      unableType: 'term',
    };

    return `
    <div class="trip-planner">
      <div class="trip-planner__create">
        <div class="trip-planner__create__title">
          <input class="trip-planner__title" placeholder="어떤 여행인지 간단히 설명해주세요." minlength="3" maxlength="50" value="${title}"/>
        </div>
        <div class="trip-planner__create__content">
          <textarea class="trip-planner__content" placeholder="당신의 여행 스토리를 남겨보세요." minlength="10" maxlength="500">${content}</textarea>
        </div>
        <div class="trip-planner__create__option">
          <div class="trip-date trip-start-date">
            <span class="trip-date__span">여행 시작일</span>
            ${new _DatePicker_DatePicker_js__WEBPACK_IMPORTED_MODULE_2__["default"](startDatePickerProps).render()}
          </div>
          <div class="trip-date trip-end-date">
            <span class="trip-date__span">여행 도착일</span>
            ${new _DatePicker_DatePicker_js__WEBPACK_IMPORTED_MODULE_2__["default"](endDatePickerProps).render()}
          </div>
          <div class="trip-people"><input type="number" value="${numberOfPeople}" max="99" /><span>명</span></div>
        </div>
      </div>
    </div>
    `;
  }

  setTitle(e) {
    if (!e.target.classList.contains('trip-planner__title')) return;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { tripSchedule: { ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule, title: e.target.value } };
  }

  setContent(e) {
    if (!e.target.classList.contains('trip-planner__content')) return;
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { tripSchedule: { ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule, content: e.target.value } };
  }

  addEventListener() {
    return [
      { type: 'input', selector: '.trip-planner__title', handler: this.setTitle },
      { type: 'input', selector: '.trip-planner__content', handler: this.setContent },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditPlanner);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditTripAdd.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditTripAdd.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../dom/render.js */ "./client/src/dom/render.js");




class EditPlanAdd extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    return `
    <div class="itinerary-btns">
      <button class="itinerary-btns--private">나만의 일정</button>
      <button class="itinerary-btns--public">다른 사람들에게도 공유하기</button>
    </div>
    `;
  }

  async submitPrivateTripSchedule(e) {
    console.log('submitPrivateTripSchedule');
    try {
      // const { userId, nickname, profilePic } = store.state.userInfo;
      const response = await axios.post('/tripSchedule', _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.tripSchedule);
      // const response = await axios.post('/tripSchedule', {
      //   ...store.state.tripSchedule,
      //   author: nickname,
      //   authorId: userId,
      //   authorProfilePic: profilePic,
      // });

      if (response.status === 200) {
        // console.log(store.state);
        console.log(response.data);
        console.log('성공');

        console.log('[store]:' + _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state);

        // TODO: store.state.tripSchedule 초기화
        const { tripScheduleId } = response.data;
        window.history.pushState(
          {},
          'ViewTripSchedule',
          window.location.origin + `/trip-planner-view/${tripScheduleId}`
        );
        (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
      }
    } catch (e) {
      console.error(e);
    }
  }

  addEventListener() {
    return [{ type: 'click', selector: '.itinerary-btns--private', handler: this.submitPrivateTripSchedule }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditPlanAdd);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditTripArticle.js":
/*!******************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditTripArticle.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");


class EditTripArticle extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      userInfo: { profilePic, nickname },
      cell: {
        location: { name },
        startTime,
      },
    } = this.props;

    return `
      <article class="trip-article">
        <div class="trip-article__header">
          <div class="trip-article__header__profile">
            <img src="${
              profilePic || '/assets/images/users/profileDefault.png'
            }" alt="${nickname} 님의 프로필사진" class="profile-img" />
          </div>
          <div class="trip-article__header__content">
            <p class="trip-article__header__content__place">${name}</p>
            <p class="trip-article__header__content__time">${startTime}</p>
          </div>
          <div class="trip-article__header__badge">
            <button class="add-btn">
              <img src="/assets/images/post-add.svg" alt="포스트 작성" class="add-img" /> 포스트 작성
            </button>
          </div>
        </div>
      </article>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditTripArticle);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditTripStory.js":
/*!****************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditTripStory.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _EditTripStoryItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditTripStoryItem.js */ "./client/src/component/TripPlanner/Edit/EditTripStoryItem.js");



class EditTripStroy extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { userInfo, itinerary } = this.props;

    const $editTripStoryItem = itinerary
      .map((item, idx) => new _EditTripStoryItem_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ userInfo, item, idx }).render())
      .join('');

    return `
    <div class="trip-story">
      <ul class="trip-story__day-list">
        ${$editTripStoryItem}
      </ul>
    </div>
      `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditTripStroy);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditTripStoryItem.js":
/*!********************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditTripStoryItem.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _EditTripArticle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditTripArticle.js */ "./client/src/component/TripPlanner/Edit/EditTripArticle.js");
/* harmony import */ var _DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DatePicker/dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");




class EditTripStoryItem extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      userInfo,
      item: { date, country, cells },
      idx,
    } = this.props;

    const $editTripArticle = cells.map(cell => new _EditTripArticle_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ userInfo, cell }).render()).join('');

    return `
      <li class="trip-story__day-item">
        <div class="trip-story__day-content">
          <h3 class="trip-story__day-content__title">Day ${idx + 1}</h3>
          <p class="trip-story__day-content__summary">${(0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getFormattedDate)(date)} | ${country}</p>
        </div>
        ${$editTripArticle}
      </li>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditTripStoryItem);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/EditTripTab.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/EditTripTab.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");



class EditTripTab extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { selectedTab } = this.props;
    const tabArr = [
      {
        type: 'chart',
        content: '지도/일정표',
      },
      {
        type: 'story',
        content: '스토리',
      },
    ];
    // prettier-ignore
    return `
    <div class="trip-itinerary__tab">
      ${tabArr.map(({type, content}) =>`
      <div class="trip-itinerary__tab__${type} ${selectedTab === type ? 'selected' : ''}" data-tab = "${type}">
        ${content}
      </div>`).join('')}
    </div>
    `;
  }

  renderSelectedContent(e) {
    if (e.target.matches('.trip-itinerary__tab')) return;

    const selectedTab = e.target.dataset.tab;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon, localCommon: { selectedTab } };
  }

  addEventListener() {
    return [{ type: 'click', selector: '.trip-itinerary__tab', handler: this.renderSelectedContent }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditTripTab);


/***/ }),

/***/ "./client/src/component/TripPlanner/Edit/index.js":
/*!********************************************************!*\
  !*** ./client/src/component/TripPlanner/Edit/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditPlanCover": () => (/* reexport safe */ _EditPlanCover_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "EditPlanMap": () => (/* reexport safe */ _EditPlanMap_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "EditPlanner": () => (/* reexport safe */ _EditPlanner_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "EditTripAdd": () => (/* reexport safe */ _EditTripAdd_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "EditTripStroy": () => (/* reexport safe */ _EditTripStory_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "EditTripTab": () => (/* reexport safe */ _EditTripTab_js__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _EditPlanCover_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditPlanCover.js */ "./client/src/component/TripPlanner/Edit/EditPlanCover.js");
/* harmony import */ var _EditPlanner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditPlanner.js */ "./client/src/component/TripPlanner/Edit/EditPlanner.js");
/* harmony import */ var _EditTripTab_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditTripTab.js */ "./client/src/component/TripPlanner/Edit/EditTripTab.js");
/* harmony import */ var _EditPlanMap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditPlanMap.js */ "./client/src/component/TripPlanner/Edit/EditPlanMap.js");
/* harmony import */ var _EditTripStory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditTripStory.js */ "./client/src/component/TripPlanner/Edit/EditTripStory.js");
/* harmony import */ var _EditTripAdd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditTripAdd.js */ "./client/src/component/TripPlanner/Edit/EditTripAdd.js");








/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewLikeShareBtnBox.js":
/*!**********************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewLikeShareBtnBox.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");



class ViewLikeShareBtnBox extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { isLiked, likeCount } = this.props;

    return `
    <div class="like-share-btnbox">
      <div class="like-container">
        <button class="like-btn"><img src="${
          isLiked ? '/assets/images/heart-fill.svg' : '/assets/images/heart-nofill.svg'
        }" alt="좋아요" /></button>
        <span class="like-degit">${likeCount}</span>
      </div>
      <button class="share-btn"><img src="/assets/images/share.svg" alt="공유하기" /></button>
      </div>
    `;
  }

  clickLikeBtn(e) {
    // e.preventDefault();

    const {
      viewTripSchedule,
      viewTripSchedule: { isLiked, likeCount },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      viewTripSchedule: {
        ...viewTripSchedule,
        isLiked: !isLiked,
        likeCount: isLiked ? likeCount - 1 : likeCount + 1,
      },
    };
  }

  addEventListener() {
    return [{ type: 'click', selector: '.like-btn', handler: this.clickLikeBtn.bind(this) }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewLikeShareBtnBox);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewNavDay.js":
/*!*************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewNavDay.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");


class ViewNavDay extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { itinerary } = this.props;

    const DayDOMString = itinerary
      .map(({ id }) => `<li class="nav-day__item" data-nav="day${id}"><a href="#day${id}">Day ${id}</a></li>`)
      .join('');

    return `
    <div class="nav-day">
      <ul class="nav-day__list">
        <li class="nav-day__item active" data-nav="top"><a href="#top">Top</a></li>
        ${DayDOMString}
        <li class="nav-day__item" data-nav="comment"><a href="#comment">댓글</a></li>
      </ul>
    </div>
    `;
  }

  // observer() {
  //   const scrollObserver = new IntersectionObserver(
  //     entries => {
  //       console.log(entries);
  //     },
  //     {
  //       root: null,
  //       rootMargin: '0px',
  //       threshold: 0.5,
  //     }
  //   );

  //   [...document.querySelector('.trip-story__day-list').children].forEach(item => scrollObserver.observe(item));
  // }

  scrollToDay(e) {
    e.preventDefault();

    if (!e.target.classList.contains('nav-day__item') && !e.target.closest('.nav-day__item')) return;

    const targetNav = e.target.tagName === 'LI' ? e.target.dataset.nav : e.target.closest('.nav-day__item').dataset.nav;

    window.scrollTo({
      top: document.getElementById(targetNav).offsetTop,
      left: 0,
      behavior: 'smooth',
    });

    // targetNav === 'top'
    //   ? window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    //   : window.scrollTo({
    //       top: document.getElementById(targetNav).offsetTop,
    //       left: 0,
    //       behavior: 'smooth',
    //     });
  }

  addEventListener() {
    return [{ type: 'click', selector: '.nav-day__list', handler: this.scrollToDay }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewNavDay);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewPlanComment.js":
/*!******************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewPlanComment.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");


class ViewPlanComment extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { commentCount } = this.props;
    return `
    <div class="comment" id="comment">
        <h3 class="comment__title">댓글 (${commentCount})</h3>
        <div class="comment__container">
          <div class="comment__inputbox">
            <div class="comment__inputbox__profile">
              <img src="/assets/images/users/profileDefault.png" alt="프로필사진" class="profile-img" />
            </div>
            <div class="comment__inputbox__inputform">
              <label for="comment-input" class="a11yHidden">댓글입력창</label>
              <input type="text" name="comment-input" id="comment-input" placeholder="댓글을 입력해주세요." />
            </div>
            <button class="comment__inputbox__button"></button>
          </div>
          <div class="comment__box">
            <div class="comment__box__contentbox">
              <div class="comment__box__contentbox__profile">
                <img src="/assets/images/users/profileDefault.png" alt="프로필사진" class="profile-img" />
              </div>
              <div class="comment__box__contentbox__content">
                <p class="comment__box__contentbox__content__username">
                  굿굿
                  <span class="comment__box__contentbox__content__add-time">작성시간</span>
                </p>
                <p class="comment__box__contentbox__content__main">멋져요!</p>
              </div>
            </div>
            <div class="comment__box__buttonbox">
              <button class="recomment-btn"></button>
              <button class="remove-btn"></button>
            </div>
          </div>
          <div class="comment__box">
            <div class="comment__box__contentbox recomment">
              <div class="comment__box__contentbox__profile">
                <img src="/assets/images/users/profileDefault.png" alt="프로필사진" class="profile-img" />
              </div>
              <div class="comment__box__contentbox__content">
                <p class="comment__box__contentbox__content__username">
                  세후니
                  <span class="comment__box__contentbox__content__add-time">작성시간</span>
                </p>
                <p class="comment__box__contentbox__content__main">나도 여행 가고 싶다.</p>
              </div>
            </div>
            <div class="comment__box__buttonbox">
              <button class="recomment-btn"></button>
              <button class="remove-btn"></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewPlanComment);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewPlanCover.js":
/*!****************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewPlanCover.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");




class ViewPlanCover extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { userId, authorId, coverImg, title, summary } = this.props;

    return `
    <div class="cover" style="background-image: url('${coverImg}')">
      <div class="cover__inner">
        <div class="cover__content">
          <h2 class="cover__content__title">${title}</h2>
          <p class="cover__content__summary">${summary}</p>
        </div>
        ${
          userId === authorId
            ? `<div class="cover__buttonbox">
            <button class="edit-btn"><img src="/assets/images/post-edit.svg" alt="글 수정" /></button>
            <button class="remove-btn"><img src="/assets/images/cancel.svg" alt="글 삭제" /></button>
          </div>`
            : ''
        }
      </div>
    </div>`;
  }

  goEditMode(e) {
    const tripScheduleId = window.location.pathname.split('/').pop();
    const goConfirm = confirm('일정을 수정하시겠습니까?');
    if (goConfirm) {
      window.history.pushState({}, 'EditTripSchedule', window.location.origin + '/trip-planner-edit/' + tripScheduleId);
      // window.history.pushState({}, 'EditTripSchedule', window.location.origin + '/trip-planner-edit');

      const { viewTripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state;
      _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state = {
        tripSchedule: viewTripSchedule,
      };
    }
  }

  deleteTripSchedule(e) {
    const deleteConfirm = confirm('일정을 삭제하시겠습니까?');
    if (deleteConfirm) {
      // Todo 해당 일정 state 삭제 기능 추가 필요
      window.history.pushState({}, 'Main', window.location.origin + '/main');
      (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
  }

  addEventListener() {
    return [
      { type: 'click', selector: '.edit-btn', component: 'ViewPlanCover', handler: this.goEditMode },
      { type: 'click', selector: '.remove-btn', component: 'ViewPlanCover', handler: this.deleteTripSchedule },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewPlanCover);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewPlanMap.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewPlanMap.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");



class ViewPlanMap extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  formattedTime(time) {
    return time < 10 ? `0${time}:00` : `${time}:00`;
  }

  render() {
    const {
      localItinerary,
      viewTripSchedule: { itinerary },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { startId } = localItinerary;

    // prettier-ignore
    const timeList = [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
      '24:00',
    ];

    const _schedule = itinerary
      .filter((_, i) => i >= startId && i < startId + 3)
      .map(unit => ({ ...unit, date: new Date(unit.date) }));

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // prettier-ignore
    return `
      <div id="googleMap" class="map"></div> 
      <!-- carousel -->
      <div class="carousel">
        <div class="carousel__days">
        ${
          _schedule.map(sched =>  `
            <div class="carousel__day-index" data-id=${sched.id}>
              Day ${sched.id} <span>/</span> ${sched.date.getMonth()+1<10 ? '0'+(sched.date.getMonth()+1) : sched.date.getMonth()+1}.${sched.date.getDate()<10 ? '0'+sched.date.getDate() : (sched.date.getDate())} ${days[sched.date.getDay()]}
              <div>${sched.country}</div>
            </div>`).join('')
        }
        </div>
        <button class="prev--btn carousel--btn">〈</button>
        <button class="next--btn carousel--btn">〉</button>
      </div>
    <div class="time-table">
    <ul class="time-table__times">
      ${timeList.map(time => `<li class="time-table__time-item">
        <span class="time-table__time">${time}</span>
        <span class="line"></span>
      </li>`).join('')}
    </ul>
    <div class="time-table__day-index">
    ${_schedule.map(sch => {
      const { cells, id } = sch;
      const cellTimeFromToArr = cells.map(cell => [+cell.startTime.slice(0,2), +cell.endTime.slice(0,2)])

      return `
      <ul class="time-table__day-index__blank" data-id="${id}">
        ${timeList.map((timeItem, i, self) => {
          if(i === self.length - 1) return '';

          const time = +timeItem.slice(0, 2)
          const idx = cellTimeFromToArr.findIndex(([startTime, endTime]) => startTime <= time && time < endTime)
          const isInculdedCell = idx !== -1
          const isFirstChildTime = isInculdedCell? (cells[idx].startTime === timeItem) : null;
          const isLastChildTime = isInculdedCell? 
            (this.formattedTime(+cells[idx].endTime.slice(0,2) - 1) === timeItem) : null;
          const liClass = isFirstChildTime && isLastChildTime? 'first-last': isFirstChildTime? 'first': isLastChildTime? 'last': ''
          
          // timeItem 시간이 cells의 세부 일정 시작 시간과 같으면 div.itinerary-card를 추가 
          // 세부 일정이 없는 시간이고 mouseover되었으면 button.itinerary-card--add를 추가
          return `<li data-time="${i}" class="${liClass}">
            ${isInculdedCell ? 
              `<div class="itinerary-card itinerary-card--check ${cells[idx].type}" data-id="${cells[idx].id}" draggable="true">
                <div class="itinerary-card-emph"></div>
                ${isFirstChildTime ? `<div class="itinerary-card--check__content">
                    <div class="itinerary-card--check__title">${cells[idx].location.name}</div>
                    <div class="itinerary-card--check__memo">${cells[idx].memo}</div>
                  </div>`: ''
                }
              </div>` : ''}
          </li>`
        }).join('')}
      </ul>
    `}).join('')}
    </div>
  </div>`
  }

  nextBtnsController() {
    const { localItinerary, tripSchedule } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    const { itinerary } = tripSchedule;
    let { startId } = localItinerary;

    if (itinerary.length > 31) {
      alert('더이상 생성하지 맙시다');
      return;
    }
    if (itinerary.length === startId + 3) {
      alert('마지막 입니다.');
      return;
    }
    startId += 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        startId,
      },
    };
  }

  prevBtnsController() {
    const { localItinerary } = _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state;
    let { startId } = localItinerary;

    if (startId === 0) {
      alert('첫번째 여행일 입니다');
      return;
    }
    startId -= 1;

    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = {
      localItinerary: {
        ...localItinerary,
        startId,
      },
    };
  }

  addEventListener() {
    return [
      { type: 'click', selector: '.next--btn', component: 'next--btn', handler: this.nextBtnsController },
      { type: 'click', selector: '.prev--btn', component: 'prev--btn', handler: this.prevBtnsController },
    ];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewPlanMap);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewPlanner.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewPlanner.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DatePicker/dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");



class ViewPlanner extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      viewTripSchedule: {
        author,
        authorProfilePic,
        content,
        startDate,
        numberOfPeople,
        createdDate,
        likeCount,
        commentCount,
      },
    } = this.props;

    if (startDate === null) return '';
    return `
    <div class="trip-planner">
      <div class="trip-planner__author">
        <div class="trip-planner__author__profile">
          <img src='${
            authorProfilePic || '/assets/images/users/profileDefault.png'
          }' alt="프로필사진" class="profile-img" />
        </div>
        <span class="trip-planner__author__nickname">${author}</span>
      </div>
      <p class="trip-planner__content">
        ${content}
      </p>
      <div class="trip-planner__info">
        <p>여행 시작일: ${(0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_1__.getFormattedDate)(startDate)} | ${numberOfPeople}명</p>
        <p>작성일: ${(0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_1__.getFormattedDate)(createdDate)}</p>
      </div>
      <div class="trip-planner__badge">
        <span><img src="/assets/images/heart-nofill.svg" alt="좋아요 뱃지" /> ${likeCount}</span>
        <span><img src="/assets/images/comment.svg" alt="댓글" />${commentCount}</span>
      </div>
    </div>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewPlanner);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewTripArticle.js":
/*!******************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewTripArticle.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");


class ViewTripArticle extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      userId,
      authorId,
      author,
      authorProfilePic,
      cell: {
        location,
        startTime,
        article: { picture, content },
      },
    } = this.props;

    // prettier-ignore
    return `
    <article class="trip-article">
    <div class="trip-article__header">
      <div class="trip-article__header__profile">
        <img src="${authorProfilePic || '/assets/images/users/profileDefault.png'}" alt="${author} 님의 프로필사진" class="profile-img" />
      </div>
      <div class="trip-article__header__content">
        <p class="trip-article__header__content__place">${location.name}</p>
        <p class="trip-article__header__content__time">${startTime}</p>
      </div>
      ${userId === authorId 
      ?
      `<div class="trip-article__header__badge">
      ${content
        ? `
        <button class="edit-btn"></button>
        <button class="remove-btn"></button>`
        : `
        <button class="add-btn">
          <img src="/assets/images/post-add.svg" alt="포스트 작성" class="add-img" /> 포스트 작성
        </button>`
      }
      </div>`
      : ''
      } 
    </div>
    <div class="trip-article__main">
      <div class="trip-article__main__img-container">
        ${picture ? `<img src="${picture}" alt="${location.name} 사진" /> ` : ''}
      </div>
      <div class="trip-article__main__content">
        ${content || ''}
      </div>
    </div>
  </article>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTripArticle);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewTripStory.js":
/*!****************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewTripStory.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _ViewTripStoryItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewTripStoryItem.js */ "./client/src/component/TripPlanner/View/ViewTripStoryItem.js");



class ViewTripStory extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { userId, authorId, author, authorProfilePic, itinerary } = this.props;

    const $viewTripStoryItem = itinerary
      .map((item, idx) => new _ViewTripStoryItem_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ userId, authorId, author, authorProfilePic, item, idx }).render())
      .join('');

    return `
    <div class="trip-story">
      <ul class="trip-story__day-list">
        ${$viewTripStoryItem}
      </ul>
    </div>
      `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTripStory);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewTripStoryItem.js":
/*!********************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewTripStoryItem.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _ViewTripArticle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewTripArticle.js */ "./client/src/component/TripPlanner/View/ViewTripArticle.js");
/* harmony import */ var _DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DatePicker/dateUtils.js */ "./client/src/component/DatePicker/dateUtils.js");




class ViewTripStoryItem extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const {
      userId,
      authorId,
      author,
      authorProfilePic,
      item: { date, country, cells },
      idx,
    } = this.props;

    const $viewTripArticle = cells
      .map(cell => new _ViewTripArticle_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ userId, authorId, author, authorProfilePic, cell }).render())
      .join('');

    return `
      <li class="trip-story__day-item" id="day${idx + 1}">
        <div class="trip-story__day-content">
          <h3 class="trip-story__day-content__title">Day ${idx + 1}</h3>
          <p class="trip-story__day-content__summary">${(0,_DatePicker_dateUtils_js__WEBPACK_IMPORTED_MODULE_2__.getFormattedDate)(date)} | ${country}</p>
        </div>
        ${$viewTripArticle}
      </li>
    `;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTripStoryItem);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/ViewTripTab.js":
/*!**************************************************************!*\
  !*** ./client/src/component/TripPlanner/View/ViewTripTab.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/store.js */ "./client/src/store/store.js");



class ViewTripTab extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  render() {
    const { selectedTab } = this.props;
    return `
    <div class="trip-itinerary__tab">
      <div class="trip-itinerary__tab__chart ${
        selectedTab === 'chart' ? 'selected' : ''
      }" data-tab = "chart">지도/일정표</div>
      <div class="trip-itinerary__tab__story ${
        selectedTab === 'story' ? 'selected' : ''
      }" data-tab = "story">스토리</div>
    </div>
    `;
  }

  observer() {
    const scrollObserver = new IntersectionObserver(
      entries => {
        console.log(entries);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    [...document.querySelector('.trip-story__day-list').children].forEach(item => scrollObserver.observe(item));
  }

  renderSelectedContent(e) {
    _store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state = { localCommon: { ..._store_store_js__WEBPACK_IMPORTED_MODULE_1__["default"].state.localCommon, selectedTab: e.target.dataset.tab } };

    // Todo IntersectionObserver 관련 상위 컴포넌트로 올려서 사용 필요
    //   if (e.target.dataset.tab === 'story') {
    //     const scrollObserver = new IntersectionObserver(
    //       entries => {
    //         const { target } = entries.find(entry => entry.isIntersecting);

    //         [...document.querySelector('.nav-day__list').children].forEach(item =>
    //           item.classList.toggle('active', item.dataset.nav === target.id)
    //         );
    //       },
    //       {
    //         root: null,
    //         rootMargin: '0px',
    //         threshold: 0.5,
    //       }
    //     );

    //     [
    //       document.querySelector('.header'),
    //       ...document.querySelector('.trip-story__day-list').children,
    //       document.querySelector('.comment'),
    //     ].forEach(item => scrollObserver.observe(item));
    //   }
  }

  addEventListener() {
    return [{ type: 'click', selector: '.trip-itinerary__tab', handler: this.renderSelectedContent }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTripTab);


/***/ }),

/***/ "./client/src/component/TripPlanner/View/index.js":
/*!********************************************************!*\
  !*** ./client/src/component/TripPlanner/View/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewLikeShareBtnBox": () => (/* reexport safe */ _ViewLikeShareBtnBox_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "ViewNavDay": () => (/* reexport safe */ _ViewNavDay_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "ViewPlanComment": () => (/* reexport safe */ _ViewPlanComment_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "ViewPlanCover": () => (/* reexport safe */ _ViewPlanCover_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "ViewPlanMap": () => (/* reexport safe */ _ViewPlanMap_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "ViewPlanner": () => (/* reexport safe */ _ViewPlanner_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "ViewTripStory": () => (/* reexport safe */ _ViewTripStory_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "ViewTripTab": () => (/* reexport safe */ _ViewTripTab_js__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _ViewPlanCover_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewPlanCover.js */ "./client/src/component/TripPlanner/View/ViewPlanCover.js");
/* harmony import */ var _ViewPlanner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewPlanner.js */ "./client/src/component/TripPlanner/View/ViewPlanner.js");
/* harmony import */ var _ViewTripTab_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewTripTab.js */ "./client/src/component/TripPlanner/View/ViewTripTab.js");
/* harmony import */ var _ViewPlanMap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewPlanMap.js */ "./client/src/component/TripPlanner/View/ViewPlanMap.js");
/* harmony import */ var _ViewTripStory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewTripStory.js */ "./client/src/component/TripPlanner/View/ViewTripStory.js");
/* harmony import */ var _ViewPlanComment_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ViewPlanComment.js */ "./client/src/component/TripPlanner/View/ViewPlanComment.js");
/* harmony import */ var _ViewLikeShareBtnBox_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ViewLikeShareBtnBox.js */ "./client/src/component/TripPlanner/View/ViewLikeShareBtnBox.js");
/* harmony import */ var _ViewNavDay_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ViewNavDay.js */ "./client/src/component/TripPlanner/View/ViewNavDay.js");










/***/ }),

/***/ "./client/src/component/ViewTripPlanner.js":
/*!*************************************************!*\
  !*** ./client/src/component/ViewTripPlanner.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Component.js */ "./client/src/core/Component.js");
/* harmony import */ var _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TripPlanner/View/index.js */ "./client/src/component/TripPlanner/View/index.js");
/* harmony import */ var _myMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./myMap.js */ "./client/src/component/myMap.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");





class ViewTripPlanner extends _core_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  async init() {
    const id = window.location.pathname.split('/').pop();
    try {
      const _tripSchedule = await axios.get('/tripSchedule/' + id);
      (0,_myMap_js__WEBPACK_IMPORTED_MODULE_2__.initMap)('viewTripSchedule');
      _store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"].state = {
        localCommon: {
          ..._store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"].state.localCommon,
          path: window.location.pathname,
        },
        viewTripSchedule: _tripSchedule.data,
      };
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      state: {
        userInfo: { userId },
        localCommon: { selectedTab },
        viewTripSchedule,
        viewTripSchedule: {
          authorId,
          author,
          authorProfilePic,
          coverImg,
          title,
          summary,
          itinerary,
          isLiked,
          likeCount,
          commentCount,
        },
      },
    } = _store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    console.log('상위 ', _store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"].state.viewTripSchedule);
    console.log('상위 ', isLiked, likeCount);
    const $viewPlanCover = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewPlanCover({ userId, authorId, coverImg, title, summary }).render();
    const $viewPlanner = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewPlanner({ viewTripSchedule }).render();
    const $viewTripTab = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewTripTab({ selectedTab }).render();
    const $viewPlanMap = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewPlanMap().render();
    const $viewTripStory = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewTripStory({ userId, authorId, author, authorProfilePic, itinerary }).render();
    const $viewPlanComment = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewPlanComment({ commentCount }).render();
    const $viewLikeShareBtnBox = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewLikeShareBtnBox({ isLiked, likeCount }).render();
    const $viewNavDay = new _TripPlanner_View_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewNavDay({ itinerary }).render();

    return `
      <main class="detail-main">
        ${$viewPlanCover}
        <div class="trip-container">
          ${$viewLikeShareBtnBox}
          <div class="trip-main-container">
            ${$viewPlanner}
            <div class="trip-itinerary">
              ${$viewTripTab}
              <div class="itinerary__container">
                ${selectedTab === 'chart' ? $viewPlanMap : $viewTripStory}
              </div>
              ${$viewPlanComment}
            </div>
          </div>
          ${$viewNavDay}
        </div>
      </main>
      `;
  }

  // async fetchSelectedTripSchedule(e) {
  //   const id = window.location.pathname.split('/').pop();

  //   const selectedTripSchedule = await axios.get('/tripSchedule/' + id);
  //   store.state = store.state.selectedTripSchedule = selectedTripSchedule.data;
  // }

  // addEventListener() {
  //   return [{ type: '', selector: 'window', handler: this.fetchSelectedTripSchedule }];
  // }
  addEventListener() {
    return [{ type: 'click', selector: '.itinerary-card', handler: _myMap_js__WEBPACK_IMPORTED_MODULE_2__.moveMapCenter }];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTripPlanner);


/***/ }),

/***/ "./client/src/component/index.js":
/*!***************************************!*\
  !*** ./client/src/component/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Calendar": () => (/* reexport safe */ _DatePicker_Calendar_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "CellDatePicker": () => (/* reexport safe */ _DatePicker_CellDatePicker_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "DateInput": () => (/* reexport safe */ _DatePicker_DateInput_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "DatePicker": () => (/* reexport safe */ _DatePicker_DatePicker_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "EditTripPlanner": () => (/* reexport safe */ _EditTripPlanner_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "Footer": () => (/* reexport safe */ _Footer_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "Header": () => (/* reexport safe */ _Header_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Intro": () => (/* reexport safe */ _Intro_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Itinerary": () => (/* reexport safe */ _Itinerary_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Main": () => (/* reexport safe */ _Main_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Mypage": () => (/* reexport safe */ _Mypage_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   "NewScheduleCellPopup": () => (/* reexport safe */ _NewScheduleCellPopup_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Signin": () => (/* reexport safe */ _Signin_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Signup": () => (/* reexport safe */ _Signup_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "TripPlanner": () => (/* reexport safe */ _TripPlanner_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "ViewTripPlanner": () => (/* reexport safe */ _ViewTripPlanner_js__WEBPACK_IMPORTED_MODULE_14__["default"])
/* harmony export */ });
/* harmony import */ var _Intro_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Intro.js */ "./client/src/component/Intro.js");
/* harmony import */ var _Main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.js */ "./client/src/component/Main.js");
/* harmony import */ var _Signin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Signin.js */ "./client/src/component/Signin.js");
/* harmony import */ var _Signup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Signup.js */ "./client/src/component/Signup.js");
/* harmony import */ var _Itinerary_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Itinerary.js */ "./client/src/component/Itinerary.js");
/* harmony import */ var _NewScheduleCellPopup_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NewScheduleCellPopup.js */ "./client/src/component/NewScheduleCellPopup.js");
/* harmony import */ var _TripPlanner_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TripPlanner.js */ "./client/src/component/TripPlanner.js");
/* harmony import */ var _Header_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Header.js */ "./client/src/component/Header.js");
/* harmony import */ var _Footer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Footer.js */ "./client/src/component/Footer.js");
/* harmony import */ var _DatePicker_CellDatePicker_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DatePicker/CellDatePicker.js */ "./client/src/component/DatePicker/CellDatePicker.js");
/* harmony import */ var _DatePicker_DatePicker_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DatePicker/DatePicker.js */ "./client/src/component/DatePicker/DatePicker.js");
/* harmony import */ var _DatePicker_DateInput_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DatePicker/DateInput.js */ "./client/src/component/DatePicker/DateInput.js");
/* harmony import */ var _DatePicker_Calendar_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DatePicker/Calendar.js */ "./client/src/component/DatePicker/Calendar.js");
/* harmony import */ var _EditTripPlanner_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditTripPlanner.js */ "./client/src/component/EditTripPlanner.js");
/* harmony import */ var _ViewTripPlanner_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ViewTripPlanner.js */ "./client/src/component/ViewTripPlanner.js");
/* harmony import */ var _Mypage_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Mypage.js */ "./client/src/component/Mypage.js");


















/***/ }),

/***/ "./client/src/component/myMap.js":
/*!***************************************!*\
  !*** ./client/src/component/myMap.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initMap": () => (/* binding */ initMap),
/* harmony export */   "moveMapCenter": () => (/* binding */ moveMapCenter)
/* harmony export */ });
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/**
 * * old map
 *
 */

// function myMap() {
//   const mapOptions = {
//     center: new google.maps.LatLng(51.508742, -0.12085),
//     zoom: 5,
//   };
//   const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
// mark 표시
// const marker = new google.maps.marker({
//   position: {
//     lat: 51.508742,
//     lng: -0.12085,
//   },
//   map,
//   title: 'Hello, world',
// });
// }

// export default myMap;

// let map;
// let infoWindow;
// let marker;

// function myMap() {
//   const currentPosition = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent('Location found.');
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   };
//   map = new google.maps.Map(document.getElementById('googleMap'), {
//     center: currentPosition(),
//     zoom: 15,
//   });

//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement('button');

//   locationButton.addEventListener('DOMContentLoaded', () => {
//     currentPosition();
//   });

//   const marker = new google.maps.marker({
//   position: {
//     lat: 51.508742,
//     lng: -0.12085,
//   },
//   map,
//   title: 'Hello, world',
// });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? 'Error: The Geolocation service failed.'
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

// export default myMap;

// function myMap() {
//   const mapOptions = {
//     center: new google.maps.LatLng(51.508742, -0.12085),
//     zoom: 5,
//   };

//   const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
// }

// export default myMap;

/**
 * new map
 */



let map = null;
let selectedCellCoord = null;

// Converts numeric degrees to radians
// const toRad = Value => (Value * Math.PI) / 180;

// const calcCrow = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // km
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const _lat1 = toRad(lat1);
//   const _lat2 = toRad(lat2);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(_lat1) * Math.cos(_lat2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c;
//   return d;
// };

// const calculateZoomLevel = (mapSize, coverage, latitude, distance) => {
//   // const pixels = mapSize.Width >= mapSize.Height ? mapSize.Height : mapSize.Width; // get the shortest dimmension of the map
//   const k = mapSize * 156543.03392 * Math.cos((latitude * Math.PI) / 180);
//   return Math.round(Math.log((coverage * k) / (distance * 100)) / 0.6931471805599453) / 2;
// };
// };

const initMap = type => {
  // 현제위치를 설정한다.
  // if (!store.state.localMap.isMapInitial) return;
  (async () => {
    const { geolocation } = navigator;

    const success = position => {
      const { latitude, longitude } = position.coords;
      const coord = new google.maps.LatLng(latitude, longitude);

      // const { lat, lng } = selectedCellCoord;
      // const _coord = new google.maps.LatLng(selectedCellCoord?.lat, selectedCellCoord?.lng);
      const cellInfoList = _store_store_js__WEBPACK_IMPORTED_MODULE_0__["default"].state[type].itinerary
        .map(dayPlan =>
          dayPlan.cells.map(cell => ({ type: cell.type, latLng: cell.location.latLng, name: cell.location.name }))
        )
        .flat();

      // const { sumLatitude, sumLongitude } = cellInfoList.reduce(
      //   (acc, cur) => ({
      //     sumLatitude: acc.sumLatitude + cur.latLng.lat,
      //     sumLongitude: acc.sumLongitude + cur.latLng.lng,
      //   }),
      //   { sumLatitude: 0, sumLongitude: 0 }
      // );

      // const _coord = new google.maps.LatLng(sumLatitude / cellInfoList.length, sumLongitude / cellInfoList.length);

      // const latList = cellInfoList.map(cellInfo => cellInfo.latLng.lat);
      // const lngList = cellInfoList.map(cellInfo => cellInfo.latLng.lng);

      // const distance = calcCrow(Math.max(...latList), Math.max(...lngList), Math.min(...latList), Math.min(...lngList));

      // const zoomLevel = calculateZoomLevel(1280, 80, sumLatitude / cellInfoList.length, distance, 15, 0);

      const mapOptions = {
        // zoom: cellInfoList.length ? zoomLevel : 13,
        zoom: 14,
        center: cellInfoList.length
          ? selectedCellCoord
            ? new google.maps.LatLng(selectedCellCoord?.lat, selectedCellCoord?.lng)
            : new google.maps.LatLng(
                cellInfoList[cellInfoList.length - 1].latLng.lat,
                cellInfoList[cellInfoList.length - 1].latLng.lng
              )
          : coord,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

      const journey = cellInfoList.map(cellInfo => cellInfo.latLng);

      const journeyPath = new google.maps.Polyline({
        path: journey,
        geodesic: true,
        strokeColor: '#9c5eff',
        strokeOpacity: 1.0,
        strokeWeight: 5,
      });

      const icon = {
        accomodation: '/assets/images/map/map-marker-accomodation.png',
        sightseeing: '/assets/images/map/map-marker-seesight.png',
        transportation: '/assets/images/map/map-marker-traffic.png',
        etc: '/assets/images/map/map-marker-etc.png',
      };

      cellInfoList.forEach(
        coord =>
          new google.maps.Marker({
            position: coord.latLng,
            icon: icon[coord.type],
            map,
          })
      );

      journeyPath.setMap(map);
      // 초기화
      // selectedCellCoord = null;
      // store.state.localMap.isMapInitial = false;
      // render();
    };
    const failure = () => {
      // console.log('Fail to load Google Map');
    };
    await geolocation.getCurrentPosition(success, failure);
  })();
};

const moveMapCenter = e => {
  if (e.target.matches('.time-table__day-index__blank .itinerary-card--delete')) return;

  const type = window.location.pathname.includes('trip-planner-edit') ? 'tripSchedule' : 'viewTripSchedule';

  const {
    [type]: { itinerary },
  } = _store_store_js__WEBPACK_IMPORTED_MODULE_0__["default"].state;

  const selectedItineraryId = +e.target.closest('.time-table__day-index__blank').dataset.id;
  const { id } = e.target.closest('.itinerary-card').dataset;

  const [{ cells }] = itinerary.filter(iti => iti.id === +selectedItineraryId);
  // prettier-ignore
  const [{ location: { latLng }, },] = cells.filter(cell => cell.id === +id);

  selectedCellCoord = latLng;
  initMap(type);
};




/***/ }),

/***/ "./client/src/core/Component.js":
/*!**************************************!*\
  !*** ./client/src/core/Component.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_eventBuffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/eventBuffer.js */ "./client/src/dom/eventBuffer.js");
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store.js */ "./client/src/store/store.js");
/* eslint-disable no-continue */




class Component {
  constructor(props) {
    this.props = props;
    this.keepEvent();
    _store_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].state.localCommon.path === window.location.pathname || this.init();
  }

  init() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    console.log(this.state);
    (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  }

  render() {
    throw new Error('render 메서드는 구현해야합니다.');
  }

  keepEvent() {
    const events = this.addEventListener?.();
    if (!events) return;

    for (const event of events) {
      if (event.selector === 'window' || event.selector === null) {
        const same = _dom_eventBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"].events.find(
          ({ type, selector, component }) =>
            type === event.type && selector === event.selector && component === event.component
        );

        if (same === undefined) {
          _dom_eventBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"].events = event;
        }
        continue;
      }

      const same = _dom_eventBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"].events.find(
        ({ type, selector, component }) =>
          type === event.type && selector === event.selector && component === event.component
      );
      // console.log(same);
      if (same === undefined) {
        const { selector, handler } = event;
        // console.log(event);

        event.handler = e => {
          if (e.target.matches(selector) || e.target.closest(selector)) handler(e);
        };
        _dom_eventBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"].events = event;
      }
    }
    // console.log(events);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ }),

/***/ "./client/src/core/router.js":
/*!***********************************!*\
  !*** ./client/src/core/router.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _component_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/index.js */ "./client/src/component/index.js");

// import observe from './observe.js';

const router = [
  {
    '/': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.Intro,
  },
  {
    '/main': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.Main,
  },
  {
    '/signin': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.Signin,
  },
  {
    '/signup': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.Signup,
  },
  {
    '/itinerary': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.Itinerary,
  },
  {
    '/trip-planner-edit': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.EditTripPlanner,
  },
  {
    '/trip-planner-view': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.ViewTripPlanner,
  },
  {
    '/mypage': _component_index_js__WEBPACK_IMPORTED_MODULE_0__.Mypage,
  },
];

// window.addEventListener('historyChange', observe);

// 현재 path에 따라 어떤 domString 할지 보여주도록 하는 함수
const routes = () => {
  const location = window.location.pathname;

  const path = location.split('/').slice(0, 2).join('/');

  const [same] = Object.values(router.find(route => route[path]));

  if (same) {
    const Component = same;
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'instant',
    // });
    return new Component().render();
  }
};




/***/ }),

/***/ "./client/src/dom/applyDiff.js":
/*!*************************************!*\
  !*** ./client/src/dom/applyDiff.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const updateDOM = (parentNode, realNode, virtualNode) => {
  // if (realNode?.classList?.contains('map')) {
  //   console.log(realNode);
  //   return;
  // }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (realNode && !virtualNode) {
    parentNode.removeChild(realNode);
    return;
  }

  if (realNode.nodeType === Node.TEXT_NODE && virtualNode.nodeType === Node.TEXT_NODE) {
    if (realNode.textContent !== virtualNode.textContent) realNode.textContent = virtualNode.textContent;
    return;
  }

  if (realNode.nodeType === Node.COMMENT_NODE || virtualNode.nodeType === Node.COMMENT_NODE) return;

  if (realNode.nodeName !== virtualNode.nodeName) {
    parentNode.insertBefore(virtualNode, realNode);
    parentNode.removeChild(realNode);
    return;
  }

  for (const { name, value } of [...virtualNode.attributes]) {
    if (!realNode.hasAttribute(name) || realNode.getAttribute(name) !== value) {
      realNode.setAttribute(name, value);
    }
  }

  for (const { name } of [...realNode.attributes]) {
    if (!virtualNode.hasAttribute(name)) realNode.removeAttribute(name);
  }

  ['checked', 'value', 'selected'].forEach(key => {
    if (realNode[key] !== undefined && virtualNode[key] !== undefined && realNode[key] !== virtualNode[key]) {
      realNode[key] = virtualNode[key];
    }
  });

  applyDiff(realNode, virtualNode);
};

const applyDiff = (realDOM, virtualDOM) => {
  const [realNodes, virtualNodes] = [[...realDOM.childNodes], [...virtualDOM.childNodes]];
  const max = Math.max(realNodes.length, virtualNodes.length);

  for (let i = 0; i < max; i++) {
    updateDOM(realDOM, realNodes[i], virtualNodes[i]);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyDiff);


/***/ }),

/***/ "./client/src/dom/eventBuffer.js":
/*!***************************************!*\
  !*** ./client/src/dom/eventBuffer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const eventBuffer = {
  _eventsBuffer: [],
  get events() {
    return this._eventsBuffer;
  },
  set events(event) {
    this._eventsBuffer.push(event);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventBuffer);


/***/ }),

/***/ "./client/src/dom/render.js":
/*!**********************************!*\
  !*** ./client/src/dom/render.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _applyDiff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyDiff.js */ "./client/src/dom/applyDiff.js");
/* harmony import */ var _eventBuffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventBuffer.js */ "./client/src/dom/eventBuffer.js");



let $root = null; // root container
let rootComponentInstance = null; // root component's instance

const bindEventHandler = $root => {
  for (const { type, selector, handler } of _eventBuffer_js__WEBPACK_IMPORTED_MODULE_1__["default"].events) {
    (selector === 'window' ? window : $root).addEventListener(type, handler);
  }
};

const render = (RootComponent, $container) => {
  if ($container) $root = $container;
  if (RootComponent) rootComponentInstance = new RootComponent();

  const $virtual = $root.cloneNode();
  const domString = rootComponentInstance.render();
  $virtual.innerHTML = domString;

  (0,_applyDiff_js__WEBPACK_IMPORTED_MODULE_0__["default"])($root, $virtual);
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'instant',
  // });
  bindEventHandler($root);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);


/***/ }),

/***/ "./client/src/store/authStore.js":
/*!***************************************!*\
  !*** ./client/src/store/authStore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initValue": () => (/* binding */ initValue),
/* harmony export */   "isChecked": () => (/* binding */ isChecked),
/* harmony export */   "signinSchema": () => (/* binding */ signinSchema),
/* harmony export */   "signupSchema": () => (/* binding */ signupSchema),
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");


const signinSchema = {
  email: {
    value: '',
    get isValid() {
      return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.value);
    },
    error: '이메일 형식에 맞게 입력해 주세요.',
  },
  password: {
    value: '',
    get isValid() {
      return /^[A-Za-z0-9]{6,12}$/.test(this.value);
    },
    error: '영문 또는 숫자를 6~12자 입력하세요.',
  },
  get isValid() {
    return this.email.isValid && this.password.isValid;
  },
  serverError: '',
};

const signupSchema = {
  ...signinSchema,
  username: {
    value: '',
    get isValid() {
      return /^[가-힣]{2,}$/.test(this.value);
    },
    error: '한글 2글자 이상 입력해주세요.',
  },
  nickname: {
    value: '',
    get isValid() {
      return /^[A-Za-z0-9가-힣]{2,}$/.test(this.value);
    },
    error: '한글, 영문, 숫자 2글자 이상 입력해주세요.',
  },
  passwordCheck: {
    value: '',
    get isValid() {
      return signupSchema.password.value === this.value;
    },
    error: '비밀번호가 일치하지 않습니다.',
  },
  checked: {
    privacy: false,
    term: false,
    error: '위의 약관에 동의해주세요.',
    get isValid() {
      return signupSchema.checked.privacy && signupSchema.checked.term;
    },
  },
  serverError: '',

  get isValid() {
    return (
      this.email.isValid &&
      this.password.isValid &&
      this.passwordCheck.isValid &&
      this.nickname.isValid &&
      this.username.isValid &&
      this.checked.isValid
    );
  },
};

const isChecked = e => {
  const { name } = e.target;
  signupSchema.checked[name] = e.target.checked;

  (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
};

const validate = e => {
  const { name } = e.target;

  signupSchema[name].value = e.target.value;
  if (name === 'email') {
    signupSchema.serverError = '';
  }

  (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
};

const initValue = () => {
  signinSchema.email.value = '';
  signinSchema.password.value = '';
  signinSchema.serverError = '';
  signupSchema.username.value = '';
  signupSchema.nickname.value = '';
  signupSchema.passwordCheck.value = '';
  signupSchema.checked.privacy = false;
  signupSchema.checked.term = false;
  signupSchema.serverError = '';
};




/***/ }),

/***/ "./client/src/store/store.js":
/*!***********************************!*\
  !*** ./client/src/store/store.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/render.js */ "./client/src/dom/render.js");


const store = {
  _store: {
    localCommon: {
      path: '',
      isShowModal: '',
      selectedTab: 'chart',
    },
    localMain: {
      selectedCardId: 0,
      category: 'title',
      keyword: '',
    },
    localMap: {
      isMapInitial: true,
    },
    localItinerary: {
      currentId: '',
      startId: 0,
      dragTarget: '',
      isShowNewScheuleCellBtn: false,
    },
    localNewTripSchedule: {
      isFilledAllModalInput: false,
      isActiveSelfNumberOfPeopleInputForm: false,
    },
    localNewScheduleCell: {
      editCellId: null,
      selectedItineraryId: '',
      info: {
        type: '',
        startTime: '',
        endTime: '',
        location: '',
        memo: '',
        todos: [],
      },
    },
    localDatePicker: {
      activeCalendar: '',
      currentDate: new Date(),
    },
    userInfo: {
      userId: null,
      email: '',
      name: '',
      nickname: '',
      profilePic: '',
    },
    tripSchedule: {
      tripScheduleId: 0,
      authorId: '',
      author: '',
      authorProfilePic: '',
      title: '',
      summary: '', // TODO: 어떻게 보여줄지, 관리 포인트를 줄이기위해 없애는게 맞아보임
      tripDays: 0,
      startDate: null, // * Date 객체
      endDate: null, // * Date 객체
      createdDate: new Date(),
      numberOfPeople: 0,
      coverImg: '',
      content: '',
      isLiked: false,
      likeCount: 0,
      commentCount: 0,
      itinerary: [],
    },
    viewTripSchedule: {
      tripScheduleId: 0,
      authorId: '',
      author: '',
      authorProfilePic: '',
      title: '',
      summary: '', // TODO: 어떻게 보여줄지, 관리 포인트를 줄이기위해 없애는게 맞아보임
      tripDays: 0,
      startDate: null, // * Date 객체
      endDate: null, // * Date 객체
      createdDate: null,
      numberOfPeople: 0,
      coverImg: '',
      content: '',
      isLiked: false,
      likeCount: 0,
      commentCount: 0,
      itinerary: [],
    },
    tripSchedules: [],
  },
  get state() {
    return this._store;
  },
  set state(newState) {
    this._store = { ...this._store, ...newState };
    // console.log('store');
    (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  },

  clearState() {
    this.state = {
      localCommon: {
        path: '',
        isShowModal: '',
        selectedTab: 'chart',
      },
      localMain: {
        selectedCardId: 0,
      },
      localMap: {
        isMapInitial: true,
      },
      localItinerary: {
        currentId: '',
        startId: 0,
        dragTarget: '',
        isShowNewScheuleCellBtn: false,
      },
      localNewTripSchedule: {
        isFilledAllModalInput: false,
        isActiveSelfNumberOfPeopleInputForm: false,
      },
      localNewScheduleCell: {
        editCellId: null,
        selectedItineraryId: '',
        info: {
          type: '',
          startTime: '',
          endTime: '',
          location: '',
          memo: '',
          todos: [],
        },
      },
      localDatePicker: {
        activeCalendar: '',
        currentDate: new Date(),
      },
      userInfo: {
        userId: null,
        email: '',
        name: '',
        nickname: '',
        profilePic: '',
      },
      tripSchedule: {
        tripScheduleId: 0,
        authorId: '',
        author: '',
        authorProfilePic: '',
        title: '',
        summary: '', // TODO: 어떻게 보여줄지, 관리 포인트를 줄이기위해 없애는게 맞아보임
        tripDays: 0,
        startDate: null, // * Date 객체
        endDate: null, // * Date 객체
        createdDate: new Date(),
        numberOfPeople: 0,
        coverImg: '',
        content: '',
        isLiked: false,
        likeCount: 0,
        commentCount: 0,
        itinerary: [],
      },
      // viewTripSchedule: {
      //   tripScheduleId: 0,
      //   authorId: '',
      //   author: '',
      //   authorProfilePic: '',
      //   title: '',
      //   summary: '', // TODO: 어떻게 보여줄지, 관리 포인트를 줄이기위해 없애는게 맞아보임
      //   tripDays: 0,
      //   startDate: null, // * Date 객체
      //   endDate: null, // * Date 객체
      //   createdDate: null,
      //   numberOfPeople: 0,
      //   coverImg: '',
      //   content: '',
      //   isLiked: false,
      //   likeCount: 0,
      //   commentCount: 0,
      //   itinerary: [],
      // },
      tripSchedules: [],
    };
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./client/css/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./client/css/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/plus-solid.svg */ "./client/assets/images/plus-solid.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/close.svg */ "./client/assets/images/close.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/angle-left-solid.svg */ "./client/assets/images/angle-left-solid.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/iconCamera.svg */ "./client/assets/images/iconCamera.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/calendar-dark.svg */ "./client/assets/images/calendar-dark.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/select_arrow.svg */ "./client/assets/images/select_arrow.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/calendar.svg */ "./client/assets/images/calendar.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/select_time.svg */ "./client/assets/images/select_time.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/add_todo.svg */ "./client/assets/images/add_todo.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/checkbox_on.svg */ "./client/assets/images/checkbox_on.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/checkbox_off.svg */ "./client/assets/images/checkbox_off.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/newPost_camera.svg */ "./client/assets/images/newPost_camera.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/post-edit.svg */ "./client/assets/images/post-edit.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/cancel.svg */ "./client/assets/images/cancel.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/comment-add.svg */ "./client/assets/images/comment-add.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/recomment-add.svg */ "./client/assets/images/recomment-add.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../client/assets/images/recomment-arrow.svg */ "./client/assets/images/recomment-arrow.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Accessibility Styles */\r\n.a11yHidden,\r\nlegend {\r\n  overflow: hidden;\r\n  position: absolute !important;\r\n  clip: rect(0, 0, 0, 0);\r\n  -webkit-clip-path: inset(50%);\r\n  clip-path: inset(50%);\r\n  width: 1px;\r\n  height: 1px;\r\n  margin: -1px;\r\n}\r\n\r\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\nhtml {\r\n  line-height: 1.15;\r\n  -webkit-text-size-adjust: 100%;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\nmain {\r\n  display: block;\r\n}\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\nhr {\r\n  box-sizing: content-box;\r\n  height: 0;\r\n  overflow: visible;\r\n}\r\n\r\npre {\r\n  font-family: monospace, monospace;\r\n  font-size: 1em;\r\n}\r\n\r\na {\r\n  background-color: transparent;\r\n}\r\n\r\nabbr[title] {\r\n  border-bottom: none;\r\n  text-decoration: underline;\r\n  -webkit-text-decoration: underline dotted;\r\n  text-decoration: underline dotted;\r\n}\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n  font-family: monospace, monospace;\r\n  font-size: 1em;\r\n}\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  font-family: inherit;\r\n  font-size: 100%;\r\n  line-height: 1.15;\r\n  margin: 0;\r\n}\r\n\r\nbutton,\r\ninput {\r\n  overflow: visible;\r\n}\r\n\r\nbutton,\r\nselect {\r\n  text-transform: none;\r\n  /* for Firefox */\r\n  -moz-appearance: none;\r\n  /* for Chrome */\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/* For IE10 */\r\nselect::-ms-expand {\r\n  display: none;\r\n}\r\n\r\nbutton,\r\n[type=button],\r\n[type=reset],\r\n[type=submit] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\nbutton::-moz-focus-inner,\r\n[type=button]::-moz-focus-inner,\r\n[type=reset]::-moz-focus-inner,\r\n[type=submit]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\nbutton:-moz-focusring,\r\n[type=button]:-moz-focusring,\r\n[type=reset]:-moz-focusring,\r\n[type=submit]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\nfieldset {\r\n  padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\nlegend {\r\n  box-sizing: border-box;\r\n  color: inherit;\r\n  display: table;\r\n  max-width: 100%;\r\n  padding: 0;\r\n  white-space: normal;\r\n}\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n[type=checkbox],\r\n[type=radio] {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n}\r\n\r\n[type=number]::-webkit-inner-spin-button,\r\n[type=number]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n[type=search] {\r\n  -webkit-appearance: textfield;\r\n  outline-offset: -2px;\r\n}\r\n\r\n[type=search]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button;\r\n  font: inherit;\r\n}\r\n\r\ndetails {\r\n  display: block;\r\n}\r\n\r\nsummary {\r\n  display: list-item;\r\n}\r\n\r\ntemplate {\r\n  display: none;\r\n}\r\n\r\n[hidden] {\r\n  display: none;\r\n}\r\n\r\nhtml,\r\nbody,\r\ndiv,\r\nspan,\r\napplet,\r\nobject,\r\niframe,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\np,\r\nblockquote,\r\npre,\r\na,\r\nabbr,\r\nacronym,\r\naddress,\r\nbig,\r\ncite,\r\ncode,\r\ndel,\r\ndfn,\r\nem,\r\nimg,\r\nins,\r\nkbd,\r\nq,\r\ns,\r\nsamp,\r\nsmall,\r\nstrike,\r\nstrong,\r\nsub,\r\nsup,\r\ntt,\r\nvar,\r\nb,\r\nu,\r\ni,\r\ncenter,\r\ndl,\r\ndt,\r\ndd,\r\nol,\r\nul,\r\nli,\r\nfieldset,\r\nform,\r\nlabel,\r\nlegend,\r\ntable,\r\ncaption,\r\ntbody,\r\ntfoot,\r\nthead,\r\ntr,\r\nth,\r\ntd,\r\narticle,\r\naside,\r\ncanvas,\r\ndetails,\r\nembed,\r\nfigure,\r\nfigcaption,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmenu,\r\nnav,\r\noutput,\r\nruby,\r\nsection,\r\nsummary,\r\ntime,\r\nmark,\r\naudio,\r\nvideo {\r\n  margin: 0;\r\n  padding: 0;\r\n  border: 0;\r\n  font-size: 100%;\r\n  font: inherit;\r\n  vertical-align: baseline;\r\n}\r\n\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmenu,\r\nnav,\r\nsection {\r\n  display: block;\r\n}\r\n\r\nbody {\r\n  line-height: 1;\r\n}\r\n\r\nol,\r\nul {\r\n  list-style: none;\r\n}\r\n\r\nblockquote,\r\nq {\r\n  quotes: none;\r\n}\r\n\r\nblockquote:before,\r\nblockquote:after {\r\n  content: \"\";\r\n  content: none;\r\n}\r\n\r\nq:before,\r\nq:after {\r\n  content: \"\";\r\n  content: none;\r\n}\r\n\r\ntable {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n}\r\n\r\nbody,\r\nbody::before,\r\nbody::after,\r\nbody *,\r\nbody *::before,\r\nbody *::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n[class] {\r\n  margin: 0;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  text-decoration: none;\r\n}\r\n\r\nbody {\r\n  font: inherit;\r\n  font-family: \"Spoqa Han Sans Neo\", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, \"Helvetica Neue\", \"Segoe UI\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", \"Malgun Gothic\", \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif, \"sans-serif\";\r\n  background-color: #fff;\r\n}\r\n\r\n#root {\r\n  width: 100%;\r\n}\r\n\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.displayNone {\r\n  display: none;\r\n}\r\n\r\n.header {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  z-index: 1;\r\n  min-width: 1280px;\r\n  background: #ffffff;\r\n  box-shadow: 0px 4px 30px rgba(156, 156, 156, 0.25);\r\n  padding: 16px 0px;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n}\r\n.nav__list {\r\n  display: flex;\r\n  align-items: center;\r\n  height: 45px;\r\n}\r\n.nav__list__profile-pic {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n}\r\n.nav__item {\r\n  display: flex;\r\n  justify-content: center;\r\n  width: 90px;\r\n}\r\n.nav__item.active {\r\n  font-weight: bold;\r\n}\r\n\r\nfooter {\r\n  width: 100%;\r\n  padding: 18px 0;\r\n  font-size: 14px;\r\n  text-align: center;\r\n  color: #f8f8f8;\r\n  background-color: #000000;\r\n}\r\n\r\n.map {\r\n  width: 1280px;\r\n  height: 454px;\r\n  margin-top: 300px;\r\n  background: #d9d9d9;\r\n  margin: 0 auto;\r\n}\r\n\r\n.carousel__itinerary__container {\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.carousel {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 60px;\r\n  padding-left: 65px;\r\n  background: #000000;\r\n  opacity: 1;\r\n}\r\n.carousel__days {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n}\r\n.carousel__days .carousel-slides {\r\n  --currentSlide: 0;\r\n  --duration: 0;\r\n  display: flex;\r\n  transition: transform calc(var(--duration) * 1ms) ease-out;\r\n  transform: translate3D(calc(var(--currentSlide) * -100%), 0, 0);\r\n}\r\n.carousel__days__add--list {\r\n  position: absolute;\r\n  top: 40px;\r\n  left: 80px;\r\n  width: 130px;\r\n  height: auto;\r\n  border: 1px solid #9a9a9a;\r\n  border-radius: 3px;\r\n  background: #ffffff;\r\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\r\n  z-index: 99;\r\n  text-align: center;\r\n}\r\n.carousel__days__add--list .first-item {\r\n  border-radius: 3px 3px 0 0;\r\n}\r\n.carousel__days__add--item {\r\n  padding: 15px;\r\n  font-size: 14px;\r\n  color: #6a6a6a;\r\n}\r\n.carousel__days__add--item:hover {\r\n  background: #d1b4ff;\r\n  color: #000000;\r\n}\r\n.carousel--btn {\r\n  position: absolute;\r\n  top: 50%;\r\n  z-index: 99;\r\n  border: none;\r\n  font-size: 20px;\r\n  font-weight: 700;\r\n  background: none;\r\n  color: #ffffff;\r\n  cursor: pointer;\r\n  transform: translate3d(0, -50%, 0);\r\n}\r\n.carousel .prev--btn {\r\n  left: 65px;\r\n}\r\n.carousel .next--btn {\r\n  right: 25px;\r\n}\r\n.carousel__day-index {\r\n  position: relative;\r\n  width: 395px;\r\n  color: #ffffff;\r\n  text-align: center;\r\n  flex-shrink: 0;\r\n  padding-top: 10px;\r\n}\r\n.carousel__day-index--add {\r\n  border: 1px solid #9c5eff;\r\n  border-radius: 50%;\r\n  color: #9c5eff;\r\n  cursor: pointer;\r\n  margin-right: 4px;\r\n  width: 20px;\r\n  height: 20px;\r\n  padding: 0;\r\n  line-height: 21px;\r\n  background: #ffffff url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\r\n  background-position: center;\r\n  background-size: 10px;\r\n}\r\n\r\n.time-table {\r\n  --time--height: 62;\r\n  position: relative;\r\n  width: 100%;\r\n  height: calc(var(--time--height) * 24px + 25px);\r\n  padding-left: 65px;\r\n}\r\n.time-table__times {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: -1;\r\n  padding-left: 65px;\r\n  padding-top: 25px;\r\n  width: 100%;\r\n  height: 100%;\r\n  font-size: 14px;\r\n}\r\n.time-table__time {\r\n  position: absolute;\r\n  left: -50px;\r\n  top: -9px;\r\n}\r\n.time-table__time-item {\r\n  position: relative;\r\n  height: calc(var(--time--height) * 1px);\r\n  color: #9a9a9a;\r\n  width: 100%;\r\n}\r\n.time-table__time-item .line {\r\n  display: block;\r\n  width: 100%;\r\n  height: 1px;\r\n  background: #d9d9d9;\r\n}\r\n.time-table__day-index {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n}\r\n.time-table__day-index__blank {\r\n  width: 405px;\r\n  height: 100%;\r\n  padding-top: 25px;\r\n  left: 65px;\r\n  border-left: 1px solid #d9d9d9;\r\n}\r\n.time-table__day-index__blank:last-child {\r\n  border-right: 1px solid #d9d9d9;\r\n}\r\n.time-table__day-index__blank:nth-child(3n) {\r\n  border-right: 0;\r\n}\r\n.time-table__day-index__blank li {\r\n  position: relative;\r\n  width: 100%;\r\n  height: calc(var(--time--height) * 1px);\r\n}\r\n.time-table__day-index__blank li.first {\r\n  z-index: 1;\r\n}\r\n.time-table__day-index__blank li.first .itinerary-card {\r\n  position: relative;\r\n  border-radius: 6px 6px 0 0;\r\n}\r\n.time-table__day-index__blank li.first .itinerary-card-emph {\r\n  border-radius: 6px 0 0 0;\r\n}\r\n.time-table__day-index__blank li.last {\r\n  padding-bottom: 2px;\r\n}\r\n.time-table__day-index__blank li.last .itinerary-card {\r\n  position: relative;\r\n  border-radius: 0 0 6px 6px;\r\n}\r\n.time-table__day-index__blank li.last .itinerary-card-emph {\r\n  height: 100%;\r\n  border-radius: 0 0 0 6px;\r\n}\r\n.time-table__day-index__blank li.first-last {\r\n  z-index: 1;\r\n  padding-bottom: 2px;\r\n}\r\n.time-table__day-index__blank li.first-last .itinerary-card {\r\n  position: relative;\r\n  border-radius: 6px;\r\n}\r\n.time-table__day-index__blank li.first-last .itinerary-card-emph {\r\n  height: 100%;\r\n  border-radius: 6px 0 0 6px;\r\n}\r\n.time-table__day-index__blank li.first-last .itinerary-card--check__memo {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n}\r\n.time-table__day-index__blank .itinerary-card {\r\n  padding-top: 8px;\r\n  height: 100%;\r\n}\r\n.time-table__day-index__blank .itinerary-card--check {\r\n  width: 100%;\r\n  align-items: center;\r\n}\r\n.time-table__day-index__blank .itinerary-card--check__title {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  width: 100%;\r\n  padding-left: 25px;\r\n  padding-right: 10px;\r\n  font-weight: 700;\r\n}\r\n.time-table__day-index__blank .itinerary-card--check__memo {\r\n  padding-left: 25px;\r\n  font-size: 14px;\r\n  word-break: break-all;\r\n}\r\n.time-table__day-index__blank .itinerary-card--add {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 50%;\r\n  transform: translate3d(-50%, 0, 0);\r\n  border: 1px solid #9c5eff;\r\n  border-radius: 50%;\r\n  background: #9c5eff;\r\n  color: #ffffff;\r\n  cursor: pointer;\r\n}\r\n.time-table__day-index__blank .itinerary-card--delete {\r\n  position: absolute;\r\n  right: -6px;\r\n  top: -14px;\r\n  z-index: 2;\r\n  width: 28px;\r\n  height: 28px;\r\n  border-radius: 50%;\r\n  border: 0;\r\n  background: #000000 url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\r\n  background-position: center;\r\n  background-size: 10px;\r\n}\r\n.time-table__day-index__blank .itinerary-card-emph {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 10px;\r\n  height: 100%;\r\n}\r\n.time-table__day-index__blank .accomodation.itinerary-card {\r\n  background: #bde9f9;\r\n}\r\n.time-table__day-index__blank .accomodation.itinerary-card .itinerary-card--check__title,\r\n.time-table__day-index__blank .accomodation.itinerary-card .itinerary-card--check__memo {\r\n  color: #5e9ceb;\r\n}\r\n.time-table__day-index__blank .accomodation.itinerary-card .itinerary-card-emph {\r\n  background: #5e9ceb;\r\n}\r\n.time-table__day-index__blank .transportation.itinerary-card {\r\n  background: #ffd6cd;\r\n}\r\n.time-table__day-index__blank .transportation.itinerary-card .itinerary-card--check__title,\r\n.time-table__day-index__blank .transportation.itinerary-card .itinerary-card--check__memo {\r\n  color: #e95740;\r\n}\r\n.time-table__day-index__blank .transportation.itinerary-card .itinerary-card-emph {\r\n  background: #e95740;\r\n}\r\n.time-table__day-index__blank .sightseeing.itinerary-card {\r\n  background: #d1ecb4;\r\n}\r\n.time-table__day-index__blank .sightseeing.itinerary-card .itinerary-card--check__title,\r\n.time-table__day-index__blank .sightseeing.itinerary-card .itinerary-card--check__memo {\r\n  color: #7ab13c;\r\n}\r\n.time-table__day-index__blank .sightseeing.itinerary-card .itinerary-card-emph {\r\n  background: #7ab13c;\r\n}\r\n.time-table__day-index__blank .etc.itinerary-card {\r\n  background: #fee5a5;\r\n}\r\n.time-table__day-index__blank .etc.itinerary-card .itinerary-card--check__title,\r\n.time-table__day-index__blank .etc.itinerary-card .itinerary-card--check__memo {\r\n  color: #feb625;\r\n}\r\n.time-table__day-index__blank .etc.itinerary-card .itinerary-card-emph {\r\n  background: #feb625;\r\n}\r\n\r\n.itinerary-btns {\r\n  padding: 60px 0;\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.itinerary-btns--private {\r\n  border: none;\r\n  border-radius: 6px;\r\n  background: #9c5eff;\r\n  width: 630px;\r\n  height: 54px;\r\n  color: #ffffff;\r\n}\r\n\r\n.itinerary-btns--public {\r\n  background: none;\r\n  border: 2px solid #9c5eff;\r\n  border-radius: 6px;\r\n  width: 630px;\r\n  height: 54px;\r\n}\r\n\r\n.itinerary-btns--public:hover {\r\n  background: #9c5eff;\r\n  color: #ffffff;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.dimmed__layer {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  background: rgba(0, 0, 0, 0.4);\r\n  z-index: 10;\r\n}\r\n.dimmed__layer .modal {\r\n  background: #ffffff;\r\n}\r\n.dimmed__layer .modal__header {\r\n  position: relative;\r\n  padding: 17px 0;\r\n  border-bottom: 1px solid #d9d9d9;\r\n}\r\n.dimmed__layer .modal__header__title {\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n  color: #000000;\r\n  text-align: center;\r\n}\r\n.dimmed__layer .modal__header__close__btn {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 60px;\r\n  height: 60px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\r\n  background-position: center;\r\n  background-size: 16px;\r\n}\r\n\r\n.dimmed__layer.hide {\r\n  display: none;\r\n}\r\n\r\n.calendar {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 60px;\r\n  z-index: 10000;\r\n  border-radius: 8px;\r\n  border: 1px solid #f8f8f8;\r\n  box-shadow: 0 0 10px 0 rgba(156, 156, 156, 0.25);\r\n  background: #ffffff;\r\n}\r\n.calendar__header {\r\n  position: relative;\r\n  padding: 15px;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n.calendar__header::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 15px;\r\n  bottom: 0;\r\n  width: calc(100% - 30px);\r\n  height: 1px;\r\n  background: #f8f8f8;\r\n}\r\n.calendar__header strong {\r\n  flex: 1;\r\n  font-weight: bold;\r\n  font-size: 16px;\r\n}\r\n.calendar__header button {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  text-indent: -9999px;\r\n  overflow: hidden;\r\n  width: 30px;\r\n  height: 30px;\r\n  opacity: 0.8;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") no-repeat;\r\n  background-size: 10px;\r\n  background-position: center;\r\n}\r\n.calendar__header button:last-child {\r\n  transform: rotate(180deg);\r\n}\r\n.calendar__contents {\r\n  padding: 10px;\r\n}\r\n.calendar__week__list {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n.calendar__week__item {\r\n  width: 40px;\r\n  text-align: center;\r\n  font-weight: bold;\r\n  font-size: 14px;\r\n  color: #252525;\r\n  line-height: 40px;\r\n  text-transform: uppercase;\r\n}\r\n.calendar__dates__list {\r\n  display: flex;\r\n  flex-flow: row wrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n}\r\n.calendar__dates__item {\r\n  width: 40px;\r\n  height: 40px;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  line-height: 40px;\r\n}\r\n.calendar__dates__item.prev-month, .calendar__dates__item.next-month {\r\n  color: #6a6a6a;\r\n}\r\n.calendar__dates__item.unable {\r\n  color: #d9d9d9;\r\n}\r\n.calendar__dates__item.unable:hover {\r\n  color: #d9d9d9;\r\n  background: transparent;\r\n  cursor: auto;\r\n}\r\n.calendar__dates__item.start-date {\r\n  color: #6a6a6a;\r\n  border-radius: 50%;\r\n  background: #d1ecb4;\r\n  cursor: pointer;\r\n}\r\n.calendar__dates__item.trip-date {\r\n  color: #6a6a6a;\r\n  background: #fee5a5;\r\n  cursor: pointer;\r\n}\r\n.calendar__dates__item.end-date {\r\n  color: #6a6a6a;\r\n  border-radius: 50%;\r\n  background: #ffd6cd;\r\n  cursor: pointer;\r\n}\r\n.calendar__dates__item.today {\r\n  color: #d1b4ff;\r\n  font-weight: 700;\r\n  border-radius: 50%;\r\n}\r\n.calendar__dates__item.today:hover {\r\n  color: #d1b4ff;\r\n  background: transparent;\r\n}\r\n.calendar__dates__item:hover {\r\n  color: #ffffff;\r\n  border-radius: 50%;\r\n  background: #d1b4ff;\r\n  cursor: pointer;\r\n}\r\n\r\n.calendar.hide {\r\n  display: none;\r\n}\r\n\r\n.hot-topic__item {\r\n  position: relative;\r\n  width: 400px;\r\n  height: 240px;\r\n  border-radius: 8px;\r\n  box-shadow: 0px 4px 10px rgb(213, 213, 213);\r\n}\r\n.hot-topic__item__thumbnail__icon {\r\n  position: absolute;\r\n  top: 24px;\r\n  left: 24px;\r\n}\r\n.hot-topic__item__thumbnail__video {\r\n  width: 400px;\r\n  height: 240px;\r\n  object-fit: cover;\r\n  border-radius: 8px;\r\n}\r\n.hot-topic__item__detail {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 400px;\r\n  height: 72px;\r\n  color: #ffffff;\r\n  padding: 16px;\r\n  background: rgba(0, 0, 0, 0.4);\r\n  border-radius: 0 0 8px 8px;\r\n}\r\n.hot-topic__item__detail__title {\r\n  font-weight: 700;\r\n  margin-bottom: 8px;\r\n}\r\n.hot-topic__item__detail__desc {\r\n  font-size: 14px;\r\n}\r\n.hot-topic__item:hover {\r\n  opacity: 0.75;\r\n}\r\n\r\n.travel-log__item {\r\n  position: relative;\r\n  background: #d1b4ff;\r\n  width: 400px;\r\n  height: 488px;\r\n  box-shadow: 0px 4px 10px rgb(213, 213, 213);\r\n  border-radius: 8px;\r\n  margin-bottom: 20px;\r\n}\r\n.travel-log__item__top-section {\r\n  width: 400px;\r\n  height: 288px;\r\n  background: #9c5eff no-repeat center/cover;\r\n  border-radius: 8px 8px 0 0;\r\n}\r\n.travel-log__item__user-info {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  height: 48px;\r\n}\r\n.travel-log__item__user-info__profile-pic {\r\n  width: 32px;\r\n  height: 32px;\r\n  margin: 0 16px;\r\n  border-radius: 50%;\r\n}\r\n.travel-log__item__user-info__nickname {\r\n  font-size: 16px;\r\n  color: #ffffff;\r\n}\r\n.travel-log__item__main {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 256px;\r\n  text-align: center;\r\n}\r\n.travel-log__item__main__title {\r\n  font-size: 32px;\r\n  color: #ffffff;\r\n  padding: 8px 16px;\r\n}\r\n.travel-log__item__main__detail {\r\n  font-size: 18px;\r\n  color: #ffffff;\r\n  padding: 8px;\r\n}\r\n.travel-log__item__bottom-section {\r\n  width: 400px;\r\n  height: 200px;\r\n  background: #ffffff;\r\n  border-radius: 0px 0px 8px 8px;\r\n}\r\n.travel-log__item__sub {\r\n  padding: 16px;\r\n}\r\n.travel-log__item__sub__title {\r\n  font-size: 18px;\r\n}\r\n.travel-log__item__sub__detail {\r\n  margin-top: 16px;\r\n  font-size: 16px;\r\n  line-height: 22px;\r\n  height: 130px;\r\n  display: -webkit-box;\r\n  -webkit-line-clamp: 6;\r\n  -webkit-box-orient: vertical;\r\n  overflow: hidden;\r\n}\r\n.travel-log__item__social {\r\n  position: absolute;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  left: 6px;\r\n  bottom: 0px;\r\n  padding: 10px;\r\n  color: #9a9a9a;\r\n}\r\n.travel-log__item__like, .travel-log__item__comment {\r\n  margin-right: 8px;\r\n}\r\n.travel-log__item__like__count {\r\n  margin-right: 16px;\r\n}\r\n.travel-log__item:hover {\r\n  opacity: 0.75;\r\n}\r\n\r\n.social__item {\r\n  width: 240px;\r\n  margin: 48px 0;\r\n}\r\n.social__item:hover {\r\n  opacity: 0.75;\r\n}\r\n.social__link {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.profile {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin-top: 96px;\r\n}\r\n.profile--pic {\r\n  position: relative;\r\n}\r\n.profile--pic__img {\r\n  width: 104px;\r\n  height: 104px;\r\n  border-radius: 50%;\r\n}\r\n.profile--pic--edit {\r\n  position: absolute;\r\n  width: 104px;\r\n  height: 104px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") no-repeat center center/50% rgba(0, 0, 0, 0.5);\r\n  border-radius: 50%;\r\n}\r\n.profile--nickname {\r\n  margin-top: 40px;\r\n  font-size: 24px;\r\n}\r\n.profile--id {\r\n  margin-top: 10px;\r\n}\r\n.profile--social {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-top: 24px;\r\n  width: fit-content;\r\n}\r\n.profile--social__follow {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 104px;\r\n  height: 40px;\r\n  border-radius: 8px;\r\n  margin-top: 24px;\r\n}\r\n.profile--social__follow.follow {\r\n  background: #9c5eff;\r\n  color: #ffffff;\r\n}\r\n.profile--social__follow.following {\r\n  color: #252525;\r\n  border: 1px solid #252525;\r\n}\r\n.profile--social__button {\r\n  margin: 0 12px;\r\n}\r\n.profile--social__button.selected {\r\n  border-bottom: 1px solid #252525;\r\n}\r\n.profile--social span {\r\n  margin: 0 4px;\r\n}\r\n\r\n.my-travel-log__link {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n}\r\n.my-travel-log__item {\r\n  background: #ffffff;\r\n  width: 900px;\r\n  height: 196px;\r\n  border-radius: 8px;\r\n  box-shadow: 0px 4px 10px rgb(213, 213, 213);\r\n}\r\n.my-travel-log__item-thumbnail {\r\n  display: flow-root;\r\n  width: 240px;\r\n  height: 196px;\r\n}\r\n.my-travel-log__item-thumbnail__img {\r\n  width: 240px;\r\n  height: 196px;\r\n  border-radius: 8px 0px 0px 8px;\r\n}\r\n.my-travel-log__item__main {\r\n  position: relative;\r\n  padding: 20px 20px;\r\n}\r\n.my-travel-log__item__main__title {\r\n  text-indent: 4px;\r\n  font-weight: 700;\r\n  font-size: 20px;\r\n  margin-bottom: 12px;\r\n}\r\n.my-travel-log__item__main__subtitle {\r\n  font-size: 18px;\r\n  margin-bottom: 8px;\r\n  color: #9a9a9a;\r\n}\r\n.my-travel-log__item__main__desc {\r\n  color: #252525;\r\n}\r\n.my-travel-log__item__main__social {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: flex-start;\r\n  position: absolute;\r\n  margin-top: 12px;\r\n  color: #9a9a9a;\r\n}\r\n.my-travel-log__item__main__social .social-icon:not(:last-child) {\r\n  margin-right: 12px;\r\n}\r\n.my-travel-log__item__main__social svg {\r\n  margin-right: 4px;\r\n}\r\n.my-travel-log__item__button {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: center;\r\n  align-items: stretch;\r\n  width: 240px;\r\n}\r\n.my-travel-log__item__button-edit, .my-travel-log__item__button-delete, .my-travel-log__item__button-like {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 64px;\r\n  height: 32px;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n}\r\n.my-travel-log__item__button-edit, .my-travel-log__item__button-like {\r\n  border: 1px solid #9c5eff;\r\n  margin-bottom: 12px;\r\n}\r\n.my-travel-log__item__button-delete {\r\n  background-color: #9c5eff;\r\n  color: #ffffff;\r\n}\r\n.my-travel-log__item:not(:last-child) {\r\n  margin-bottom: 24px;\r\n}\r\n.my-travel-log__item:hover {\r\n  opacity: 0.75;\r\n}\r\n\r\n.nav__list:last-child {\r\n  position: relative;\r\n}\r\n\r\n.my-page-modal {\r\n  position: absolute;\r\n  top: 46px;\r\n  border: 1px solid #9a9a9a;\r\n  background: #f8f8f8;\r\n  padding: 16px;\r\n  width: 150px;\r\n  border-radius: 8px;\r\n  box-shadow: 0px 4px 10px rgb(213, 213, 213);\r\n}\r\n.my-page-modal__nickname {\r\n  display: inline-block;\r\n  font-size: 18px;\r\n  font-weight: 500;\r\n  margin-bottom: 14px;\r\n  border-bottom: 1px solid #9c5eff;\r\n}\r\n.my-page-modal__list {\r\n  text-align: left;\r\n}\r\n.my-page-modal__item {\r\n  margin: 4px 0;\r\n}\r\n.my-page-modal__link.mypage {\r\n  color: #9c5eff;\r\n  font-weight: 700;\r\n}\r\n.my-page-modal__link.logout {\r\n  font-weight: 700;\r\n}\r\n\r\n.my-page-modal.hide {\r\n  display: none;\r\n}\r\n\r\n.newTrip__popup {\r\n  width: 530px;\r\n}\r\n.newTrip__popup__form {\r\n  position: relative;\r\n  padding: 25px;\r\n}\r\n.newTrip__popup__form__input {\r\n  width: 100%;\r\n  height: 52px;\r\n  margin-top: 28px;\r\n}\r\n.newTrip__popup__form__input:first-child {\r\n  margin-top: 0;\r\n}\r\n.newTrip__popup__form__input input {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 15px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 5px;\r\n  font-size: 16px;\r\n}\r\n.newTrip__popup__form__input.date__form {\r\n  position: relative;\r\n  float: left;\r\n  width: calc(50% - 8px);\r\n  margin-right: 16px;\r\n  margin-bottom: 32px;\r\n}\r\n.newTrip__popup__form__input.date__form:nth-child(3) {\r\n  margin-right: 0;\r\n}\r\n.newTrip__popup__form__input.date__form .datepicker {\r\n  top: 60px;\r\n}\r\n.newTrip__popup__form__input.date__form input {\r\n  padding-right: 40px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") no-repeat;\r\n  background-position: right 18px center;\r\n  background-size: 16px;\r\n}\r\n.newTrip__popup__form__select {\r\n  clear: both;\r\n  width: 100%;\r\n  height: 52px;\r\n}\r\n.newTrip__popup__form__select select {\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 13px 15px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 5px;\r\n  font-size: 16px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") no-repeat;\r\n  background-position: right 18px center;\r\n  background-size: 14px;\r\n}\r\n.newTrip__popup__form .self__input__form {\r\n  position: absolute;\r\n  left: 25px;\r\n  width: 480px;\r\n}\r\n.newTrip__popup__form .self__input__form.hide {\r\n  display: none;\r\n}\r\n.newTrip__popup__form__submit {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 100%;\r\n  height: 52px;\r\n  margin-top: 96px;\r\n  border-radius: 6px;\r\n  background: #6a6a6a;\r\n  font-size: 16px;\r\n  color: #ffffff;\r\n}\r\n.newTrip__popup__form__submit.active {\r\n  background: #9c5eff;\r\n}\r\n\r\n.newCard__popup {\r\n  overflow-y: auto;\r\n  width: 600px;\r\n}\r\n.newCard__popup .datepicker {\r\n  top: 60px;\r\n}\r\n.newCard__popup__form {\r\n  padding: 25px;\r\n}\r\n.newCard__popup__form__container {\r\n  margin-bottom: 20px;\r\n}\r\n.newCard__popup__form__container:last-child {\r\n  margin-bottom: 0;\r\n}\r\n.newCard__popup__form__title {\r\n  margin-bottom: 10px;\r\n  font-size: 16px;\r\n}\r\n.newCard__popup__form .type__list {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  border-radius: 6px;\r\n  border: 1px solid #d9d9d9;\r\n  padding: 15px;\r\n}\r\n.newCard__popup__form .type__item {\r\n  flex: 1;\r\n  margin-right: 10px;\r\n  text-align: center;\r\n}\r\n.newCard__popup__form .type__item:last-child {\r\n  margin-right: 0;\r\n}\r\n.newCard__popup__form .type__item:last-child label {\r\n  margin-right: 0;\r\n}\r\n.newCard__popup__form .type__item input {\r\n  display: none;\r\n}\r\n.newCard__popup__form .type__item label {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 10px;\r\n  border-radius: 6px;\r\n  background: #d9d9d9;\r\n  color: #ffffff;\r\n}\r\n.newCard__popup__form .type__item:first-child input:checked + label {\r\n  background: #bde9f9;\r\n}\r\n.newCard__popup__form .type__item:nth-child(2) input:checked + label {\r\n  background: #d1ecb4;\r\n}\r\n.newCard__popup__form .type__item:nth-child(3) input:checked + label {\r\n  background: #ffd6cd;\r\n}\r\n.newCard__popup__form .type__item:last-child input:checked + label {\r\n  background: #fee5a5;\r\n}\r\n.newCard__popup__form .time__form {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n.newCard__popup__form .time__form__input, .newCard__popup__form .time__form__select {\r\n  position: relative;\r\n  height: 56px;\r\n  border-radius: 6px;\r\n  border: 1px solid #d9d9d9;\r\n}\r\n.newCard__popup__form .time__form__input {\r\n  flex-basis: 200px;\r\n}\r\n.newCard__popup__form .time__form__select {\r\n  flex-basis: 160px;\r\n}\r\n.newCard__popup__form .time__form label {\r\n  position: absolute;\r\n  left: 45px;\r\n  top: 10px;\r\n  font-size: 11px;\r\n  color: #21bcff;\r\n}\r\n.newCard__popup__form .time__form input,\r\n.newCard__popup__form .time__form select {\r\n  appearance: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 6px;\r\n  border: none;\r\n  padding: 25px 15px 11px 45px;\r\n}\r\n.newCard__popup__form .time__form input {\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") no-repeat;\r\n  background-position: left 15px center;\r\n  background-size: 18px;\r\n}\r\n.newCard__popup__form .time__form select {\r\n  background-color: #ffffff;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + "), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n  background-repeat: no-repeat;\r\n  background-position: left 15px center, right 15px center;\r\n  background-size: 18px, 14px;\r\n}\r\n.newCard__popup__form .time__form option:disabled {\r\n  color: #d9d9d9;\r\n}\r\n.newCard__popup__form .location input {\r\n  width: 100%;\r\n  height: 52px;\r\n  padding: 15px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 6px;\r\n}\r\n.newCard__popup__form .memo__container {\r\n  height: 150px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 6px;\r\n  overflow: hidden;\r\n}\r\n.newCard__popup__form .memo__title {\r\n  position: relative;\r\n  width: 100%;\r\n}\r\n.newCard__popup__form .memo__title::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 20px;\r\n  bottom: 0;\r\n  width: calc(100% - 40px);\r\n  height: 1px;\r\n  background: #d9d9d9;\r\n}\r\n.newCard__popup__form .memo__title input {\r\n  appearance: none;\r\n  width: 100%;\r\n  padding: 15px 50px 15px 20px;\r\n  border: none;\r\n  font-size: 16px;\r\n  font-weight: bold;\r\n}\r\n.newCard__popup__form .memo__title__add__todo__btn {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  position: absolute;\r\n  right: 20px;\r\n  top: 50%;\r\n  width: 30px;\r\n  height: 30px;\r\n  transform: translate3d(0, -50%, 0);\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") no-repeat;\r\n  background-position: center;\r\n  background-size: 20px;\r\n}\r\n.newCard__popup__form .memo__todo__list {\r\n  height: calc(100% - 48px);\r\n  overflow-y: auto;\r\n  padding: 10px 20px;\r\n}\r\n.newCard__popup__form .memo__todo__item {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 5px;\r\n  padding-bottom: 10px;\r\n  border-bottom: 1px solid #f8f8f8;\r\n}\r\n.newCard__popup__form .memo__todo__item:last-child {\r\n  border-bottom: none;\r\n}\r\n.newCard__popup__form .memo__todo__item input[type=checkbox] {\r\n  display: none;\r\n}\r\n.newCard__popup__form .memo__todo__item input:checked + label {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\r\n}\r\n.newCard__popup__form .memo__todo__item label {\r\n  padding-left: 20px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") no-repeat;\r\n  background-position: left center;\r\n  background-size: 16px;\r\n  text-indent: -9999px;\r\n}\r\n.newCard__popup__form .memo__todo__item input[type=text] {\r\n  flex: 1;\r\n  outline: none;\r\n  border: none;\r\n  padding: 10px;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n}\r\n.newCard__popup__form .memo__delete__btn {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 24px;\r\n  height: 24px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\r\n  background-position: center;\r\n  background-size: 12px;\r\n}\r\n.newCard__popup__form__submit {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 100%;\r\n  height: 52px;\r\n  margin-top: 20px;\r\n  border-radius: 6px;\r\n  background: #9c5eff;\r\n  font-size: 16px;\r\n  color: #ffffff;\r\n}\r\n.newCard__popup__form__submit:disabled {\r\n  background-color: #9a9a9a;\r\n}\r\n\r\n.newPost__popup {\r\n  width: 800px;\r\n}\r\n.newPost__popup__form {\r\n  display: flex;\r\n  flex-flow: row wrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 25px;\r\n}\r\n.newPost__popup__form__select {\r\n  width: 150px;\r\n  height: 52px;\r\n  margin-right: 15px;\r\n}\r\n.newPost__popup__form__select select {\r\n  appearance: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 12px 15px;\r\n  border-radius: 6px;\r\n  border: 1px solid #d9d9d9;\r\n  font-size: 16px;\r\n  font-weight: bold;\r\n  color: #9c5eff;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") no-repeat;\r\n  background-position: right 15px center;\r\n  background-size: 14px;\r\n}\r\n.newPost__popup__form__input {\r\n  width: calc(100% - 165px);\r\n  height: 52px;\r\n}\r\n.newPost__popup__form__input input {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 12px 15px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 6px;\r\n  font-size: 16px;\r\n  font-weight: bold;\r\n}\r\n.newPost__popup__form__textarea {\r\n  width: 100%;\r\n  height: 300px;\r\n  margin: 15px 0;\r\n}\r\n.newPost__popup__form__textarea textarea {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 15px;\r\n  border-radius: 6px;\r\n  border: 1px solid #d9d9d9;\r\n  font-size: 16px;\r\n  resize: none;\r\n}\r\n.newPost__popup__form__file {\r\n  width: 150px;\r\n  height: 52px;\r\n}\r\n.newPost__popup__form__file label {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  padding-left: 20px;\r\n  border-radius: 6px;\r\n  border: 1px solid #d9d9d9;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ") no-repeat;\r\n  background-position: left 30px center;\r\n  background-size: 14px;\r\n  font-size: 12px;\r\n  line-height: 52px;\r\n  text-align: center;\r\n}\r\n.newPost__popup__form__file input {\r\n  display: none;\r\n}\r\n.newPost__popup__form__submit {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 100%;\r\n  height: 52px;\r\n  margin-top: 30px;\r\n  border-radius: 6px;\r\n  color: #ffffff;\r\n  font-size: 16px;\r\n  background: #9c5eff;\r\n}\r\n\r\n.signin {\r\n  position: relative;\r\n  width: 500px;\r\n  margin: 153px auto 100px;\r\n}\r\n.signin .error {\r\n  display: none;\r\n  font-size: 14px;\r\n  color: #ec5664;\r\n}\r\n.signin .error.show {\r\n  display: block;\r\n}\r\n.signin__title {\r\n  margin-bottom: 50px;\r\n  font-size: 48px;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  text-align: center;\r\n}\r\n.signin .input__form {\r\n  position: relative;\r\n  width: 100%;\r\n  padding-top: 20px;\r\n  margin-top: 25px;\r\n}\r\n.signin .input__form:first-child {\r\n  margin-top: 0;\r\n}\r\n.signin .input__form label {\r\n  color: #6a6a6a;\r\n  font-size: 14px;\r\n}\r\n.signin .input__form input {\r\n  outline: none;\r\n  width: 100%;\r\n  height: 52px;\r\n  padding: 15px;\r\n  margin-top: 5px;\r\n  border: 2px solid #d1b4ff;\r\n  border-radius: 8px;\r\n  font-size: 16px;\r\n}\r\n.signin .input__form input:focus {\r\n  border-color: #9c5eff;\r\n}\r\n.signin .input__form__errorMsg {\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: -28px;\r\n}\r\n.signin .submit__btn {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 100%;\r\n  height: 52px;\r\n  margin-top: 95px;\r\n  border-radius: 8px;\r\n  background: #9c5eff;\r\n  color: #ffffff;\r\n  font-size: 16px;\r\n}\r\n.signin .submit__btn:disabled {\r\n  background: #d9d9d9;\r\n}\r\n.signin__errorMsg {\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 120px;\r\n  width: 100%;\r\n  text-align: center;\r\n}\r\n.signin__signup__btn {\r\n  margin-top: 15px;\r\n  text-align: center;\r\n  font-size: 16px;\r\n}\r\n.signin__signup__btn span {\r\n  color: #6a6a6a;\r\n}\r\n.signin__signup__btn a {\r\n  color: #21bcff;\r\n}\r\n\r\n.signup div:nth-child(7) {\r\n  margin-top: 50px;\r\n}\r\n.signup .checkbox__form {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-top: 15px;\r\n}\r\n.signup .checkbox__form input {\r\n  display: none;\r\n}\r\n.signup .checkbox__form input:checked + label {\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\r\n}\r\n.signup .checkbox__form label {\r\n  padding-left: 30px;\r\n  font-size: 16px;\r\n  color: #252525;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") no-repeat;\r\n  background-position: left center;\r\n}\r\n.signup .checkbox__form__link {\r\n  font-size: 14px;\r\n  color: #21bcff;\r\n}\r\n.signup > .error {\r\n  text-align: left;\r\n  bottom: 190px;\r\n}\r\n.signup .submit__btn {\r\n  margin-top: 20px;\r\n}\r\n.signup__back__btn {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  width: 100%;\r\n  height: 54px;\r\n  margin-top: 15px;\r\n  border-radius: 8px;\r\n  background: #9a9a9a;\r\n  color: #ffffff;\r\n  font-size: 16px;\r\n}\r\n\r\n.intro {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  min-width: 1280px;\r\n  min-height: 600px;\r\n  width: 100%;\r\n  height: 100vh;\r\n}\r\n.intro__header {\r\n  background: none;\r\n  box-shadow: none;\r\n}\r\n.intro__header .nav {\r\n  min-width: 1280px;\r\n  width: 80%;\r\n}\r\n.intro__header .nav__item {\r\n  color: #ffffff;\r\n}\r\n.intro__copywriter {\r\n  flex-basis: 45%;\r\n  height: 100%;\r\n  padding-top: 260px;\r\n  text-align: center;\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n.intro__copywriter__title span {\r\n  font-size: 28px;\r\n  color: #9a9a9a;\r\n}\r\n.intro__copywriter__title strong {\r\n  display: block;\r\n  color: #252525;\r\n  font-size: 80px;\r\n  font-weight: bold;\r\n}\r\n.intro__copywriter__link {\r\n  display: inline-block;\r\n  padding: 30px 70px;\r\n  border-radius: 8px;\r\n  background: #9c5eff;\r\n  color: #ffffff;\r\n}\r\n.intro__copywriter .footer {\r\n  background: none;\r\n  font-size: 14px;\r\n  color: #d9d9d9;\r\n}\r\n.intro__service {\r\n  position: relative;\r\n  flex-basis: 55%;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-flow: column-reverse nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n}\r\n.intro__service__info {\r\n  min-width: 710px;\r\n  width: 40%;\r\n  padding: 16px 0;\r\n  display: flex;\r\n  flex-flow: row-reverse nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n}\r\n.intro__service__info dl {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  margin-left: 20px;\r\n  color: #ffffff;\r\n}\r\n.intro__service__info dl dt {\r\n  font-size: 14px;\r\n}\r\n.intro__service__info dl dd {\r\n  padding-top: 25px;\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n}\r\n.intro__service video {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  z-index: -1;\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.hot-topic {\r\n  min-width: 1280px;\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n  margin-top: 160px;\r\n}\r\n.hot-topic__header {\r\n  position: relative;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n}\r\n.hot-topic__title {\r\n  font-weight: 700;\r\n  font-size: 28px;\r\n}\r\n.hot-topic__hashtag__list {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  margin-left: 24px;\r\n}\r\n.hot-topic__hashtag__item {\r\n  padding-left: 16px;\r\n  color: #6a6a6a;\r\n}\r\n.hot-topic__nav {\r\n  position: absolute;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  right: 0;\r\n}\r\n.hot-topic__nav__item {\r\n  margin: 0 auto;\r\n  max-width: 800px;\r\n}\r\n.hot-topic__nav__item__circle {\r\n  background-color: #d9d9d9;\r\n  margin: 0 auto;\r\n  width: 16px;\r\n  height: 16px;\r\n  margin-right: 8px;\r\n  border-radius: 100%;\r\n  cursor: pointer;\r\n}\r\n.hot-topic__nav__item__circle.checked {\r\n  background-color: #6a6a6a;\r\n}\r\n.hot-topic__body {\r\n  margin-top: 20px;\r\n}\r\n.hot-topic__list {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: space-between;\r\n  align-items: stretch;\r\n}\r\n\r\n.travel-log {\r\n  min-width: 1280px;\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n  margin-top: 76px;\r\n  margin-bottom: 80px;\r\n}\r\n.travel-log__header {\r\n  font-weight: 700;\r\n  font-size: 28px;\r\n}\r\n.travel-log__form {\r\n  position: relative;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  margin-top: 20px;\r\n  height: 48px;\r\n}\r\n.travel-log__form__dropdown {\r\n  position: relative;\r\n  overflow: hidden;\r\n  width: 168px;\r\n  border-radius: 8px;\r\n  border: 1px solid #e5e5e5;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") no-repeat;\r\n  background-position: right 18px center;\r\n  background-size: 14px;\r\n  text-indent: 16px;\r\n  color: #252525;\r\n  cursor: pointer;\r\n}\r\n.travel-log__form__input {\r\n  position: absolute;\r\n  right: 160px;\r\n  width: 924px;\r\n  height: 48px;\r\n  text-indent: 16px;\r\n  border: 1px solid #e5e5e5;\r\n  border-radius: 8px 0 0 8px;\r\n  color: #9a9a9a;\r\n}\r\n.travel-log__form__button--submit {\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n  position: absolute;\r\n  background: #9c5eff;\r\n  border-radius: 0 8px 8px 0;\r\n  color: #ffffff;\r\n  font-size: 18px;\r\n  right: 0;\r\n  width: 160px;\r\n  height: 48px;\r\n}\r\n.travel-log__body {\r\n  margin-top: 32px;\r\n}\r\n.travel-log__list {\r\n  position: relative;\r\n  display: flex;\r\n  flex-flow: row wrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  gap: 40px;\r\n}\r\n\r\n.detail-main {\r\n  position: relative;\r\n  display: flex;\r\n  width: 100%;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  min-width: 1280px;\r\n  padding-top: 68px;\r\n}\r\n\r\n.cover {\r\n  position: relative;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 400px;\r\n  background: #6a6a6a no-repeat center/cover;\r\n}\r\n.cover__inner {\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n  text-align: center;\r\n  color: #ffffff;\r\n}\r\n.cover__content__title {\r\n  font-size: 48px;\r\n}\r\n.cover__buttonbox {\r\n  position: absolute;\r\n  top: -130px;\r\n  right: 30px;\r\n}\r\n.cover__buttonbox .add-cover-input {\r\n  display: none;\r\n}\r\n.cover__buttonbox .add-cover-btn {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 35px;\r\n  height: 35px;\r\n  border-radius: 50%;\r\n  background: rgba(0, 0, 0, 0.3);\r\n  border: none;\r\n}\r\n.cover__buttonbox .edit-btn {\r\n  width: 35px;\r\n  height: 35px;\r\n  border-radius: 50%;\r\n  background: rgba(0, 0, 0, 0.3);\r\n  border: none;\r\n}\r\n.cover__buttonbox .remove-btn {\r\n  width: 35px;\r\n  height: 35px;\r\n  border-radius: 50%;\r\n  background: rgba(0, 0, 0, 0.3);\r\n  border: none;\r\n}\r\n.cover__buttonbox .add-cover-btn img {\r\n  width: 22px;\r\n  height: 16px;\r\n}\r\n.cover__buttonbox .edit-btn img {\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n.cover__buttonbox .remove-btn img {\r\n  width: 12px;\r\n  height: 12px;\r\n  margin: 0 auto;\r\n}\r\n.cover__buttonbox .edit-btn:hover,\r\n.cover__buttonbox .remove-btn:hover,\r\n.cover__buttonbox .add-cover-btn:hover {\r\n  background: #9c5eff;\r\n}\r\n\r\n.trip-planner {\r\n  position: relative;\r\n  width: 1280px;\r\n  z-index: 1;\r\n  margin: 0 auto;\r\n  transform: translateY(-50px);\r\n  background-color: #ffffff;\r\n  padding: 25px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 8px;\r\n}\r\n.trip-planner__title {\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n  margin-bottom: 25px;\r\n}\r\n.trip-planner__author {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-bottom: 25px;\r\n}\r\n.trip-planner__author__profile {\r\n  background-color: #bde9f9;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  margin-right: 15px;\r\n}\r\n.trip-planner__content {\r\n  margin-bottom: 32px;\r\n}\r\n.trip-planner__info {\r\n  font-size: 14px;\r\n  color: #6a6a6a;\r\n}\r\n.trip-planner__badge {\r\n  position: absolute;\r\n  display: flex;\r\n  top: 25px;\r\n  right: 25px;\r\n}\r\n.trip-planner__badge span {\r\n  display: flex;\r\n  align-self: center;\r\n  margin-right: 12px;\r\n}\r\n.trip-planner__badge span img {\r\n  margin-right: 4px;\r\n}\r\n.trip-planner__create__title {\r\n  border-bottom: 1px solid #d9d9d9;\r\n}\r\n.trip-planner__create__title .trip-planner__title {\r\n  width: 100%;\r\n  border: none;\r\n  outline: none;\r\n}\r\n.trip-planner__create__content {\r\n  padding: 20px 0;\r\n  border-bottom: 1px solid #d9d9d9;\r\n}\r\n.trip-planner__create__content .trip-planner__content {\r\n  resize: none;\r\n  width: 100%;\r\n  height: 140px;\r\n  margin: 0;\r\n  outline: none;\r\n  border: none;\r\n}\r\n.trip-planner__create__option {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n  color: #6a6a6a;\r\n}\r\n.trip-planner__create__option .trip-date {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n.trip-planner__create__option .trip-date__span {\r\n  margin-right: 10px;\r\n}\r\n.trip-planner__create__option .trip-date .newTrip__popup__form__input.date__form {\r\n  margin: 0;\r\n  height: 30px;\r\n  float: none;\r\n  width: 160px;\r\n}\r\n.trip-planner__create__option .trip-date .newTrip__popup__form__input.date__form input {\r\n  font-size: 14px;\r\n  color: #6a6a6a;\r\n}\r\n.trip-planner__create__option .trip-date::after {\r\n  display: inline-block;\r\n  content: \"|\";\r\n  margin: 0 16px;\r\n}\r\n.trip-planner__create__option .trip-people input {\r\n  margin-right: 6px;\r\n  width: 24%;\r\n  height: 30px;\r\n  text-align: center;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 4px;\r\n  color: #6a6a6a;\r\n}\r\n\r\n.trip-container {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n.trip-container .trip-main-container {\r\n  margin: 0px 30px 0px 20px;\r\n}\r\n.trip-container .like-share-btnbox {\r\n  position: sticky;\r\n  display: flex;\r\n  align-self: flex-start;\r\n  flex-direction: column;\r\n  margin-top: 20px;\r\n  top: 50px;\r\n  text-align: center;\r\n}\r\n.trip-container .like-share-btnbox .like-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-bottom: 10px;\r\n}\r\n.trip-container .like-share-btnbox .like-container .like-btn {\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: #ffffff;\r\n  border-radius: 50%;\r\n  border: 1px solid #9c5eff;\r\n  cursor: pointer;\r\n}\r\n.trip-container .like-share-btnbox .like-container .like-degit {\r\n  font-size: 14px;\r\n  color: #9c5eff;\r\n}\r\n.trip-container .like-share-btnbox .share-btn {\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: #ffffff;\r\n  border-radius: 50%;\r\n  border: 1px solid #9a9a9a;\r\n  cursor: pointer;\r\n}\r\n.trip-container .nav-day {\r\n  position: sticky;\r\n  display: flex;\r\n  align-self: flex-start;\r\n  flex-direction: column;\r\n  margin-top: 20px;\r\n  top: 50px;\r\n  font-size: 14px;\r\n  color: #d9d9d9;\r\n}\r\n.trip-container .nav-day__item {\r\n  position: relative;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n}\r\n.trip-container .nav-day__item:hover {\r\n  color: #d1b4ff;\r\n}\r\n.trip-container .nav-day__item.active {\r\n  color: #9c5eff;\r\n  font-weight: 600;\r\n}\r\n.trip-container .nav-day__item::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  width: 2px;\r\n  height: 100%;\r\n  background-color: #d9d9d9;\r\n  top: 0;\r\n  left: -10px;\r\n}\r\n.trip-container .nav-day__item:hover::before {\r\n  background-color: #d1b4ff;\r\n}\r\n.trip-container .nav-day__item.active::before {\r\n  background-color: #9c5eff;\r\n}\r\n\r\n.trip-itinerary {\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n}\r\n.trip-itinerary__tab {\r\n  display: flex;\r\n  font-size: 18px;\r\n}\r\n.trip-itinerary__tab__chart {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 50%;\r\n  height: 55px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 8px 0 0 0;\r\n  color: #9a9a9a;\r\n}\r\n.trip-itinerary__tab__story {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 50%;\r\n  height: 55px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 0 8px 0 0;\r\n  color: #9a9a9a;\r\n}\r\n.trip-itinerary__tab .selected {\r\n  border: 1px solid #9c5eff;\r\n  color: #9c5eff;\r\n}\r\n\r\n.trip-story {\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n}\r\n.trip-story__day-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.trip-story__day-item {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 20px 0 20px 20px;\r\n}\r\n.trip-story__day-item::before {\r\n  position: absolute;\r\n  content: \"\";\r\n  display: block;\r\n  width: 1px;\r\n  height: calc(100% - 10px);\r\n  top: 10px;\r\n  left: 0px;\r\n  background-color: #d9d9d9;\r\n}\r\n.trip-story__day-item::after {\r\n  position: absolute;\r\n  content: \"\";\r\n  display: block;\r\n  width: 9px;\r\n  height: 9px;\r\n  top: 10px;\r\n  left: -4px;\r\n  background-color: #000000;\r\n  border-radius: 50%;\r\n}\r\n.trip-story__day-content {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-left: 30px;\r\n  margin-bottom: 15px;\r\n}\r\n.trip-story__day-content__title {\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  margin-right: 10px;\r\n}\r\n.trip-story__day-content__summary {\r\n  font-size: 14px;\r\n  color: #9a9a9a;\r\n}\r\n.trip-story .trip-article {\r\n  position: relative;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 8px;\r\n  padding: 10px;\r\n  margin-left: 20px;\r\n  margin-bottom: 20px;\r\n}\r\n.trip-story .trip-article__header {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n.trip-story .trip-article__header__badge {\r\n  position: absolute;\r\n  top: 18px;\r\n  right: 18px;\r\n}\r\n.trip-story .trip-article__header__badge .edit-btn {\r\n  width: 24px;\r\n  height: 24px;\r\n  margin-right: 2px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ") no-repeat center;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n.trip-story .trip-article__header__badge .remove-btn {\r\n  width: 24px;\r\n  height: 24px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") no-repeat center;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n.trip-story .trip-article__header__badge .add-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  background-color: #ffffff;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  color: #6a6a6a;\r\n}\r\n.trip-story .trip-article__header__badge .add-btn .add-img {\r\n  margin-right: 4px;\r\n}\r\n.trip-story .trip-article__header__profile {\r\n  background-color: #bde9f9;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 50%;\r\n  margin-right: 10px;\r\n  overflow: hidden;\r\n}\r\n.trip-story .trip-article__header__content__place {\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n}\r\n.trip-story .trip-article__header__content__time {\r\n  font-size: 12px;\r\n  color: #9a9a9a;\r\n}\r\n.trip-story .trip-article__main__img-container {\r\n  margin: 30px 28px;\r\n}\r\n.trip-story .trip-article__main__img-container img {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n.trip-story .trip-article__main__content {\r\n  margin: 30px 0;\r\n}\r\n\r\n.comment {\r\n  width: 1280px;\r\n  margin: 60px auto;\r\n}\r\n.comment__title {\r\n  font-size: 24px;\r\n  font-weight: 600;\r\n  margin-bottom: 15px;\r\n}\r\n.comment__container {\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 8px;\r\n}\r\n.comment__inputbox {\r\n  display: flex;\r\n  align-items: center;\r\n  padding: 15px 25px;\r\n  border-bottom: 2px solid #d9d9d9;\r\n  height: 81px;\r\n}\r\n.comment__inputbox__profile {\r\n  background-color: #bde9f9;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  margin-right: 10px;\r\n}\r\n.comment__inputbox__inputform {\r\n  width: 90%;\r\n  margin: 16px;\r\n}\r\n.comment__inputbox__inputform input {\r\n  width: 100%;\r\n  height: 40px;\r\n  outline: none;\r\n  border: none;\r\n}\r\n.comment__inputbox__button {\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 50%;\r\n  background: #9c5eff url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ") no-repeat center center;\r\n  outline: none;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n.comment__box {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 15px 25px;\r\n  border-bottom: 1px solid #d9d9d9;\r\n}\r\n.comment__box__contentbox {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n.comment__box__contentbox__profile {\r\n  background-color: #bde9f9;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  margin-right: 30px;\r\n}\r\n.comment__box__contentbox__content__username {\r\n  display: flex;\r\n  align-items: center;\r\n  font-size: 14px;\r\n}\r\n.comment__box__contentbox__content__add-time {\r\n  font-size: 12px;\r\n  color: #9a9a9a;\r\n  margin-left: 8px;\r\n}\r\n.comment__box__contentbox__content__main {\r\n  margin-top: 6px;\r\n}\r\n.comment__box__buttonbox .recomment-btn {\r\n  width: 24px;\r\n  height: 24px;\r\n  margin-right: 8px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ") no-repeat center;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n.comment__box__buttonbox .remove-btn {\r\n  width: 24px;\r\n  height: 24px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") no-repeat center;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.comment__inputbox.recomment {\r\n  border-bottom: 1px solid #d9d9d9;\r\n}\r\n.comment__inputbox.recomment .comment__inputbox__button {\r\n  width: 30px;\r\n  height: 30px;\r\n  background-size: 20px;\r\n}\r\n\r\n.recomment::before {\r\n  content: \"\";\r\n  text-align: center;\r\n  display: block;\r\n  width: 30px;\r\n  height: 30px;\r\n  margin-right: 15px;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ") no-repeat center top;\r\n}\r\n\r\n.profile-img {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.mypage {\r\n  min-width: 1280px;\r\n  width: 1280px;\r\n  margin: 0 auto;\r\n  margin-top: 180px;\r\n}\r\n\r\n.mypage-main, .profile-main {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  border-top: 1px solid #252525;\r\n  margin-top: 32px;\r\n}\r\n\r\n.side-nav {\r\n  width: 320px;\r\n  border-right: 1px solid #252525;\r\n}\r\n.side-nav__list {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  padding: 48px;\r\n}\r\n.side-nav__item {\r\n  width: fit-content;\r\n  font-size: 18px;\r\n}\r\n.side-nav__item.selected {\r\n  border-bottom: 1px solid #252525;\r\n}\r\n.side-nav__item:not(:last-child) {\r\n  margin-bottom: 32px;\r\n}\r\n\r\n.mypage-main__section section {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: center;\r\n  align-items: stretch;\r\n  margin: 32px 0;\r\n  width: 960px;\r\n}\r\n\r\n.my-travel-log {\r\n  height: 500px;\r\n}\r\n.my-travel-log__list {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  padding: 30px;\r\n}\r\n\r\n.profile-info-edit__form {\r\n  position: relative;\r\n}\r\n.profile-info-edit__form__input {\r\n  display: flex;\r\n  flex-flow: column nowrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n  width: 664px;\r\n  height: 120px;\r\n}\r\n.profile-info-edit__form__input label {\r\n  font-size: 18px;\r\n  color: #6a6a6a;\r\n  margin-bottom: 8px;\r\n}\r\n.profile-info-edit__form__input input {\r\n  padding: 12px 16px;\r\n  height: 54px;\r\n  border: 2px solid #d9d9d9;\r\n  border-radius: 8px;\r\n}\r\n.profile-info-edit__form .profile-info-edit__form__button {\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  justify-content: right;\r\n  align-items: stretch;\r\n  margin: 16px 0;\r\n}\r\n.profile-info-edit__form .profile-info-edit__form__button button {\r\n  width: 120px;\r\n  height: 48px;\r\n  appearance: none;\r\n  border: 0;\r\n  padding: 0;\r\n  background: none;\r\n}\r\n.profile-info-edit__form .profile-info-edit__form__button button:not(:last-child) {\r\n  margin-right: 20px;\r\n}\r\n.profile-info-edit__form .profile-info-edit__form__button .profile-info-edit__form-cancel {\r\n  border: 1px solid #252525;\r\n  border-radius: 8px;\r\n}\r\n.profile-info-edit__form .profile-info-edit__form__button .profile-info-edit__form-edit {\r\n  background: #9c5eff;\r\n  border-radius: 8px;\r\n  color: #ffffff;\r\n}\r\n.profile-info-edit__form .input__form:not(:last-child) {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.social {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  width: 960px;\r\n}\r\n.social__list {\r\n  display: flex;\r\n  flex-flow: row wrap;\r\n  justify-content: flex-start;\r\n  align-items: stretch;\r\n}\r\n\r\n/*# sourceMappingURL=style.css.map */\r\n", "",{"version":3,"sources":["webpack://./client/assets/scss/utils/_a11y.scss","webpack://./client/css/style.css","webpack://./client/assets/scss/base/_normalize.scss","webpack://./client/assets/scss/base/_reset.scss","webpack://./client/assets/scss/base/_default.scss","webpack://./client/assets/scss/components/_header.scss","webpack://./client/assets/scss/utils/_color.scss","webpack://./client/assets/scss/components/_footer.scss","webpack://./client/assets/scss/components/_map.scss","webpack://./client/assets/scss/components/_dayCarousel.scss","webpack://./client/assets/scss/components/_timeTable.scss","webpack://./client/assets/scss/components/_modal.scss","webpack://./client/assets/scss/utils/_mixin.scss","webpack://./client/assets/scss/components/_calendar.scss","webpack://./client/assets/scss/components/_hotTopicCard.scss","webpack://./client/assets/scss/components/_travelLogCard.scss","webpack://./client/assets/scss/components/_profileCard.scss","webpack://./client/assets/scss/components/_myTravelLogCard.scss","webpack://./client/assets/scss/components/_mypageModal.scss","webpack://./client/assets/scss/layout/_newTripPopup.scss","webpack://./client/assets/scss/layout/_newCardPopup.scss","webpack://./client/assets/scss/layout/_newPostPopup.scss","webpack://./client/assets/scss/pages/_signin.scss","webpack://./client/assets/scss/pages/_signup.scss","webpack://./client/assets/scss/pages/_intro.scss","webpack://./client/assets/scss/pages/_main.scss","webpack://./client/assets/scss/pages/_trip-detail.scss","webpack://./client/assets/scss/pages/_mypage.scss"],"names":[],"mappings":"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","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./client/assets/images/HelloWorldLogo.svg":
/*!*************************************************!*\
  !*** ./client/assets/images/HelloWorldLogo.svg ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/85ee3f5ccab5e0afbfd51ea856494142.svg");

/***/ }),

/***/ "./client/assets/videos/MainMovie3.mp4":
/*!*********************************************!*\
  !*** ./client/assets/videos/MainMovie3.mp4 ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/295e7562b3eba101ad9ebc29658e5351.mp4");

/***/ }),

/***/ "./client/css/style.css":
/*!******************************!*\
  !*** ./client/css/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./client/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./client/assets/images/add_todo.svg":
/*!*******************************************!*\
  !*** ./client/assets/images/add_todo.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/4a1d48e954368a625384.svg";

/***/ }),

/***/ "./client/assets/images/angle-left-solid.svg":
/*!***************************************************!*\
  !*** ./client/assets/images/angle-left-solid.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/9605390e1910786c8110.svg";

/***/ }),

/***/ "./client/assets/images/calendar-dark.svg":
/*!************************************************!*\
  !*** ./client/assets/images/calendar-dark.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/a153aeb97b32967cbe57.svg";

/***/ }),

/***/ "./client/assets/images/calendar.svg":
/*!*******************************************!*\
  !*** ./client/assets/images/calendar.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/1073f5f676424cd5895a.svg";

/***/ }),

/***/ "./client/assets/images/cancel.svg":
/*!*****************************************!*\
  !*** ./client/assets/images/cancel.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/8bbedc806b379bb67fa1.svg";

/***/ }),

/***/ "./client/assets/images/checkbox_off.svg":
/*!***********************************************!*\
  !*** ./client/assets/images/checkbox_off.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/7dbe20cf6a2fdbed7d57.svg";

/***/ }),

/***/ "./client/assets/images/checkbox_on.svg":
/*!**********************************************!*\
  !*** ./client/assets/images/checkbox_on.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/e9933299dfea631c2c54.svg";

/***/ }),

/***/ "./client/assets/images/close.svg":
/*!****************************************!*\
  !*** ./client/assets/images/close.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fcd177dcff5fd0a3bca8.svg";

/***/ }),

/***/ "./client/assets/images/comment-add.svg":
/*!**********************************************!*\
  !*** ./client/assets/images/comment-add.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/ebc959652dc27736e7a0.svg";

/***/ }),

/***/ "./client/assets/images/iconCamera.svg":
/*!*********************************************!*\
  !*** ./client/assets/images/iconCamera.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fd40db59c3d589df9449.svg";

/***/ }),

/***/ "./client/assets/images/newPost_camera.svg":
/*!*************************************************!*\
  !*** ./client/assets/images/newPost_camera.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/08897af747dfcb436bd4.svg";

/***/ }),

/***/ "./client/assets/images/plus-solid.svg":
/*!*********************************************!*\
  !*** ./client/assets/images/plus-solid.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/5fa783fd824e31313ced.svg";

/***/ }),

/***/ "./client/assets/images/post-edit.svg":
/*!********************************************!*\
  !*** ./client/assets/images/post-edit.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/cd42b4c50faf8f36c427.svg";

/***/ }),

/***/ "./client/assets/images/recomment-add.svg":
/*!************************************************!*\
  !*** ./client/assets/images/recomment-add.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/d10207105827ff019c0c.svg";

/***/ }),

/***/ "./client/assets/images/recomment-arrow.svg":
/*!**************************************************!*\
  !*** ./client/assets/images/recomment-arrow.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/ea7d95b78d162871d8bc.svg";

/***/ }),

/***/ "./client/assets/images/select_arrow.svg":
/*!***********************************************!*\
  !*** ./client/assets/images/select_arrow.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/9d0fd03a20e28f438f2f.svg";

/***/ }),

/***/ "./client/assets/images/select_time.svg":
/*!**********************************************!*\
  !*** ./client/assets/images/select_time.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/9332c3602e032873e74d.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/render.js */ "./client/src/dom/render.js");
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.js */ "./client/src/App.js");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/style.css */ "./client/css/style.css");




console.log('start');
(0,_dom_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_App_js__WEBPACK_IMPORTED_MODULE_1__["default"], document.querySelector('#root'));
window.addEventListener('popstate', () => (0,_dom_render_js__WEBPACK_IMPORTED_MODULE_0__["default"])());

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
import {
  LOGIN_FORM_SUBMIT,
  SIGNUP_FORM_SUBMIT,
  CALCULATE_INVOICE_SUM,
  CALCULATE_INVOICE_DUEDATE,
  ADD_INVOICE_ROW,
  REMOVE_INVOICE_ROW,
  REMOVE_INVOICE,
  COPY_INVOICE,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_START,
  LOAD_INVOICE_REVIEW,
  POST_TAX_CARD,
  SAVE_AND_SEND_INVOICE,
  MIN_DATE_CHANGE,
  MAX_DATE_CHANGE,
  QUANTITY_CHANGE,
  QUANTITY_PRICE_CHANGE,
  ON_INVOICE_REVIEW,
  GET_INVOICES_FAILED,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAILED,
  CHECK_AUTH_INFO,
  CHECK_AUTH_INFO_SUCCESS,
  CHECK_AUTH_INFO_FAILED,
  ON_PROFILE_UPDATE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILED,
  LOAD_PROFILE_START,
  CLOSE_INVOICE_REVIEW_SNACKBAR,
  COPY_INVOICE_SUCCESS,

  NEW_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILED,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_CUSTOMER_BY_ID_SUCCESS,
  SAVE_CUSTOMER_UPDATE,
  CANCEL_CUSTOMER_UPDATE,

  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  CUSTOMER_PAGE_CHANGE,
  INVOICE_PAGE_CHANGE,
  EMPTY_INVOICE_ROWS,
  SAVE_INVOICE_DRAFT,
  ADD_EXPENSE_ROW,
  REMOVE_EXPENSE_ROW,
  ADD_ALLOWANCE_ROW,
  REMOVE_ALLOWANCE_ROW,
  ADD_PASSENGER_ROW,
  REMOVE_PASSENGER_ROW,
  SHOW_ADDITIONAL_VEHICLE_INFO,
  CHANGE_ALLOWANCE_DATE,
  POST_TAX_CARD_SUCCESS,
  POST_TAX_CARD_FAILED,
  GET_TAX_CARD_START,
  CHANGE_ADMIN_MENU,
  SEARCH_ADMIN_INVOICE,
  SEARCH_ADMIN_INVOICE_SUCCESS,
  SEARCH_ADMIN_INVOICE_FAILED,
  EXPAND_ADMIN_INVOICE,
  EXPAND_ADMIN_INVOICE_TRUE,
  EXPAND_ADMIN_INVOICE_FALSE,
  CHANGE_INVOICE_BILLING_DATE,
  SEARCH_ADMIN_USERS,
  SEARCH_ADMIN_USERS_SUCCESS,
  SEARCH_ADMIN_USERS_FAILED,
  GET_NEW_SALARY_START,
  GET_NEW_SALARY_SUCCESS,
  SELECT_ROW_SALARY,
  UPDATE_ADMIN_INVOICE,
  UPDATE_ADMIN_INVOICE_RESULT,
  HIDE_ADMIN_SNACKBAR,
  EXPAND_ADMIN_USER,
  EXPAND_ADMIN_USER_TRUE,
  EXPAND_ADMIN_USER_FALSE,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_USER_RESULT,
  SAVE_EXPENSE,
  SAVE_EXPENSE_FAILED,
  SAVE_EXPENSE_SUCCESS,
  GET_EXPENSE_START,
  GET_EXPENSE_SUCCESS,
  GET_EXPENSE_FAILED,
  EMPTY_EXPENSE_ROWS,
  CLOSE_EXPENSE_SNACKBAR,
  EXPENSE_CHANGE_PAGE,
  POST_YEL_START,
  SAVE_TRAVELLING_EXPENSE,
  SAVE_TRAVELLING_EXPENSE_FAILED,
  SAVE_TRAVELLING_EXPENSE_SUCCESS,
  LOAD_ALLOWANCE_COST,
  LOAD_ALLOWANCE_COST_SUCCESS,
  LOAD_ALLOWANCE_COST_FAILED,
  ALLOWANCE_CHANGE_PAGE,
  GET_YEL_START,
  GET_YEL_SUCCESS,
  GET_YEL_FAILED,
  SELECT_ROW_SALARY_SUCCESS,
  GET_SALARIES_SUCCESS,
  POST_SALARY,
  SIGNUP_FORM_SUBMIT_SUCCESS,
  SIGNUP_FORM_SUBMIT_FAILED,
  CLOSE_SIGNUP_SNACKBAR,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  CLIENT_SET,
  CLIENT_UNSET
  
} from '../constants/index'

export const addInvoiceRow = copy => ({ type: ADD_INVOICE_ROW, copy })
export const removeInvoiceRow = rowNumber => ({ type: REMOVE_INVOICE_ROW, rowNumber })
export const loadInvoiceReview = () => ({ type: LOAD_INVOICE_REVIEW })
export const saveAndSendInvoice = () => ({ type: SAVE_AND_SEND_INVOICE })
export const minDateChange = (value, rowNumber) => ({ type: MIN_DATE_CHANGE, value, rowNumber })
export const maxDateChange = (value, rowNumber) => ({ type: MAX_DATE_CHANGE, value, rowNumber })
export const quantityChange = (val, rowNumber) => ({ type: QUANTITY_CHANGE, val, rowNumber})
export const quantityPriceChange = (val, rowNumber) => ({ type: QUANTITY_PRICE_CHANGE, val, rowNumber})
export const onInvoiceReview = () => ({ type: ON_INVOICE_REVIEW })

export const calculateInvoiceSum = key => ({ type: CALCULATE_INVOICE_SUM, key })
export const calculateDuedate = date => ({ type: CALCULATE_INVOICE_DUEDATE, date })

export const postTaxCard = (e) => ({ type: POST_TAX_CARD, e })
export const postTaxCardSuccess = () => ({ type: POST_TAX_CARD_SUCCESS })
export const postTaxCardFailed = () => ({ type: POST_TAX_CARD_FAILED })
export const getTaxCardStart = () => ({ type: GET_TAX_CARD_START })
export const postYelStart = () => ({ type: POST_YEL_START })
export const getYelStart = () => ({ type: GET_YEL_START })
export const getYelSuccess = yels => ({ type: GET_YEL_SUCCESS, yels })
export const getYelFailed = () => ({ type: GET_YEL_FAILED })

export const getInvoicesStart = () => ({ type: GET_INVOICES_START })
export const getInvoicesSuccess = (invoices, customerResult) => ({ type: GET_INVOICES_SUCCESS, invoices, customerResult })
export const getInvoicesFailed = error => ({ type: GET_INVOICES_FAILED, error })
export const saveInvoiceSuccess = result => ({ type: SAVE_INVOICE_SUCCESS, result})
export const saveInvoiceFailed = error => ({ type: SAVE_INVOICE_FAILED, error})
export const closeInvoiceReviewSnackBar = () => ({type: CLOSE_INVOICE_REVIEW_SNACKBAR})
export const removeInvoice = id => ({type: REMOVE_INVOICE, id})
export const copyInvoice = id => ({type: COPY_INVOICE, id})
export const copyInvoiceSuccess = result => ({type: COPY_INVOICE_SUCCESS, result})
export const invoicePageChange = selected => ({type: INVOICE_PAGE_CHANGE, selected})
export const emptyInvoiceRows = () => ({type: EMPTY_INVOICE_ROWS})
export const saveInvoiceDraft = () => ({type: SAVE_INVOICE_DRAFT})
export const changeInvoiceBillingDate = date => ({type: CHANGE_INVOICE_BILLING_DATE, date})


export const getExpenseStart = () => ({type: GET_EXPENSE_START})
export const getExpenseSuccess = (expenses, allowances) => ({type: GET_EXPENSE_SUCCESS, expenses, allowances})
export const getExpenseFailed = error => ({type: GET_EXPENSE_FAILED, error})
export const addExpenseRow = () => ({type: ADD_EXPENSE_ROW})
export const removeExpenseRow = key => ({type: REMOVE_EXPENSE_ROW, key})
export const addAllowanceRow = () => ({type: ADD_ALLOWANCE_ROW})
export const removeAllowanceRow = key => ({type: REMOVE_ALLOWANCE_ROW, key})
export const addPassengerRow = () => ({type: ADD_PASSENGER_ROW})
export const removePassengerRow = key => ({type: REMOVE_PASSENGER_ROW, key})
export const showAdditionalVehicleInfo = value => ({type: SHOW_ADDITIONAL_VEHICLE_INFO, value})
export const changeAllowanceDate = () => ({type: CHANGE_ALLOWANCE_DATE})
export const saveExpense = () => ({ type: SAVE_EXPENSE })
export const saveExpenseFailure = (error) => ({ type: SAVE_EXPENSE_FAILED, error })
export const saveExpenseSuccess = (result) => ({ type: SAVE_EXPENSE_SUCCESS, result })
export const emptyExpenseRows = () => ({ type: EMPTY_EXPENSE_ROWS })
export const closeExpenseSnackBar = () => ({ type: CLOSE_EXPENSE_SNACKBAR })
export const expensePageChange = selected => ({ type: EXPENSE_CHANGE_PAGE, selected })
export const saveTravellingExpense = () => ({ type: SAVE_TRAVELLING_EXPENSE })
export const saveTravellingExpenseSuccess = (result) => ({ type: SAVE_TRAVELLING_EXPENSE_SUCCESS, result })
export const saveTravellingExpenseFailed = (error) => ({ type: SAVE_TRAVELLING_EXPENSE_FAILED, error })
export const loadAllowanceCost = () => ({ type: LOAD_ALLOWANCE_COST })
export const loadAllowanceCostSuccess = (result) => ({ type: LOAD_ALLOWANCE_COST_SUCCESS, result })
export const loadAllowanceCostFailed = (error) => ({ type: LOAD_ALLOWANCE_COST_FAILED, error })
export const allowancePageChange = selected => ({ type: ALLOWANCE_CHANGE_PAGE, selected })

export const newCustomer = () => ({type: NEW_CUSTOMER})
export const addCustomersSuccess = (result) => ({type: ADD_CUSTOMER_SUCCESS, result})
export const addCustomersFailed = (error) => ({type: ADD_CUSTOMER_FAILED, error})
export const removeCustomer = id => ({type: REMOVE_CUSTOMER, id})
export const updateCustomer = id => ({type: UPDATE_CUSTOMER, id})
export const getCustomerByIdSuccess = (result) => ({type: GET_CUSTOMER_BY_ID_SUCCESS, result})
export const saveCustomerUpdate = id => ({type: SAVE_CUSTOMER_UPDATE, id})
export const cancelCustomerUpdate = id => ({type: CANCEL_CUSTOMER_UPDATE, id})

export const getCustomersStart = () => ({type: GET_CUSTOMERS_START})
export const getCustomersSuccess = (result) => ({type: GET_CUSTOMERS_SUCCESS, result})
export const customerPageChange = selected => ({type: CUSTOMER_PAGE_CHANGE, selected})

export const checkAuthInfo = () => ({ type: CHECK_AUTH_INFO })
export const checkAuthInfoSuccess = result => ({ type: CHECK_AUTH_INFO_SUCCESS, result })
export const checkAuthInfoFailed = error => ({ type: CHECK_AUTH_INFO_FAILED, error })

export const profileUpdate = () => ({ type: ON_PROFILE_UPDATE })
export const loadProfileStart = () => ({ type: LOAD_PROFILE_START })
export const loadProfileSuccess = result => ({ type: LOAD_PROFILE_SUCCESS, result })
export const loadProfileFailed = error => ({ type: LOAD_PROFILE_FAILED, error })

export const loginFormSubmit = (email, password) => ({ type: LOGIN_FORM_SUBMIT, email, password })
export const loginFormSubmitSuccess = (result) => ({ type: LOGIN_FORM_SUBMIT_SUCCESS, result })
export const loginFormSubmitFailed = error => ({ type: LOGIN_FORM_SUBMIT_FAILED, error })
export const setClient = (token) => ({ type: CLIENT_SET, token })
export const unsetClient = () => ({ type: CLIENT_UNSET })

export const registerFormSubmit = (email, firstname, lastname, password) => ({ type: SIGNUP_FORM_SUBMIT, email, firstname, lastname, password })
export const registerFormSubmitSuccess = (result) => ({ type: SIGNUP_FORM_SUBMIT_SUCCESS, result })
export const registerFormSubmitFailed = error => ({ type: SIGNUP_FORM_SUBMIT_FAILED, error })
export const closeRegisterSnackbar = () => ({ type: CLOSE_SIGNUP_SNACKBAR })

export const changeAdminMenu = (value, email) => ({ type: CHANGE_ADMIN_MENU, value, email })
export const searchAdminUsers = () => ({ type: SEARCH_ADMIN_USERS })
export const searchAdminUsersSuccess = result => ({ type: SEARCH_ADMIN_USERS_SUCCESS, result })
export const searchAdminUsersFailed = () => ({ type: SEARCH_ADMIN_USERS_FAILED })
export const expandAdminUser = (expanded, uuid) => ({ type: EXPAND_ADMIN_USER, expanded, uuid})
export const expandAdminUserTrue = result => ({ type: EXPAND_ADMIN_USER_TRUE, result})
export const expandAdminUserFalse = uuid => ({ type: EXPAND_ADMIN_USER_FALSE, uuid})
export const updateAdminUser = (uuid, email) => ({type: UPDATE_ADMIN_USER, uuid, email})
export const updateAdminUserResult = result => ({type: UPDATE_ADMIN_USER_RESULT, result})
export const searchAdminInvoice = () => ({ type: SEARCH_ADMIN_INVOICE })
export const searchAdminInvoiceSuccess = result => ({ type: SEARCH_ADMIN_INVOICE_SUCCESS, result})
export const searchAdminInvoiceFailed = () => ({ type: SEARCH_ADMIN_INVOICE_FAILED})
export const expandAdminInvoice = (expanded, id) => ({ type: EXPAND_ADMIN_INVOICE, expanded, id})
export const expandAdminInvoiceTrue = result => ({ type: EXPAND_ADMIN_INVOICE_TRUE, result})
export const expandAdminInvoiceFalse = id => ({ type: EXPAND_ADMIN_INVOICE_FALSE, id})
export const updateAdminInvoice = id => ({type: UPDATE_ADMIN_INVOICE, id})
export const updateAdminInvoiceResult = result => ({type: UPDATE_ADMIN_INVOICE_RESULT, result})
export const hideAdminSnackbar = () => ({type: HIDE_ADMIN_SNACKBAR})

export const getNewSalaryStart = () => ({type: GET_NEW_SALARY_START})
export const getNewSalarySuccess = result => ({type: GET_NEW_SALARY_SUCCESS, result})
export const getSalariesSuccess = result => ({type: GET_SALARIES_SUCCESS, result})
export const selectRowSalary = selected =>  ({type: SELECT_ROW_SALARY, selected})
export const selectRowSalarySuccess = result => ({type: SELECT_ROW_SALARY_SUCCESS, result})
export const postSalary = selected => ({type: POST_SALARY, selected})

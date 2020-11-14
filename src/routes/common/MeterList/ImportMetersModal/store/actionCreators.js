import * as constants from './constants';

export const getImportVisibleAction = (visible) => ({
    type: constants.METER_IMPORT_VISIBLE,
    visible: visible
});
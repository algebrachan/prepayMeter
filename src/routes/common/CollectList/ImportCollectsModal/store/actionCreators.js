import * as constants from './constants';

export const getImportVisibleAction = (visible) => ({
    type: constants.COLLECT_IMPORT_VISIBLE,
    visible: visible
});
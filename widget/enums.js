'use strict';

(function (angular) {
  angular.module('skinIndexPluginWidget')
    .constant('TAG_NAMES', {
      UVO_INFO: 'uvoInfo',
      SKIN_INDEX_INFO: 'skinIndexInfo'
    })
    .constant('STATUS_CODE', {
      INSERTED: 'inserted',
      UPDATED: 'updated',
      NOT_FOUND: 'NOTFOUND',
      UNDEFINED_DATA: 'UNDEFINED_DATA',
      UNDEFINED_OPTIONS: 'UNDEFINED_OPTIONS',
      UNDEFINED_ID: 'UNDEFINED_ID',
      ITEM_ARRAY_FOUND: 'ITEM_ARRAY_FOUND',
      NOT_ITEM_ARRAY: 'NOT_ITEM_ARRAY'
    })
    .constant('STATUS_MESSAGES', {
      UNDEFINED_DATA: 'Undefined data provided',
      UNDEFINED_OPTIONS: 'Undefined options provided',
      UNDEFINED_ID: 'Undefined id provided',
      NOT_ITEM_ARRAY: 'Array of Items not provided',
      ITEM_ARRAY_FOUND: 'Array of Items provided'
    })
    .constant('WORLD_WEATHER', {
      API_KEY: 'c0fbf1422cd81e949fc330b0da807'
    })
    .constant('RECOMMENDATIONS', {
      0: {
        condition: 'Low',
        title: 'You can safely stay outside'
      },
      1: {
        condition: 'Low',
        title: 'You can safely stay outside'
      },
      2: {
        condition: 'Low',
        title: 'You can safely stay outside'
      },
      3: {
        condition: 'Moderate',
        title: 'Take precautions',
        steps: ['UVO', 'Suncreen 30+']
      },
      4: {
        condition: 'Moderate',
        title: 'Take precautions',
        steps: ['UVO', 'Suncreen 30+']
      },
      5: {
        condition: 'Moderate',
        title: 'Take precautions',
        steps: ['UVO', 'Suncreen 30+']
      },
      6: {
        condition: 'High',
        title: 'Protection Needed',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses']
      },
      7: {
        condition: 'High',
        title: 'Protection Needed',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses']
      },
      8: {
        condition: 'Very High',
        title: 'Caution Advised',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      9: {
        condition: 'Very High',
        title: 'Caution Advised',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      10: {
        condition: 'Very High',
        title: 'Caution Advised',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      11: {
        condition: 'Extreme',
        title: 'Avoid being outdoors',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      12: {
        condition: 'Extreme',
        title: 'Avoid being outdoors',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      13: {
        condition: 'Extreme',
        title: 'Avoid being outdoors',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      14: {
        condition: 'Extreme',
        title: 'Avoid being outdoors',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      },
      15: {
        condition: 'Extreme',
        title: 'Avoid being outdoors',
        steps: ['UVO', 'Sunscreen 30+', 'Hat/Sunglasses', 'Seek Shade']
      }
    })
})(window.angular);
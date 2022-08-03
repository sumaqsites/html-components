(() => {
  // src/scripts/lazyload.js
  var LazyLoad = function() {
    "use strict";
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    var runningOnBrowser = typeof window !== "undefined";
    var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
    var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;
    var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
    var isHiDpi = runningOnBrowser && window.devicePixelRatio > 1;
    var defaultSettings = {
      elements_selector: ".lazy",
      container: isBot || runningOnBrowser ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      data_bg_hidpi: "bg-hidpi",
      data_bg_multi: "bg-multi",
      data_bg_multi_hidpi: "bg-multi-hidpi",
      data_bg_set: "bg-set",
      data_poster: "poster",
      class_applied: "applied",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      class_entered: "entered",
      class_exited: "exited",
      unobserve_completed: true,
      unobserve_entered: false,
      cancel_on_exit: true,
      callback_enter: null,
      callback_exit: null,
      callback_applied: null,
      callback_loading: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      callback_cancel: null,
      use_native: false,
      restore_on_error: false
    };
    var getExtendedSettings = function getExtendedSettings2(customSettings) {
      return _extends({}, defaultSettings, customSettings);
    };
    var createInstance = function createInstance2(classObj, options) {
      var event;
      var eventString = "LazyLoad::Initialized";
      var instance = new classObj(options);
      try {
        event = new CustomEvent(eventString, {
          detail: {
            instance
          }
        });
      } catch (err) {
        event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventString, false, false, {
          instance
        });
      }
      window.dispatchEvent(event);
    };
    var autoInitialize = function autoInitialize2(classObj, options) {
      if (!options) {
        return;
      }
      if (!options.length) {
        createInstance(classObj, options);
      } else {
        for (var i = 0, optionsItem; optionsItem = options[i]; i += 1) {
          createInstance(classObj, optionsItem);
        }
      }
    };
    var SRC = "src";
    var SRCSET = "srcset";
    var SIZES = "sizes";
    var POSTER = "poster";
    var ORIGINALS = "llOriginalAttrs";
    var DATA = "data";
    var statusLoading = "loading";
    var statusLoaded = "loaded";
    var statusApplied = "applied";
    var statusEntered = "entered";
    var statusError = "error";
    var statusNative = "native";
    var dataPrefix = "data-";
    var statusDataName = "ll-status";
    var getData = function getData2(element, attribute) {
      return element.getAttribute(dataPrefix + attribute);
    };
    var setData = function setData2(element, attribute, value) {
      var attrName = dataPrefix + attribute;
      if (value === null) {
        element.removeAttribute(attrName);
        return;
      }
      element.setAttribute(attrName, value);
    };
    var getStatus = function getStatus2(element) {
      return getData(element, statusDataName);
    };
    var setStatus = function setStatus2(element, status) {
      return setData(element, statusDataName, status);
    };
    var resetStatus = function resetStatus2(element) {
      return setStatus(element, null);
    };
    var hasEmptyStatus = function hasEmptyStatus2(element) {
      return getStatus(element) === null;
    };
    var hasStatusLoading = function hasStatusLoading2(element) {
      return getStatus(element) === statusLoading;
    };
    var hasStatusError = function hasStatusError2(element) {
      return getStatus(element) === statusError;
    };
    var hasStatusNative = function hasStatusNative2(element) {
      return getStatus(element) === statusNative;
    };
    var statusesAfterLoading = [statusLoading, statusLoaded, statusApplied, statusError];
    var hadStartedLoading = function hadStartedLoading2(element) {
      return statusesAfterLoading.indexOf(getStatus(element)) >= 0;
    };
    var safeCallback = function safeCallback2(callback, arg1, arg2, arg3) {
      if (!callback) {
        return;
      }
      if (arg3 !== void 0) {
        callback(arg1, arg2, arg3);
        return;
      }
      if (arg2 !== void 0) {
        callback(arg1, arg2);
        return;
      }
      callback(arg1);
    };
    var addClass = function addClass2(element, className) {
      if (supportsClassList) {
        element.classList.add(className);
        return;
      }
      element.className += (element.className ? " " : "") + className;
    };
    var removeClass = function removeClass2(element, className) {
      if (supportsClassList) {
        element.classList.remove(className);
        return;
      }
      element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
    };
    var addTempImage = function addTempImage2(element) {
      element.llTempImage = document.createElement("IMG");
    };
    var deleteTempImage = function deleteTempImage2(element) {
      delete element.llTempImage;
    };
    var getTempImage = function getTempImage2(element) {
      return element.llTempImage;
    };
    var unobserve = function unobserve2(element, instance) {
      if (!instance)
        return;
      var observer = instance._observer;
      if (!observer)
        return;
      observer.unobserve(element);
    };
    var resetObserver = function resetObserver2(observer) {
      observer.disconnect();
    };
    var unobserveEntered = function unobserveEntered2(element, settings, instance) {
      if (settings.unobserve_entered)
        unobserve(element, instance);
    };
    var updateLoadingCount = function updateLoadingCount2(instance, delta) {
      if (!instance)
        return;
      instance.loadingCount += delta;
    };
    var decreaseToLoadCount = function decreaseToLoadCount2(instance) {
      if (!instance)
        return;
      instance.toLoadCount -= 1;
    };
    var setToLoadCount = function setToLoadCount2(instance, value) {
      if (!instance)
        return;
      instance.toLoadCount = value;
    };
    var isSomethingLoading = function isSomethingLoading2(instance) {
      return instance.loadingCount > 0;
    };
    var haveElementsToLoad = function haveElementsToLoad2(instance) {
      return instance.toLoadCount > 0;
    };
    var getSourceTags = function getSourceTags2(parentTag) {
      var sourceTags = [];
      for (var i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
        if (childTag.tagName === "SOURCE") {
          sourceTags.push(childTag);
        }
      }
      return sourceTags;
    };
    var forEachPictureSource = function forEachPictureSource2(element, fn) {
      var parent = element.parentNode;
      if (!parent || parent.tagName !== "PICTURE") {
        return;
      }
      var sourceTags = getSourceTags(parent);
      sourceTags.forEach(fn);
    };
    var forEachVideoSource = function forEachVideoSource2(element, fn) {
      var sourceTags = getSourceTags(element);
      sourceTags.forEach(fn);
    };
    var attrsSrc = [SRC];
    var attrsSrcPoster = [SRC, POSTER];
    var attrsSrcSrcsetSizes = [SRC, SRCSET, SIZES];
    var attrsData = [DATA];
    var hasOriginalAttrs = function hasOriginalAttrs2(element) {
      return !!element[ORIGINALS];
    };
    var getOriginalAttrs = function getOriginalAttrs2(element) {
      return element[ORIGINALS];
    };
    var deleteOriginalAttrs = function deleteOriginalAttrs2(element) {
      return delete element[ORIGINALS];
    };
    var setOriginalsObject = function setOriginalsObject2(element, attributes) {
      if (hasOriginalAttrs(element)) {
        return;
      }
      var originals = {};
      attributes.forEach(function(attribute) {
        originals[attribute] = element.getAttribute(attribute);
      });
      element[ORIGINALS] = originals;
    };
    var saveOriginalBackgroundStyle = function saveOriginalBackgroundStyle2(element) {
      if (hasOriginalAttrs(element)) {
        return;
      }
      element[ORIGINALS] = {
        backgroundImage: element.style.backgroundImage
      };
    };
    var setOrResetAttribute = function setOrResetAttribute2(element, attrName, value) {
      if (!value) {
        element.removeAttribute(attrName);
        return;
      }
      element.setAttribute(attrName, value);
    };
    var restoreOriginalAttrs = function restoreOriginalAttrs2(element, attributes) {
      if (!hasOriginalAttrs(element)) {
        return;
      }
      var originals = getOriginalAttrs(element);
      attributes.forEach(function(attribute) {
        setOrResetAttribute(element, attribute, originals[attribute]);
      });
    };
    var restoreOriginalBgImage = function restoreOriginalBgImage2(element) {
      if (!hasOriginalAttrs(element)) {
        return;
      }
      var originals = getOriginalAttrs(element);
      element.style.backgroundImage = originals.backgroundImage;
    };
    var manageApplied = function manageApplied2(element, settings, instance) {
      addClass(element, settings.class_applied);
      setStatus(element, statusApplied);
      if (!instance)
        return;
      if (settings.unobserve_completed) {
        unobserve(element, settings);
      }
      safeCallback(settings.callback_applied, element, instance);
    };
    var manageLoading = function manageLoading2(element, settings, instance) {
      addClass(element, settings.class_loading);
      setStatus(element, statusLoading);
      if (!instance)
        return;
      updateLoadingCount(instance, 1);
      safeCallback(settings.callback_loading, element, instance);
    };
    var setAttributeIfValue = function setAttributeIfValue2(element, attrName, value) {
      if (!value) {
        return;
      }
      element.setAttribute(attrName, value);
    };
    var setImageAttributes = function setImageAttributes2(element, settings) {
      setAttributeIfValue(element, SIZES, getData(element, settings.data_sizes));
      setAttributeIfValue(element, SRCSET, getData(element, settings.data_srcset));
      setAttributeIfValue(element, SRC, getData(element, settings.data_src));
    };
    var setSourcesImg = function setSourcesImg2(imgEl, settings) {
      forEachPictureSource(imgEl, function(sourceTag) {
        setOriginalsObject(sourceTag, attrsSrcSrcsetSizes);
        setImageAttributes(sourceTag, settings);
      });
      setOriginalsObject(imgEl, attrsSrcSrcsetSizes);
      setImageAttributes(imgEl, settings);
    };
    var setSourcesIframe = function setSourcesIframe2(iframe, settings) {
      setOriginalsObject(iframe, attrsSrc);
      setAttributeIfValue(iframe, SRC, getData(iframe, settings.data_src));
    };
    var setSourcesVideo = function setSourcesVideo2(videoEl, settings) {
      forEachVideoSource(videoEl, function(sourceEl) {
        setOriginalsObject(sourceEl, attrsSrc);
        setAttributeIfValue(sourceEl, SRC, getData(sourceEl, settings.data_src));
      });
      setOriginalsObject(videoEl, attrsSrcPoster);
      setAttributeIfValue(videoEl, POSTER, getData(videoEl, settings.data_poster));
      setAttributeIfValue(videoEl, SRC, getData(videoEl, settings.data_src));
      videoEl.load();
    };
    var setSourcesObject = function setSourcesObject2(object, settings) {
      setOriginalsObject(object, attrsData);
      setAttributeIfValue(object, DATA, getData(object, settings.data_src));
    };
    var setBackground = function setBackground2(element, settings, instance) {
      var bg1xValue = getData(element, settings.data_bg);
      var bgHiDpiValue = getData(element, settings.data_bg_hidpi);
      var bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
      if (!bgDataValue)
        return;
      element.style.backgroundImage = 'url("'.concat(bgDataValue, '")');
      getTempImage(element).setAttribute(SRC, bgDataValue);
      manageLoading(element, settings, instance);
    };
    var setMultiBackground = function setMultiBackground2(element, settings, instance) {
      var bg1xValue = getData(element, settings.data_bg_multi);
      var bgHiDpiValue = getData(element, settings.data_bg_multi_hidpi);
      var bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
      if (!bgDataValue) {
        return;
      }
      element.style.backgroundImage = bgDataValue;
      manageApplied(element, settings, instance);
    };
    var setImgsetBackground = function setImgsetBackground2(element, settings, instance) {
      var bgImgSetDataValue = getData(element, settings.data_bg_set);
      if (!bgImgSetDataValue) {
        return;
      }
      var imgSetValues = bgImgSetDataValue.split("|");
      var bgImageValues = imgSetValues.map(function(value) {
        return "image-set(".concat(value, ")");
      });
      element.style.backgroundImage = bgImageValues.join();
      if (element.style.backgroundImage === "") {
        bgImageValues = imgSetValues.map(function(value) {
          return "-webkit-image-set(".concat(value, ")");
        });
        element.style.backgroundImage = bgImageValues.join();
      }
      manageApplied(element, settings, instance);
    };
    var setSourcesFunctions = {
      IMG: setSourcesImg,
      IFRAME: setSourcesIframe,
      VIDEO: setSourcesVideo,
      OBJECT: setSourcesObject
    };
    var setSourcesNative = function setSourcesNative2(element, settings) {
      var setSourcesFunction = setSourcesFunctions[element.tagName];
      if (!setSourcesFunction) {
        return;
      }
      setSourcesFunction(element, settings);
    };
    var setSources = function setSources2(element, settings, instance) {
      var setSourcesFunction = setSourcesFunctions[element.tagName];
      if (!setSourcesFunction) {
        return;
      }
      setSourcesFunction(element, settings);
      manageLoading(element, settings, instance);
    };
    var elementsWithLoadEvent = ["IMG", "IFRAME", "VIDEO", "OBJECT"];
    var hasLoadEvent = function hasLoadEvent2(element) {
      return elementsWithLoadEvent.indexOf(element.tagName) > -1;
    };
    var checkFinish = function checkFinish2(settings, instance) {
      if (instance && !isSomethingLoading(instance) && !haveElementsToLoad(instance)) {
        safeCallback(settings.callback_finish, instance);
      }
    };
    var addEventListener = function addEventListener2(element, eventName, handler) {
      element.addEventListener(eventName, handler);
      element.llEvLisnrs[eventName] = handler;
    };
    var removeEventListener = function removeEventListener2(element, eventName, handler) {
      element.removeEventListener(eventName, handler);
    };
    var hasEventListeners = function hasEventListeners2(element) {
      return !!element.llEvLisnrs;
    };
    var addEventListeners = function addEventListeners2(element, loadHandler2, errorHandler2) {
      if (!hasEventListeners(element))
        element.llEvLisnrs = {};
      var loadEventName = element.tagName === "VIDEO" ? "loadeddata" : "load";
      addEventListener(element, loadEventName, loadHandler2);
      addEventListener(element, "error", errorHandler2);
    };
    var removeEventListeners = function removeEventListeners2(element) {
      if (!hasEventListeners(element)) {
        return;
      }
      var eventListeners = element.llEvLisnrs;
      for (var eventName in eventListeners) {
        var handler = eventListeners[eventName];
        removeEventListener(element, eventName, handler);
      }
      delete element.llEvLisnrs;
    };
    var doneHandler = function doneHandler2(element, settings, instance) {
      deleteTempImage(element);
      updateLoadingCount(instance, -1);
      decreaseToLoadCount(instance);
      removeClass(element, settings.class_loading);
      if (settings.unobserve_completed) {
        unobserve(element, instance);
      }
    };
    var loadHandler = function loadHandler2(event, element, settings, instance) {
      var goingNative = hasStatusNative(element);
      doneHandler(element, settings, instance);
      addClass(element, settings.class_loaded);
      setStatus(element, statusLoaded);
      safeCallback(settings.callback_loaded, element, instance);
      if (!goingNative)
        checkFinish(settings, instance);
    };
    var errorHandler = function errorHandler2(event, element, settings, instance) {
      var goingNative = hasStatusNative(element);
      doneHandler(element, settings, instance);
      addClass(element, settings.class_error);
      setStatus(element, statusError);
      safeCallback(settings.callback_error, element, instance);
      if (settings.restore_on_error)
        restoreOriginalAttrs(element, attrsSrcSrcsetSizes);
      if (!goingNative)
        checkFinish(settings, instance);
    };
    var addOneShotEventListeners = function addOneShotEventListeners2(element, settings, instance) {
      var elementToListenTo = getTempImage(element) || element;
      if (hasEventListeners(elementToListenTo)) {
        return;
      }
      var _loadHandler = function _loadHandler2(event) {
        loadHandler(event, element, settings, instance);
        removeEventListeners(elementToListenTo);
      };
      var _errorHandler = function _errorHandler2(event) {
        errorHandler(event, element, settings, instance);
        removeEventListeners(elementToListenTo);
      };
      addEventListeners(elementToListenTo, _loadHandler, _errorHandler);
    };
    var loadBackground = function loadBackground2(element, settings, instance) {
      addTempImage(element);
      addOneShotEventListeners(element, settings, instance);
      saveOriginalBackgroundStyle(element);
      setBackground(element, settings, instance);
      setMultiBackground(element, settings, instance);
      setImgsetBackground(element, settings, instance);
    };
    var loadRegular = function loadRegular2(element, settings, instance) {
      addOneShotEventListeners(element, settings, instance);
      setSources(element, settings, instance);
    };
    var load = function load2(element, settings, instance) {
      if (hasLoadEvent(element)) {
        loadRegular(element, settings, instance);
      } else {
        loadBackground(element, settings, instance);
      }
    };
    var loadNative = function loadNative2(element, settings, instance) {
      element.setAttribute("loading", "lazy");
      addOneShotEventListeners(element, settings, instance);
      setSourcesNative(element, settings);
      setStatus(element, statusNative);
    };
    var removeImageAttributes = function removeImageAttributes2(element) {
      element.removeAttribute(SRC);
      element.removeAttribute(SRCSET);
      element.removeAttribute(SIZES);
    };
    var resetSourcesImg = function resetSourcesImg2(element) {
      forEachPictureSource(element, function(sourceTag) {
        removeImageAttributes(sourceTag);
      });
      removeImageAttributes(element);
    };
    var restoreImg = function restoreImg2(imgEl) {
      forEachPictureSource(imgEl, function(sourceEl) {
        restoreOriginalAttrs(sourceEl, attrsSrcSrcsetSizes);
      });
      restoreOriginalAttrs(imgEl, attrsSrcSrcsetSizes);
    };
    var restoreVideo = function restoreVideo2(videoEl) {
      forEachVideoSource(videoEl, function(sourceEl) {
        restoreOriginalAttrs(sourceEl, attrsSrc);
      });
      restoreOriginalAttrs(videoEl, attrsSrcPoster);
      videoEl.load();
    };
    var restoreIframe = function restoreIframe2(iframeEl) {
      restoreOriginalAttrs(iframeEl, attrsSrc);
    };
    var restoreObject = function restoreObject2(objectEl) {
      restoreOriginalAttrs(objectEl, attrsData);
    };
    var restoreFunctions = {
      IMG: restoreImg,
      IFRAME: restoreIframe,
      VIDEO: restoreVideo,
      OBJECT: restoreObject
    };
    var restoreAttributes = function restoreAttributes2(element) {
      var restoreFunction = restoreFunctions[element.tagName];
      if (!restoreFunction) {
        restoreOriginalBgImage(element);
        return;
      }
      restoreFunction(element);
    };
    var resetClasses = function resetClasses2(element, settings) {
      if (hasEmptyStatus(element) || hasStatusNative(element)) {
        return;
      }
      removeClass(element, settings.class_entered);
      removeClass(element, settings.class_exited);
      removeClass(element, settings.class_applied);
      removeClass(element, settings.class_loading);
      removeClass(element, settings.class_loaded);
      removeClass(element, settings.class_error);
    };
    var restore = function restore2(element, settings) {
      restoreAttributes(element);
      resetClasses(element, settings);
      resetStatus(element);
      deleteOriginalAttrs(element);
    };
    var cancelLoading = function cancelLoading2(element, entry, settings, instance) {
      if (!settings.cancel_on_exit)
        return;
      if (!hasStatusLoading(element))
        return;
      if (element.tagName !== "IMG")
        return;
      removeEventListeners(element);
      resetSourcesImg(element);
      restoreImg(element);
      removeClass(element, settings.class_loading);
      updateLoadingCount(instance, -1);
      resetStatus(element);
      safeCallback(settings.callback_cancel, element, entry, instance);
    };
    var onEnter = function onEnter2(element, entry, settings, instance) {
      var dontLoad = hadStartedLoading(element);
      setStatus(element, statusEntered);
      addClass(element, settings.class_entered);
      removeClass(element, settings.class_exited);
      unobserveEntered(element, settings, instance);
      safeCallback(settings.callback_enter, element, entry, instance);
      if (dontLoad)
        return;
      load(element, settings, instance);
    };
    var onExit = function onExit2(element, entry, settings, instance) {
      if (hasEmptyStatus(element))
        return;
      addClass(element, settings.class_exited);
      cancelLoading(element, entry, settings, instance);
      safeCallback(settings.callback_exit, element, entry, instance);
    };
    var tagsWithNativeLazy = ["IMG", "IFRAME", "VIDEO"];
    var shouldUseNative = function shouldUseNative2(settings) {
      return settings.use_native && "loading" in HTMLImageElement.prototype;
    };
    var loadAllNative = function loadAllNative2(elements, settings, instance) {
      elements.forEach(function(element) {
        if (tagsWithNativeLazy.indexOf(element.tagName) === -1) {
          return;
        }
        loadNative(element, settings, instance);
      });
      setToLoadCount(instance, 0);
    };
    var isIntersecting = function isIntersecting2(entry) {
      return entry.isIntersecting || entry.intersectionRatio > 0;
    };
    var getObserverSettings = function getObserverSettings2(settings) {
      return {
        root: settings.container === document ? null : settings.container,
        rootMargin: settings.thresholds || settings.threshold + "px"
      };
    };
    var intersectionHandler = function intersectionHandler2(entries, settings, instance) {
      entries.forEach(function(entry) {
        return isIntersecting(entry) ? onEnter(entry.target, entry, settings, instance) : onExit(entry.target, entry, settings, instance);
      });
    };
    var observeElements = function observeElements2(observer, elements) {
      elements.forEach(function(element) {
        observer.observe(element);
      });
    };
    var updateObserver = function updateObserver2(observer, elementsToObserve) {
      resetObserver(observer);
      observeElements(observer, elementsToObserve);
    };
    var setObserver = function setObserver2(settings, instance) {
      if (!supportsIntersectionObserver || shouldUseNative(settings)) {
        return;
      }
      instance._observer = new IntersectionObserver(function(entries) {
        intersectionHandler(entries, settings, instance);
      }, getObserverSettings(settings));
    };
    var toArray = function toArray2(nodeSet) {
      return Array.prototype.slice.call(nodeSet);
    };
    var queryElements = function queryElements2(settings) {
      return settings.container.querySelectorAll(settings.elements_selector);
    };
    var excludeManagedElements = function excludeManagedElements2(elements) {
      return toArray(elements).filter(hasEmptyStatus);
    };
    var hasError = function hasError2(element) {
      return hasStatusError(element);
    };
    var filterErrorElements = function filterErrorElements2(elements) {
      return toArray(elements).filter(hasError);
    };
    var getElementsToLoad = function getElementsToLoad2(elements, settings) {
      return excludeManagedElements(elements || queryElements(settings));
    };
    var retryLazyLoad = function retryLazyLoad2(settings, instance) {
      var errorElements = filterErrorElements(queryElements(settings));
      errorElements.forEach(function(element) {
        removeClass(element, settings.class_error);
        resetStatus(element);
      });
      instance.update();
    };
    var setOnlineCheck = function setOnlineCheck2(settings, instance) {
      if (!runningOnBrowser) {
        return;
      }
      instance._onlineHandler = function() {
        retryLazyLoad(settings, instance);
      };
      window.addEventListener("online", instance._onlineHandler);
    };
    var resetOnlineCheck = function resetOnlineCheck2(instance) {
      if (!runningOnBrowser) {
        return;
      }
      window.removeEventListener("online", instance._onlineHandler);
    };
    var LazyLoad2 = function LazyLoad3(customSettings, elements) {
      var settings = getExtendedSettings(customSettings);
      this._settings = settings;
      this.loadingCount = 0;
      setObserver(settings, this);
      setOnlineCheck(settings, this);
      this.update(elements);
    };
    LazyLoad2.prototype = {
      update: function update(givenNodeset) {
        var settings = this._settings;
        var elementsToLoad = getElementsToLoad(givenNodeset, settings);
        setToLoadCount(this, elementsToLoad.length);
        if (isBot || !supportsIntersectionObserver) {
          this.loadAll(elementsToLoad);
          return;
        }
        if (shouldUseNative(settings)) {
          loadAllNative(elementsToLoad, settings, this);
          return;
        }
        updateObserver(this._observer, elementsToLoad);
      },
      destroy: function destroy() {
        if (this._observer) {
          this._observer.disconnect();
        }
        resetOnlineCheck(this);
        queryElements(this._settings).forEach(function(element) {
          deleteOriginalAttrs(element);
        });
        delete this._observer;
        delete this._settings;
        delete this._onlineHandler;
        delete this.loadingCount;
        delete this.toLoadCount;
      },
      loadAll: function loadAll(elements) {
        var _this = this;
        var settings = this._settings;
        var elementsToLoad = getElementsToLoad(elements, settings);
        elementsToLoad.forEach(function(element) {
          unobserve(element, _this);
          load(element, settings, _this);
        });
      },
      restoreAll: function restoreAll() {
        var settings = this._settings;
        queryElements(settings).forEach(function(element) {
          restore(element, settings);
        });
      }
    };
    LazyLoad2.load = function(element, customSettings) {
      var settings = getExtendedSettings(customSettings);
      load(element, settings);
    };
    LazyLoad2.resetStatus = function(element) {
      resetStatus(element);
    };
    if (runningOnBrowser) {
      autoInitialize(LazyLoad2, window.lazyLoadOptions);
    }
    return LazyLoad2;
  }();
})();

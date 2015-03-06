define(
    [
        'jquery',
        'kkontroller',
        'local/jquery-thr-deb'
    ],
    function($, kkontroller) {

        var page = $('.page');

        /**
         * @constructor
         */
        function App() {}

        $.extend(App.prototype, {

            init: function() {
                this.controller = new kkontroller($('.cluster'));
                // состояния (cluster || snippet)
                this._setMode(page, 'state', 'cluster');

                $(document).on('keydown', $.throttle(this._onKeyDown, 100, this));
                this.controller.domElem.on('move', this._switch.bind(this));

                // ставим фокус на первый элемент
                $('.control_active').addClass('cluster_active');
                // модификатор экрана
                this._setPageMode();
            },

            _onKeyDown: function(e) {
                var key = (e || window.event).keyCode,
                    state = this._getMode(page, 'state'),
                    isEnter = state === 'cluster'
                        // Enter или стрелка вниз
                        && (key === 13 || key === 40),
                    isOut = state === 'snippet'
                        // Backspace или стрелка вверх
                        && (key === 8 || key === 38);

                if(isEnter) {
                    var cls = $('.cluster_active').prop('class'),
                        scope = cls && cls.match(/cluster_scope_([^\s]+)/).pop();

                    if(scope) {
                        this._setMode(page, 'state', 'snippet');
                        this.controller.setItems($('.snippet_scope_' + scope));
                    }
                } else
                if(isOut) {
                    this._setMode(page, 'state', 'cluster');
                    // снимаем фокус
                    this.controller.item.blur();
                    this.controller.setItems($('.cluster'), $('.cluster_active'));
                    e.preventDefault();
                }
            },

            _switch: function(e, data) {
                data.elem.focus();
                // переключение активного кластера
                if(data.elem.hasClass('cluster')) {
                    $('.cluster_active').removeClass('cluster_active');
                    data.elem.addClass('cluster_active');
                    this._setPageMode();
                    localStorage.cluster = this._getMode(data.elem, 'scope');
                } else
                if(data.elem.hasClass('snippet')) {
                    localStorage.snippet = this._getMode(data.elem, 'scope');
                }
            },

            _setPageMode: function() {
                this._setMode(
                    page, 'mode',
                    this._getMode($('.cluster_active'), 'cluster_scope')
                );
            },

            _setMode: function(elem, modName, modVal) {
                var activeMode = this._getMode(elem, modName);

                activeMode && elem.removeClass(modName+'_'+activeMode);
                elem.addClass(modName+'_'+modVal);
            },

            _getMode: function(elem, mode) {
                var rgx = new RegExp(mode + '_[^\\s]+'),
                    matched = elem.prop('class').match(rgx);

                return matched && matched[0].split('_').pop();
            }

        });

        return new App();

    }
);

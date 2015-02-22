$(function() {

    // var board = new Board(4);
    var controller = new kkontroller();

    // ставим фокус на первый элемент
    $('.menu .control').eq(0).focus();

    controller.domElem.on({
        // enter: fn(),
        // out: fn(),
        move: function(e, data) {
            data.elem.focus();
        }
    });

});

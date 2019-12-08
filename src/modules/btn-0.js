import $ from "jquery";


function doUndo() {
    document.execCommand("undo", false, null);
  }

export function btn(mistake,repl) {
    $(".btn-0")
    .text(repl)
    .show();
  $(".btn-0").click(function() {
    let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");

    $("textarea").val(
      $("textarea")
        .val()
        .replace(replaceRX, repl)
    );
    $(`span:contains(${mistake})`).css("display", "none");
    $(".comment").css({ opacity: "0" });
    $(".btn-0").unbind("click");
    setTimeout(doUndo(), 1);
  });
}
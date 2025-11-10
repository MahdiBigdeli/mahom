$(document).ready(function () {
    $($(".slctor_img_nav")[1]).mouseenter(function () {
        $($(".slctor_img_nav")[1]).attr("src","images/text title 2.png")
    })
     $($(".slctor_img_nav")[1]).mouseout(function () {
        $($(".slctor_img_nav")[1]).attr("src","images/text title 1 .png")
    })
    $($(".slctor_img_nav")[0]).mouseenter(function () {
        $($(".slctor_img_nav")[0]).attr("src","images/text title 4 .png")
    })
     $($(".slctor_img_nav")[0]).mouseout(function () {
        $($(".slctor_img_nav")[0]).attr("src","images/text title 3 .png")
    })

})
$(document).ready(function () {
    $($(".slctor_img_nav")).mouseenter(function () {
        $($(".slctor_img_nav")[1]).attr("src","images/text title 2.png")
    })
     $($(".slctor_img_nav")).mouseout(function () {
        $($(".slctor_img_nav")[1]).attr("src","images/text title 1 .png")
    })
    $($(".slctor_img_nav")).mouseenter(function () {
        $($(".slctor_img_nav")[0]).attr("src","images/text title 4 .png")
    })
     $($(".slctor_img_nav")).mouseout(function () {
        $($(".slctor_img_nav")[0]).attr("src","images/text title 3 .png")
    })

})
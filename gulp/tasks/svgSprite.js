import svgSprite from "gulp-svg-sprite";

export const svgToSprite = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SVG",
            messege: "Error: <%= error.messege %>"
        })
    ))
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: `../icons/icons.svg`,
                example: true
            }
            
        },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`));
}
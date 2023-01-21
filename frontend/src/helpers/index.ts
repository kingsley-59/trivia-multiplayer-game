

export function navigateTo(location: string | URL) {
    return function () {
        window.location.assign(location)
    }
}
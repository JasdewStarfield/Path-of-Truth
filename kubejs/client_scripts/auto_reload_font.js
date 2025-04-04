{
    let fontLoaded = false
    ClientEvents.loggedIn(() => {
        if (fontLoaded) return
        fontLoaded = true
        Client.scheduleInTicks(100, () => {
            let opt = Client.options.forceUnicodeFont()
            let oldVal = opt.get()
            opt.set(!oldVal)
            opt.set(oldVal)
        })
    })
}

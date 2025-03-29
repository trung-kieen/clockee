/**
 * Custom react component wrap text for more information details
 *
 */
function HelperText({className, children}){
    return(
        <div className={`text-slate-400 ${className}`}>{children}</div>
    )
}

export default HelperText

setwd("C:/Users/minushkin/Documents/GitHub/bitstarter/benchmark/results")

require(plyr)

require(XML)

options(stringsAsFactors = FALSE)


readJTL <- function(path, timeZone="GMT"){
  
  x <- xmlParse(path)
  els <- getNodeSet(x, "//httpSample")
  links <- sapply(els, function(x) x <- xmlAttrs(x)) 
  out <- data.frame(t(links))
  
  out$t <- as.numeric(out$t)
  out$ts <- as.numeric(out$ts)
  out$lt <- as.numeric(out$lt)  
  out$time <- as.POSIXct(out$ts/1000.0, origin="1970-01-01 04:00:00", tz = timeZone)
  
  out
}



httpMain <- readJTL("HTTP_main.jtl")

jsonSearch <- readJTL("JSON_search.jtl")


plot(jsonSearch$time, jsonSearch$t, col="blue")
points(httpMain$time, httpMain$t)
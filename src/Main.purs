module Main where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log, logShow)

import FRP as F
import FRP.Event as E
import FRP.Behavior as B

foreign import attachSignalEvents :: forall a b eff.  String -> (b ->  Eff (frp::F.FRP | eff) Unit) -> Unit
foreign import logAny :: forall a eff. a ->  Eff eff Unit

signal m = do
  o <- E.create
  let behavior = B.step 0.0 o.event
  let x = attachSignalEvents m o.push
  pure $ {behavior : behavior , event : o.event}


main = do
  x <- signal "x"
  y <- signal "y"
  z <- signal "z"

  let b = B.derivative' y.behavior x.behavior

  B.sample_ b z.event `E.subscribe` (\x -> logAny x)

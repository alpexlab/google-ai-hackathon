import config.const as const
from config.settings.base import *

if const.DEBUG:
    from config.settings.dev import *
else:
    from config.settings.prod import *

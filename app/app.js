import './theme';
import { router, route } from 'reapp-kit';

router(require,
  route('home', '/', { dir: '' },
    route('locations',
      route('location', '/location')),
    route('history', route('test'))
  )
);

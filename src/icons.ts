import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';

const shareButtonsIcons = [ faFacebookF, faTwitter, faPinterestP ];
library.add(...shareButtonsIcons);
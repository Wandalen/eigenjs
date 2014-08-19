//
// CRowVector/definitions.hpp
// ~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_CROWVECTOR_DEFINITIONS_HPP
#define EIGENJS_CROWVECTOR_DEFINITIONS_HPP

#include "../CRowVector_fwd.hpp"

#include "instance_method_set.hpp"
#include "instance_method_get.hpp"

#include "instance_method_mula.hpp"

namespace EigenJS {

EIGENJS_OBJECT_DEFINITIONS(
  CRowVector
, (instance_method_set)
  (instance_method_get)

  (instance_method_mula)
);

}  // namespace EigenJS

#endif  // EIGENJS_CROWVECTOR_DEFINITIONS_HPP

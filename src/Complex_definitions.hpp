//
// Complex_definitions.hpp
// ~~~~~~~~~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_COMPLEX_DEFINITIONS_HPP
#define EIGENJS_COMPLEX_DEFINITIONS_HPP

#include "definition.hpp"
#include "Complex_fwd.hpp"

#include "Complex_property_accessor_real.hpp"
#include "Complex_property_accessor_imag.hpp"

#include "Complex_instance_method_abs.hpp"
#include "Complex_instance_method_arg.hpp"
#include "Complex_instance_method_norm.hpp"
#include "Complex_instance_method_conj.hpp"

#include "Complex_instance_method_add.hpp"
#include "Complex_instance_method_adda.hpp"
#include "Complex_instance_method_sub.hpp"
#include "Complex_instance_method_suba.hpp"
#include "Complex_instance_method_mul.hpp"
#include "Complex_instance_method_mula.hpp"
#include "Complex_instance_method_div.hpp"
#include "Complex_instance_method_diva.hpp"

#include "Complex_class_method_polar.hpp"
#include "Complex_class_method_proj.hpp"
#include "Complex_class_method_cos.hpp"
#include "Complex_class_method_cosh.hpp"
#include "Complex_class_method_exp.hpp"
#include "Complex_class_method_log.hpp"
#include "Complex_class_method_log10.hpp"
#include "Complex_class_method_pow.hpp"
#include "Complex_class_method_sin.hpp"
#include "Complex_class_method_sinh.hpp"
#include "Complex_class_method_sqrt.hpp"
#include "Complex_class_method_tan.hpp"
#include "Complex_class_method_tanh.hpp"
#include "Complex_class_method_acos.hpp"
#include "Complex_class_method_acosh.hpp"
#include "Complex_class_method_asin.hpp"
#include "Complex_class_method_asinh.hpp"
#include "Complex_class_method_atan.hpp"
#include "Complex_class_method_atanh.hpp"

#include "Complex_instance_method_equals.hpp"
#include "Complex_instance_method_isApprox.hpp"

#include "Complex_instance_method_toString.hpp"

namespace EigenJS {

EIGENJS_OBJECT_DEFINITIONS(
  Complex
, (Complex_property_accessor_real)
  (Complex_property_accessor_imag)

  (Complex_instance_method_abs)
  (Complex_instance_method_arg)
  (Complex_instance_method_norm)
  (Complex_instance_method_conj)

  (Complex_instance_method_add)
  (Complex_instance_method_adda)
  (Complex_instance_method_sub)
  (Complex_instance_method_suba)
  (Complex_instance_method_mul)
  (Complex_instance_method_mula)
  (Complex_instance_method_div)
  (Complex_instance_method_diva)

  (Complex_class_method_polar)
  (Complex_class_method_proj)
  (Complex_class_method_cos)
  (Complex_class_method_cosh)
  (Complex_class_method_exp)
  (Complex_class_method_log)
  (Complex_class_method_log10)
  (Complex_class_method_pow)
  (Complex_class_method_sqrt)
  (Complex_class_method_sin)
  (Complex_class_method_sinh)
  (Complex_class_method_sqrt)
  (Complex_class_method_tan)
  (Complex_class_method_tanh)
  (Complex_class_method_acos)
  (Complex_class_method_acosh)
  (Complex_class_method_asin)
  (Complex_class_method_asinh)
  (Complex_class_method_atan)
  (Complex_class_method_atanh)

  (Complex_instance_method_equals)
  (Complex_instance_method_isApprox)

  (Complex_instance_method_toString)
);

}  // namespace EigenJS

#endif  // EIGENJS_COMPLEX_DEFINITIONS_HPP

//
// CVector_fwd.hpp
// ~~~~~~~~~~~~~~~
//
// Copyright (c) 2014 Rick Yang (rick68 at gmail dot com)
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

#ifndef EIGENJS_CVECTOR_FWD_HPP
#define EIGENJS_CVECTOR_FWD_HPP

#include <boost/config.hpp>

#include <eigen3/Eigen/Dense>

#include <complex>

namespace EigenJS {

BOOST_CONSTEXPR char cvector_class_name[] = "CVector";

template <
  typename ScalarType = double
, typename ValueType = Eigen::Matrix<
    std::complex<ScalarType>
  , Eigen::Dynamic
  , 1
  >
, const char* ClassName = cvector_class_name
> class CVector;

}  // namespace EigenJS

#endif  // EIGENJS_CVECTOR_FWD_HPP

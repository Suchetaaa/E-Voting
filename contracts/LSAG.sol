pragma solidity >=0.4.0 <0.6.0;

// import "./AltBn128.sol";
import "./secp256k1.sol";

/*
Linkable Spontaneous Anonymous Groups

https://eprint.iacr.org/2004/027.pdf
*/

library LSAG {
    // abi.encodePacked is the "concat" or "serialization"
    // of all supplied arguments into one long bytes value
    // i.e. abi.encodePacked :: [a] -> bytes

    /**
    * Converts an integer to an elliptic curve point
    */
    function intToPoint(uint256 _x) public view
        returns (uint256[2] memory)
    {
        uint256 x = _x;
        uint256 y;
        uint256 beta;
        uint8 prefix = 0x0;

        while (true) {

            (beta, y) = secp256k1.map_curve(prefix, x);

            if (secp256k1.onCurveBeta(beta, y)) {
                return [x, y];
            }

            x = secp256k1.addmodn(x, 1);
        }
    }

    /**
    * Returns an integer representation of the hash
    * of the input
    */
    function H1(bytes memory b) public pure
        returns (uint256)
    {   
        return secp256k1.modn(uint256(keccak256(b)));
    }

    /**
    * Returns elliptic curve point of the integer representation
    * of the hash of the input
    */
    function H2(bytes memory b) public view
        returns (uint256[2] memory)
    {
        return intToPoint(H1(b));
    }

    /**
    * Helper function to calculate Z1
    * Avoids stack too deep problem
    */
    function ringCalcZ1(
        uint256[2] memory pubKey,
        uint256 c,
        uint256 s
    ) public view
        returns (uint256[2] memory)
    {

        // return AltBn128.ecAdd(
        //     AltBn128.ecMulG(s),
        //     AltBn128.ecMul(pubKey, c)
        // );

        uint256[2] memory output;
        uint256[2] memory p1;
        uint256[2] memory p2;
        uint256 x;
        uint256 y; 

        (x, y) = secp256k1.ecMultG(s);

        p1[0] = x;
        p1[1] = y;

        (x, y) = secp256k1.ecMult(pubKey, c);

        p2[0] = x;
        p2[1] = y;

        (x, y) = secp256k1.ecAddd(
            p1,
            p2
        );

        output[0] = x;
        output[1] = y;
        return output;
    }

    /**
    * Helper function to calculate Z2
    * Avoids stack too deep problem
    */
    function ringCalcZ2(
        uint256[2] memory keyImage,
        uint256[2] memory h,
        uint256 s,
        uint256 c
    ) public view
        returns (uint256[2] memory)
    {
        // return AltBn128.ecAdd(
        //     AltBn128.ecMul(h, s),
        //     AltBn128.ecMul(keyImage, c)
        // );

        uint256[2] memory output;
        uint256[2] memory p1;
        uint256[2] memory p2;
        uint256 x;
        uint256 y; 

        (x, y) = secp256k1.ecMult(h, s);

        p1[0] = x;
        p1[1] = y;

        (x, y) = secp256k1.ecMult(keyImage, c);

        p2[0] = x;
        p2[1] = y;

        (x, y) = secp256k1.ecAddd(
            p1,
            p2
        );

        output[0] = x;
        output[1] = y;
        return output;
    }


    /**
    * Verifies the ring signature
    * Section 4.2 of the paper https://eprint.iacr.org/2004/027.pdf
    */
    function verify(
        bytes memory message,
        uint256 c0,
        uint256[2] memory keyImage,
        uint256[] memory s,
        uint256[2][] memory publicKeys
    ) public view
        returns (bool)
    {
        
        
        require(publicKeys.length >= 2, "Signature size too small");
        require(publicKeys.length == s.length, "Signature sizes do not match!");


        uint256 c = c0;
        uint256 i = 0;

        // Step 1
        // Extract out public key bytes
        bytes memory hBytes = "";

        for (i = 0; i < publicKeys.length; i++) {
            hBytes = abi.encodePacked(
                hBytes,
                publicKeys[i]
            );
        }


        uint256[2] memory h = H2(hBytes);

        // Step 2
        uint256[2] memory z_1;
        uint256[2] memory z_2;


        for (i = 0; i < publicKeys.length; i++) {

            z_1 = ringCalcZ1(publicKeys[i], c, s[i]);
            z_2 = ringCalcZ2(keyImage, h, s[i], c);

            if (i != publicKeys.length - 1) {
                c = H1(
                    abi.encodePacked(
                        hBytes,
                        keyImage,
                        message,
                        z_1,
                        z_2
                    )
                );

            }
        }

        return c0 == H1(
            abi.encodePacked(
                hBytes,
                keyImage,
                message,
                z_1,
                z_2
            )
        );
    }
}